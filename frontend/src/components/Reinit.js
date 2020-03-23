import React, { Component, Fragment } from 'react'
import logo from '../pictures/favicon.png'
import Header from './Header'
import { Redirect } from "react-router-dom"
import axios from 'axios'
import * as $ from 'jquery'
import bcrypt from 'bcryptjs'
import { connect } from 'react-redux'

class Reinit extends Component {

    _isMounted = false;

    state = {
        error: false,
        pseudo: '',
        pass: '',
        npass: '',
        rnpass: '',
        redirect: false
    }

    componentDidMount() {
        this._isMounted = true
        const pseudo = this.props.isAuth ? this.props.pseudo : this.extractParamsURL().httplocalhost3000reinitialisationpseudo
        const token = this.extractParamsURL().token

        axios
        .get('http://localhost:5000/api/members/token/' + pseudo + '/' + token)
        .then(res => {
            if (this._isMounted) {
                if (res.data.data === false && !this.props.isAuth) {
                    this.setState({ error: true })
                }
                else {
                    this.setState({ pseudo })
                }
            }
        })
    }

    extractParamsURL = () => {
        var chaineGET = window.location.href;
        chaineGET = chaineGET.split('&');
        var result = {};
    
        chaineGET.forEach(function(el) {            
            var param = el.split('=');
            param[0] = param[0].replace('?', '').replace('/', '').replace('/', '').replace('/', '').replace(':', '').replace(':', '').replace('-', '');
            result[param[0]] = param[1];
        });              
        return result;
    }

    handleChange = event => {
        const id = event.target.name
        
        if (id === "pass") {
            const pass = event.target.value
            this.setState({pass})
        }
        else if (id === "npass") {
            const npass = event.target.value
            this.setState({npass})
        }
        else if (id === "rnpass") {
            const rnpass = event.target.value
            this.setState({rnpass})
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        axios
        .get('http://localhost:5000/api/members/exist/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
        .then(res => {       
            bcrypt.compare(this.state.pass, res.data.pass).then(res => {
                let errorpass = true
                let errornpass = true
                let errorrnpass = true
                if (res !== true) {
                    errorpass = true
                    $("#getErr1").fadeIn()
                }
                else {
                    errorpass = false
                    $("#getErr1").fadeOut()
                }
                if (!($("input[name=npass]").val() || "")) {
                    errornpass = true
                    $("#getErr2").fadeIn()
                }
                else {
                    errornpass = false
                    $("#getErr2").fadeOut()
                }
                if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test($("input[name=npass]").val())) === false) {
                    errornpass = true
                    $("#getErr3").fadeIn()
                }
                else {
                    errornpass = false
                    $("#getErr3").fadeOut()
                }
                if (!($("input[name=rnpass]").val() || "")) {
                    errorrnpass = true
                    $("#getErr4").fadeIn()
                }
                else {
                    errorrnpass = false
                    $("#getErr4").fadeOut()
                }
                if ($("input[name=npass]").val() !== $("input[name=rnpass]").val()) {
                    errorrnpass = true
                    $("#getErr5").fadeIn()
                }
                else {
                    errorrnpass = false
                    $("#getErr5").fadeOut()
                }
                if (this.props.isAuth) {                        
                    if (errorrnpass || errornpass || errorpass) {
                        return false
                    }
                }
                else {
                    if (errorrnpass || errornpass) {
                        return false
                    }
                }                        
                axios
                .post('http://localhost:5000/api/members/token/' + this.state.pseudo + '/' + require('crypto').randomBytes(32).toString('hex'))
                .then(() => {
                    axios
                    .post('http://localhost:5000/api/members/profile/pass/' + this.state.pseudo, {
                        password: bcrypt.hashSync(this.state.npass, bcrypt.genSaltSync(10))
                    }).then(res => {                                
                        this.setRedirect()
                    })
                })
                .catch(error => { console.log(error) })
            })
        })
    }

    setRedirect = () => {
        this.setState({ redirect: true })
    }

    handleRedirect = () => {
        if (this.state.redirect && this.props.isAuth) {
            return (
                <Redirect to="/profile"/>
            )
        }
        else if (this.state.redirect && !this.props.isAuth) {
            return (
                <Redirect to="/connexion"/>
            )
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        if (this.props.isAuth === true) {
            if (this.state.error) {
                return (
                    <Redirect to="/accueil"/>
                )
            }
            else {
                return (
                    <Fragment>
                        {this.handleRedirect()}
                        <Header />
                        <div className="container mt-5">
                            <div className="row">
                                <div className="mx-auto mt-5 text-center">
                                    <img src={logo} className="img-fluid" width="10%" alt="logo" />
                                    <h3>Les rencontres avec Matcha</h3>
                                    <form className="mx-auto bg-dark py-5 rounded shadow mt-2" onSubmit={this.handleSubmit}>
                                        <h4 className="text-center p-1 rounded text-white">CHANGER DE MOT DE PASSE</h4>
                                        <label htmlFor="pass" className="text-light">Mot de passe actuel</label>
                                        <input type="password" name="pass" className="form-control w-75 mx-auto" onChange={this.handleChange}/>
                                        <div className="invalid-feedback" id="getErr1">Mauvais mot de passe</div>
                                        <label htmlFor="npass" className="text-light mt-3">Nouveau mot de passe</label>
                                        <input type="password" name="npass" className="form-control w-75 mx-auto" onChange={this.handleChange}/>
                                        <div className="invalid-feedback" id="getErr2">Le mot de passe est requis</div>
                                        <div className="invalid-feedback" id="getErr3">6 caracteres, 1 majuscule, 1 chiffre</div>
                                        <label htmlFor="rnpass" className="text-light mt-3">Répeter nouveau mot de passe</label>
                                        <input type="password" name="rnpass" className="form-control w-75 mx-auto" onChange={this.handleChange}/>
                                        <div className="invalid-feedback" id="getErr4">Mot de passe de confirmation requis</div>
                                        <div className="invalid-feedback" id="getErr5">Les mots de passe doivent correspondre</div><br/>
                                        <button type="submit" className="btn btn-light">CHANGER</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        }
        else {   
            if (this.state.error) {
                return (
                    <Redirect to="/"/>
                )
            }
            else {
                return (
                    <Fragment>
                        {this.handleRedirect()}
                        <Header />
                        <div className="container mt-5">
                            <div className="row">
                                <div className="mx-auto mt-5 text-center">
                                    <img src={logo} className="img-fluid" width="10%" alt="logo" />
                                    <h3>Les rencontres avec Matcha</h3>
                                    <form className="mx-auto bg-dark py-5 rounded shadow mt-2" onSubmit={this.handleSubmit}>
                                        <h4 className="text-center p-1 rounded text-white">CHANGER DE MOT DE PASSE</h4>
                                        <label htmlFor="npass" className="text-light">Nouveau mot de passe</label>
                                        <input type="password" name="npass" className="form-control w-75 mx-auto" onChange={this.handleChange}/>
                                        <div className="invalid-feedback" id="getErr2">Le mot de passe est requis</div>
                                        <div className="invalid-feedback" id="getErr3">6 caracteres, 1 majuscule, 1 chiffre</div>
                                        <label htmlFor="rnpass" className="text-light mt-3">Répeter nouveau mot de passe</label>
                                        <input type="password" name="rnpass" className="form-control w-75 mx-auto" onChange={this.handleChange}/>
                                        <div className="invalid-feedback" id="getErr4">Mot de passe de confirmation requis</div>
                                        <div className="invalid-feedback" id="getErr5">Les mots de passe doivent correspondre</div><br/>
                                        <button type="submit" className="btn btn-light">CHANGER</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }         
            
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        pseudo: state.pseudo,
        token: state.token
    }
}

export default connect(mapStateToProps, null)(Reinit)