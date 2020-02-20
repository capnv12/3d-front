import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { createProduct } from '../../actions/product';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import Product from '../../pages/admin/crud/product/product';
import { Spinner } from 'react-bootstrap';

const CreateProduct = ({ router }) => {
	const blogFromLS = () => {
		if (typeof window === 'undefined') {
			return false;
		}

		if (localStorage.getItem('product')) {
			return JSON.parse(localStorage.getItem('product'));
		} else {
			return false;
		}
	};
	const [descriere, setDescriere] = useState(blogFromLS());
	const [values, setValues] = useState({
		name: '',
		category: [],
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
	const [checkedTag, setCheckedTag] = useState([]); // tags

	const token = getCookie('token');

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

	const initCategories = () => {
		getCategories().then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setCategories(data);
			}
		});
	};

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initCategories();
	}, [router]);

	const publishProduct = e => {
		e.preventDefault();
		// console.log('ready to publishBlog');
		createProduct(formData, token).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: '',
					pret: '',
					pretRedus: '',
					SKU: '',
					inStoc: '',
					cantitate: '',
					ordine: '',
					photo: '',
					loading: false,
					createdProduct: data.name
				});
				setDescriere('');
				setCategories([]);
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
	};

	const handleDescriere = e => {
		// console.log(e);
		setDescriere(e);
		formData.set('descriere', e);
		if (typeof window !== 'undefined') {
			localStorage.setItem('product-descriere', JSON.stringify(e));
		}
	};

	const handleToggle = c => () => {
		setValues({ ...values, error: '' });
		// return the first index or -1
		const clickedCategory = checked.indexOf(c);
		const all = [...checked];

		if (clickedCategory === -1) {
			all.push(c);
		} else {
			all.splice(clickedCategory, 1);
		}
		// console.log(all);
		setChecked(all);
		// console.log(checked)
		formData.set('categories', all);
	};

	const newProductForm = () => {
		return (
			<form onSubmit={publishProduct}>
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
				{/* <div className="form-group">
					<label className="text-muted">Pret</label>
					<input
						onChange={handleChange('pret')}
						type="number"
						className="form-control"
						value={pret}
					/>
				</div> */}
				{/* <div className="form-group">
					<label className="text-muted">Pret Redus</label>
					<input
						onChange={handleChange('pretRedus')}
						type="number"
						className="form-control"
						value={pretRedus}
					/>
				</div> */}
				{/* <div className="form-group">
					<label className="text-muted">SKU</label>
					<input
						onChange={handleChange('SKU')}
						type="text"
						className="form-control"
						value={SKU}
					/>
				</div> */}
				{/* <div className="form-group">
					<label className="text-muted">In stoc</label>
					<select onChange={handleChange('inStoc')} className="form-control">
						<option>In stoc?</option>
						<option value="1">Da</option>
						<option value="0">Nu</option>
					</select>
				</div> */}
				{/* <div className="form-group">
					<label className="text-muted">Cantitate in stoc</label>
					<input
						onChange={handleChange('cantitate')}
						type="number"
						className="form-control"
						value={cantitate}
					/>
				</div> */}
				<button type="submit" className="btn btn-outline-primary ">
					Creare Produs
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
			<div className="alert alert-info">
				Produsul {createdProduct} a fost creat
			</div>
		) : (
			''
		);
	// const goBack = () => {
	//     return (
	//         <div className="mt-5">
	//             <StyledNavLink to="/cont-admin"><Button>Inapoi la Dashboard</Button></StyledNavLink>
	//         </div>
	//     )
	// }
	const showCategories = () => {
		return (
			categories &&
			categories.map((c, i) => (
				<li key={i} className="list-unstyled">
					<input
						onChange={handleToggle(c._id)}
						type="checkbox"
						className="mr-2"
					/>
					<label className="form-check-label">{c.name}</label>
				</li>
			))
		);
	};
	return (
		<div className="container-fluid mb-2">
			<div className="row">
				<div className="col-md-8">
					{showError()}
					{showSuccess()}
					{showLoading()}
					{newProductForm()}
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

export default CreateProduct;
