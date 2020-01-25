import React, { Component, Fragment } from 'react'
import '../css/DiscussionBar.css'
import * as $ from 'jquery'
import { Redirect } from "react-router-dom"

class DiscussionBar extends Component {
    state = {
        redirect: false
    }

    handleOpen = () => {
        $('#messenger').fadeIn()
        $('#fixed-bottom').fadeOut()
    }

    handleClose = () => {
        $('#fixed-bottom').fadeIn()
        $('#messenger').fadeOut()
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to="/pseudo/Romane" />
            )
        }
    }

    render () {
        return (
            <Fragment>
                {this.handleRedirect()}
                <div id="fixed-bottom">
                    <button className="btn btn-primary btn-circle btn-xl" onClick={this.handleOpen}><i className="far fa-comments h1"></i></button>
                </div>
                <div className="card border-secondary shadow" id="messenger">
                    <div className="text-dark card-header">
                        <span className="text-left">
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Discussions </span>
                        </span>
                        <span id="cross">
                            <span onClick={this.handleClose}><i className="fas fa-times"></i></span>
                        </span>
                    </div>
                    <div className="card-body">
                        <span className="text-left" onClick={this.setRedirect}>
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri</span> -
                            <span className="card-text h5 middle text-secondary"> Lorem ipsum dolor...</span>
                        </span>
                        <hr/>
                        <span className="text-left" onClick={this.setRedirect}>
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri</span> -
                            <span className="card-text h5 middle text-secondary"> Lorem ipsum dolor...</span>
                        </span>
                        <hr/>
                        <span className="text-left" onClick={this.setRedirect}>
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri</span> -
                            <span className="card-text h5 middle text-secondary"> Lorem ipsum dolor...</span>
                        </span>
                        <hr/>
                        <span className="text-left" onClick={this.setRedirect}>
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri</span> -
                            <span className="card-text h5 middle text-secondary"> Lorem ipsum dolor...</span>
                        </span>
                        <hr/>
                        <span className="text-left" onClick={this.setRedirect}>
                            <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                            <span className="card-title h5 middle"> Romane Benizri</span> -
                            <span className="card-text h5 middle text-secondary"> Lorem ipsum dolor...</span>
                        </span>
                        <hr/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DiscussionBar