import Link from 'next/link';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';

const PasswordUpdate = () => {
	const [values, setValues] = useState({
		password: '',
		error: false,
		success: false,
		loading: false,
		userData: ''
	});
	const token = getCookie('token');
	const { password, error, success, loading, userData } = values;

	const init = () => {
		getProfile(token).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values
				});
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	const handleChange = name => e => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		update(token, { password }).then(data => {
			if (data.error) {
				// console.log(data.error);
				alert(data.error);
			} else {
				updateUser(data, () => {
					setValues({
						...values,
						password: '',
						success: true,
						loading: false
					});
				});
			}
		});
	};

	const profileUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="text-muted">Parola</label>
				<input
					onChange={handleChange('password')}
					type="password"
					value={password}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<button type="submit" className="btn btn-primary">
					Salvare
				</button>
			</div>
		</form>
	);

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? '' : 'none' }}
		>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div
			className="alert alert-success"
			style={{ display: success ? '' : 'none' }}
		>
			Parola actualizata
		</div>
	);

	const showLoading = () => (
		<div
			className="alert alert-info"
			style={{ display: loading ? '' : 'none' }}
		>
			Loading...
		</div>
	);

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-8 mb-5">
						{showSuccess()}
						{showError()}
						{showLoading()}
						{profileUpdateForm()}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default PasswordUpdate;
