import React, { Component, Fragment } from 'react'
import '../css/DiscussionBar.css'
import * as $ from 'jquery'
import DiscussionBar from './DiscussionBar'

class DiscussionButton extends Component {

    handleOpen = () => {
        $('#messenger').fadeIn()
        $('#fixed-bottom').fadeOut()
    }

    handleClose = () => {
        $('#fixed-bottom').fadeIn()
        $('#messenger').fadeOut()
    }

    render () {
        return (
            <Fragment>
                <div id="fixed-bottom">
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
                        <DiscussionBar login="Romane Benizri" message="salut ca va ?"/>
                        <DiscussionBar login="Sam Sitruk" message="ecole 42"/>
                        <DiscussionBar login="Jerem Marciano" message="demain"/>
                        <DiscussionBar login="Gustave Eiffel" message="..."/>
                        <DiscussionBar login="Picasso" message="pourquoi?"/>
                        <DiscussionBar login="Zinedine Zidane" message="ftg"/>
                        <DiscussionBar login="Pinocchio" message="ok"/>
                        <DiscussionBar login="Elon Musk" message="dacc"/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DiscussionButton