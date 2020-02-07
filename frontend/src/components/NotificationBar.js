import React, { Component, Fragment } from 'react'
import axios from 'axios'

class NotificationBar extends Component {
    _isMounted = false

    state = {
        user: '',
        isPic: false
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

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        const pic = this.state.isPic === false ? require('../pictures/noPic.png') : require(`../pictures/profile/${this.props.login}_1.png`)
        return (
            <Fragment>
                <span className="text-left">
                    <img className="rounded-circle" width="30" height="30" src={pic} alt="Card cap" />
                    <span className="card-title h5 middle"> {this.state.user} {this.props.eve === "like" ? "vous a liké" : "à consulté votre profil"}</span>
                </span>
                <hr/>
            </Fragment>
        )
    }
}

export default NotificationBar