import React, { Component, createRef, Fragment } from 'react'
import '../../css/Chat.css'
import Formulaire from './Formulaire'
import Message from './Message'
import Header from '../Header'
import ChatProfile from './ChatProfile'
import DiscussionButton from '../DiscussionButton'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import io from 'socket.io-client'
import * as $ from 'jquery'

const socket = io('http://localhost:5000')

class Chat extends Component {
  _isMounted = false

  state = {
    messages: [],
    pseudo: this.props.match.params.pseudo,
    private: false,
    redirect: false
  }

  componentDidMount() {
    this._isMounted = true
    axios.get('http://localhost:5000/api/messages/exist/' + this.state.pseudo + '/' + this.props.pseudo)
    .then(res => {
      if (this._isMounted) {
        if (res.data.data) {
          this.setState({ private: false })
        }
        else {
          this.setState({ redirect: true })
          this.setState({ private: true })
        }
      }
    })
    axios.get('http://localhost:5000/api/members/' + this.state.pseudo)
    .then(res => {
        if (this._isMounted) {
              this.setState({
                  firstname: res.data.member.firstname,
                  lastname: res.data.member.lastname
              })
        }
    }).catch(error => {
        console.log(error)
    })
    axios.get('http://localhost:5000/api/messages/all/' + this.state.pseudo + '/' + this.props.pseudo).then(res => {
        if (this._isMounted) {
            this.setState({
                messages: res.data.messages
            })
        }
    }).catch(error => {
        console.log(error)
    })
    socket.on('chat message', this.receptionSocket)
  }

  receptionSocket = msg => {
    var message
    if (msg.from !== this.props.pseudo) {
      message = '<div class="badge badge-pill badge-primary float-right">' + msg.message + '</div><br/>'
    }
    else {
      message = '<div class="badge badge-pill badge-secondary float-left">' + msg.message + '</div><br/>'
    }
        
    $('#message').append(message)
  }

  handleRedirect = () => {
    if (this.state.redirect) {
        return (
            <Redirect to={"/profile"} />
        )
    }
  }

  messagesRef = createRef()

  componentDidUpdate () {
    if (this.state.private) {
      const ref = this.messagesRef.current
      ref.scrollTop = ref.scrollHeight
    }
  }

  addMessage = message => {
    socket.emit('chat message', {message: message.message, from: message.pseudo, to: this.state.pseudo})
    axios.post('http://localhost:5000/api/messages', {
        from: this.props.pseudo,
        to: this.state.pseudo,
        data: message.message
    })
  }

  isUser = pseudo => pseudo !== this.state.pseudo

  componentWillUnmount() {
    this._isMounted = false
  }

  render () {
    let messages = this.state.messages.map((el, i) => (
      <Message key={i} isUser={this.isUser} message={el.data} pseudo={el.from}/>
    ))
    if (!this.props.isAuth) {
      return (
          <Redirect to={"/connexion"} />
      )
    }
    else if ((this.props.pseudo === this.state.pseudo) || (this.state.private)) {
      return (
        <Redirect to={"/profile"} />
      )
    }
    else {
      return (
        <Fragment>
          {this.handleRedirect()}
          <Header />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-3 mt-lg-4">
                <ChatProfile mobileView={false} name={this.state.pseudo}/>
              </div>
              <div className='col-lg-9'>
                <div><br/><br/><br/>
                  <h1 className="text-center d-sm-block d-lg-none d-md-block font-weight-bold">{this.state.firstname} {this.state.lastname} <span className="badge badge-pill badge-success"> </span></h1>
                  <div className="messages shadow-sm" ref={this.messagesRef}>
                    <div id="message" className="h1 text-right mt-2">
                      {messages}
                    </div>
                  </div>
                </div>
                <Formulaire length={140} pseudo={this.state.pseudo} addMessage={this.addMessage} />
              </div>
            </div>
          </div>
          <DiscussionButton/>
        </Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
      pseudo: state.pseudo,
      isAuth: state.isAuth
  }
}

export default connect(mapStateToProps, null)(Chat)