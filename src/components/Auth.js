import React, { Component, Fragment } from 'react'
import logo from '../pictures/favicon.ico'
import Header from './Header'
import { Link } from 'react-router-dom'

class Auth extends Component {

    state = {
        email: "",
        pass: ""
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
        
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(mail) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(pass)) {
            event.target.submit()
        }
    }

    render () {
        return (
            <Fragment>
                <Header/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="mx-auto mt-5 text-center">
                            <img src={logo} className="img-fluid" width="20%" alt="logo" />
                            <h3>Les rencontres avec Matcha</h3>
                            <form className="mx-auto bg-dark py-5 rounded shadow mt-2" onSubmit={this.handleSubmit}>
                                <h4 className="text-center p-1 rounded text-white">SE CONNECTER</h4>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-light">Adresse email</label>
                                    <input type="email"  className="form-control w-75 mx-auto text-center" id="email" placeholder="name@example.com" onChange={this.handleText}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass" className="text-light">Mot de passe</label>
                                    <input type="password" id="pass" className="form-control w-75 mx-auto text-center" placeholder="Mot de passe" onChange={this.handleText}/>
                                </div><br />
                                <Link to={"/accueil"}>
                                    <button type="submit" className="btn btn-light">Connexion</button>
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