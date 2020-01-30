import React, { Component } from 'react'
import logo from '../pictures/favicon.png'
import { Link } from 'react-router-dom'
import NotifBar from './NotifBar'

class Header extends Component {
    render () {
        var home = "/"

        if (this.props.loggued === "true") {
            home = "/accueil"
        }
        else {
            home = "/"
        }

        return (
            <header>
                <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
                    <Link to={home}>
                        <div className="navbar-brand">
                            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo"/>
                            Matcha
                        </div>
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item" ></li>
                        </ul>
                    </div>
                    {this.props.loggued === "true" ? <NotifBar/> : null}
                    <Link to={"/profile"}>{this.props.loggued === "true" ? <div className="text-light btn btn-circle btn-secondary mr-2"><i className="fas fa-user"></i></div> : null}</Link>
                    <Link to={"/connexion"}>{this.props.loggued === "true" ? null : <div className="text-light btn btn-circle btn-secondary mr-2">Connexion</div>}</Link>
                    <Link to={"/"}>{this.props.loggued === "true" ? <div className="text-light btn btn-circle btn-danger mr-2">Déconnexion</div> : null}</Link>
                </nav>
            </header>
        )
    }
}

export default Header