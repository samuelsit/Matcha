import React, { Component, Fragment } from 'react'
import Header from './Header'
import axios from 'axios'
import { Redirect } from "react-router-dom"

class MailValidation extends Component {

    _isMounted = false

    state = {
        error: true,
        timeToRedirect: 5,
        redirect: false
    }
    
    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={"/connexion"} />
            )
        }
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

    componentDidMount = () => {
        this._isMounted = true
        const pseudo = this.extractParamsURL().httplocalhost3000mailvalidationpseudo
        const token = this.extractParamsURL().token

        axios
        .get('http://localhost:5000/api/members/token/' + pseudo + '/' + token)
        .then(res => {
            if (this._isMounted) {
                if (res.data.data === false) {
                    this.setState({ error: true })
                }
                else {
                    axios
                    .post('http://localhost:5000/api/members/token/' + pseudo + '/' + require('crypto').randomBytes(32).toString('hex'))
                    .then(() => {
                        axios
                        .post('http://localhost:5000/api/members/isValid/' + pseudo + '/true')
                        .then(() => {
                            if (this._isMounted) {
                                this.setState({ error: false })
                                this.interval = setInterval(() => {
                                    if (this.state.timeToRedirect === 1) {
                                        this.setState({
                                            redirect: true
                                        })
                                    }
                                    if (this._isMounted) {
                                        this.setState({
                                            timeToRedirect: this.state.timeToRedirect - 1
                                        })
                                    }
                                }, 1000)
                            }
                        })
                    })
                    .catch(error => { console.log(error) })
                }
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.interval);
    }
    
    render () {
        return (
            <Fragment>
                {this.handleRedirect()}
                <Header/>
                <br/>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col text-center">
                            <div className="h2 font-weight-bold text-light bg-dark p-5 rounded shadow-lg">
                                <p>
                                    {
                                        this.state.error === true ? "Erreur lors de la verification." : `Vous allez être redirigé dans ${this.state.timeToRedirect} seconde(s).`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MailValidation
