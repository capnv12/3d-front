import Link from 'next/link';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';
import { Spinner } from 'react-bootstrap';

const ProfileUpdate = ({ router }) => {
	const [values, setValues] = useState({
		username: '',
		name: '',
		email: '',
		role: '',
		error: false,
		success: false,
		loading: false,
		userData: ''
	});
	const token = getCookie('token');
	const {
		username,
		name,
		email,
		role,
		error,
		success,
		loading,
		photo,
		userData
	} = values;

	const init = () => {
		getProfile(token).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					username: data.username,
					name: data.name,
					role: data.role,
					email: data.email
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
		update(token, values).then(data => {
			if (data.error) {
				console.log(data.error);
				// alert(data.error);
			} else {
				updateUser(data, () => {
					setValues({
						...values,
						username: data.username,
						name: data.name,
						telefon: data.telefon,
						identificator: data.identificator,
						subscribe: data.subscribe,
						role: data.role,
						email: data.email,
						success: true,
						loading: false
					});
				});
			}
		});
	};

	const profileUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<fieldset disabled>
				<div className="form-group col-md-12">
					<label>E-mail</label>
					<input
						type="email"
						className="form-control"
						name="account-email"
						id="acount-email"
						defaultValue={email}
					/>
				</div>
			</fieldset>
			<div className="form-row">
				<div className="form-group col-md-6">
					<label>Username</label>
					<input
						type="text"
						onChange={handleChange('username')}
						className="form-control"
						name="account-username"
						id="acount-username"
						placeholder={username}
						value={username}
					/>
				</div>
				<div className="form-group col-md-6">
					<label>Nume</label>
					<input
						type="text"
						onChange={handleChange('name')}
						className="form-control"
						name="account-name"
						id="acount-name"
						placeholder={name}
						value={name}
					/>
				</div>
			</div>
			{/* <div className="form-group">
                <div className="custom-control custom-checkbox mb-4">
                    <input type="checkbox" className="custom-control-input" name="account_newsletter" id="account_newsletter" />
                    <label className="custom-control-label" onChange={handleToggle} htmlFor="account_newsletter" >Vreau sa primesc notificari despre cel mai noi oferte, reduceri si noutati.</label>
                </div>
            </div> */}
			<div className="form-group">
				<button type="submit" className="btn btn-primary">
					Salvare
				</button>
			</div>
			{showMeassage()}
			{showError()}
			{showLoading()}
		</form>
	);
	const showLoading = () =>
		loading ? <Spinner animation="grow" variant="primary" /> : '';
	const showError = () =>
		error ? <div className="alert alert-danger"> {error}</div> : '';
	const showMeassage = () =>
		success ? <div className="alert alert-info"> Profil modificat</div> : '';

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-8 mb-5">{profileUpdateForm()}</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default withRouter(ProfileUpdate);
