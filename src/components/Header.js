import React, { Component } from 'react'
import logo from '../pictures/favicon.ico'
import { Link } from 'react-router-dom'

class Header extends Component {
    render () {
        return (
            <header>
                <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
                    <Link to={"/"}>
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
                    <Link to={"/connexion"}><div className="nav-link text-light btn btn-sm btn-dark">CONNEXION</div></Link>
                </nav>
            </header>
        )
    }
}

export default Header