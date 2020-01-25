import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CardLove extends Component {

    render () {
        var isLoggued = this.props.isLoggued === "true" ? "badge badge-pill badge-success" : "badge badge-pill badge-danger"        

        return (
            <div className="col-6 col-lg-2 mt-2">
                <div className="card">
                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                    <div className="text-dark card-header"><h5 className="card-title">{this.props.name} <span className={isLoggued}> </span></h5></div>
                    <div className="card-body">
                        <p className="card-text">{this.props.age} ans<br/>{this.props.country}</p>
                        <Link to={`/pseudo/${this.props.name}`}>
                            <div className="btn btn-danger btn-circle mt-2 text-light mx-2"><i className="fas fa-heart"></i></div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardLove