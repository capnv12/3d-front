import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { createTag, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
	const [values, setValues] = useState({
		name: '',
		error: '',
		success: false,
		tags: [],
		removed: false,
		reload: false
	});

	const { name, error, success, tags, removed, reload } = values;

	const token = getCookie('token');

	useEffect(() => {
		loadTags();
	}, [reload]);

	const loadTags = () => {
		getTags().then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, tags: data });
			}
		});
	};

	const showTags = () => {
		return tags.map((t, i) => {
			return (
				<button
					onDoubleClick={() => deleteConfirm(t.slug)}
					key={i}
					className="btn btn-outline-primary mr-1 ml-1 mt-3"
				>
					{t.name}
				</button>
			);
		});
	};

	const deleteConfirm = slug => {
		let answer = window.confirm('Sigur vrei sa stergi eticheta?');
		if (answer) {
			deleteTag(slug);
		}
	};

	const deleteTag = slug => {
		removeTag(slug, token).then(data => {
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
		createTag({ name }, token).then(data => {
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
			return <p className="text-success">Eticheta creata</p>;
		}
	};
	const showError = () => {
		if (error) {
			return <p className="text-danger">Eticheta deja exista</p>;
		}
	};
	const showRemoved = () => {
		if (removed) {
			return <p className="text-success">Eticheta stearsa</p>;
		}
	};

	const mouseMoveHandler = e => {
		setValues({ ...values, error: false, success: false, removed: '' });
	};

	const newTagForm = () => {
		return (
			<form onSubmit={clickSubmit}>
				<div>Creare eticheta</div>
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
				<div>{newTagForm()}</div>

				<div className="mt-5">
					<p className="text-muted">Dublu click pe categorie pentru a sterge</p>
					{showTags()}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Tag;
