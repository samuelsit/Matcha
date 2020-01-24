import React, { Component, createRef, Fragment } from 'react'
import './chat.css'
import './animations.css'

import Formulaire from './Formulaire'
import Message from './Message'
import Header from '../Header'
import ChatProfile from './ChatProfile'

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  messagesRef = createRef()

  componentDidUpdate () {
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message

    this.setState({messages})
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    const messages = Object
    .keys(this.state.messages)
    .map(key => (
        <Message isUser={this.isUser} message={this.state.messages[key].message} pseudo={this.state.messages[key].pseudo} />
    ))
    return (
      <Fragment>
        <Header loggued="true"/>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3 mt-lg-5">
              <ChatProfile name={this.props.match.params.pseudo} age="22" country="Paris 17" isLoggued="true" />
            </div>
            <div className='box col-9'>
              <div>
                <h1 className="text-center d-sm-block d-lg-none d-md-block font-weight-bold">~ {this.props.match.params.pseudo} ~</h1>
                <div className="messages border" ref={this.messagesRef}>
                  <div className="message">
                    {messages}
                  </div>
                </div>
              </div>
              <Formulaire length={140} pseudo={this.state.pseudo} addMessage={this.addMessage} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
