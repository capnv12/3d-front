import { useState } from 'react';
import Link from 'next/link';
// import { emailContactForm } from '../../actions/form'
import { handleResponse } from '../../actions/auth';
import styled from 'styled-components';
import Media from 'react-media';

const ContactForm = ({ authorEmail }) => {
	const [values, setValues] = useState({
		message: '',
		name: '',
		email: '',
		sent: false,
		buttonText: 'Send Message',
		success: false,
		error: false
	});

	const { message, name, email, sent, buttonText, success, error } = values;

	const clickSubmit = e => {
		e.preventDefault();
		setValues({ ...values, buttonText: 'Sending' });
		// emailContactForm({ authorEmail, name, email, message }).then(data => {
		//     if (data.error) {
		//         setValues({ ...values, error: data.error })
		//     } else {
		//         setValues({ ...values, sent: true, name: '', email: '', message: '', buttonText: 'Sent', success: data.success })
		//     }
		// })
	};

	const handleChange = name => e => {
		// console.log(e.target.value);
		setValues({
			...values,
			[name]: e.target.value,
			error: false,
			success: false,
			buttonText: 'Send Message'
		});
	};

	const showSucces = () => {
		if (success) {
			return (
				<div className="alert alert-info">
					Multumim ca ne-ai contactat! Unul dintre colegii nostri iti va
					raspunde in cel mai scurt timp.
				</div>
			);
		}
	};
	const showError = () => {
		if (error) {
			return (
				<div className="alert alert-danger">
					Mesajul nu a putut fi trimis. Te rugam incearca din nou
				</div>
			);
		}
	};
	const contactForm = () => {
		return (
			<form onSubmit={clickSubmit}>
				<div className="form-group">
					<Label className="text-muted">Numele tau</Label>
					<Input
						type="text"
						onChange={handleChange('name')}
						className="form-control "
						value={name}
						required
						placeholder="Nume"
					/>
				</div>
				<div className="form-group">
					<Label className="text-muted">Adresa ta de email</Label>
					<Input
						type="email"
						onChange={handleChange('email')}
						className="form-control"
						value={email}
						required
						placeholder="Email"
					/>
				</div>
				<div className="form-group">
					<Label className="text-muted">Mesajul tau</Label>
					<Textarea
						rows="10"
						onChange={handleChange('message')}
						type="text"
						className="form-control"
						value={message}
						required
						placeholder="Mesaj"
					/>
				</div>
				<div>
					<button className="btn btn-dark w-100">Trimite</button>
				</div>
			</form>
		);
	};
	return (
		<React.Fragment>
			<div className="text-center">
				<h3>Contact</h3>
			</div>
			<Wrapper className="row p-3">
				<div className="col-md-6">
					<div className="p-2">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s,{' '}
					</div>
					<div className="mt-4 p-2">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s,{' '}
					</div>
				</div>
				<div className="col-md-6">{contactForm()}</div>
			</Wrapper>
			{showError()}
			{showSucces()}
		</React.Fragment>
	);
};
const Wrapper = styled.div``;

const Label = styled.label`
	padding-left: 0;
	padding-right: 20px;
	display: inline-block;
	margin-bottom: 9px;
	text-align: left;
	direction: ltr;
`;
const Input = styled.input`
	border-radius: 0;
	font: normal normal normal 14px/1.4em din-next-w01-light, din-next-w02-light,
		din-next-w10-light, sans-serif;
	-webkit-appearance: none;
	-moz-appearance: none;
	border-width: 1px;
	background-color: rgba(255, 255, 255, 1);
	box-sizing: border-box !important;
	color: #2f2e2e;
	border-style: solid;
	border-color: rgba(47, 46, 46, 1);
	padding: 3px;
	margin: 0;
	max-width: 100%;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	text-overflow: ellipsis;
`;
const Textarea = styled.textarea`
	border-radius: 0;
	font: normal normal normal 14px/1.4em din-next-w01-light, din-next-w02-light,
		din-next-w10-light, sans-serif;
	-webkit-appearance: none;
	-moz-appearance: none;
	border-width: 1px;
	background-color: rgba(255, 255, 255, 1);
	box-sizing: border-box !important;
	color: #2f2e2e;
	border-style: solid;
	border-color: rgba(47, 46, 46, 1);
	padding: 3px;
	margin: 0;
	max-width: 100%;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	text-overflow: ellipsis;
`;
export default ContactForm;
