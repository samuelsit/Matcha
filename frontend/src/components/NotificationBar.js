import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

class NotificationBar extends Component {
    _isMounted = false

    state = {
        user: '',
        profilePic: '',
        redirect: false,
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
        axios.get('http://localhost:5000/api/members/' + this.props.login, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (this._isMounted) {
                this.setState({user: res.data.member.firstname + ' ' + res.data.member.lastname, profilePic: res.data.member.pictures._1})
            }
        }).catch(error => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/members/pictures/profile/' + this.props.login, {headers: { "x-access-token": this.props.token }}).then(res => {
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
        let pic = /^(http|https):/.test(this.state.profilePic) ? this.state.profilePic : this.state.profilePic !== '' ? require(`../pictures/profile/${this.state.profilePic}`) : require(`../pictures/profile/noPic.png`)
        let action
        if (this.props.eve === 'like') {
            action = 'vous a liké'
        }
        else if (this.props.eve === 'unlike') {
            action = 'vous a disliké'
        }
        else if (this.props.eve === 'retour') {
            action = 'vous a liké en retour'
        }
        else {
            action = 'à consulté votre profil'
        }
        if (this.state.blockMember.indexOf(this.props.login) === -1
        && this.state.blockMe.indexOf(this.props.login) === -1) {
            return (
                <Fragment>
                    {this.handleRedirect()}
                    <span className="text-left" onClick={this.handleView}>
                        <img className="rounded-circle" width="50" height="50" style={{objectFit:'cover'}} src={pic} alt="Card cap" />
                        <span className="card-title h5 middle"> {this.state.user} {action}</span>
                    </span>
                    <hr/>
                </Fragment>
            )
        }
        else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        token: state.token
    }
}

export default connect(mapStateToProps, null)(NotificationBar)