import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'

class HistoryMember extends Component {
    _isMounted = false

    state = {
        firstname: '',
        lastname: '',
        profilePic: '',
        redirect: false
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/members/' + this.props.login, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (this._isMounted) {
                this.setState({firstname: res.data.member.firstname, lastname: res.data.member.lastname, profilePic: res.data.member.pictures._1})
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
        return (
            <Fragment>
                {this.handleRedirect()}
                <tr onClick={this.handleView}>
                    <th scope="row"><img className="rounded-circle" width="30" height="30" src={pic} alt="profilePicture"/></th>
                    <td>{this.state.lastname}</td>
                    <td>{this.state.firstname}</td>
                </tr>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps, null)(HistoryMember)