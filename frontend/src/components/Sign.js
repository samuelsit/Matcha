import React, { Component, Fragment } from 'react'
import '../css/Sign.css'
import Header from './Header'
import * as $ from 'jquery'
import logo from '../pictures/favicon.png'
import Birthday from './Birthday'
import Place from './Place'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

class Sign extends Component {

    state = {
        attirance: {
            male: false,
            female: false
        },
        myGender: "Non renseigné",
        birthday: {
            day: 0,
            month: 0,
            year: 0
        },
        country: {
            name: '',
            lng: 0,
            lat: 0
        },
        lastname: "",
        firstname: "",
        email: "",
        pass: "",
        interet: {
            value: "#",
            length: 0,
            data: ""
        },
        pseudo: ""
    }

    validInteret = event => {    
        const length = this.state.interet.length
        const value = this.state.interet.value
        const data = length === 0 ? this.state.interet.value : this.state.interet.data + ", " + this.state.interet.value

        if ((event.which === 13 || event.keyCode === 13) && value !== "#") {
            length === 0 ? $(`<code>${value}</code>`).insertBefore("#interet") : $(`<code>, ${value}</code>`).insertBefore("#interet")
            this.setState({interet: {value: "#", length: length + 1, data: data}})
        }
    }

    handleLocalisation = (address, lat, lng) => {
        var country = {
            name: address,
            lng: lng,
            lat: lat
        }
        this.setState({country})
    }

    handleGetGenderMale = event => {
        var attirance = this.state.attirance
        const valMale = event.target.checked
        
        attirance.male = valMale
        this.setState({attirance})
    }

    handleGetGenderFemale = event => {
        var attirance = this.state.attirance
        const valFemale = event.target.checked
        
        attirance.female = valFemale
        this.setState({attirance})
    }

    handleMyGender = event => {
        var myGender = event.target.value

        this.setState({myGender})
    }

    handleBirth = event => {
        var birthday = this.state.birthday
        const id = event.target.id
        const val = event.target.value

        if (id === "dayBirth") {
            birthday.day = val
        }
        else if (id === "monthBirth") {
            birthday.month = val
        }
        else if (id === "yearBirth") {
            birthday.year = val
        }
        this.setState({birthday})
    }

    handleText = event => {
        const id = event.target.id
        
        if (id === "lastname") {
            const lastname = event.target.value.toUpperCase()
            this.setState({lastname})
        }
        else if (id === "firstname") {
            const firstname = event.target.value.length > 0 ? event.target.value[0].toUpperCase() + event.target.value.substring(1) : ""
            this.setState({firstname})
        }
        else if (id === "email") {
            const email = event.target.value
            this.setState({email})
        }
        else if (id === "pass") {
            const pass = bcrypt.hashSync(event.target.value, bcrypt.genSaltSync(10))
            this.setState({pass})
        }
        else if (id === "interet") {
            const tab = this.state.interet.data
            const len = this.state.interet.length
            const interet = "#" + event.target.value.replace('#', '')
            this.setState({interet: {value: interet, length: len, data: tab}})
        }
        else if (id === "pseudo") {
            const pseudo = event.target.value
            this.setState({pseudo})
        }
    }

    emailIsValid = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    handleN1 = () => {
        $("#second").fadeIn()
        $("#first").hide()
        $("#progressBar").css("width", "66%")
        $("#progressBar").removeClass("bg-danger")
        $("#progressBar").addClass("bg-warning")
        $("#progressText").html("Étape 2")
        return true
    }

    handleP2 = () => {
        $("#second").hide();
        $("#first").fadeIn();
        $("#progressBar").css("width", "33%");
        $("#progressBar").removeClass("bg-warning");
        $("#progressBar").addClass("bg-danger");
        $("#progressText").html("Étape 1");
        return true
    }

    handleN2 = () => {
        var errorbday = true
        var errorlastname = true
        var errorfirstname = true

        if (this.state.birthday.day === 0 || this.state.birthday.month === 0 || this.state.birthday.year === 0) {
            errorbday = true
            $("#getErr3").fadeIn()
        }
        else {
            errorbday = false
            $("#getErr3").fadeOut()
        }
        if (!($("input[name=lastname]").val() || "")) {
            errorlastname = true
            $("#getErr5").fadeIn()
        }
        else {
            errorlastname = false
            $("#getErr5").fadeOut()
        }
        if (!($("input[name=firstname]").val() || "")) {
            errorfirstname = true
            $("#getErr6").fadeIn()
        }
        else {
            errorfirstname = false
            $("#getErr6").fadeOut()
        }
        if (errorfirstname === true || errorlastname === true || errorbday === true) {
            return false
        }
        $("#second").hide()
        $("#third").fadeIn()
        $("#progressBar").css("width", "100%")
        $("#progressBar").removeClass("bg-warning")
        $("#progressBar").addClass("bg-success")
        $("#progressText").html("Étape 3")
        return true
    }

    handleP3 = () => {
        $("#second").fadeIn()
        $("#third").hide()
        $("#progressBar").css("width", "66%")
        $("#progressBar").removeClass("bg-success")
        $("#progressBar").addClass("bg-warning")
        $("#progressText").html("Étape 2")
        return true
    }

    handleSubmit = () => {
        var errorSamePass = true
        var errorConfirm = true
        var errorPassSynt = true
        var errorPass = true
        var errorMail = true
        var errorPseudo = true
        var email = document.getElementById('email').value
        var pseudo = document.getElementById('pseudo').value.length

        if (pseudo === 0) {
            errorPseudo = true
            $("#getErrPseudo").fadeIn()
        }
        else {
            errorPseudo = false
            $("#getErrPseudo").fadeOut()
        }
        if (!($("input[name=email]").val() || "")) {
            errorMail = true
            $("#getErr7").fadeIn()
        }
        else {
            errorMail = false
            $("#getErr7").fadeOut()
        }
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) {
            errorMail = true
            $("#getErrMail").fadeIn()
        }
        else {
            errorMail = false
            $("#getErrMail").fadeOut()
        }
        if (!($("input[name=pass]").val() || "")) {
            errorPass = true
            $("#getErr8").fadeIn()
        }
        else {
            errorPass = false
            $("#getErr8").fadeOut()
        }
        if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test($("input[name=pass]").val())) === false) {
            errorPassSynt = true
            $("#getErr9").fadeIn()
        }
        else {
            errorPassSynt = false
            $("#getErr9").fadeOut()
        }
        if (!($("input[name=confirmPass]").val() || "")) {
            errorConfirm = true
            $("#getErr10").fadeIn()
        }
        else {
            errorConfirm = false
            $("#getErr10").fadeOut()
        }
        if ($("input[name=confirmPass]").val() !== $("input[name=pass]").val()) {
            errorSamePass = true
            $("#getErr11").fadeIn()
        }
        else {
            errorSamePass = false
            $("#getErr11").fadeOut()
        }
        axios
        .get('http://localhost:5000/api/members/exist/' + this.state.pseudo)
        .then(res => {
            if (res.data.status === 'pseudo already exist') {                
                this.setState({pseudoExist: true})
                $("#getErr12").fadeIn()
            }
            else {
                this.setState({pseudoExist: false})
                $("#getErr12").fadeOut()
            }

            if (errorSamePass || errorConfirm || errorPassSynt || errorPass || errorMail || this.state.pseudoExist || errorPseudo) {
                return false
            }
            else {
                $("#third").hide()
                $("#final").fadeIn()
                $("#progressBar").removeClass("bg-success")
                $("#progressBar").css("background-color", "#E83E8C")
                $("#progressText").html("FORMULAIRE ENVOYÉ !")
    
                axios.post('http://localhost:5000/api/members', {
                    isLoggued: false,
                    popularity: 0,
                    interet: this.state.interet.data,
                    biographie: "",
                    attirance: {
                        male: this.state.attirance.male,
                        female: this.state.attirance.female
                    },
                    myGender: this.state.myGender,
                    birthday: {
                        day: this.state.birthday.day,
                        month: this.state.birthday.month,
                        year: this.state.birthday.year
                    },
                    country: {
                        name: this.state.country.name,
                        lng: this.state.country.lng,
                        lat: this.state.country.lat
                    },
                    lastname: this.state.lastname,
                    firstname: this.state.firstname,
                    email: this.state.email,
                    password: this.state.pass,
                    token: require('crypto').randomBytes(32).toString('hex'),
                    isValid: false,
                    pictures: {
                        _1: "",
                        _2: "",
                        _3: "",
                        _4: "",
                        _5: ""
                    },
                    pseudo: this.state.pseudo
                })
            }
        })
        .catch(error => { console.log(error) })
    }

    render () {
        if (this.props.isAuth) {
            return (
                <Redirect to={"/accueil"} />
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
                                <div className="progress mt-3 border" id="form-bg">
                                    <div className="progress-bar bg-danger" id="progressBar">
                                        <b className="lead text-uppercase" id="progressText">Étape 1</b>
                                    </div>
                                </div>
                                <form className="mx-auto bg-dark py-5 rounded shadow mt-2">
                                    <div id="first">
                                        <h4 className="text-center p-1 rounded text-white">MES PREFERENCES</h4>
                                        <div className="form-group text-center">
                                            <div className="text-light">Que recherchez-vous ?</div>
                                            <input id="getmale" type="checkbox" name="getGender" onChange={this.handleGetGenderMale} />
                                            <label htmlFor="getmale" id="check-sam-1" className="border radio-inline my-2 fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                            <input id="getfemale" type="checkbox" name="getGender" onChange={this.handleGetGenderFemale} />
                                            <label htmlFor="getfemale" id="check-sam-2" className="border radio-inline my-2 fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                        </div><br />
                                        <div className="form-group text-center">
                                            <div className="text-light">Êtes-vous un homme ou une femme ?</div>
                                            <input id="immale" type="radio" name="myGender" value="male"  onChange={this.handleMyGender} />
                                            <label htmlFor="immale" id="rad-sam-1" className="border radio-inline my-2 fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                            <input id="imfemale" type="radio" name="myGender" value="female" onChange={this.handleMyGender} />
                                            <label htmlFor="imfemale" id="rad-sam-2" className="border radio-inline my-2 fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                        </div><br />
                                        <div className="form-group text-center">
                                            <div className="btn btn-light" id="next-1" onClick={this.handleN1}>ÉTAPE SUIVANTE</div>
                                        </div>
                                    </div>
                                    <div id="second">
                                        <h4 className="text-center p-1 rounded text-white">MES INFOS</h4>
                                        <div className="form-group text-center">
                                            <div className="text-light">Quelle est vôtre date de naissance ?</div>
                                            <div className="row">
                                                <div className="col-4">
                                                    <select className="mx-auto select-s form-control w-75" id="dayBirth" onChange={this.handleBirth} value={this.state.birthday.day}>
                                                        <Birthday Toget="day" />
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select className="mx-auto select-s form-control w-75" id="monthBirth" onChange={this.handleBirth} value={this.state.birthday.month}>
                                                        <Birthday Toget="month" />
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select className="mx-auto select-s form-control w-75" id="yearBirth" onChange={this.handleBirth} value={this.state.birthday.year}>
                                                        <Birthday Toget="year" />
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="invalid-feedback" id="getErr3">
                                                <div>La date est requise</div>
                                            </div>
                                        </div><br />
                                        <div className="form-group text-center">
                                            <div className="text-light">Dans quelle ville habitez-vous ?</div>
                                            <Place style_w="mx-auto form-control w-75" getLocalisation={this.handleLocalisation}/>
                                            <div className="invalid-feedback" id="getErr4">Veuillez indiquer votre ville</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastname" className="text-white">Quel est votre nom ?</label>
                                            <input type="text" name="lastname" className="form-control w-75 mx-auto text-center" value={this.state.lastname} placeholder="Nom" id="lastname" onChange={this.handleText} />
                                            <div className="invalid-feedback" id="getErr5">Veuillez indiquer votre nom</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="firstname" className="text-white">Quel est votre prénom ?</label>
                                            <input type="text" name="firstname" className="form-control w-75 mx-auto text-center" value={this.state.firstname} placeholder="Prénom" id="firstname" onChange={this.handleText} />
                                            <div className="invalid-feedback" id="getErr6">Veuillez indiquer votre prénom</div>
                                        </div><br/>
                                        <div className="form-group text-center">
                                            <div className="btn btn-light mx-1" id="prev-2" onClick={this.handleP2}>ÉTAPE PRECEDENTE</div>
                                            <div className="btn btn-light mx-1" id="next-2" onClick={this.handleN2}>ÉTAPE SUIVANTE</div>
                                        </div>
                                    </div>
                                    <div id="third">
                                        <h4 className="text-center p-1 rounded text-white">MES INFOS</h4>
                                        <div className="form-group">
                                            <label htmlFor="email" className="text-white">Quel est votre e-mail ?</label>
                                            <input type="email" name="email" className="form-control w-75 mx-auto text-center" placeholder="name@exemple.com" id="email" onChange={this.handleText} />
                                            <div className="invalid-feedback" id="getErr7">Veuillez indiquer votre email</div>
                                            <div className="invalid-feedback" id="getErrMail">Veuillez indiquer un email valide</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pseudo" className="text-white">Choisissez un pseudo</label>
                                            <input type="pseudo" name="pseudo" className="form-control w-75 mx-auto text-center" placeholder="Pseudo" id="pseudo" onChange={this.handleText} />
                                            <div className="invalid-feedback" id="getErr12">Ce pseudo existe déja</div>
                                            <div className="invalid-feedback" id="getErrPseudo">Veuillez entrer un pseudo valide</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pass" className="text-white">Choisissez un mot de passe</label>
                                            <input type="password" name="pass" className="form-control w-75 mx-auto text-center" placeholder="Mot de passe" id="pass" onChange={this.handleText} />
                                            <div className="invalid-feedback" id="getErr8">Le mot de passe est requis</div>
                                            <div className="invalid-feedback" id="getErr9">6 caracteres, 1 majuscule, 1 chiffre</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPass" className="text-white">Confirmez le mot de passe</label>
                                            <input type="password" name="confirmPass" className="form-control w-75 mx-auto text-center" placeholder="Mot de passe" id="confirmPass" />
                                            <div className="invalid-feedback" id="getErr10">Mot de passe de confirmation requis</div>
                                            <div className="invalid-feedback" id="getErr11">Les mots de passe doivent correspondre</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="interet" className="text-white">Centre d'interet</label>
                                            <input type="text" name="interet" className="form-control w-75 mx-auto text-center" value={this.state.interet.value} placeholder="#exemple" id="interet" onChange={this.handleText} onKeyUp={this.validInteret}/>
                                            <div id="interet"></div>
                                        </div><br/>
                                        <div className="form-group text-center">
                                            <div className="btn btn-light mx-1" id="prev-3" onClick={this.handleP3}>ÉTAPE PRECEDENTE</div>
                                            <button className="btn btn-light mx-1" id="submit" type="button" onClick={this.handleSubmit}>INSCRIPTION</button>
                                        </div>
                                    </div>
                                    <div id="final">
                                        <h2 className="text-center p-1 rounded text-white">Merci de vous être inscrit sur matcha.</h2>
                                        <h3 className="text-center rounded text-white">Un email recapitulatif vous a été envoyé à l'adresse suivante:</h3>
                                        <code className="text-center rounded h3">{this.state.email}</code>
                                        <h3 className="text-center rounded text-white mt-2">Merci de vous y rendre afin de confirmer votre inscription.</h3>
                                        <h3 className="text-center rounded text-white">À bientôt ! <span role="img" aria-label="emoji">🥰</span></h3>
                                    </div>
                                </form><br/><br/><br/>
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
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps, null)(Sign)