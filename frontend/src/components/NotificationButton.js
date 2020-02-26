import React, { Component, Fragment } from 'react'
import '../css/NotifBar.css'
import * as $ from 'jquery'
import NotificationBar from './NotificationBar'
import { connect } from 'react-redux'
import axios from 'axios'
import notifSound from '../pictures/notif.mp3'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

class NotificationButton extends Component {
    _isMounted = false

    state = {
        isOpenNotif: false,
        lastNotif: [],
        fullName: '',
        liveNotif: ''
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/interactions/last/' + this.props.pseudo).then(res => {
            if (this._isMounted) {
                this.setState({lastNotif: res.data.interactions})
            }
        }).catch(error => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/notif/' + this.props.pseudo).then(res => {
            if (this._isMounted) {
                if (res.data.notif === true) {
                    $('.notif').fadeIn()
                }
            }
        }).catch(error => {
            console.log(error)
        })
        socket.on('notification', this.receptionSocket)
    }

    handleClose = () => {
        this.setState({ isOpenNotif: false })
        axios.post('http://localhost:5000/api/notif/' + this.props.pseudo + '/false')
        $('#notif').fadeOut()
    }

    handleOpen = () => {
        $('.notif').fadeOut()
        axios.post('http://localhost:5000/api/notif/' + this.props.pseudo + '/false')
        if (this.state.isOpenNotif === true) {
            this.handleClose()
        }
        else {
            this.setState({ isOpenNotif: true })
            $('#notif').fadeIn()
        }
    }

    receptionSocket = notif => {        
        if (this.props.pseudo === notif.to) {
            axios.post('http://localhost:5000/api/notif/' + this.props.pseudo + '/true')
            $('.notif').fadeIn()
            var audio = new Audio(notifSound);
            audio.play();            
            this.setState({ liveNotif:
                <NotificationBar
                    login={notif.from}
                    eve={notif.notif}
                />
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        let notifications = this.state.lastNotif.map((el, i) => (
            <NotificationBar
                key={i}
                login={el.from}
                eve={el.data}
            />
        ))

        return (
            <Fragment>
                <span className="notif" onClick={this.handleOpen}></span>
                <div className="btn btn-warning btn-notif text-light mr-2" onClick={this.handleOpen}><i className="fas fa-bell"></i></div>
                <div className="card border-secondary shadow overflow-auto" id="notif">
                    <div className="text-dark bg-light card-header" id="notif-head">
                        <span className="text-left">
                            <span className="card-title h5 middle"> Notifications </span>
                        </span>
                        <span id="cross">
                            <span onClick={this.handleClose}><i className="close">&times;</i></span>
                        </span>
                    </div>
                    <div className="card-body">
                        { this.state.liveNotif }
                        { notifications }
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        pseudo: state.pseudo
    }
}

export default connect(mapStateToProps, null)(NotificationButton)