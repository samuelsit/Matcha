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
                        <p className="card-text"><span className="font-weight-bold">Age: </span>{this.props.age} ans</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Pays: </span>{this.props.country}</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Attirance: </span>Homme, Femme</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Biographie: </span><br/>Vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez.vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez.</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Centre d'interet: </span><br/>#matcha, #money</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ChatProfile