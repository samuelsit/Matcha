import React, { Component, Fragment } from 'react'
import '../css/Sign.css'
import Header from './Header'
import * as $ from 'jquery'
import { Link } from 'react-router-dom'
import logo from '../pictures/favicon.png'
import Birthday from './Birthday'
import Place from './Place'

class Sign extends Component {

    state = {
        getGender: {
            male: false,
            female: false
        },
        myGender: "",
        birthday: {
            day: "1",
            month: "1",
            year: "2001"
        },
        country: {
            name: null,
            lng: null,
            lat: null
        },
        lastname: "",
        firstname: "",
        email: "",
        pass: ""
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
        var getGender = this.state.getGender
        const valMale = event.target.checked
        
        getGender['male'] = valMale
        this.setState({getGender})
    }

    handleGetGenderFemale = event => {
        var getGender = this.state.getGender
        const valFemale = event.target.checked
        
        getGender['female'] = valFemale
        this.setState({getGender})
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
            birthday['day'] = val
        }
        else if (id === "monthBirth") {
            birthday['month'] = val
        }
        else if (id === "yearBirth") {
            birthday['year'] = val
        }
        this.setState({birthday})
    }

    handleText = event => {
        const id = event.target.id
        
        if (id === "lastname") {
            const lastname = event.target.value
            this.setState({lastname})
        }
        else if (id === "firstname") {
            const firstname = event.target.value
            this.setState({firstname})
        }
        else if (id === "email") {
            const email = event.target.value
            this.setState({email})
        }
        else if (id === "pass") {
            const pass = event.target.value
            this.setState({pass})
        }
    }

    emailIsValid = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    handleN1 = () => {
        const gmale = document.getElementById('getmale').checked
        const gfemale = document.getElementById('getfemale').checked
        const mymale = document.getElementById('imfemale').checked
        const myfemale = document.getElementById('immale').checked
        var error = 0

        if (gmale === false && gfemale === false) {
            $("#getErr").fadeIn()
            error = 1
        }
        else {
            $("#getErr").fadeOut()
        }
        if (mymale === false && myfemale === false) {
            $("#getErr2").fadeIn()
            error = 1
        }
        else {
            $("#getErr2").fadeOut()
        }
        if (error === 1) {
            return false
        }
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
         var error = 0

        if ($("select[name=day]").val() === 0 || $("select[name=month]").val() === 0 || $("select[name=year]").val() === 0) {
            $("#getErr3").fadeIn()
            error = 1
        }
        else {
            $("#getErr3").fadeOut()
        }
        if (!($("input[name=lastname]").val() || "")) {
            $("#getErr5").fadeIn()
            error = 1
        }
        else {
            $("#getErr5").fadeOut()
        }
        if (!($("input[name=firstname]").val() || "")) {
            $("#getErr6").fadeIn()
            error = 1
        }
        else {
            $("#getErr6").fadeOut()
        }
        if (error === 1) {
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

    handleSubmit = event => {
        event.preventDefault()
        var error = 0

        if (!($("input[name=email]").val() || "")) {
            $("#getErr7").fadeIn()
            error = 1
        }
        else {
            $("#getErr7").fadeOut()
        }
        if (!($("input[name=pass]").val() || "")) {
            $("#getErr8").fadeIn()
            error = 1
        }
        else {
            $("#getErr8").fadeOut()
        }
        if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test($("input[name=pass]").val())) === false) {
            $("#getErr9").fadeIn()
            error = 1
        }
        else {
            $("#getErr9").fadeOut()
        }
        if (!($("input[name=confirmPass]").val() || "")) {
            $("#getErr10").fadeIn()
            error = 1
        }
        else {
            $("#getErr10").fadeOut()
        }
        if ($("input[name=confirmPass]").val() !== $("input[name=pass]").val()) {
            $("#getErr11").fadeIn()
            error = 1
        }
        else {
            $("#getErr11").fadeOut()
        }
        if (error === 1) {
            return false
        }
        return true
    }

    render () {
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
                            <form className="mx-auto bg-dark py-5 rounded shadow mt-2" onSubmit={this.handleSubmit}>
                                <div id="first">
                                    <h4 className="text-center p-1 rounded text-white">MES PREFERENCES</h4>
                                    <div className="form-group text-center">
                                        <div className="text-light">Que recherchez-vous ?</div>
                                        <input id="getmale" type="checkbox" name="getGender" onChange={this.handleGetGenderMale} />
                                        <label htmlFor="getmale" id="check-sam-1" className="border radio-inline my-2 fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                        <input id="getfemale" type="checkbox" name="getGender" onChange={this.handleGetGenderFemale} />
                                        <label htmlFor="getfemale" id="check-sam-2" className="border radio-inline my-2 fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                        <div className="invalid-feedback" id="getErr">Votre préference est requise</div>
                                    </div><br />
                                    <div className="form-group text-center">
                                        <div className="text-light">Êtes-vous un homme ou une femme ?</div>
                                        <input id="immale" type="radio" name="myGender" value="male"  onChange={this.handleMyGender} />
                                        <label htmlFor="immale" id="rad-sam-1" className="border radio-inline my-2 fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                        <input id="imfemale" type="radio" name="myGender" value="female" onChange={this.handleMyGender} />
                                        <label htmlFor="imfemale" id="rad-sam-2" className="border radio-inline my-2 fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                        <div className="invalid-feedback" id="getErr2">Votre sexe est requis</div>
                                    </div><br />
                                    <div className="form-group text-center">
                                        <div className="btn btn-light" id="next-1" onClick={this.handleN1}>ÉTAPE SUIVANTE</div>
                                    </div>
                                </div>
                                <div id="second">
                                    <h4 className="text-center p-1 rounded text-white">MES INFOS</h4>
                                    <div className="form-group text-center">
                                        <div className="text-light">Quelle est vôtre date de naissance ?</div>
                                        <select className="select-sam text-light bg-dark" id="dayBirth" onChange={this.handleBirth}>
                                            <Birthday Toget="day" />
                                        </select>
                                        <select className="select-sam text-light bg-dark" id="monthBirth" onChange={this.handleBirth}>
                                            <Birthday Toget="month" />
                                        </select>
                                        <select className="select-sam text-light bg-dark" id="yearBirth" onChange={this.handleBirth}>
                                            <Birthday Toget="year" />
                                        </select>
                                        <div className="invalid-feedback" id="getErr3">
                                            <div>La date est requise</div>
                                        </div>
                                    </div><br />
                                    <div className="form-group text-center">
                                        <div className="text-light">Dans quelle ville habitez-vous ?</div>
                                        <Place getLocalisation={this.handleLocalisation}/>
                                        <div className="invalid-feedback" id="getErr4">Veuillez indiquer votre ville</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname" className="text-white">Quel est votre nom ?</label>
                                        <input type="text" name="lastname" className="form-control w-75 mx-auto text-center" placeholder="Nom" id="lastname" onChange={this.handleText} />
                                        <div className="invalid-feedback" id="getErr5">Veuillez indiquer votre nom</div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firstname" className="text-white">Quel est votre prénom ?</label>
                                        <input type="text" name="firstname" className="form-control w-75 mx-auto text-center" placeholder="Prénom" id="firstname" onChange={this.handleText} />
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
                                        <input type="email" name="email" className="form-control w-75 mx-auto text-center" placeholder="E-mail" id="email" onChange={this.handleText} />
                                        <div className="invalid-feedback" id="getErr7">Veuillez indiquer votre email</div>
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
                                    </div><br/>
                                    <div className="form-group text-center">
                                        <div className="btn btn-light mx-1" id="prev-3" onClick={this.handleP3}>ÉTAPE PRECEDENTE</div>
                                        <Link to={"/accueil"}>
                                            <button className="btn btn-light mx-1" id="submit" type="submit">INSCRIPTION</button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Sign