import Router, { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { singleProduct } from '../../actions/product';
import Media from 'react-media';
import Fade from 'react-reveal/Fade';
import renderHTML from 'react-render-html';
import Masonry from 'react-masonry-css';
import styled, { keyframes } from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

const Proiect = ({ product, query }) => {
	const ControlledCarousel = () => {
		const [index, setIndex] = useState(0);
		const [direction, setDirection] = useState(null);
		const handleSelect = (selectedIndex, e) => {
			setIndex(selectedIndex);
			setDirection(e.direction);
		};

		return (
			<Carousel
				activeIndex={index}
				direction={direction}
				onSelect={handleSelect}
				fade={true}
				interval={7000}
				className="bg-white"
			>
				{product.photo.map((photo, i) => {
					console.log(photo);
					return (
						<Carousel.Item key={i}>
							<img
								className="img img-fluid"
								// className="w-100 h-80"
								src={`${photo.secure_url}`}
								alt="text"
								style={{ maxHeight: '500px' }}
							/>
							{/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
						</Carousel.Item>
					);
				})}
			</Carousel>
		);
	};
	return (
		<Layout>
			<div className="mt-2">
				{' '}
				<div className="mx-4 text-center">
					<Box>
						{/* {ControlledCarousel()} */}
						{/* <div className="container"> */}
						<img
							className="img img-fluid"
							src={`${product.photo[0].secure_url}`}
							alt={`${product.name}`}
							style={{ maxHeight: '700px', overflow: 'hidden' }}
						/>
						{/* </div> */}
					</Box>
				</div>
			</div>

			<div className="container">
				<div className="text-center my-4">
					<Fade>
						<h1 className="text-uppercase">{product.name}</h1>
					</Fade>
					<hr />
					<Fade>
						<div className="py-4">{renderHTML(product.descriere)}</div>
					</Fade>
				</div>
				<Media
					queries={{
						small: '(max-width: 599px)',
						medium: '(min-width: 600px) and (max-width: 1199px)',
						large: '(min-width: 1200px)'
					}}
				>
					{matches => (
						<React.Fragment>
							{matches.small && (
								<div className="row">
									{product.photo.map((photo, i) => {
										// console.log(photo);
										return (
											<Image key={i}>
												<Fade>
													<img
														className="w-100"
														src={`${photo.secure_url}`}
														alt={`${product.name} - ${i}`}
													/>
												</Fade>
											</Image>
										);
									})}
								</div>
							)}
							{matches.medium && (
								<Masonry
									breakpointCols={2}
									className="my-masonry-grid"
									columnClassName="my-masonry-grid_column"
								>
									{product.photo.map((photo, i) => {
										// console.log(photo);
										return (
											<div key={i}>
												<Fade>
													<img
														className="w-100"
														src={`${photo.secure_url}`}
														alt={`${product.name} - ${i}`}
													/>
												</Fade>
											</div>
										);
									})}
								</Masonry>
							)}
							{matches.large && (
								<Masonry
									breakpointCols={2}
									className="my-masonry-grid"
									columnClassName="my-masonry-grid_column"
								>
									{product.photo.map((photo, i) => {
										// console.log(photo);
										return (
											<div key={i}>
												<Fade>
													<img
														className="w-100"
														src={`${photo.secure_url}`}
														alt={`${product.name} - ${i}`}
													/>
												</Fade>
											</div>
										);
									})}
								</Masonry>
							)}
						</React.Fragment>
					)}
				</Media>
			</div>
		</Layout>
	);
};
Proiect.getInitialProps = ({ query }) => {
	return singleProduct(query.slug).then(data => {
		if (data.error) {
			console.log(data.error);
		} else {
			// console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
			return { product: data, query };
		}
	});
};

const keyFrameExampleOne = keyframes`
0% {
    transform: scale(1);
}
100% {
    transform: scale(1.03);
}`;

const Box = styled.div`
	display: inline-block;
	background: pink;
	position: relative;
	animation: ${keyFrameExampleOne} 7s ease-in-out alternate 0s infinite;
`;

const Image = styled.div`
	margin: 5px;
	box-shadow: 2px 2px 10px -2px rgba(0, 0, 0, 0.5);
	&:hover {
		box-shadow: 10px 10px 20px -4px rgba(0, 0, 0, 0.75);
	}
`;
export default Proiect;
// -webkit-transition:-webkit-transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; transition:transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
