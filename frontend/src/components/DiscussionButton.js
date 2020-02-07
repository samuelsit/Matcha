import React, { Component, Fragment } from 'react'
import '../css/DiscussionBar.css'
import * as $ from 'jquery'
import DiscussionBar from './DiscussionBar'
import axios from 'axios'
import { connect } from 'react-redux'

class DiscussionButton extends Component {
    _isMounted = false

    state = {
        lastMessages: []
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/messages/last/' + this.props.email).then(res => {
            if (this._isMounted) {
                this.setState({lastMessages: res.data.lastMessages})
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleOpen = () => {
        $('#messenger').fadeIn()
        $('#fixed-bottom').fadeOut()
    }

    handleClose = () => {
        $('#fixed-bottom').fadeIn()
        $('#messenger').fadeOut()
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
                        {discussions}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        email: state.email
    }
}

export default connect(mapStateToProps, null)(DiscussionButton)