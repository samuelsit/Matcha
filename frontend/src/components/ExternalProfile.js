import React, { Component, Fragment } from 'react'
import Header from './Header'
import '../css/Profile.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import DiscussionButton from './DiscussionButton'
import ChatProfile from './Chat/ChatProfile'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

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
        pseudo: this.props.match.params.pseudo,
        pictures: {
            _1: "",
            _2: "",
            _3: "",
            _4: "",
            _5: ""
        },
        popularity: 0,
        pseudo1: 0,
        pseudo2: 0,
        redirect: false,
        error: true,
        blockMember: [],
        blockMe: []
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/interactions/block/getblock/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (this._isMounted) {
                this.setState({
                    blockMember: res.data.block
                })              
            }           
        })
        axios.get('http://localhost:5000/api/interactions/block/getblockme/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (this._isMounted) {
                this.setState({
                    blockMe: res.data.block
                })              
            }           
        })
        var btnLove = document.getElementById('btn-love')
        var btnBlock = document.getElementById('btn-block')
        axios.get('http://localhost:5000/api/interactions/block/isblock/' + this.props.pseudo + '/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
        .then(res => {
            if (res.data.interactions) {
                btnBlock.classList.remove("btn-danger");
                btnBlock.classList.add("btn-success");
            }
        })
        axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.pseudo + '/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
        .then(res => {
            if (this._isMounted) {
                this.setState({
                    pseudo2: res.data.interactions
                })
            }
        }).catch(error => {
            console.log(error)
        }).then(() => {
            if (this.state.pseudo2) {
                btnLove.classList.remove("btn-danger");
                btnLove.classList.add("btn-success");
            }
        })
        axios.get('http://localhost:5000/api/members/exist/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (res.data.status === 'pseudo not exist' && this._isMounted) {
                this.setState({error: true})
                this.setRedirect()
            }
            else {
                if (this.state.pseudo !== this.props.pseudo) {
                    axios.post('http://localhost:5000/api/interactions', {
                        from: this.props.pseudo,
                        to: this.state.pseudo,
                        data: 'view'
                    }, {headers: { "x-access-token": this.props.token }})
                    socket.emit('notification', {from: this.props.pseudo, to: this.state.pseudo, notif: 'view'})
                }
                axios.get('http://localhost:5000/api/members/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
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
                axios.get('http://localhost:5000/api/interactions/like/count/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
                    .then(res => {
                        if (this._isMounted) {
                            this.setState({
                                popularity: res.data.interactions
                            })
                        }           
                    }).catch(error => {
                        console.log(error)
                })
                axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.pseudo + '/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
                    if (this._isMounted) {
                        this.setState({
                            pseudo1: res.data.interactions
                        })
                    }           
                }).catch(error => {
                    console.log(error)
                })
                axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.state.pseudo + '/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
                    if (this._isMounted) {
                        this.setState({
                            pseudo2: res.data.interactions
                        })
                    }           
                }).catch(error => {
                    console.log(error)
                })
            }
        })
        socket.on('notification', this.receptionSocket)
    }

    receptionSocket = notif => {
        if (this._isMounted && notif.to === this.props.pseudo) {
            this.setState({
                pseudo1: 1
            })
        }
    }

    handleLike = () => {
        var btnLove = document.getElementById('btn-love')

        axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.pseudo + '/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
        .then(res => {
            if (res.data.interactions === 0) {
                btnLove.classList.remove("btn-danger");
                btnLove.classList.add("btn-success");
                axios.post('http://localhost:5000/api/notif/' + this.state.pseudo + '/true')
                axios.post('http://localhost:5000/api/interactions', {
                    from: this.props.pseudo,
                    to: this.state.pseudo,
                    data: 'like'
                }, {headers: { "x-access-token": this.props.token }})
                .then(() => {
                    axios.get('http://localhost:5000/api/interactions/like/count/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
                    .then(res => {
                        axios.post('http://localhost:5000/api/members/profile/pop/' + this.state.pseudo, {
                            popularity: res.data.interactions
                        }, {headers: { "x-access-token": this.props.token }})
                        if (this._isMounted) {
                            this.setState({ popularity: res.data.interactions })
                        }         
                    }).catch(error => {
                        console.log(error)
                    })
                    axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.pseudo + '/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
                    .then(res => {
                        if (this._isMounted) {
                            this.setState({ pseudo2: res.data.interactions })
                        }
                    })
                    .then(() => {
                        if (this.state.pseudo1 !== 0 && this.state.pseudo2 !== 0) {
                            socket.emit('notificationMsg', {from: this.props.pseudo, to: this.state.pseudo, notif: 'retour'})
                            socket.emit('notification', {from: this.props.pseudo, to: this.state.pseudo, notif: 'retour'})
                            axios.post('http://localhost:5000/api/messages', {
                                from: this.props.pseudo,
                                to: this.state.pseudo,
                                data: "C'est un match !"
                            })
                        }
                        else {
                            socket.emit('notification', {from: this.props.pseudo, to: this.state.pseudo, notif: 'like'})
                        }
                    })
                    
                })
            }
            else {
                btnLove.classList.add("btn-danger");
                btnLove.classList.remove("btn-success");
                socket.emit('notification', {from: this.props.pseudo, to: this.state.pseudo, notif: 'unlike'})
                axios.post('http://localhost:5000/api/interactions/remove', {
                    from: this.props.pseudo,
                    to: this.state.pseudo,
                    data: 'like'
                }, {headers: { "x-access-token": this.props.token }}).then(() => {
                    axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.pseudo + '/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
                    .then(res => {
                        if (this._isMounted) {
                            this.setState({ pseudo2: res.data.interactions })
                        }
                    })
                    axios.get('http://localhost:5000/api/interactions/like/count/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
                    .then(res => {
                        axios.post('http://localhost:5000/api/members/profile/pop/' + this.state.pseudo, {
                            popularity: res.data.interactions
                        }, {headers: { "x-access-token": this.props.token }})
                        if (this._isMounted) {
                            this.setState({ popularity: res.data.interactions })
                        }           
                    }).catch(error => {
                        console.log(error)
                    })
                })
            }
        })
    }

    handleBlock = () => {
        var btnBlock = document.getElementById('btn-block')

        axios.get('http://localhost:5000/api/interactions/block/isblock/' + this.props.pseudo + '/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
        .then(res => {
            if (res.data.interactions === 0) {
                btnBlock.classList.remove("btn-danger");
                btnBlock.classList.add("btn-success");
                axios.post('http://localhost:5000/api/interactions', {
                    from: this.props.pseudo,
                    to: this.state.pseudo,
                    data: 'block'
                }, {headers: { "x-access-token": this.props.token }})
            }
            else {
                btnBlock.classList.add("btn-danger");
                btnBlock.classList.remove("btn-success");
                axios.post('http://localhost:5000/api/interactions/remove', {
                    from: this.props.pseudo,
                    to: this.state.pseudo,
                    data: 'block'
                }, {headers: { "x-access-token": this.props.token }})
            }
        })
    }

    handleReport = () => {
        if (window.confirm("Reporter en tant que faux compte ?")) { 
            axios.get('http://localhost:5000/api/interactions/report/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }})
        }
    }

    handleProfile = () => {
        if (this.state.error === false) {
            return (
                <ChatProfile mobileView={true} name={this.state.pseudo}/>
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

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        if (this.props.isAuth === false) {
            return (
                <Redirect to={"/connexion"} />
            )
        }
        else if (this.state.pseudo === this.props.pseudo) {
            return (
                <Redirect to={"/profile"} />
            )
        }
        else if (this.state.blockMember.indexOf(this.state.pseudo) !== -1
        || this.state.blockMe.indexOf(this.state.pseudo) !== -1) {
            return (
                <Redirect to={"/accueil"} />
            )
        }
        else {
            return (
                <Fragment>
                {this.handleRedirect()}
                <Header />
                <div className="container">
                    <div className="row">
                        <div className='col-lg-3 col-md-3 text-center mt-5'><br/><br/><br/>
                            <div className="row">
                                <div className="col">
                                    <button id="btn-love" className="btn btn-circle btn-lg btn-danger mt-lg-5" onClick={this.handleLike}><i className="fas fa-heart"> {this.state.popularity}</i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-md-6 mt-lg-4 mt-md-4">
                            {this.handleProfile()}
                        </div>
                        <div className='col-lg-3 col-md-3 mt-5 text-center'>
                            <div className="row">
                                <div className="col col-lg-12"><br/><br/><br/>
                                    <h3>Block</h3>
                                    <button id="btn-block" className="btn btn-circle btn-lg btn-danger" onClick={this.handleBlock}><i className="fas fa-ban"></i></button>
                                </div>
                                <div className="col col-lg-12"><br/><br/><br/>
                                    <h3>Report</h3>
                                    <button id="btn-report" className="btn btn-circle btn-lg btn-danger" onClick={this.handleReport}><i className="fas fa-bug"></i></button>
                                </div>
                            </div>
                            <br/><br/>
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
        pseudo: state.pseudo,
        isAuth: state.isAuth,
        token: state.token
    }
}

export default connect(mapStateToProps, null)(ExternalProfile)