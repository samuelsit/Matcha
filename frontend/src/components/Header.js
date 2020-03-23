import React, { Component } from 'react'
import logo from '../pictures/favicon.png'
import { Link, Redirect } from 'react-router-dom'
import NotificationButton from './NotificationButton'
import { connect } from 'react-redux'
import axios from 'axios'
import * as $ from 'jquery'

class Header extends Component {

    componentDidMount() {   
        if (this.props.pseudo) {
            axios.get('http://localhost:5000/api/members/isCountry/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
                if (!res.data.data) {
                    navigator.geolocation.getCurrentPosition(position => {
                        console.log("Pseudo: " + this.props.pseudo);
                        
                        axios
                        .post('http://localhost:5000/api/members/profile/country/' + this.props.pseudo, {
                            country: {
                                name: 'Paris, France',
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            }
                        }, {headers: { "x-access-token": this.props.token }})
                        this.props.setUserPos(position.coords.latitude, position.coords.longitude)
                    })
                }
            })
            .then(() => {
                if (this.props.pseudo) {
                    axios.get('http://localhost:5000/api/members/isCountry/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
                        if (!res.data.data) {
                            $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
                                var ip = String(data).match(/ip=([0-9.]+)/)
                                $.get('https://ipapi.co/' + ip[1] + '/json', function(data) {
                                    console.log(this.props.pseudo);
                                    axios
                                    .post('http://localhost:5000/api/members/profile/country/' + this.props.pseudo, {
                                        country: {
                                            name: data.city + ', ' + data.region,
                                            lat: data.latitude,
                                            lng: data.longitude
                                        }
                                    }, {headers: { "x-access-token": this.props.token }})
                                    this.props.setUserPos(data.latitude, data.longitude)
                                }.bind(this))
                            }.bind(this))
                        }      
                    }).catch(error => {
                        console.log(error)
                    })
                }
            })
        }
    }

    handleClick = () => {
        axios
        .post('http://localhost:5000/api/members/status/false/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }})
        .then(() => {
            axios.post('http://localhost:5000/api/disconnect/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }})
            .catch(error => { console.log(error) })
            this.props.setUserIsAuth(false)
            this.props.setUserPos(0, 0)
            this.props.setUserPseudo('')
            this.props.setUserToken('')
        })
        .then(<Redirect to="/accueil" />)
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
                        <NotificationButton/>
                        <Link to={"/profile"}><div className="text-light btn btn-circle btn-secondary mr-2"><i className="fas fa-user"></i></div></Link>
                        <div className="text-light btn btn-circle btn-danger mr-2" onClick={this.handleClick}>Déconnexion</div>
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
        },
        setUserPos: (lat, lng) => {
            dispatch({ type: 'SET_USER_POS', lat: lat, lng: lng })
        },
        setUserPseudo: (pseudo) => {
            dispatch({ type: 'SET_USER_PSEUDO', pseudo: pseudo })
        },
        setUserToken: (token) => {
            dispatch({ type: 'SET_USER_TOKEN', token: token })
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)