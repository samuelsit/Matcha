import React, { Component, Fragment } from 'react'

class Notification extends Component {
    render () {
        return (
            <Fragment>
                <span className="text-left">
                    <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                    <span className="card-title h5 middle"> {this.props.login} {this.props.eve === "like" ? "vous a liké" : "à consulté votre profil"}</span>
                </span>
                <hr/>
            </Fragment>
        )
    }
}

export default Notification