import React, { Component, Fragment } from 'react'
import Header from './Header'
import DiscussionBar from './DiscussionBar'
import '../css/Profile.css'
import Birthday from './Birthday'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class Profile extends Component {
    state = {
        login: "ssitruk",
        nom: "Sitruk",
        prenom: "Samuel",
        phone: "0646418150",
        email: "samsitruk@gmail.com",
        birthday: {
            day: "30",
            month: "10",
            year: "1997"
        },
        bio: "Vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez.vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez.",
        interest: "#matcha, #money",
        getGender: {
            male: false,
            female: true
        },
        myGender: "male",
        longitude: "",
        latitude: ""
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

    handleGetGenderMale = event => {
        var getGender = this.state.getGender
        const valMale = event.target.checked
        
        getGender.male = valMale
        this.setState({getGender})
    }

    handleGetGenderFemale = event => {
        var getGender = this.state.getGender
        const valFemale = event.target.checked
        
        getGender.female = valFemale
        this.setState({getGender})
    }

    handleMyGender = event => {
        var myGender = event.target.value

        this.setState({myGender})
    }

    handleText = event => {
        const targ = event.target
        
        if (targ.name === "nom") {
            const nom = targ.value
            this.setState({nom})
        }
        else if (targ.name === "prenom") {
            const prenom = targ.value
            this.setState({prenom})
        }
        else if (targ.name === "phone") {
            const phone = targ.value
            this.setState({phone})
        }
        else if (targ.name === "email") {
            const email = targ.value
            this.setState({email})
        }
        else if (targ.name === "bio") {
            const bio = targ.value
            this.setState({bio})
        }
        else if (targ.name === "interest") {
            const interest = targ.value
            this.setState({interest})
        }
    }

    componentDidMount() {
        var longitude
        var latitude

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                longitude = position.coords.longitude
                latitude = position.coords.latitude
                this.setState({longitude})
                this.setState({latitude})
            })
        }
        else {
            console.log('geolocation not supported')
        }

        if (this.state.myGender === 'male') {
            document.getElementById('immale').checked = true
        }
        else {
            document.getElementById('imfemale').checked = true
        }

        if (this.state.getGender.male === true) {
            document.getElementById('getmale').checked = true
        }
        if (this.state.getGender.female === true) {
            document.getElementById('getfemale').checked = true
        }

        document.getElementById('dayBirth').value = this.state.birthday.day
        document.getElementById('monthBirth').value = this.state.birthday.month
        document.getElementById('yearBirth').value = this.state.birthday.year
    }

    render () {
        const style = {
            width: '95%',
            height: '335px'
        }

        return (
            <Fragment>
                <Header loggued="true"/><br/><br/><br/>
                <div className="container-fluid">
                    <div className="row p-2">
                        <div className="col-lg-8 text-center">
                            <div className="bg-dark p-4 rounded">
                                <h1 className="text-light">MES INFOS</h1>
                                <form>
                                    <div className="row">
                                        <div className="col-lg">
                                            <input type="text" className="form-control w-100 mx-auto text-center" value="ssitruk" readOnly/><br/>
                                        </div>
                                        <div className="col-lg mb-3">
                                            <select className="select-sam text-light bg-dark" id="dayBirth" onChange={this.handleBirth}>
                                                <Birthday Toget="day" />
                                            </select>
                                            <select className="select-sam text-light bg-dark" id="monthBirth" onChange={this.handleBirth}>
                                                <Birthday Toget="month" />
                                            </select>
                                            <select className="select-sam text-light bg-dark" id="yearBirth" onChange={this.handleBirth}>
                                                <Birthday Toget="year" />
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg">
                                            <input type="text" name="nom" placeholder="Nom" className="form-control w-100 mx-auto text-center" value={this.state.nom} required onChange={this.handleText}/><br/>
                                        </div>
                                        <div className="col-lg">
                                            <input type="text" name="prenom" placeholder="Prénom" className="form-control w-100 mx-auto text-center" value={this.state.prenom} required onChange={this.handleText}/><br/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg">
                                            <input type="text" name="phone" placeholder="Téléphone" className="form-control w-100 mx-auto text-center" value={this.state.phone} required onChange={this.handleText}/><br/>
                                        </div>
                                        <div className="col-lg">
                                            <input type="email" name="email" placeholder="E-mail" className="form-control w-100 mx-auto text-center" value={this.state.email} required onChange={this.handleText}/><br/>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group text-center">
                                                    <div className="text-light">Quel est votre genre ?</div>
                                                    <input id="immale" type="radio" name="myGender" value="male" onChange={this.handleMyGender}/>
                                                    <label htmlFor="immale" id="rad-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                    <input id="imfemale" type="radio" name="myGender" value="female" onChange={this.handleMyGender} />
                                                    <label htmlFor="imfemale" id="rad-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                    <div className="invalid-feedback" id="getErr2">Votre sexe est requis</div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group text-center">
                                                    <div className="text-light">Que recherchez-vous ?</div>
                                                    <input id="getmale" type="checkbox" name="getGender" onChange={this.handleGetGenderMale} />
                                                    <label htmlFor="getmale" id="check-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                    <input id="getfemale" type="checkbox" name="getGender" onChange={this.handleGetGenderFemale} />
                                                    <label htmlFor="getfemale" id="check-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                    <div className="invalid-feedback" id="getErr">Votre préference est requise</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1" className="text-light">Biographie</label>
                                        <textarea name="bio" className="form-control" id="exampleFormControlTextarea1" placeholder="Vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez.vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez." rows="3" onChange={this.handleText} value={this.state.bio}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1" className="text-light">Centre d'interet</label>
                                        <input type="text" name="interest" className="form-control text-center" id="exampleFormControlInput1" placeholder="#matcha, #money" onChange={this.handleText} value={this.state.interest}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="row rounded">
                                <div className="col-12 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                            </div>
                            <div >
                                <Map style={style} initialCenter={{ lat: this.state.latitude, lng: this.state.longitude }} center={{ lat: this.state.latitude, lng: this.state.longitude }} google={this.props.google} zoom={14}>
                                    <Marker onClick={this.onMarkerClick} name={'Votre position'} position={{ lat: this.state.latitude, lng: this.state.longitude }}/>
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
                <DiscussionBar/>
            </Fragment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBriVepajx5lnt2Nx74SmmktdaYVIQq840")
})(Profile)