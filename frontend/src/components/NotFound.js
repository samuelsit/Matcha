import React, { Component, Fragment } from 'react'
import Header from './Header'

class NotFound extends Component {
    render () {
        return (
            <Fragment>
                <Header loggued="true"/>
                <br/><br/><br/><br/>
                <div className="container h-100">
                    <div className="col-12 text-center">
                        <div className="h2 font-weight-bold text-light bg-dark p-5 rounded shadow-lg">
                            <p>Erreur 404.</p>
                            <p>La page que vous cherchez n'existe pas.</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NotFound