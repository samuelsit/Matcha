import React, { Component, Fragment } from 'react'
import '../css/NotifBar.css'
import * as $ from 'jquery'
import NotificationBar from './NotificationBar'
import { connect } from 'react-redux'
import axios from 'axios'

class NotificationButton extends Component {
    _isMounted = false

    state = {
        isOpenNotif: false,
        lastNotif: [],
        fullName: ''
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