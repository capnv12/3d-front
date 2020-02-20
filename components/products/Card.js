import Link from 'next/link';
import styled from 'styled-components';
import { API } from '../../config';
import { useState } from 'react';
import smartTrim from '../../helpers/smartTrim';
import { Parallax, Background } from 'react-parallax';

const Card = ({ product }) => {
	const [viewDesription, setViewDescription] = useState('');

	const description = () => {
		return (
			<DescriptionWrapper>
				<ListItem className="pt-5 px-2">
					<div className="text-white text-center d-flex align-items-center rgba-black-strong justify-content-center pt-3">
						<h3 className="card-title ">
							<strong> {product.name} </strong>
						</h3>
					</div>
					<div className="text-white text-center d-flex align-items-center rgba-black-strong justify-content-center ">
						{product.excerpt}...
					</div>
					<br />
					<br />
					<hr style={{ borderColor: 'white' }} />
					<div className="text-center mt-4 pt-4">
						<Link href={`/proiecte/${product.slug}`}>
							<a className=" btn btn-lg btn-outline-light">Afla mai multe</a>
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
					<ListItem style={{ height: '500px' }} className=""></ListItem>
				)}
			</Parallax>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 0;
	border: none;
	height: 500px;
	transition: 0.2s;
	box-shadow: 2px 2px 10px -2px rgba(0, 0, 0, 0.5);
	&:hover {
		box-shadow: 10px 10px 20px -4px rgba(0, 0, 0, 0.75);
	}
`;
const DescriptionWrapper = styled.div`
	padding: 0;
	border: none;
	height: 500px;
	background-color: #000;
	opacity: 0.5;
	transition: opacity 0.5s;
	&:hover {
		opacity: 0.6;
	}
`;
const ListItem = styled.div`
	height: 100%;
`;

export default Card;
