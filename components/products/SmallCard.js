import Link from 'next/link';
import styled from 'styled-components';
import { API } from '../../config';
import { useState } from 'react';
import smartTrim from '../../helpers/smartTrim';
import { Parallax, Background } from 'react-parallax';

const SmallCard = ({ product }) => {
	const [viewDesription, setViewDescription] = useState('');

	const description = () => {
		return (
			<DescriptionWrapper>
				<ListItem className="">
					<div className="text-white text-center d-flex align-items-center rgba-black-strong justify-content-center pt-5 px-2">
						{product.excerpt}...
					</div>
					<br />
					<br />
					<hr style={{ borderColor: 'white' }} />
					<div className="text-center">
						<Link href={`/proiecte/${product.slug}`}>
							<a className=" btn btn-outline-light">Afla mai multe</a>
						</Link>
					</div>
				</ListItem>
			</DescriptionWrapper>
		);
	};

	return (
		<Wrapper
			onClick={() => setViewDescription(description)}
			onMouseEnter={() => setViewDescription(description)}
			onMouseLeave={() => setViewDescription('')}
			className="card card-image m-1"
			// style={{
			// 	backgroundImage: `url(${product.photo[0].secure_url})`,
			// 	backgroundSize: 'cover',
			// 	backgroundRepeat: 'no-repeat',
			// 	backgroundPosition: 'center'
			// }}
		>
			<Parallax
				blur={{ min: 0, max: 0 }}
				bgImage={`${product.photo[0].secure_url}`}
				bgImageAlt="Contact"
				strength={100}
			>
				{viewDesription ? (
					viewDesription
				) : (
					<ListItem style={{ height: '350px' }} className="">
						<div className="text-white text-center d-flex align-items-center rgba-black-strong justify-content-center pt-3">
							<h3 className="card-title ">
								<strong> {product.name} </strong>
							</h3>
						</div>
						<Link href={`/proiecte/${product.slug}`}>
							<a className="text-white text-center align-items-center"></a>
						</Link>
					</ListItem>
				)}
			</Parallax>
		</Wrapper>
	);
};
const Div = styled.div`
	visibility: visible;
	-webkit-transform: translateY(0) scale(1);
	opacity: 1;
	transform: translateY(0) scale(1);
	opacity: 1;
	-webkit-transition: -webkit-transform 1.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s,
		opacity 1.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
	transition: transform 1.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s,
		opacity 1.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
`;
const Wrapper = styled.div`
	padding: 0;
	border: none;
	height: 350px;
	transition: 0.2s;
	box-shadow: 2px 2px 10px -2px rgba(0, 0, 0, 0.5);
	&:hover {
		box-shadow: 10px 10px 20px -4px rgba(0, 0, 0, 0.75);
	}
`;
const DescriptionWrapper = styled.div`
	padding: 0;
	border: none;
	height: 350px;
	background-color: #000;
	opacity: 0.5;
	transition: opacity 0.5s;
	&:hover {
		opacity: 0.6;
	}
`;
const ListItem = styled.div`
	max-width: 500px;
	min-width: 319px;
	height: 100%;
`;

export default SmallCard;
{
	/* <Wrapper
			className="bg"
			style={{ backgroundImage: `url(${product.photo[0].secure_url})` }}
		>
			<Link href={`/produse/${product.slug}`}>
				<a>
					<img
						className="img img-fluid"
						alt={`${product.name}`}
						src={`${product.photo[0].secure_url}`}
					/>
					<div className="carousel-caption">
						<h1>Example headline.</h1>
						<p>Some other content</p>
					</div>
				</a>
			</Link>
		</Wrapper> */
}
