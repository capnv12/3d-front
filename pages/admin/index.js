import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import styled from 'styled-components';
import Category from '../../components/crud/Category';
import Tag from '../../components/crud/Tag';
import BlogCategory from '../../components/crud/BlogCategory';
import { useState } from 'react';
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import PasswordUpdate from '../../components/auth/PasswordUpdate';
import BlogRead from '../../components/crud/BlogRead';
import ProductRead from '../../components/crud/ProductRead';
import { signout } from '../../actions/auth';
import Router from 'next/router';

const AdminIndex = () => {
	const [resource, setRescoure] = useState('');

	const ShowCategoryCreate = () => {
		return <Category />;
	};
	const ShowTagCreate = () => {
		return <Tag />;
	};
	const ShowBlogCategoryCreate = () => {
		return <BlogCategory />;
	};
	const ShowBlogRead = () => {
		return <BlogRead />;
	};
	const ShowProductRead = () => {
		return <ProductRead />;
	};

	const ShowProfileUpdate = () => {
		return (
			<div className="col-8">
				<ProfileUpdate />
				<PasswordUpdate />
			</div>
		);
	};

	return (
		<Layout>
			<Admin>
				<React.Fragment>
					<Wrapper>
						<div className="container">
							<div className="row">
								<div className="col-3">
									<div className="sidebar">
										<WidgetMenu className="widget widget-menu list-unstyled">
											<li>
												<Link href="/admin/crud/product/product">
													<a>
														<A>Creare Produs</A>
													</a>
												</Link>
											</li>
											<li>
												<A onClick={() => setRescoure(ShowProductRead())}>
													Editare Produs{' '}
												</A>
											</li>
											<li>
												<A onClick={() => setRescoure(ShowCategoryCreate())}>
													Creare Categorie{' '}
												</A>
											</li>
										</WidgetMenu>

										<WidgetMenu className="widget widget-menu list-unstyled">
											<li>
												<Link href="/admin/crud/blog/blog">
													<a>
														<A href="message.html">Creare Articol</A>
													</a>
												</Link>
											</li>
											<li>
												<A onClick={() => setRescoure(ShowBlogRead())}>
													Editare Articol{' '}
												</A>
											</li>
											<li>
												<A
													onClick={() => setRescoure(ShowBlogCategoryCreate())}
												>
													Creare Categorie Articol{' '}
												</A>
											</li>
											<li>
												<A onClick={() => setRescoure(ShowTagCreate())}>
													Creare Eticheta Articol{' '}
												</A>
											</li>
										</WidgetMenu>
										<WidgetMenu className="widget widget-menu list-unstyled">
											<li>
												<A onClick={() => setRescoure(ShowProfileUpdate())}>
													Editare Profil Admin
												</A>
											</li>
											<li>
												<A onClick={() => signout(() => Router.push(`/`))}>
													Dezautentificare{' '}
												</A>
											</li>
										</WidgetMenu>
									</div>
								</div>
								<div className="col-8 ml-2">
									{resource ? resource : ShowProfileUpdate()}
								</div>
							</div>
						</div>
					</Wrapper>
				</React.Fragment>
			</Admin>
		</Layout>
	);
};
const Wrapper = styled.div`
	background: #eee;
	border-bottom: 1px solid #bbb;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	padding: 30px 0;
`;
const A = styled.div`
	background-color: #333940;
	color: #cccecf;
	display: block;
	line-height: 20px;
	padding: 15px;
	text-decoration: none !important;
	&:hover {
		color: #fff;
	}
`;
const WidgetMenu = styled.ul`
	width: 100%;
	border-radius: 3px;
	overflow: hidden;
	padding: 0;
	margin: 0 0 10px 25px;
`;
export default AdminIndex;
