import Layout from '../components/Layout';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';
import SmallCard from '../components/products/SmallCard';
import BlogCard from '../components/blogs/BlogCard';
import { listByNew } from '../actions/product';
import { listByCreated } from '../actions/blog';
import { Parallax, Background } from 'react-parallax';
import Media from 'react-media';
// import styled, { keyframes } from 'styled-components';
// import { fadeInUp } from 'react-animations';
// const fadeInUpAnimation = keyframes`${fadeInUp}`;
import Fade from 'react-reveal/Fade';

const Index = ({ product }) => {
	const [products, setProducts] = useState([]);
	const [blogs, setBlogs] = useState([]);
	const [error, setError] = useState('');

	const loadProducts = () => {
		listByNew().then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
			}
		});
	};
	const loadBlogs = () => {
		listByCreated().then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setBlogs(data);
			}
		});
	};

	useEffect(() => {
		loadProducts();
		loadBlogs();
	}, []);
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

	const shortDescription = () => {
		return (
			<div className="container bg-white pt-4 pb-4 mt-4 mb-4">
				<div className="text-center ">
					<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
					<br />
					<br />
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
						placerat cursus ipsum, vel ultricies sapien maximus vel. Aliquam
						venenatis, est nec consequat bibendum, velit diam posuere lorem, a
						facilisis enim justo ut elit. Aenean et efficitur lectus. Aenean ac
						tortor quis mauris auctor aliquam ut id ligula. Suspendisse tempor
						sapien a turpis vehicula volutpat. Integer eu nibh felis. Ut
						hendrerit nisi fermentum auctor mattis. Vivamus suscipit elementum
						velit, et maximus arcu suscipit ac. In hac habitasse platea
						dictumst. Proin ligula leo, tincidunt non eleifend quis, faucibus at
						mi. Duis porttitor lacus nisl, id tristique ipsum lacinia ut.
					</p>
					<br />
					<hr />
					<br />
					<p>
						Aliquam bibendum sapien sapien, id tincidunt diam sagittis ac. Fusce
						molestie commodo neque, nec elementum nulla auctor ut. Ut nulla mi,
						posuere eget condimentum id, ornare non felis. Duis fringilla nunc
						et ligula elementum vestibulum. Ut metus urna, vestibulum id posuere
						et, pellentesque sit amet leo.
					</p>
				</div>
			</div>
		);
	};

	const services = () => {
		return (
			<Parallax
				blur={{ min: -15, max: 15 }}
				bgImage={'/static/images/service-bg.jpg'}
				bgImageAlt="Servicii"
				strength={700}
			>
				<div className=" mt-4 mb-4 " style={{ height: 'auto' }}>
					<div className="container text-center">
						<h3 className="pt-4 pb-4 text-white">
							<u>Servicii pe scurt</u>
						</h3>
						<div className="row">
							<div className="col-md-4 mt-3 mb-3 text-center">
								<svg
									preserveAspectRatio="xMidYMid meet"
									data-bbox="-459 301 160 160"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-459 301 160 160"
									role="img"
									fill="#fff"
									width="125"
									height="125"
								>
									<g>
										<path d="M-393.6 414.3H-416c-4.6 0-8.3-4.3-8.3-9.5l-.3-36.1c0-5.3 3.6-9.5 8.1-9.5h49.4c2.8 0 5.4 1.7 6.9 4.5h.3c4.5 0 8.1 2.7 8.1 6.1v10.6c0 3.3-3.3 6-7.7 6.1-1.2 3.6-4.2 6.2-7.6 6.2h-18.3v12.1c.1 5.3-3.7 9.5-8.2 9.5zm-22.9-51.8c-2.6 0-4.8 2.8-4.8 6.2l.3 36.1c0 3.4 2.2 6.2 5 6.2h22.3c2.7 0 5-2.8 5-6.2V391c0-.9.7-1.7 1.7-1.7h20c2.2 0 4.1-2 4.6-4.8.1-.8.8-1.4 1.6-1.4h.9c2.8 0 4.7-1.5 4.7-2.8v-10.6c0-1.3-1.9-2.8-4.7-2.8h-1.4c-.7 0-1.3-.4-1.6-1.1-.8-2.1-2.5-3.4-4.3-3.4h-49.3z"></path>
										<path d="M-398.3 405.6h-12.9c-3 0-5.5-2.2-5.5-4.9v-7.4c0-2.7 2.5-4.9 5.5-4.9h12.9c3 0 5.5 2.2 5.5 4.9v7.4c0 2.7-2.5 4.9-5.5 4.9zm-13-13.8c-1.2 0-2.2.7-2.2 1.6v7.4c0 .8 1 1.6 2.2 1.6h12.9c1.2 0 2.2-.7 2.2-1.6v-7.4c0-.8-1-1.6-2.2-1.6h-12.9z"></path>
										<path d="M-398.7 370.8h-12.7c-.9 0-1.7-.7-1.7-1.7 0-.9.7-1.7 1.7-1.7h12.7c.9 0 1.7.7 1.7 1.7 0 .9-.8 1.7-1.7 1.7z"></path>
										<path d="M-335.1 400c-.9 0-1.7-.7-1.7-1.7v-49c0-.9.7-1.7 1.7-1.7.9 0 1.7.7 1.7 1.7v49c0 .9-.8 1.7-1.7 1.7z"></path>
										<path d="M-341.1 364.6a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0z"></path>
										<path d="M-347.2 358.2a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0z"></path>
										<path d="M-336.1 377.4h-15.7c-.9 0-1.7-.7-1.7-1.7 0-.9.7-1.7 1.7-1.7h15.7c.9 0 1.7.7 1.7 1.7 0 .9-.8 1.7-1.7 1.7z"></path>
										<path d="M-349.1 392c-.4 0-.8-.1-1.1-.4-.7-.6-.8-1.7-.2-2.4l7-8.3c.6-.7 1.7-.8 2.4-.2.7.6.8 1.7.2 2.4l-7 8.3c-.3.4-.8.6-1.3.6z"></path>
										<path d="M-379 461c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80zm0-156.6c-42.2 0-76.6 34.3-76.6 76.6s34.3 76.6 76.6 76.6c42.2 0 76.6-34.3 76.6-76.6s-34.4-76.6-76.6-76.6z"></path>
									</g>
								</svg>
								<h5 className="mt-3  text-white">Lorem Ipsum</h5>
								<p className="mt-3 text-white">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
									placerat cursus ipsum...
								</p>
							</div>
							<div className="col-md-4 mt-3 mb-3 text-center">
								<svg
									preserveAspectRatio="xMidYMid meet"
									data-bbox="-459 301 160 160"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-459 301 160 160"
									role="img"
									fill="#fff"
									width="125"
									height="125"
								>
									<g>
										<path d="M-379 461c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80zm0-156.6c-42.2 0-76.6 34.3-76.6 76.6 0 42.2 34.3 76.6 76.6 76.6 42.2 0 76.6-34.3 76.6-76.6 0-42.2-34.4-76.6-76.6-76.6z"></path>
										<path d="M-350.5 369.5c-.8 0-1.5-.7-1.5-1.5 0-14.6-11.8-26.4-26.4-26.4-15.5 0-27.1 10.5-27.1 24.4 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-15.6 12.9-27.4 30.1-27.4 16.2 0 29.4 13.2 29.4 29.4 0 .8-.7 1.5-1.5 1.5z"></path>
										<path d="M-378 374.9c-13.7 0-24.4-1.7-29.2-4.8-.7-.4-.9-1.4-.5-2.1.4-.7 1.4-.9 2.1-.5 1.6 1 8.3 4.3 27.6 4.3 18.3 0 24.7-3 26.6-4.3.7-.5 1.6-.3 2.1.4s.3 1.6-.4 2.1c-2.6 1.9-9.8 4.9-28.3 4.9z"></path>
										<path d="M-378.7 423.4c-16.9 0-23.8-2.6-29.3-4.6-.6-.2-1-.8-1-1.4v-45.7l.5-5.8c0-.5.3-.9.7-1.1 4.7-3 15.8-4.8 29.6-4.8s24.1 1.8 28.2 4.8c.4.3.6.7.6 1.2v51.4c0 .5-.2.9-.6 1.2-4 3-14.8 4.8-28.7 4.8zm-27.3-7.1c5.4 2 11.9 4.1 27.3 4.1 14.7 0 23.1-1.9 26.4-3.8v-49.8c-2.2-1.3-8.7-3.8-25.8-3.8-14.8 0-23.7 2-27.4 3.9l-.4 4.9-.1 44.5z"></path>
										<path d="M-378.3 408.5c-7.4 0-11.6-.5-17.4-1.2-.8-.1-1.3-.7-1.3-1.5v-22.4c0-.4.2-.8.5-1.1.3-.3.7-.4 1.2-.4 5.7.7 9.9 1.2 17.1 1.2 4.7 0 9.4-.2 12.4-.6.4-.1.8.1 1.2.4.3.3.5.7.5 1.1v22.4c0 .8-.6 1.4-1.3 1.5-3.3.3-8.1.6-12.9.6zm-15.8-4c5.1.6 9.1 1 15.8 1 4.1 0 8.1-.2 11.1-.4v-19.4c-3 .3-7 .4-11.1.4-6.7 0-10.7-.4-15.8-1v19.4z"></path>
									</g>
								</svg>
								<h5 className="mt-3  text-white">Lorem Ipsum</h5>
								<p className="mt-3 text-white">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
									placerat cursus ipsum...
								</p>
							</div>
							<div className="col-md-4 mt-3 mb-3 text-center">
								<svg
									preserveAspectRatio="xMidYMid meet"
									data-bbox="20 20 160 160"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="20 20 160 160"
									role="img"
									fill="#fff"
									width="125"
									height="125"
								>
									<g>
										<path d="M100 20c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80zm0 156.6c-42.2 0-76.6-34.3-76.6-76.6 0-42.2 34.3-76.6 76.6-76.6 42.2 0 76.6 34.3 76.6 76.6 0 42.2-34.4 76.6-76.6 76.6z"></path>
										<path d="M106.5 118h-21c-.8 0-1.5.7-1.5 1.5v12c0 .8.7 1.5 1.5 1.5h21c.8 0 1.5-.7 1.5-1.5v-12c0-.8-.7-1.5-1.5-1.5zm-1.5 12H87v-9h18v9z"></path>
										<path d="M106.5 97h-21c-.8 0-1.5.7-1.5 1.5v12c0 .8.7 1.5 1.5 1.5h21c.8 0 1.5-.7 1.5-1.5v-12c0-.8-.7-1.5-1.5-1.5zm-1.5 12H87v-9h18v9z"></path>
										<path d="M106.5 76h-21c-.8 0-1.5.7-1.5 1.5v12c0 .8.7 1.5 1.5 1.5h21c.8 0 1.5-.7 1.5-1.5v-12c0-.8-.7-1.5-1.5-1.5zM105 88H87v-9h18v9z"></path>
										<path d="M95.4 71.5c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2zm0-7.5c1.2 0 2.2 1 2.2 2.2 0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2z"></path>
										<path d="M113.6 64.9c-1.4-5.3-6-8.9-11.9-8.9H91.2c-7 0-13.2 5.2-13.2 12.3v64.3c0 7 6.2 12.4 13.2 12.4h10.5c1.7 0 3.3-.3 4.7-.9l4-.9 7-1.6c1.4-.3 2.7-.8 3.9-1.6l12.9-5.5c6.3-3 9-10.6 6-17l-26.6-52.6zm-2.6 67.4c0 5.4-3.9 9.7-9.3 9.7H91.2c-5.4 0-10.2-4.4-10.2-9.7V68.7c0-5.4 4.4-9.7 9.7-9.7h10.6c3.7 0 6.9 2.1 8.6 5.1 0 .1.1.2.1.3l.3.7c.4 1.1.7 2.3.7 3.6v63.6zm11.9 2.1c-1.4 2.2-3.6 3.7-6.1 4.2l-4.7 1.1h-.2c1.5-2.1 2.2-4.5 2.2-7.2V81.1l10.2 46c.5 2.5 0 5.1-1.4 7.3zm10.1-2.6l-6.8 2.9c1.2-2.5 1.6-5.4 1-8.2L116 76.4l21.5 42.4c2.3 4.9.3 10.7-4.5 13z"></path>
									</g>
								</svg>
								<h5 className="mt-3  text-white">Lorem Ipsum</h5>
								<p className="mt-3 text-white">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
									placerat cursus ipsum...
								</p>
							</div>
						</div>
					</div>
				</div>
			</Parallax>
		);
	};
	const stregths = () => {
		return (
			<div className="container mt-4 mb-4">
				<div className="row box">
					<div className="col-md-12">
						<div className="row">
							<div
								className="col-md-12"
								style={{
									marginTop: '70px',
									marginBottom: '70px',
									visibility: 'visible',
									opacity: '1',
									transform: 'translateY(0) scale(1)'
								}}
							>
								<Fade bottom cascade>
									<h2 style={{ textAlign: 'center' }}>
										<font style={{ verticalAlign: 'inherit' }}>
											<font style={{ verticalAlign: 'inherit' }}>
												OUR STRENGTHS - YOUR ADVANTAGES
											</font>
										</font>
									</h2>
									<hr />

									<p style={{ textAlign: 'center' }}>
										<font style={{ verticalAlign: 'inherit' }}>
											<font style={{ verticalAlign: 'inherit' }}>
												Interdisciplinary team with many years of know-how
											</font>
										</font>
									</p>

									<hr />
									<p style={{ textAlign: 'center' }}>
										<font style={{ verticalAlign: 'inherit' }}>
											<font style={{ verticalAlign: 'inherit' }}>
												Comprehensive and differentiated offer
											</font>
										</font>
									</p>
									<hr />
									<p style={{ textAlign: 'center' }}>
										<font style={{ verticalAlign: 'inherit' }}>
											<font style={{ verticalAlign: 'inherit' }}>
												Broad and in-depth 3D knowledge management (BIM)
											</font>
										</font>
									</p>
									<hr />
									<p style={{ textAlign: 'center' }}>
										<font style={{ verticalAlign: 'inherit' }}>
											<font style={{ verticalAlign: 'inherit' }}>
												High interaction between 3D, VR, VisKom and web
											</font>
										</font>
									</p>
									<hr />
									<p style={{ textAlign: 'center' }}>
										<font style={{ verticalAlign: 'inherit' }}>
											<font style={{ verticalAlign: 'inherit' }}>
												Exact implementation with attention to detail
											</font>
										</font>
									</p>
									<hr />
									<p style={{ textAlign: 'center' }}>
										<font style={{ verticalAlign: 'inherit' }}>
											<font style={{ verticalAlign: 'inherit' }}>
												Extensive infrastructure &amp; in-house render farm
											</font>
										</font>
									</p>
									<hr />
									<p style={{ textAlign: 'center' }}></p>
								</Fade>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	// console.log(product);

	const ourWork = () => {
		return (
			<div className="container pb-4 pt-4 mt-4 mb-4">
				<h2 className="text-center">CE FACEM NOI</h2>
				<div className="row">
					{products.map((product, i) => {
						return (
							<div key={i} className="col-md-4" style={{ padding: '0' }}>
								<Fade>
									<SmallCard product={product} />
								</Fade>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const latestPosts = () => {
		return (
			<div className="container">
				<div className="row text-center">
					{blogs.map((blog, i) => {
						return (
							<div key={i} className="col-md-4" style={{ padding: '0' }}>
								<Fade>
									<BlogCard blog={blog} />
								</Fade>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const contact = () => {
		return (
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
							<Parallax
								blur={{ min: -15, max: 15 }}
								bgImage={'/static/images/contact.jpg'}
								bgImageAlt="Contact"
								strength={300}
							>
								<div style={{ height: '760px' }} className="container p-3">
									<div className="bg-white">
										<ContactForm />
									</div>
								</div>
							</Parallax>
						)}
						{matches.medium && (
							<Parallax
								blur={{ min: -15, max: 15 }}
								bgImage={'/static/images/contact.jpg'}
								bgImageAlt="Contact"
								strength={300}
							>
								<div style={{ height: '760px' }} className="container p-3">
									<div className="bg-white">
										<ContactForm />
									</div>
								</div>
							</Parallax>
						)}
						{matches.large && (
							<Parallax
								blur={{ min: -15, max: 15 }}
								bgImage={'/static/images/contact.jpg'}
								bgImageAlt="Contact"
								strength={300}
							>
								<div style={{ height: '760px' }} className="container p-3">
									<div className="bg-white">
										<ContactForm />
									</div>
								</div>
							</Parallax>
						)}
					</React.Fragment>
				)}
			</Media>
		);
	};

	return (
		<React.Fragment>
			<Layout>
				{ControlledCarousel()}
				<div className="">
					<Fade>{shortDescription()}</Fade>
					<Fade>{services()}</Fade>
					<Fade>{ourWork()}</Fade>
					{stregths()}
					{latestPosts()}
					<Fade>{contact()}</Fade>
				</div>
			</Layout>
		</React.Fragment>
	);
};
// const FadeAnimation = styled.div`
// 	animation: 1s ${fadeInUpAnimation};
// `;
export default Index;
