import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import {
	createCategory,
	getCategories,
	removeCategory
} from '../../actions/blogCategory';

const BlogCategory = () => {
	const [values, setValues] = useState({
		name: '',
		error: '',
		success: false,
		categories: [],
		removed: false,
		reload: false
	});

	const { name, error, success, categories, removed, reload } = values;

	const token = getCookie('token');

	useEffect(() => {
		loadCategories();
	}, [reload]);

	const loadCategories = () => {
		getCategories().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, categories: data });
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
		// console.log('createCategory category')
		createCategory({ name }, token).then(data => {
			if (data.error) {
				setValues({ ...setValues, error: data.error, success: false });
			} else {
				setValues({
					...values,
					error: false,
					success: true,
					name: '',
					removed: false,
					reload: !reload
				});
			}
		});
	};

	const handleChange = e => {
		setValues({
			...values,
			name: e.target.value,
			error: false,
			success: false,
			removed: ''
		});
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
			return <p className="text-success">Categorie stersa</p>;
		}
	};

	const mouseMoveHandler = e => {
		setValues({ ...values, error: false, success: false, removed: '' });
	};

	const newCategoryForm = () => {
		return (
			<form onSubmit={clickSubmit}>
				<div>Creare categorie blog</div>
				<div className="form-group">
					<label className="text-muted">Nume</label>
					<input
						type="text"
						className="form-control col-6"
						onChange={handleChange}
						value={name}
						required
					/>
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

export default BlogCategory;
