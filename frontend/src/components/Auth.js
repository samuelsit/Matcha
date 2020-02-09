import React, { Component, Fragment } from 'react'
import logo from '../pictures/favicon.png'
import Header from './Header'
import { Redirect, Link } from "react-router-dom"
import axios from 'axios'
import * as $ from 'jquery'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'

class Auth extends Component {

    _isMounted = false;

    state = {
        pseudo: "",
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
        
        if (id === "pseudo") {
            const pseudo = event.target.value
            this.setState({pseudo})
        }
        else if (id === "pass") {
            const pass = event.target.value
            this.setState({pass})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const pseudo = document.getElementById("pseudo").value
        const pass = document.getElementById("pass").value
        var errorPseudo = true
        var errorPass = true
        
        if (pseudo.length === 0) {
            errorPseudo = true
            $("#getErrPseudo").fadeIn()
        }
        else {
            errorPseudo = false
            $("#getErrPseudo").fadeOut()
        }
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(pass))) {
            errorPass = true
            $("#getErrPass").fadeIn()
        }
        else {
            errorPass = false
            $("#getErrPass").fadeOut()
        }
        if (!errorPass && !errorPseudo) {
            axios
            .get('http://localhost:5000/api/members/exist/' + this.state.pseudo)
            .then(res => {
                if (res.data.status === 'pseudo already exist') {
                    bcrypt.compare(this.state.pass, res.data.pass).then(res => {
                        if (res === true) {
                            axios
                            .get('http://localhost:5000/api/members/isValid/' + this.state.pseudo)
                            .then(res => {
                                if (res.data.data === true) {
                                    axios
                                    .patch('http://localhost:5000/api/members/status/true/' + this.state.pseudo)
                                    .then(() => {
                                        if (this._isMounted) {
                                            this.props.setUserPseudo(this.state.pseudo)
                                            this.props.setUserIsAuth(true)
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
        if (this.props.isAuth === true) {
            return (
                <Redirect to={"/accueil"} />
            )
        }
        else {
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
                                        <label htmlFor="pseudo" className="text-light">Pseudo</label>
                                        <input type="pseudo"  className="form-control w-75 mx-auto text-center" id="pseudo" placeholder="Pseudo" onChange={this.handleText}/>
                                        <div className="invalid-feedback" id="getErrPseudo">Veuillez indiquer un pseudo valide</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pass" className="text-light">Mot de passe</label>
                                        <input type="password" id="pass" className="form-control w-75 mx-auto text-center" placeholder="Mot de passe" onChange={this.handleText}/>
                                        <div className="invalid-feedback" id="getErrPass">Veuillez indiquer un mot de passe valide</div>
                                        <div className="invalid-feedback" id="badPass">Pseudo ou mot de passe incorrect</div>
                                        <div className="invalid-feedback" id="nonValid">Compte non validé. Consultez votre email.</div>
                                    </div><br />
                                    <button type="submit" className="btn btn-light">Connexion</button><br/>
                                    <Link to="/oubli">
                                        <div className="text-light mt-3">Mot de passe oublié ?</div>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserIsAuth: (isAuth) => {
            dispatch({ type: 'SET_USER_AUTH', isAuth: isAuth })
        },
        setUserPseudo: (pseudo) => {
            dispatch({ type: 'SET_USER_PSEUDO', pseudo: pseudo })
        }
    }
}

export default connect(null, mapDispatchToProps)(Auth)