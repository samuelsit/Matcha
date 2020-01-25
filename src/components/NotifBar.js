import React, { Component, Fragment } from 'react'
import '../css/NotifBar.css'
import * as $ from 'jquery'

class NotifBar extends Component {
    handleOpen = () => {
        $('#notif').fadeIn()
    }

    handleClose = () => {
        $('#notif').fadeOut()
    }

    render () {
        return (
            <Fragment>
                <div className="btn btn-warning btn-circle text-light mr-2" onClick={this.handleOpen}><i className="far fa-bell"></i></div>
                <div className="card border-secondary shadow" id="notif">
                    <div className="text-dark card-header">
                        <span className="text-left">
                            <span className="card-title h5 middle"> Notifications </span>
                        </span>
                        <span id="cross">
                            <span onClick={this.handleClose}><i className="fas fa-times"></i></span>
                        </span>
                    </div>
                    <div className="card-body">
                        <span className="text-left">
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri à consulté votre profil</span>
                        </span>
                        <hr/>
                        <span className="text-left">
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri vous a liké</span>
                        </span>
                        <hr/>
                        <span className="text-left">
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri à consulté votre profil</span>
                        </span>
                        <hr/>
                        <span className="text-left">
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri vous a liké</span>
                        </span>
                        <hr/>
                        <span className="text-left">
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri à consulté votre profil</span>
                        </span>
                        <hr/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NotifBar