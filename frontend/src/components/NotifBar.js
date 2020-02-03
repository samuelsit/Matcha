import React, { Component, Fragment } from 'react'
import '../css/NotifBar.css'
import * as $ from 'jquery'
import Notification from './Notification'

class NotifBar extends Component {
    state = {
        isOpenNotif: false
    }

    handleClose = () => {
        this.setState({ isOpenNotif: false })
        $('#notif').fadeOut()
    }

    handleOpen = () => {
        if (this.state.isOpenNotif === true) {
            this.handleClose()
        }
        else {
            this.setState({ isOpenNotif: true })
            $('#notif').fadeIn()
        }
    }

    render () {
        return (
            <Fragment>
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
                        <Notification login="Romane Benizri" eve="like"/>
                        <Notification login="Sam Sitruk" eve="like"/>
                        <Notification login="Jerem Marciano" eve="consult"/>
                        <Notification login="Gustave Eiffel" eve="consult"/>
                        <Notification login="Picasso" eve="like"/>
                        <Notification login="Zinedine Zidane" eve="consult"/>
                        <Notification login="Pinocchio" eve="like"/>
                        <Notification login="Elon Musk" eve="consult"/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NotifBar