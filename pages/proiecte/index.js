import Layout from '../../components/Layout';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { listAllProductsCategories } from '../../actions/product';
import Media from 'react-media';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import Card from '../../components/products/Card';

const Proiecte = ({
	products,
	categories,
	totalProducts,
	productSkip,
	productLimit,
	router
}) => {
	const [limit, setLimit] = useState(productLimit);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(totalProducts);
	const [loadedProducts, setLoadedProducts] = useState([]);

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
			>
				<Carousel.Item>
					<Link href="/">
						<a>
							<img
								className="d-block w-100 h-80"
								src="/static/images/carousel-1.jpg"
								alt="text"
								style={{ maxHeight: '500px' }}
							/>
							{/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
						</a>
					</Link>
				</Carousel.Item>

				<Carousel.Item>
					<Link href="/">
						<a>
							<img
								className="d-block w-100 h-80"
								src="/static/images/carousel-2.jpg"
								alt="text"
								style={{ maxHeight: '500px' }}
							/>
						</a>
					</Link>
				</Carousel.Item>
			</Carousel>
		);
	};
	const loadMore = () => {
		let toSkip = skip + limit;
		listAllProductsCategories(toSkip, limit).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setLoadedProducts([...loadedProducts, ...data.products]);
				setSize(data.size);
				setSkip(toSkip);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button onClick={loadMore} className="btn btn-dark btn-lg">
					Load more
				</button>
			)
		);
	};

	const showAllProducts = () => {
		return products.map((product, i) => {
			return (
				<Fade key={i}>
					<div className="col-md-6 p-0">
						<Card product={product} />
					</div>
				</Fade>
			);
		});
	};

	const showLoadedProducts = () => {
		return loadedProducts.map((product, i) => {
			return (
				<Fade key={i}>
					<div className="col-md-6 p-0">
						<Card product={product} />
					</div>
				</Fade>
			);
		});
	};

	const displayCard = () => {
		return products.map((product, i) => {
			return (
				<Fade>
					<div key={i} className="col-md-6 p-0">
						<Card product={product} />
					</div>
				</Fade>
			);
		});
	};

	const displayCategories = () => {
		return categories.map((category, i) => {
			return (
				<div key={i} className="p-2 text-center">
					<Link href={`/categorie/${category.slug}`}>
						<a type="button" className="btn btn-lg btn-outline-dark">
							{category.name}
						</a>
					</Link>
				</div>
			);
		});
	};
	// console.log(products);
	return (
		<Layout>
			{ControlledCarousel()}
			<div className="text-center mt-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="80"
					height="80"
					viewBox="0 0 24 24"
					className="mt-4 mb-4"
				>
					<path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.066l-11-6.065zm-1 21.2l-6.664-3.555 4.201-2.801c1.08-.719-.066-2.359-1.243-1.575l-4.294 2.862v-7.901l8 4.363v8.607zm-6.867-14.63l6.867-3.746v4.426c0 1.323 2 1.324 2 0v-4.415l6.91 3.811-7.905 4.218-7.872-4.294zm8.867 6.03l8-4.269v7.8l-4.263-2.842c-1.181-.785-2.323.855-1.245 1.574l4.172 2.781-6.664 3.556v-8.6z" />
				</svg>
				<h1>- Proiecte -</h1>
			</div>
			<div className="container">
				<div className="row justify-content-center mt-4 mb-4">
					{displayCategories()}
				</div>
			</div>
			<div className="container mb-3">
				<div className="row">{showAllProducts()}</div>
				<div className="row">{showLoadedProducts()}</div>
				<div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
			</div>
		</Layout>
	);
};

Proiecte.getInitialProps = () => {
	let skip = 0;
	let limit = 8;
	return listAllProductsCategories(skip, limit).then(data => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				products: data.products,
				categories: data.categories,
				totalProducts: data.size,
				productLimit: limit,
				productSkip: skip
			};
		}
	});
};

export default Proiecte;
