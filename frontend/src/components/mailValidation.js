import React, { Component, Fragment } from 'react'
import Header from './Header'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import bcrypt from 'bcryptjs'

class mailValidation extends Component {

    state = {
        message: "Chargement en cours... Veuillez patienter.",
        redirect: false
    }

    // setRedirect = () => {
        
    // }
    
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
        const email = this.extractParamsURL().httplocalhost3000mailvalidationmail
        const token = this.extractParamsURL().token

        axios
        .get('http://localhost:5000/api/members/token/' + email + '/' + token)
        .then(res => {
            console.log(res);
            if (res.data.data === false) {
                this.setState({ message: "Erreur lors de la verification du token." })
            }
            else {
                axios
                .patch('http://localhost:5000/api/members/token/' + email + '/' + bcrypt.genSaltSync(32).replace('.', '').replace('/', ''))
                .then(() => {
                    axios
                    .patch('http://localhost:5000/api/members/isValid/' + email + '/true')
                    .then(() => {
                        this.setState({ message: "Token validé. Vous serez redirigé dans quelques secondes" })
                        setTimeout(() => {
                            this.setState({
                                redirect: true
                            })},
                            3500
                        );
                    })
                })
                .catch(error => { console.log(error) })
            }
        })
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
                                <p>{this.state.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default mailValidation