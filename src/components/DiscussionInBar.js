import React, { Component, Fragment } from 'react'
import { Redirect } from "react-router-dom"

class DiscussionInBar extends Component {

    state = {
        redirect: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    
    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={`/pseudo/${this.props.login}`} />
            )
        }
    }

    render () {
        return (
            <Fragment>
                {this.handleRedirect()}
                <span className="text-left" onClick={this.setRedirect}>
                    <img className="rounded-circle" src="https://picsum.photos/30/30" alt="Card cap" />
                    <span className="card-title h5 middle"> {this.props.login}</span> -
                    <span className="card-text h5 middle text-secondary"> {this.props.message}</span>
                </span>
                <hr/>
            </Fragment>
        )
    }
}

export default DiscussionInBar