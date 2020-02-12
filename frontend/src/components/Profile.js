import React, { Component, Fragment } from 'react'
import Header from './Header'
import '../css/Profile.css'
import Birthday from './Birthday'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, Link } from "react-router-dom"
import DiscussionButton from './DiscussionButton'
import MapG from './Map'
import Place from './Place'

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
        email: "",
        country: {
            name: "Non renseigné",
            lng: 2.3184266562967704,
            lat: 48.896582479838294
        },
        biographie: "",
        interet: "",
        attirance: {
            male: false,
            female: false
        },
        myGender: "",
        pictures: {
            _1: "",
            _2: "",
            _3: "",
            _4: "",
            _5: ""
        }
    }

    componentDidMount() {
        this._isMounted = true        
        axios.get('http://localhost:5000/api/members/' + this.props.pseudo).then(res => {
            if (this._isMounted) {
                this.setState({
                    lastname: res.data.member.lastname,
                    firstname: res.data.member.firstname,
                    biographie: res.data.member.biographie,
                    interet: res.data.member.interet,
                    myGender: res.data.member.myGender,
                    country: {
                        name: res.data.member.country.name,
                        lat: res.data.member.country.lat,
                        lng: res.data.member.country.lng
                    },
                    birthday: {
                        day: res.data.member.birthday.day,
                        month: res.data.member.birthday.month,
                        year: res.data.member.birthday.year
                    },
                    attirance: {
                        male: res.data.member.attirance.male,
                        female: res.data.member.attirance.female
                    },
                    pictures: {
                        _1: res.data.member.pictures._1,
                        _2: res.data.member.pictures._2,
                        _3: res.data.member.pictures._3,
                        _4: res.data.member.pictures._4,
                        _5: res.data.member.pictures._5
                    },
                    email: res.data.member.email
                })
            }           
        }).then(() => {
            if (this.state.myGender === 'male') {
                document.getElementById('immale').checked = true
            }
            if (this.state.myGender === 'female') {
                document.getElementById('imfemale').checked = true
            }
            if (this.state.attirance.male === true) {
                document.getElementById('getmale').checked = true
            }
            if (this.state.attirance.female === true) {
                document.getElementById('getfemale').checked = true
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleOnBlurSubmit = () => {
        const regex = RegExp(/^(#[\w+]+,? ?)+$/)
        axios.patch('http://localhost:5000/api/members/profile/' + this.props.pseudo, {
            interet: regex.test(this.state.interet) ? this.state.interet : '',
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
            email: this.state.email,
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            biographie: this.state.biographie,
            updatedAt: Date.now()
        })
    }

    handleLocalisation = (address, lat, lng) => {
        var country = {
            name: address,
            lng: lng,
            lat: lat
        }
        this.setState({country})
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
            const lastname = event.target.value.toUpperCase()
            this.setState({lastname})
        }
        else if (targ.name === "prenom") {
            const firstname = event.target.value.length > 0 ? event.target.value[0].toUpperCase() + event.target.value.substring(1) : ""
            this.setState({firstname})
        }
        else if (targ.name === "bio") {
            const biographie = targ.value
            this.setState({biographie})
        }
        else if (targ.name === "interet") {
            const interet = targ.value
            this.setState({interet})
        }
        else if (targ.name === "email") {
            const email = targ.value
            this.setState({email})
        }
    }

    handlePicture = event => {
        const fd = new FormData()
        fd.append('image', event.target.files[0], event.target.files[0].name)
        axios
        .post('http://localhost:5000/api/members/pictures/' + this.props.pseudo + '/' + event.target.id, fd)
        .then(res => {
            console.log(res)
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        let _1 = /^(http|https):/.test(this.state.pictures._1) ? this.state.pictures._1 : this.state.pictures._1 !== '' ? require(`../pictures/profile/${this.state.pictures._1}`) : require(`../pictures/profile/noPic.png`)
        let _2 = /^(http|https):/.test(this.state.pictures._2) ? this.state.pictures._2 : this.state.pictures._2 !== '' ? require(`../pictures/profile/${this.state.pictures._2}`) : require(`../pictures/profile/noPic.png`)
        let _3 = /^(http|https):/.test(this.state.pictures._3) ? this.state.pictures._3 : this.state.pictures._3 !== '' ? require(`../pictures/profile/${this.state.pictures._3}`) : require(`../pictures/profile/noPic.png`)
        let _4 = /^(http|https):/.test(this.state.pictures._4) ? this.state.pictures._4 : this.state.pictures._4 !== '' ? require(`../pictures/profile/${this.state.pictures._4}`) : require(`../pictures/profile/noPic.png`)
        let _5 = /^(http|https):/.test(this.state.pictures._5) ? this.state.pictures._5 : this.state.pictures._5 !== '' ? require(`../pictures/profile/${this.state.pictures._5}`) : require(`../pictures/profile/noPic.png`)
        // const _1 = this.state.pictures._1 !== '' ? require(`../pictures/profile/${this.state.pictures._1}`) : require(`../pictures/profile/noPic.png`)
        // const _2 = this.state.pictures._2 !== '' ? require(`../pictures/profile/${this.state.pictures._2}`) : require(`../pictures/profile/noPic.png`)
        // const _3 = this.state.pictures._3 !== '' ? require(`../pictures/profile/${this.state.pictures._3}`) : require(`../pictures/profile/noPic.png`)
        // const _4 = this.state.pictures._4 !== '' ? require(`../pictures/profile/${this.state.pictures._4}`) : require(`../pictures/profile/noPic.png`)
        // const _5 = this.state.pictures._5 !== '' ? require(`../pictures/profile/${this.state.pictures._5}`) : require(`../pictures/profile/noPic.png`)

        const styleMap = {
            width: '100%',
            height: '800px'
        }

        if (this.props.isAuth === false) {
            return (
                <Redirect to={"/connexion"} />
            )
        }
        else {
            return (
                <Fragment>
                    <Header /><br/><br/><br/>
                    <div className="container-fluid">
                        <div className="row p-2">
                            <div className="col-lg-8 text-center">
                                <div className="bg-dark p-4 rounded">
                                    <div className="row">
                                        <div className="col-4">
                                            <Link to="/reinitialisation">
                                            <div className="text-light d-none d-lg-block">Changer de mot de passe</div>
                                            <div className="btn btn-info btn-lg"><i className="fas fa-key"></i></div>
                                            </Link>
                                        </div>
                                        <div className="col-4">
                                            <h2 className="text-light">MON PROFIL</h2>
                                            <code className="h4 d-none d-lg-block">{this.props.pseudo}</code>
                                        </div>
                                        <div className="col-4">
                                            <div className="text-light d-none d-lg-block">Historique</div>
                                            <div className="btn btn-info btn-lg"><i className="fas fa-history"></i></div>
                                        </div>
                                    </div>
                                    <form className="mt-4">
                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="nom" className="text-light">Nom</label>
                                                <input type="text" id="nom" name="nom" placeholder="Nom" className="form-control w-100 mx-auto text-center" value={this.state.lastname} required onChange={this.handleText} onBlur={this.handleOnBlurSubmit}/><br/>
                                            </div>
                                            <div className="col-lg">
                                                <label htmlFor="prenom" className="text-light">Prénom</label>
                                                <input type="text" id="prenom" name="prenom" placeholder="Prénom" className="form-control w-100 mx-auto text-center" value={this.state.firstname} required onChange={this.handleText} onBlur={this.handleOnBlurSubmit}/><br/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="inter" className="text-light">Centre d'intêret</label>
                                                <input type="text" id="inter" name="interet" className="form-control w-100 mx-auto text-center" placeholder="Pas de centre d'intêret" onChange={this.handleText} value={this.state.interet} onBlur={this.handleOnBlurSubmit}/>
                                            </div>
                                            <div className="col-lg">
                                                <label htmlFor="" className="text-light mt-3 mt-lg-0">Anniversaire</label>
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
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <label htmlFor="" className="text-light">Genre</label>
                                                    <div className="form-group text-center">
                                                        <input id="immale" type="radio" name="myGender" value="male" onChange={this.handleMyGender} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="immale" id="rad-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                        <input id="imfemale" type="radio" name="myGender" value="female" onChange={this.handleMyGender} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="imfemale" id="rad-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                        <div className="invalid-feedback" id="getErr2">Votre sexe est requis</div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="" className="text-light">Attirance</label>
                                                    <div className="form-group text-center">
                                                        <input id="getmale" type="checkbox" name="getGender" onChange={this.handleGetGenderMale} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="getmale" id="check-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                        <input id="getfemale" type="checkbox" name="getGender" onChange={this.handleGetGenderFemale} onBlur={this.handleOnBlurSubmit}/>
                                                        <label htmlFor="getfemale" id="check-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                        <div className="invalid-feedback" id="getErr">Votre préference est requise</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group text-center">
                                                        <label htmlFor="bio" className="text-light">Biographie</label>
                                                        <textarea name="bio" id="bio" className="form-control text-center" placeholder="Vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez." rows="2" onChange={this.handleText} value={this.state.biographie} onBlur={this.handleOnBlurSubmit}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group text-center">
                                                        <label htmlFor="email" className="text-light">Email</label>
                                                        <input type="text" name="email" id="email" className="form-control w-100" placeholder="name@exemple.com" onChange={this.handleText} value={this.state.email} onBlur={this.handleOnBlurSubmit} />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group text-center">
                                                        <label htmlFor="place" className="text-light">Localisation</label>
                                                        <Place style_w="form-control w-100" getLocalisation={this.handleLocalisation}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-center">
                                    <div className="row rounded">
                                        <div className="col-12 mt-lg-0 mt-2 mb-2">
                                            <input type="file" id="_1" onChange={this.handlePicture}/>
                                            <label htmlFor="_1"><img className="card-img" src={_1} alt="Card cap" /></label>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 mt-lg-0 mt-2 mb-2">
                                            <input type="file" id="_2" onChange={this.handlePicture}/>
                                            <label htmlFor="_2"><img className="card-img" src={_2} alt="Card cap" /></label>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 mt-lg-0 mt-2 mb-2">
                                            <input type="file" id="_3" onChange={this.handlePicture}/>
                                            <label htmlFor="_3"><img className="card-img" src={_3} alt="Card cap" /></label>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 mt-lg-0 mt-2 mb-2">
                                            <input type="file" id="_4" onChange={this.handlePicture}/>
                                            <label htmlFor="_4"><img className="card-img" src={_4} alt="Card cap" /></label>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6 mt-lg-0 mt-2 mb-2">
                                            <input type="file" id="_5" onChange={this.handlePicture}/>
                                            <label htmlFor="_5"><img className="card-img" src={_5} alt="Card cap" /></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MapG style={styleMap} lat={this.state.country.lat} lng={this.state.country.lng}/>
                        <DiscussionButton/>
                    </Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps, null)(Profile)