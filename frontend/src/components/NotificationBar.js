import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"

class NotificationBar extends Component {
    _isMounted = false

    state = {
        user: '',
        isPic: false,
        redirect: false
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/members/' + this.props.login).then(res => {
            if (this._isMounted) {
                this.setState({user: res.data.member.firstname + ' ' + res.data.member.lastname})
            }
        }).catch(error => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/members/pictures/profile/' + this.props.login).then(res => {
            if (this._isMounted) {
                this.setState({isPic: res.data.status})
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleView = () => {
        this.setState({
            redirect: true
        })
    }

    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={`/profile/${this.props.login}`} />
            )
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        const pic = this.state.isPic === false ? require('../pictures/profile/noPic.png') : require(`../pictures/profile/${this.props.login}_1.png`)
        return (
            <Fragment>
                {this.handleRedirect()}
                <span className="text-left" onClick={this.handleView}>
                    <img className="rounded-circle" width="30" height="30" src={pic} alt="Card cap" />
                    <span className="card-title h5 middle"> {this.state.user} {this.props.eve === "like" ? "vous a liké" : "à consulté votre profil"}</span>
                </span>
                <hr/>
            </Fragment>
        )
    }
}

export default NotificationBar