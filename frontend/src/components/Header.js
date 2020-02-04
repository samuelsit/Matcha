import React, { Component } from 'react'
import logo from '../pictures/favicon.png'
import { Link } from 'react-router-dom'
import NotifBar from './NotifBar'
import { connect } from 'react-redux'
import axios from 'axios'

class Header extends Component {

    handleClick = () => {
        axios
        .patch('http://localhost:5000/api/members/status/false/' + this.props.email)
        .then(() => {
            this.props.setUserIsAuth(false);
        })
        .catch(error => { console.log(error) })
    }

    render () {
        if (this.props.isAuth === false) {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
                        <Link to="/">
                            <div className="navbar-brand">
                                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo"/>
                                Matcha
                            </div>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                        <Link to={"/connexion"}><div className="text-light btn btn-circle btn-secondary mr-2">Connexion</div></Link>
                    </nav>
                </header>
            )
        }
        else {
            return (
                <header>
                    <nav className="navbar navbar-expand navbar-light bg-light shadow fixed-top" id="navbar">
                        <Link to="/accueil">
                            <div className="navbar-brand">
                                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo"/>
                                Matcha
                            </div>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                        <NotifBar/>
                        <Link to={"/profile"}><div className="text-light btn btn-circle btn-secondary mr-2"><i className="fas fa-user"></i></div></Link>
                        <Link to={"/"}><div className="text-light btn btn-circle btn-danger mr-2" onClick={this.handleClick}>Déconnexion</div></Link>
                    </nav>
                </header>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserIsAuth: (isAuth) => {
            dispatch({ type: 'SET_USER_AUTH', isAuth: isAuth })
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        email: state.email
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)