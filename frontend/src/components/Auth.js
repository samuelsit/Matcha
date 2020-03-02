import React, { Component, Fragment } from 'react'
import logo from '../pictures/favicon.png'
import Header from './Header'
import { Redirect, Link } from "react-router-dom"
import axios from 'axios'
import * as $ from 'jquery'
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
        if (this._isMounted) {
            this.setState({
                redirect: true
            })
        }
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
        
        if (id === "pseudo" && this._isMounted) {
            const pseudo = event.target.value
            this.setState({pseudo})
        }
        else if (id === "pass" && this._isMounted) {
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
            .post('http://localhost:5000/api/members/auth', {
                pseudo: this.state.pseudo,
                pass: this.state.pass
            })
            .then(res => {
                if (res.data.exist === false) {
                    $("#badPass").fadeIn()
                }
                if (res.data.pass === false) {
                    $("#badPass").fadeIn()
                }
                if (res.data.isValid === false) {
                    $("#badPass").fadeOut()
                    $("#nonValid").fadeIn()
                }
                else {
                    this.props.setUserPseudo(this.state.pseudo)
                    this.props.setUserIsAuth(true)
                    if (res.data.isCountry === false) {
                        this.props.setUserPos(0, 0)
                    }
                    else {
                        if (res.data.lng && res.data.lat) {
                            this.props.setUserPos(res.data.lat, res.data.lng)
                            this.setRedirect()
                        }
                        else {
                            this.props.setUserPos(0, 0)
                        }
                    }
                }
            })
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
        },
        setUserPos: (lat, lng) => {
            dispatch({ type: 'SET_USER_POS', lat: lat, lng: lng })
        }   
    }
}

export default connect(null, mapDispatchToProps)(Auth)