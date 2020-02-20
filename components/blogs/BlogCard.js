import Link from 'next/link';
import styled from 'styled-components';
import { API } from '../../config';
import { useState } from 'react';
import smartTrim from '../../helpers/smartTrim';
import { Parallax, Background } from 'react-parallax';
import renderHtml from 'react-render-html';

const BlogCard = ({ blog }) => {
	return (
		<React.Fragment>
			{/* <div className="card"> */}
			<BlogCardStyled class="card profile-card-5">
				<div class="card-img-block">
					<img
						class="card-img-top"
						src={`${API}/blog/photo/${blog.slug}`}
						alt="Card image cap"
					/>
				</div>
				<div class="card-body pt-0">
					<h5 class="card-title">{blog.title}</h5>
					<p class="card-text">{blog.mdesc}</p>
				</div>
			</BlogCardStyled>
			<p class="mt-3 w-100 float-left text-center">
				<strong>Card with Floting Picture</strong>
			</p>
			{/* </div> */}
		</React.Fragment>
	);
};

const BlogCardStyled = styled.div`
	margin: 20px;
	border: 1px solid #dfdfdf;
	border-radius: 5px;
	.btn {
		border-radius: 2px;
		text-transform: uppercase;
		font-size: 12px;
		padding: 7px 20px;
	}
	.card-img-block {
		width: 91%;
		margin: 0 auto;
		position: relative;
		top: -20px;
		img {
			min-height: 205px;
			border-radius: 5px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.63);
		}
	}
	h5 {
		color: #4e5e30;
		font-weight: 600;
	}
	p {
		font-size: 14px;
		font-weight: 300;
	}
	.btn-primary {
		background-color: #4e5e30;
		border-color: #4e5e30;
	}
`;

export default BlogCard;
