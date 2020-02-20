import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { singleProduct, updateProduct } from '../../actions/product';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import { API } from '../../config';

const ProductUpdate = ({ router }) => {
	const [descriere, setDescriere] = useState('');
	const [values, setValues] = useState({
		name: '',
		pret: '',
		pretRedus: '',
		SKU: '',
		inStoc: '',
		cantitate: '',
		photo: '',
		ordine: '',
		loading: false,
		error: '',
		createdProduct: '',
		redirectToProfile: false,
		formData: ''
	});

	const [categories, setCategories] = useState([]);

	const [checked, setChecked] = useState([]); // categories

	const {
		name,
		pret,
		pretRedus,
		SKU,
		// inStoc,
		cantitate,
		ordine,
		// inregistrare,
		// photo,
		loading,
		error,
		createdProduct,
		// redirectToProfile,
		formData
	} = values;

	const token = getCookie('token');

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initProduct();
		initCategories();
	}, [router]);

	const initProduct = () => {
		if (router.query.slug) {
			singleProduct(router.query.slug).then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					// console.log(data);
					setValues({
						...values,
						name: data.name,
						pret: data.pret,
						ordine: data.ordine,
						pretRedus: data.pretRedus,
						SKU: data.SKU,
						inStoc: data.inStoc,
						cantitate: data.cantitate
					});
					setDescriere(data.descriere);
					setCategoriesArray(data.categories);
				}
			});
		}
	};
	const setCategoriesArray = categories => {
		let ca = [];
		categories.map((c, i) => {
			ca.push(c);
		});
		setChecked(ca);
	};
	// console.log(checked);
	const handleToggle = c => () => {
		setValues({ ...values, error: '' });
		// return the first index or -1
		const clickedCategory = checked.indexOf(c);

		const all = [...checked];
		// console.log(all);
		if (clickedCategory === -1) {
			all.push(c);
		} else {
			all.splice(clickedCategory, 1);
		}
		// console.log(all);
		setChecked(all);
		formData.set('categories', all);
	};

	const findOutCategory = c => {
		const result = checked.indexOf(c);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const showCategories = () => {
		return (
			categories &&
			categories.map((c, i) => (
				<li key={i} className="list-unstyled">
					<input
						onChange={handleToggle(c._id)}
						checked={findOutCategory(c._id)}
						type="checkbox"
						className="mr-2"
					/>
					<label className="form-check-label">{c.name}</label>
				</li>
			))
		);
	};

	const initCategories = () => {
		getCategories().then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				// console.log(data);
				setCategories(data);
			}
		});
	};

	const handleChange = name => e => {
		// console.log(e.target.value);
		const value = e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData, error: '' });
	};
	const handlePhoto = e => {
		for (const photo of e.target.files) {
			formData.append('photo', photo);
		}
		// if (imageChange) {
		// 	for (const photo of e.target.files) {
		// 		formData.append('photo', photo);
		// 	}
		// } else {
		// 	formData.append('photo', values.photo);
		// }
	};

	const handleDescriere = e => {
		// console.log(e);
		setDescriere(e);
		formData.set('descriere', e);
	};

	const editProduct = e => {
		e.preventDefault();
		updateProduct(formData, token, router.query.slug).then(data => {
			// console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: '',
					excerpt: '',
					SKU: '',
					ordine: '',
					photo: '',
					loading: false,
					createdProduct: data.name,
					formData: new FormData()
				});
				setDescriere('');
				setCategories([]);
			}
		});
	};

	const updateProductForm = () => {
		return (
			<form onSubmit={editProduct}>
				<div className="form-group">
					<label className="text-muted">Nume</label>
					<input
						onChange={handleChange('name')}
						type="text"
						className="form-control"
						value={name}
					/>
				</div>
				<div>
					<label className="text-muted">Ordine</label>
					<input
						onChange={handleChange('ordine')}
						type="text"
						className="form-control"
						value={ordine}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Descriere</label>
					<ReactQuill
						modules={QuillModules}
						formats={QuillFormats}
						value={descriere}
						placeholder="Descrierea noului produs"
						onChange={handleDescriere}
						style={{ maxHeight: '800px', overflow: 'scroll' }}
					/>
				</div>
				<button type="submit" className="btn btn-outline-primary ">
					Actualizare Produs
				</button>
				{showError()}
				{showSuccess()}
				{showLoading()}
			</form>
		);
	};
	const showLoading = () =>
		loading ? <Spinner animation="grow" variant="primary" /> : '';
	const showError = () =>
		error ? <div className="alert alert-danger"> {error}</div> : '';
	const showSuccess = () =>
		createdProduct ? (
			<div className="alert alert-info"> {createdProduct}</div>
		) : (
			''
		);

	return (
		<div className="container-fluid mb-2">
			<div className="row">
				<div className="col-md-8">
					{showError()}
					{showSuccess()}
					{showLoading()}
					{updateProductForm()}
				</div>
				<div className="col-md-4">
					<div>
						<div>
							<div className="form-group pb-2">
								<h5>Imagine Principala</h5>
								<hr />
								<label className="btn btn-outline-info">
									Incarcare imagine
									<input
										onChange={handlePhoto}
										type="file"
										accept="image/*"
										multiple
									/>
								</label>
							</div>
						</div>
					</div>
					<div>
						<h5>Categorii</h5>
						<hr />
						<ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
							{showCategories()}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ProductUpdate);
