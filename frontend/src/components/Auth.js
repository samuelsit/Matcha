import React, { Component, Fragment } from 'react'
import logo from '../pictures/favicon.png'
import Header from './Header'
import { Redirect } from "react-router-dom"
import axios from 'axios'
import * as $ from 'jquery'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'

class Auth extends Component {

    _isMounted = false;

    state = {
        email: "",
        pass: "",
        badPass: false,
        redirect: false
    }

    componentDidMount() {
        this._isMounted = true
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    
    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={"/accueil"} />
            )
        }
    }

    handleText = event => {
        const id = event.target.id
        
        if (id === "email") {
            const email = event.target.value
            this.setState({email})
        }
        else if (id === "pass") {
            const pass = event.target.value
            this.setState({pass})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const mail = document.getElementById("email").value
        const pass = document.getElementById("pass").value
        var errorMail = true
        var errorPass = true
        
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(mail))) {
            errorMail = true
            $("#getErrMail").fadeIn()
        }
        else {
            errorMail = false
            $("#getErrMail").fadeOut()
        }
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(pass))) {
            errorPass = true
            $("#getErrPass").fadeIn()
        }
        else {
            errorPass = false
            $("#getErrPass").fadeOut()
        }
        if (!errorPass && !errorMail) {
            axios
            .get('http://localhost:5000/api/members/exist/' + this.state.email)
            .then(res => {
                if (res.data.status === 'email already exist') {
                    bcrypt.compare(this.state.pass, res.data.pass).then(res => {
                        if (res === true) {
                            axios
                            .get('http://localhost:5000/api/members/isValid/' + this.state.email)
                            .then(res => {
                                if (res.data.data === true) {
                                    axios
                                    .patch('http://localhost:5000/api/members/status/true/' + this.state.email)
                                    .then(() => {
                                        if (this._isMounted) {
                                            this.props.setUserEmail(this.state.email)
                                            this.setRedirect()
                                        }
                                    })
                                    .catch(error => { console.log(error) })
                                }
                                else {
                                    $("#badPass").fadeOut()
                                    $("#nonValid").fadeIn()
                                }
                            })
                        }
                        else {
                            $("#badPass").fadeIn()
                        }
                    })
                }
                else {
                    $("#badPass").fadeIn()
                }
            })
            .catch(error => { console.log(error) })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        return (
            <Fragment>
                {this.handleRedirect()}
                <Header/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="mx-auto mt-5 text-center">
                            <img src={logo} className="img-fluid" width="10%" alt="logo" />
                            <h3>Les rencontres avec Matcha</h3>
                            <form className="mx-auto bg-dark py-5 rounded shadow mt-2" onSubmit={this.handleSubmit}>
                                <h4 className="text-center p-1 rounded text-white">SE CONNECTER</h4>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-light">Adresse email</label>
                                    <input type="email"  className="form-control w-75 mx-auto text-center" id="email" placeholder="name@example.com" onChange={this.handleText}/>
                                    <div className="invalid-feedback" id="getErrMail">Veuillez indiquer un email valide</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass" className="text-light">Mot de passe</label>
                                    <input type="password" id="pass" className="form-control w-75 mx-auto text-center" placeholder="Mot de passe" onChange={this.handleText}/>
                                    <div className="invalid-feedback" id="getErrPass">Veuillez indiquer un mot de passe valide</div>
                                    <div className="invalid-feedback" id="badPass">Email ou mot de passe incorrect</div>
                                    <div className="invalid-feedback" id="nonValid">Compte non validé. Consultez vos emails.</div>
                                </div><br />
                                <button type="submit" className="btn btn-light">Connexion</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserEmail: (email) => {
            dispatch({ type: 'SET_USER_EMAIL', email: email })
        }
    }
}

export default connect(null, mapDispatchToProps)(Auth)