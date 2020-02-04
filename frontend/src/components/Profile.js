import React, { Component, Fragment } from 'react'
import Header from './Header'
import DiscussionBar from './DiscussionBar'
import '../css/Profile.css'
import Birthday from './Birthday'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"

class Profile extends Component {

    _isMounted = false

    state = {
        lastname: "",
        firstname: "",
        birthday: {
            day: "",
            month: "",
            year: ""
        },
        biographie: "",
        interet: "",
        attirance: {
            male: false,
            female: false
        },
        myGender: "",
        redirect: false
    }

    handleOnBlurSubmit = () => {
        axios.patch('http://localhost:5000/api/members/profile/fosexo4750@onetag.org', {
            interet: this.state.interet,
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
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            biographie: this.state.biographie
        })
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

    handleText = event => {
        const targ = event.target
        
        if (targ.name === "nom") {
            const lastname = targ.value
            this.setState({lastname})
        }
        else if (targ.name === "prenom") {
            const firstname = targ.value
            this.setState({firstname})
        }
        else if (targ.name === "bio") {
            const bio = targ.value
            this.setState({bio})
        }
        else if (targ.name === "interet") {
            const interet = targ.value
            this.setState({interet})
        }
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/members/' + this.props.email).then(res => {
            if (this._isMounted) {
                this.setState({
                    lastname: res.data.member.lastname,
                    firstname: res.data.member.firstname,
                    biographie: res.data.member.biographie,
                    interet: res.data.member.interet,
                    myGender: res.data.member.myGender,
                    birthday: {
                        day: res.data.member.birthday.day,
                        month: res.data.member.birthday.month,
                        year: res.data.member.birthday.year
                    },
                    attirance: {
                        male: res.data.member.attirance.male,
                        female: res.data.member.attirance.female
                    }
                })
            }           
        }).then(() => {
            if (this.state.myGender === 'male') {
                document.getElementById('immale').checked = true
            }
            else {
                document.getElementById('imfemale').checked = true
            }
    
            if (this.state.attirance.male === true) {
                document.getElementById('getmale').checked = true
            }
            if (this.state.attirance.female === true) {
                document.getElementById('getfemale').checked = true
            }
    
            document.getElementById('dayBirth').value = this.state.birthday.day
            document.getElementById('monthBirth').value = this.state.birthday.month
            document.getElementById('yearBirth').value = this.state.birthday.year
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        const {email} = this.props
        if (this.props.isAuth === false) {
            return (
                <Redirect to={"/connexion"} />
            )
        }
        else {
            return (
                <Fragment>
                    <Header loggued="true"/><br/><br/><br/>
                    <div className="container-fluid">
                        <div className="row p-2">
                            <div className="col-lg-8 text-center">
                                <div className="bg-dark p-4 rounded">
                                    <h2 className="text-light">MES INFOS</h2>
                                    <code className="h4">{email}</code>
                                    <form className="mt-4">
                                        <div className="row">
                                            <div className="col-lg">
                                                <input type="text" name="nom" placeholder="Nom" className="form-control w-100 mx-auto text-center" value={this.state.lastname} required onChange={this.handleText} onBlur={this.handleOnBlurSubmit}/><br/>
                                            </div>
                                            <div className="col-lg">
                                                <input type="text" name="prenom" placeholder="Prénom" className="form-control w-100 mx-auto text-center" value={this.state.firstname} required onChange={this.handleText} onBlur={this.handleOnBlurSubmit}/><br/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg">
                                                <input type="text" name="interet" className="form-control w-100 mx-auto text-center" placeholder="#matcha, #42" onChange={this.handleText} value={this.state.interet} onBlur={this.handleOnBlurSubmit}/>
                                            </div>
                                            <div className="col-lg">
                                            <div className="row">
                                                    <div className="col-4">
                                                        <select className="mx-auto select-s form-control w-100" id="dayBirth" onChange={this.handleBirth} value={this.state.birthday.day} onBlur={this.handleOnBlurSubmit}>
                                                            <Birthday Toget="day" />
                                                        </select>
                                                    </div>
                                                    <div className="col-4">
                                                        <select className="mx-auto select-s form-control w-100" id="monthBirth" onChange={this.handleBirth} value={this.state.birthday.month} onBlur={this.handleOnBlurSubmit}>
                                                            <Birthday Toget="month" />
                                                        </select>
                                                    </div>
                                                    <div className="col-4">
                                                        <select className="mx-auto select-s form-control w-100" id="yearBirth" onChange={this.handleBirth} value={this.state.birthday.year} onBlur={this.handleOnBlurSubmit}>
                                                            <Birthday Toget="year" />
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container mt-3">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group text-center">
                                                        <div className="text-light">Quel est votre genre ?</div>
                                                        <input id="immale" type="radio" name="myGender" value="male" onChange={this.handleMyGender} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="immale" id="rad-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                        <input id="imfemale" type="radio" name="myGender" value="female" onChange={this.handleMyGender} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="imfemale" id="rad-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                        <div className="invalid-feedback" id="getErr2">Votre sexe est requis</div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group text-center">
                                                        <div className="text-light">Que recherchez-vous ?</div>
                                                        <input id="getmale" type="checkbox" name="getGender" onChange={this.handleGetGenderMale} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="getmale" id="check-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                        <input id="getfemale" type="checkbox" name="getGender" onChange={this.handleGetGenderFemale} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="getfemale" id="check-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                        <div className="invalid-feedback" id="getErr">Votre préference est requise</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1" className="text-light">Biographie</label>
                                            <textarea name="bio" className="form-control" id="exampleFormControlTextarea1" placeholder="Vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez.vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez." rows="3" onChange={this.handleText} value={this.state.biographie} onBlur={this.handleOnBlurSubmit}></textarea>
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
                            </div>
                        </div>
                    </div>
                    <DiscussionBar/>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        email: state.email,
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps, null)(Profile)