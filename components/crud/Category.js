import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import {
	createCategory,
	getCategories,
	removeCategory
} from '../../actions/category';

const Category = () => {
	const [values, setValues] = useState({
		name: '',
		error: '',
		success: false,
		categories: [],
		removed: false,
		reload: false,
		formData
	});

	const {
		name,
		error,
		success,
		categories,
		removed,
		reload,
		formData
	} = values;

	const token = getCookie('token');

	useEffect(() => {
		loadCategories();
	}, [reload]);

	const loadCategories = () => {
		getCategories().then(data => {
			console.log(data);
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, categories: data, formData: new FormData() });
			}
		});
	};

	const showCategories = () => {
		return categories.map((c, i) => {
			return (
				<button
					onDoubleClick={() => deleteConfirm(c.slug)}
					key={i}
					className="btn btn-outline-primary mr-1 ml-1 mt-3"
				>
					{c.name}
				</button>
			);
		});
	};

	const deleteConfirm = slug => {
		let answer = window.confirm('Sigur vrei sa stergi categoria?');
		if (answer) {
			deleteCategory(slug);
		}
	};

	const deleteCategory = slug => {
		removeCategory(slug, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({
					...values,
					error: false,
					success: false,
					name: '',
					removed: !removed,
					reload: !reload
				});
			}
		});
	};

	const clickSubmit = e => {
		e.preventDefault();
		// console.log('ready to publishBlog');
		createCategory(formData, token).then(data => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					formData: new FormData(),
					error: '',
					success: `Categoria ${data.name} a fost creat`,
					removed: false,
					reload: !reload
				});
			}
		});
	};

	const handleChange = name => e => {
		console.log(e.target.value);
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData, error: '' });
	};

	const showSuccess = () => {
		if (success) {
			return <p className="text-success">Categorie creata</p>;
		}
	};
	const showError = () => {
		if (error) {
			return <p className="text-danger">Categoria deja exista</p>;
		}
	};
	const showRemoved = () => {
		if (removed) {
			return <p className="text-success">Categorie stearsa</p>;
		}
	};

	const mouseMoveHandler = e => {
		setValues({ ...values, error: false, success: false, removed: '' });
	};

	const newCategoryForm = () => {
		return (
			<form onSubmit={clickSubmit}>
				<div>Creare categorie</div>
				<div className="form-group">
					<label className="text-muted ">Nume</label>
					<input
						type="text"
						className="form-control col-6"
						onChange={handleChange('name')}
						value={name}
						required
					/>
				</div>
				<div className="form-group pb-2">
					<h5>Imagine Principala</h5>
					<hr />
					<label className="btn btn-outline-info">
						Incarcare imagine
						<input
							onChange={handleChange('photo')}
							type="file"
							accept="image/*"
						/>
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					Creare
				</button>
			</form>
		);
	};

	return (
		<React.Fragment>
			{showSuccess()}
			{showError()}
			{showRemoved()}
			<div onMouseMove={mouseMoveHandler}>
				<div>{newCategoryForm()}</div>

				<div className="mt-5">
					<p className="text-muted">Dublu click pe categorie pentru a sterge</p>
					{showCategories()}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Category;
