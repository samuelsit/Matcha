import React, { Component, Fragment } from 'react'
import Header from './Header'
import '../css/Profile.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import DiscussionButton from './DiscussionButton'
import MapG from './Map'
import ChatProfile from './Chat/ChatProfile'

class ExternalProfile extends Component {

    _isMounted = false

    state = {
        lastname: "",
        firstname: "",
        birthday: {
            day: "",
            month: "",
            year: ""
        },
        country: {
            lat: 0,
            lng: 0
        },
        biographie: "",
        interet: "",
        attirance: {
            male: false,
            female: false
        },
        myGender: "",
        email: this.props.match.params.pseudo,
        pictures: {
            _1: "",
            _2: "",
            _3: "",
            _4: "",
            _5: ""
        },
        popularity: 0,
        email1Match: 0,
        email2Match: 0,
        redirect: false,
        error: true
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/members/exist/' + this.state.email).then(res => {
            if (res.data.status === 'email not exist') {
                this.setState({error: true})
                this.setRedirect()
            }
            else {
                if (this.state.email !== this.props.email) {
                    axios.post('http://localhost:5000/api/interactions', {
                        from: this.props.email,
                        to: this.state.email,
                        data: 'view'
                    })
                }
                axios.get('http://localhost:5000/api/members/' + this.state.email).then(res => {
                    if (this._isMounted) {
                        this.setState({
                            lastname: res.data.member.lastname,
                            firstname: res.data.member.firstname,
                            biographie: res.data.member.biographie,
                            interet: res.data.member.interet,
                            myGender: res.data.member.myGender,
                            country: {
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
                            }
                        })
                        this.setState({error: false})
                    }           
                })
                .catch(error => {
                    console.log(error)
                })
                axios.get('http://localhost:5000/api/interactions/like/count/' + this.state.email)
                    .then(res => {
                        if (this._isMounted) {
                            this.setState({
                                popularity: res.data.interactions
                            })
                        }           
                    }).catch(error => {
                        console.log(error)
                })
                axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.email + '/' + this.state.email).then(res => {
                    if (this._isMounted) {
                        this.setState({
                            email1Match: res.data.interactions
                        })
                    }           
                }).catch(error => {
                    console.log(error)
                })
                axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.state.email + '/' + this.props.email).then(res => {
                    if (this._isMounted) {
                        this.setState({
                            email2Match: res.data.interactions
                        })
                    }           
                }).catch(error => {
                    console.log(error)
                })
            }
        })
    }

    handleProfile = () => {
        if (this.state.error === false) {
            return (
                <ChatProfile mobileView={true} name={this.state.email}/>
            )
        }
    }

    handleRedirect = () => {
        if (this.state.redirect === true) {
            return (
                <Redirect to={"/profile"} />
            )
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    handleClick = () => {
        if (this.state.email1Match === 0) {
            axios.post('http://localhost:5000/api/interactions', {
                from: this.props.email,
                to: this.state.email,
                data: 'like'
            })
            if (this.state.email2Match === 1) {
                axios.post('http://localhost:5000/api/messages', {
                    from: this.props.email,
                    to: this.state.email,
                    data: "C'est un match !"
                })
            }
        }
        axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.email + '/' + this.state.email).then(res => {
            if (this._isMounted) {
                this.setState({
                    email1Match: res.data.interactions
                })
            }           
        }).catch(error => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.state.email + '/' + this.props.email).then(res => {
            if (this._isMounted) {
                this.setState({
                    email2Match: res.data.interactions
                })
            }           
        }).catch(error => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/interactions/like/count/' + this.state.email)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        popularity: res.data.interactions
                    })
                }           
            }).catch(error => {
                console.log(error)
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        if (this.props.isAuth === false) {
            return (
                <Redirect to={"/connexion"} />
            )
        }
        else if (this.state.email === this.props.email) {
            return (
                <Redirect to={"/profile"} />
            )
        }
        else {
            const styleMap = {
                width: '95%',
                height: '200px',
                position: 'sticky',
                top: '100px'
            }
            return (
                <Fragment>
                {this.handleRedirect()}
                <Header loggued="true"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-3 col-md-3 mt-lg-4">
                            {this.handleProfile()}
                        </div>
                        <div className='col-lg-9 col-md-9 mt-5 text-center'>
                            <button className="btn btn-circle btn-lg btn-danger mt-5" onClick={this.handleClick}><i className="fas fa-heart"> {this.state.popularity}</i></button>
                            <MapG style={styleMap} lat={this.state.country.lat} lng={this.state.country.lng}/>
                        </div>
                    </div>
                </div>
                <DiscussionButton/>
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

export default connect(mapStateToProps, null)(ExternalProfile)