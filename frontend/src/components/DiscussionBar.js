import React, { Component, Fragment } from 'react'
import { Redirect } from "react-router-dom"
import axios from 'axios'

class DiscussionBar extends Component {

    _isMounted = false

    state = {
        redirect: false,
        member: [],
        isPic: false
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/members/' + this.props.login).then(res => {
            if (this._isMounted) {
                this.setState({member: res.data.member})
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

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    
    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={`/chat/${this.props.login}`} />
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
                <span className="text-left" onClick={this.setRedirect}>
                    <img className="rounded-circle" width="30" height="30" src={pic} alt="Card cap" />
                    <span className="card-title h5 middle"> {this.state.member.firstname} {this.state.member.lastname}</span> -
                    <span className="card-text h5 middle text-secondary"> {this.props.message.substring(0, 20)} &bull;</span>
                </span>
                <hr/>
            </Fragment>
        )
    }
}

export default DiscussionBar