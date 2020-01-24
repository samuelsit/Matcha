import React, { Component, Fragment } from 'react'

class ChatProfile extends Component {

    render () {
        var isLoggued = this.props.isLoggued === "true" ? "badge badge-pill badge-success" : "badge badge-pill badge-danger"        

        return (
            <Fragment>
                <div className="card mt-5 d-none d-lg-block">
                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                    <div className="text-dark card-header text-center"><h5 className="card-title">{this.props.name} <span className={isLoggued}> </span></h5></div>
                    <div className="card-body text-center">
                        <p className="card-text">{this.props.age} ans<br/>{this.props.country}</p>
                    </div>
                </div><br/><br/><br/>
                <img className="card-img-top d-none d-lg-block" src="https://picsum.photos/268/180" alt="Card cap" />
            </Fragment>
        )
    }
}

export default ChatProfile