import React, { Component, Fragment } from 'react'
import '../css/Sign.css'
import Header from './Header'
import * as $ from 'jquery'
import { Link } from 'react-router-dom'
import logo from '../pictures/favicon.png'

class Sign extends Component {

    state = {
        getGender: [false, false],
        myGender: "",
        birthday: ["1","1","2001"],
        loca: "",
        lastname: "",
        firstname: "",
        email: "",
        pass: ""
    }

    handleGetGenderMale = event => {
        var getGender = this.state.getGender
        const valMale = event.target.checked
        
        getGender[0] = valMale
        this.setState({getGender})
    }

    handleGetGenderFemale = event => {
        var getGender = this.state.getGender
        const valFemale = event.target.checked
        
        getGender[1] = valFemale
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
            birthday[0] = val
        }
        else if (id === "monthBirth") {
            birthday[1] = val
        }
        else if (id === "yearBirth") {
            birthday[2] = val
        }
        this.setState({birthday})
    }

    handleText = event => {
        const id = event.target.id
        
        if (id === "loca") {
            const loca = event.target.value
            this.setState({loca})
        }
        else if (id === "lastname") {
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
        if (!($("input[name=loca]").val() || "")) {
            $("#getErr4").fadeIn()
            error = 1
        }
        else {
            $("#getErr4").fadeOut()
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
                                            <option value="0" disabled>Jour</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </select>
                                        <select className="select-sam text-light bg-dark" id="monthBirth" onChange={this.handleBirth}>
                                            <option value="0" disabled>Mois</option>
                                            <option value="1">Janvier</option>
                                            <option value="2">Février</option>
                                            <option value="3">Mars</option>
                                            <option value="4">Avril</option>
                                            <option value="5">Mai</option>
                                            <option value="6">Juin</option>
                                            <option value="7">Juillet</option>
                                            <option value="8">Août</option>
                                            <option value="9">Septembre</option>
                                            <option value="10">Octobre</option>
                                            <option value="11">Novembre</option>
                                            <option value="12">Décembre</option>
                                        </select>
                                        <select className="select-sam text-light bg-dark" id="yearBirth" onChange={this.handleBirth}>
                                            <option value="0" disabled>Année</option>
                                            <option value="2001">2001</option>
                                            <option value="2000">2000</option>
                                            <option value="1999">1999</option>
                                            <option value="1998">1998</option>
                                            <option value="1997">1997</option>
                                            <option value="1996">1996</option>
                                            <option value="1995">1995</option>
                                            <option value="1994">1994</option>
                                            <option value="1993">1993</option>
                                            <option value="1992">1992</option>
                                            <option value="1991">1991</option>
                                            <option value="1990">1990</option>
                                            <option value="1989">1989</option>
                                            <option value="1988">1988</option>
                                            <option value="1987">1987</option>
                                            <option value="1986">1986</option>
                                            <option value="1985">1985</option>
                                            <option value="1984">1984</option>
                                            <option value="1983">1983</option>
                                            <option value="1982">1982</option>
                                            <option value="1981">1981</option>
                                            <option value="1980">1980</option>
                                            <option value="1979">1979</option>
                                            <option value="1978">1978</option>
                                            <option value="1977">1977</option>
                                            <option value="1976">1976</option>
                                            <option value="1975">1975</option>
                                            <option value="1974">1974</option>
                                            <option value="1973">1973</option>
                                            <option value="1972">1972</option>
                                            <option value="1971">1971</option>
                                            <option value="1970">1970</option>
                                            <option value="1969">1969</option>
                                            <option value="1968">1968</option>
                                            <option value="1967">1967</option>
                                            <option value="1966">1966</option>
                                            <option value="1965">1965</option>
                                            <option value="1964">1964</option>
                                            <option value="1963">1963</option>
                                            <option value="1962">1962</option>
                                            <option value="1961">1961</option>
                                            <option value="1960">1960</option>
                                            <option value="1959">1959</option>
                                            <option value="1958">1958</option>
                                            <option value="1957">1957</option>
                                            <option value="1956">1956</option>
                                            <option value="1955">1955</option>
                                            <option value="1954">1954</option>
                                            <option value="1953">1953</option>
                                            <option value="1952">1952</option>
                                            <option value="1951">1951</option>
                                            <option value="1950">1950</option>
                                            <option value="1949">1949</option>
                                            <option value="1948">1948</option>
                                            <option value="1947">1947</option>
                                            <option value="1946">1946</option>
                                            <option value="1945">1945</option>
                                            <option value="1944">1944</option>
                                            <option value="1943">1943</option>
                                            <option value="1942">1942</option>
                                            <option value="1941">1941</option>
                                            <option value="1940">1940</option>
                                            <option value="1939">1939</option>
                                            <option value="1938">1938</option>
                                            <option value="1937">1937</option>
                                            <option value="1936">1936</option>
                                            <option value="1935">1935</option>
                                            <option value="1934">1934</option>
                                            <option value="1933">1933</option>
                                            <option value="1932">1932</option>
                                            <option value="1931">1931</option>
                                            <option value="1930">1930</option>
                                            <option value="1929">1929</option>
                                            <option value="1928">1928</option>
                                            <option value="1927">1927</option>
                                            <option value="1926">1926</option>
                                            <option value="1925">1925</option>
                                            <option value="1924">1924</option>
                                            <option value="1923">1923</option>
                                            <option value="1922">1922</option>
                                            <option value="1921">1921</option>
                                            <option value="1920">1920</option>
                                            <option value="1919">1919</option>
                                        </select>
                                        <div className="invalid-feedback" id="getErr3">
                                            <div>La date est requise</div>
                                        </div>
                                    </div><br />
                                    <div className="form-group text-center">
                                        <div className="text-light">Dans quelle ville habitez-vous ?</div>
                                        <input type="text" name="loca" id="loca" placeholder="Indiquez votre ville 📍" className="form-control w-75 mx-auto text-center" onChange={this.handleText}/>
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