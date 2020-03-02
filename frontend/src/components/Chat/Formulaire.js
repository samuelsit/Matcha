import React, { Component } from 'react'
import '../../css/Chat.css'

class Formulaire extends Component {
    state = {
        message: '',
        length: this.props.length
    }

    createMessage = () => {
        const { addMessage, pseudo, length } = this.props

        const message = {
            pseudo,
            message: this.state.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
        addMessage(message)
        this.setState({message: '', length})
    }

    handleChange = event => {
        const message = event.target.value
        const length = this.props.length - message.length
        this.setState({message, length})
    }

    handleSubmit = event => {
        event.preventDefault()
        this.createMessage()
    }

    render () {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                <input type="text" className="form-control" value={this.state.message} maxLength={this.props.length} required onChange={this.handleChange}/>
                <div className="text-right h2 mt-3">
                    {this.state.length}
                </div>
                <button className="btn btn-circle btn-danger text-light w-100" type="submit">
                    Envoyer
                </button>
                </div>
            </form>
        )
    }
}

export default Formulaire