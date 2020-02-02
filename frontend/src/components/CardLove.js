import React, { Component } from 'react'

class CardLove extends Component {

    render () {
        var isLoggued = this.props.isLoggued === "true" ? "badge badge-pill badge-success" : "badge badge-pill badge-danger"
        var gender = null
        var colorgender = null
        var love = null
        var colorlove = null
        var distance = isNaN(this.props.distance) ? null : "(" + this.props.distance + " km)"

        if (this.props.gender === "male") {
            gender = "fas fa-mars"
            colorgender = "badge badge-pill badge-primary"
        }
        else {
            gender = "fas fa-venus"
            colorgender = "badge badge-pill badge-danger"
        }
        if (this.props.love === "het") {
            love = "fas fa-venus-mars"
            colorlove = "btn btn-info"
        }
        else {
            if (this.props.gender === "male" ) {
                love = "fas fa-mars-double"
                colorlove = "btn btn-warning"
            }
            else {
                love = "fas fa-venus-double"
                colorlove = "btn btn-warning"
            }
        }

        return (
            <div className="col-6 col-lg-3 col-md-4 mt-4">
                <div className="card">
                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                    <div className="text-dark text-left card-header"><h5 className="card-title">{this.props.name} <span className={isLoggued}> </span> <span className={colorgender.concat(' ', "float-right")}><i className={gender}></i></span></h5></div>
                    <div className="card-body">
                        <p className="card-text">{this.props.age} ans<br/><i className="fas fa-map-marker-alt"></i> {this.props.country} {distance}</p><hr/>
                        <code>{this.props.interet}</code>
                        <p className="card-text"></p><hr/>
                        <div className="btn btn-danger btn-circle text-light float-left"><i className="fas fa-heart"> {this.props.isLoved}</i></div>
                        <div className={colorlove.concat(' ', 'float-right')}><i className={love.concat(' ', 'text-light')}></i></div>
                        {this.props.love === "bi" ? <div className="btn btn-info float-right mr-1"><i className="fas fa-venus-mars"></i></div> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default CardLove