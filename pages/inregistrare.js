import { useState, useEffect } from 'react'
import { preSignup, signup, isAuth } from '../actions/auth'
import styled from 'styled-components';
import Router from 'next/router'
import Link from 'next/link'
import { Spinner } from 'react-bootstrap'

const Inregistrare = () => {

    const [values, setValues] = useState({
        email:'',
        password:'',
        success:'',
        error:'',
        loading:''
    })

    const {email, password, success, error, loading} = values

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const formSubmit = (e) => {
        e.preventDefault()

        setValues({ ...values, loading: true, error: false })
        const user = { email, password }

            signup(user)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error })
                    } else {
                        setValues({ ...values, email: '', password: '', error: '', loading: false, success: data.message, showForm: false })
                    }
                })
    }

    const showLoading = () => (loading ? <Spinner animation="grow" variant="primary" /> : '')
    const showError = () => (error ? <div className="alert alert-danger"> {error}</div> : '')
    const showSuccess = () => (success ? <div className="alert alert-info"> {success}</div> : '')


    const signupForm = () => {
        return <React.Fragment>
            <From onSubmit={formSubmit}>
                <img className="mb-4" src="logo" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Inregistrare</h1>
                <label htmlFor="inputEmail" className="sr-only">Adresa de email</label>
                <input type="email" onChange={handleChange('email')} id="inputEmail" className="form-control" placeholder="Adresa de email" required="" />
                <label htmlFor="inputPassword" className="sr-only">Parola</label>
                <input type="password" onChange={handleChange('password')} id="inputPassword" className="form-control" placeholder="Parola" required="" />
                <div className="m-2">
                {showLoading()}
                {showError()}
                {showSuccess()}
                </div>
                <button className="btn mt-3 btn-lg btn-primary btn-block" type="submit">Inregistrare</button>
                {/* <p className="mt-5 mb-3 text-muted">© 2017-2019</p> */}
            </From>
        </React.Fragment>
    }

    return(
        <div className="text-center">
            {signupForm()}
            <LinkButton>
                <Link href="/autentificare"><a className="btn mt-3 btn-sm btn-outline-primary btn-block" >Autentificare</a></Link>
                <Link href="/"><a className="btn mt-3 btn-sm btn-outline-primary btn-block" >Acasa</a></Link>
            </LinkButton>
            
        </div>
    )
}

const From = styled.form`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
`
const LinkButton = styled.div`
width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
`

export default Inregistrare