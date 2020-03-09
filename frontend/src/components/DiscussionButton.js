import React, { Component, Fragment } from 'react'
import '../css/DiscussionBar.css'
import * as $ from 'jquery'
import DiscussionBar from './DiscussionBar'
import axios from 'axios'
import { connect } from 'react-redux'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

class DiscussionButton extends Component {
    _isMounted = false

    state = {
        lastMessages: [],
        liveNotif: ''
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/messages/last/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (this._isMounted) {
                this.setState({lastMessages: res.data.lastMessages})
            }
        }).catch(error => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/notifMsg/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (this._isMounted) {
                if (res.data.notif === true) {
                    document.getElementById("notifMsg").style.display = "block";
                }
            }
        }).catch(error => {
            console.log(error)
        })
        if (this._isMounted) {
            socket.on('notification', this.receptionSocket)
            socket.on('chat message', this.receptionSocketMsg)
        }
    }

    handleOpen = () => {
        document.getElementById("notifMsg").style.display = "none";
        axios.post('http://localhost:5000/api/notifMsg/' + this.props.pseudo + '/false', {headers: { "x-access-token": this.props.token }})
        $('#messenger').fadeIn()
        $('#fixed-bottom').fadeOut()
    }

    handleClose = () => {
        document.getElementById("notifMsg").style.display = "none";
        axios.post('http://localhost:5000/api/notifMsg/' + this.props.pseudo + '/false', {headers: { "x-access-token": this.props.token }})
        $('#fixed-bottom').fadeIn()
        $('#messenger').fadeOut()
    }

    receptionSocket = notif => {
        if (notif.notif === 'retour') {
            axios.post('http://localhost:5000/api/notifMsg/' + this.props.pseudo + '/true', {headers: { "x-access-token": this.props.token }})
            if (notif.from === this.props.pseudo && this._isMounted) {
                document.getElementById("notifMsg").style.display = "block";
                this.setState({ liveNotif:
                    <DiscussionBar
                        login={notif.to}
                        message={'C\'est un match !'}
                    />
                })
            }
            else {
                document.getElementById("notifMsg").style.display = "block";
                if (this._isMounted) {
                    this.setState({ liveNotif:
                        <DiscussionBar
                            login={notif.from}
                            message={'C\'est un match !'}
                        />
                    })
                }
            }
        }
    }

    receptionSocketMsg = msg => {
        if (this.props.pseudo === msg.to) {
            axios.post('http://localhost:5000/api/notifMsg/' + this.props.pseudo + '/true', {headers: { "x-access-token": this.props.token }})
            document.getElementById("notifMsg").style.display = "block";
            if (this._isMounted) {
                this.setState({ liveNotif:
                    <DiscussionBar
                        login={msg.from}
                        message={msg.message}
                    />
                })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        let discussions = this.state.lastMessages.map((el, i) => (
            <DiscussionBar
                key={i}
                login={el.user}
                message={el.data}
            />
        ))

        return (
            <Fragment>
                <div id="fixed-bottom">
                    <span className="notifMsg" id="notifMsg" onClick={this.handleOpen}></span>
                    <button className="btn btn-primary btn-circle btn-xl" onClick={this.handleOpen}><i className="far fa-comments h1"></i></button>
                </div>
                <div className="card border-secondary shadow overflow-auto" id="messenger">
                    <div className="text-dark card-header bg-light" id="discuss-head">
                        <span className="text-left">
                            <span className="card-title h5 middle"> Discussions </span>
                        </span>
                        <span id="cross">
                            <span onClick={this.handleClose}><i className="close">&times;</i></span>
                        </span>
                    </div>
                    <div className="card-body">
                        {this.state.liveNotif}
                        {discussions}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        token: state.token
    }
}

export default connect(mapStateToProps, null)(DiscussionButton)