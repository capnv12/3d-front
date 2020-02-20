import styled from 'styled-components';
import Media from 'react-media';
import Link from 'next/link';

const Footer = () => {
	return (
		<Wrapper className="">
			<div className="container ">
				<div className="row pt-4 pb-4">
					<div className="col-md-6">
						<h5>Link-uri utile</h5>
						<Ul className="list-unstyled">
							<li>
								<Link href="/servicii'">
									<A>Servicii</A>
								</Link>
							</li>
							<li>
								<Link href="/servicii'">
									<A>Proiecte</A>
								</Link>
							</li>
							<li>
								<Link href="/servicii'">
									<A>Articole</A>
								</Link>
							</li>
							<li>
								<Link href="/servicii'">
									<A>Despre Noi</A>
								</Link>
							</li>
							<li>
								<Link href="/servicii'">
									<A>Contact</A>
								</Link>
							</li>
						</Ul>
					</div>
					<div className="col-md-6">
						<div className="row">
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen book. It has
								survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged.
							</p>
						</div>
					</div>
				</div>
				<div className="row justify-content-center">
					<FooterSocial className="footer-social text-center">
						<ul className="list-unstyled list-inline">
							<li className="list-inline-item">
								<a href="/">
									<Svg
										xmlns="http://www.w3.org/2000/svg"
										xlink="http://www.w3.org/1999/xlink"
										version="1.0"
										x="0px"
										y="0px"
										width="20"
										height="22"
										viewBox="0 0 50 50"
										className="icon icons8-Facebook-Filled"
										fill="#fff"
									>
										{' '}
										<path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"></path>
									</Svg>
								</a>
							</li>
							<li className="list-inline-item">
								<a href="/">
									<Svg1
										xmlns="http://www.w3.org/2000/svg"
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="#fff"
									>
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
									</Svg1>
								</a>
							</li>
							<li className="list-inline-item">
								<a href="/">
									<Svg2
										xmlns="http://www.w3.org/2000/svg"
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="#fff"
									>
										<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
									</Svg2>
								</a>
							</li>
						</ul>
					</FooterSocial>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: #333333;
	color: #fff;
`;
const Ul = styled.ul`
	color: #fff;
`;
const A = styled.a`
	color: #fff;
`;
const FooterSocial = styled.div`
	a {
		color: #707473;
		padding: 5px 0;
		margin-right: 4px;
	}
`;
const Svg = styled.svg`
	:hover {
		fill: #3b5998;
	}
`;
const Svg1 = styled.svg`
	:hover {
		fill: #dd2a7b;
	}
`;
const Svg2 = styled.svg`
	:hover {
		fill: #c4302b;
	}
`;
export default Footer;
