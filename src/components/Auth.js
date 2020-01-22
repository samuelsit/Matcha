import React, { Component, Fragment } from 'react'
import logo from '../pictures/favicon.ico'
import Header from './Header'
import { Link } from 'react-router-dom'

class Auth extends Component {

    render () {
        return (
            <Fragment>
                <Header />
                <div className="container mt-5">
                    <div className="row">
                        <div className="mx-auto mt-5 text-center">
                            <img src={logo} className="img-fluid" width="20%" alt="logo" />
                            <h3>Les rencontres avec Matcha</h3>
                            <form className="mx-auto bg-dark py-5 rounded shadow mt-2" onSubmit={this.handleSubmit}>
                                <h4 className="text-center p-1 rounded text-white">SE CONNECTER</h4>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-light">Adresse email</label>
                                    <input type="email"  className="form-control w-75 mx-auto text-center" id="email" placeholder="name@example.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwd" className="text-light">Mot de passe</label>
                                    <input type="password" id="passwd" className="form-control w-75 mx-auto text-center" placeholder="Mot de passe" />
                                </div><br />
                                <Link to={"/accueil"}>
                                    <button className="btn btn-light">Connexion</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Auth