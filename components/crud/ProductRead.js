import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeProduct } from '../../actions/product';
import moment from 'moment';
import Product from '../../pages/admin/crud/product/product';

const ProductRead = ({ username }) => {
	const [products, setProducts] = useState([]);
	const [message, setMessage] = useState('');
	const token = getCookie('token');

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = () => {
		list().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				// console.log(data);
				setProducts(data);
			}
		});
	};

	const deleteProduct = slug => {
		removeProduct(slug, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setMessage(data.message);
				loadProducts();
			}
		});
	};

	const deleteConfirm = slug => {
		let answer = window.confirm('Sigur vrei sa stergi produsul?');
		if (answer) {
			deleteProduct(slug);
		}
	};

	const showUpdateButton = product => {
		if (isAuth()) {
			return (
				<Link
					href={`/something-else?uri${product.slug}`}
					as={`/admin/crud/product/${product.slug}`}
				>
					<a>Update</a>
				</Link>
			);
		}
	};

	const showAllProducts = () => {
		return (
			<table>
				<tbody>
					<tr className="border ">
						<th className="p-3">Numar</th>
						<th className="p-3">Nume</th>
						<th className="p-3">Actualizare</th>
						<th className="p-3">Stergere</th>
					</tr>
					{products.map((product, i) => {
						return (
							<tr className="border" key={i}>
								<td className="p-3">{i + 1}.</td>
								<td className="p-3">{product.name}</td>
								<td className="p-3">
									<button className="btn btn-sm btn-warning">
										{showUpdateButton(product)}
									</button>
								</td>
								<td className="p-3 ">
									<button
										className="btn btn-sm btn-danger"
										onClick={() => deleteConfirm(product.slug)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	return (
		<React.Fragment>
			<div className="">
				<div className="">
					{message && <div className="alert alert-warning">{message}</div>}

					<div
						style={{ height: '500px', overflow: 'scroll' }}
						className="pr-3 pl-3 bg-white"
					>
						{showAllProducts()}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProductRead;
