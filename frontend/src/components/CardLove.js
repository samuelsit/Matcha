import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CardLove extends Component {

    _isMounted = false

    state = {
        picture: '',
        popularity: 0,
        email1: 0,
        email2: 0,
        isShow: true
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.email + '/' + this.props.mail).then(res => {
            if (this._isMounted) {
                this.setState({
                    email2: res.data.interactions
                })
            }           
        }).catch(error => {
            console.log(error)
        }).then(() => {
            if (this.state.email2) {
                this.setState({ isShow: false })
            }
        })
        axios.get('http://localhost:5000/api/members/' + this.props.mail).then(res => {
            if (this._isMounted) {
                this.setState({
                    picture: res.data.member.pictures._1
                })
            }           
        }).catch(error => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/interactions/like/count/' + this.props.mail)
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

    handleClick = () => {
        axios.post('http://localhost:5000/api/interactions', {
            from: this.props.email,
            to: this.props.mail,
            data: 'like'
        }).then(() => {
            axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.mail + '/' + this.props.email).then(res => {
                if (this._isMounted) {
                    this.setState({
                        email1: res.data.interactions
                    })
                }           
            }).catch(error => {
                console.log(error)
            }).then(() => {
                axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.props.email + '/' + this.props.mail).then(res => {
                    if (this._isMounted) {
                        this.setState({
                            email2: res.data.interactions
                        })
                    }           
                }).catch(error => {
                    console.log(error)
                }).then(() => {
                    if (this.state.email1 && this.state.email2) {
                        axios.post('http://localhost:5000/api/messages', {
                            from: this.props.email,
                            to: this.props.mail,
                            data: "C'est un match !"
                        })
                    }
                    this.setState({ isShow: false })
                })
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        var isLoggued = this.props.isLoggued === "true" ? "badge badge-pill badge-success" : "badge badge-pill badge-danger"
        var gender = null
        var colorgender = null
        var love = null
        var colorlove = null
        var distance = isNaN(this.props.distance) ? null : "(" + this.props.distance + " km)"
        let profilepic = this.state.picture !== '' ? require(`../pictures/profile/${this.state.picture}`) : require(`../pictures/noPicAccueil.png`)

        if (this.props.gender === "male") {
            gender = "fas fa-mars"
            colorgender = "badge badge-pill badge-primary"
        }
        else {
            gender = "fas fa-venus"
            colorgender = "badge badge-pill badge-danger"
        }
        if (this.props.love === "het") {
            love = "fas fa-venus-mars"
            colorlove = "btn btn-info"
        }
        else {
            if (this.props.gender === "male" ) {
                love = "fas fa-mars-double"
                colorlove = "btn btn-warning"
            }
            else {
                love = "fas fa-venus-double"
                colorlove = "btn btn-warning"
            }
        }
        if (this.state.isShow === false) {
            return (
                null
            )
        }
        else {
            return (
                <div className="col-6 col-lg-3 col-md-4 mt-4">
                    <div className="card">
                        <Link to={`/profile/${this.props.mail}`}>
                        <img className="card-img-top" src={profilepic} alt="Card cap"/>
                        <div className="text-dark text-left card-header"><h5 className="card-title">{this.props.name} <span className={isLoggued}> </span> <span className={colorgender.concat(' ', "float-right")}><i className={gender}></i></span></h5></div>
                        </Link>
                        <div className="card-body">
                            <p className="card-text">{this.props.age} ans<br/><i className="fas fa-map-marker-alt"></i> {this.props.country} {distance}</p><hr/>
                            <code>{this.props.interet ? this.props.interet : "Pas de centre d'intêret"}</code>
                            <p className="card-text"></p><hr/>
                            <div className="btn btn-danger btn-circle text-light float-left" onClick={this.handleClick}><i className="fas fa-heart"> {this.state.popularity}</i></div>
                            <div className={colorlove.concat(' ', 'float-right')}><i className={love.concat(' ', 'text-light')}></i></div>
                            {this.props.love === "bi" ? <div className="btn btn-info float-right mr-1"><i className="fas fa-venus-mars"></i></div> : null}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        email: state.email
    }
}

export default connect(mapStateToProps, null)(CardLove)