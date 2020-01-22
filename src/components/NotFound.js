import React, { Component } from 'react'

class NotFound extends Component {
    render () {
        return (
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                    <div className="font-weight-bold text-light bg-dark p-5 rounded">
                        <p>Erreur 404.</p>
                        <p>La page que vous cherchez n'existe pas.</p>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default NotFound