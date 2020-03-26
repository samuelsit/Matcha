import React, { Component, Fragment } from 'react'
import logo from '../pictures/favicon.png'
import Header from './Header'
import { Redirect } from "react-router-dom"
import axios from 'axios'
import * as $ from 'jquery'
import { connect } from 'react-redux'

class Reinit extends Component {

    _isMounted = false;

    state = {
        sending: false,
        email: ''
    }

    componentDidMount() {
        this._isMounted = true
    }

    handleChange = event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleSubmit = event => {
        event.preventDefault()
        const email = this.state.email
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) {
            $("#getErrMail").fadeIn()
        }
        else {
            $("#getErrMail").fadeOut()
            axios
            .get('http://localhost:5000/api/members/exist/email/' + this.state.email)
            .then(res => {
                if (res.data.status === 'pseudo not exist') {
                    $("#getErrMailNot").fadeIn()
                }
                else {
                    $("#getErrMailNot").fadeOut()
                    axios
                    .get('http://localhost:5000/api/members/forget/' + this.state.email)
                    .then(res => {
                        this.setState({ sending: true })
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        if (this.props.isAuth) {
            return (
                <Redirect to={"/accueil"} />
            )
        }
        else if (!this.state.sending) {
            return (
                <Fragment>
                    <Header />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="mx-auto mt-5 text-center">
                                <img src={logo} className="img-fluid" width="10%" alt="logo" />
                                <h3>Les rencontres avec Matcha</h3>
                                <form className="mx-auto bg-dark py-5 rounded shadow mt-2" onSubmit={this.handleSubmit}>
                                    <h4 className="text-center p-1 rounded text-white">VOTRE ADRESSE EMAIL</h4>
                                    <label htmlFor="mail" className="text-light">Votre email</label>
                                    <input type="email" id="mail" placeholder="name@exemple.com" className="form-control w-75 mx-auto" onChange={this.handleChange}/>
                                    <div className="invalid-feedback" id="getErrMail">Veuillez indiquer un email valide</div>
                                    <div className="invalid-feedback" id="getErrMailNot">Cet email ne possède pas de compte actif</div><br/>
                                    <button type="submit" className="btn btn-light">Recevoir un email</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <Header />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="mx-auto mt-5 text-center">
                                <img src={logo} className="img-fluid" width="10%" alt="logo" />
                                <h3>Les rencontres avec Matcha</h3>
                                <div className="mx-auto bg-dark py-5 rounded shadow mt-2">
                                    <h3 className="text-center rounded text-white">Un email vous a été envoyé à l'adresse suivante:</h3>
                                    <code className="text-center rounded h3">{this.state.email}</code>
                                    <h3 className="text-center rounded text-white mt-2">Merci de vous y rendre afin de changer votre mot de passe</h3>
                                    <h3 className="text-center rounded text-white">À bientôt ! <span role="img" aria-label="emoji">🥰</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        token: state.token
    }
}

export default connect(mapStateToProps, null)(Reinit)