import React, { Component } from 'react'
import '../css/FilterSort.css'
import * as $ from 'jquery'

class FilterSort extends Component {

    handleOpen = () => {
        $('#mysort').fadeIn()
        $('.btn-search').hide()
    }

    handleClose = () => {
        $('.btn-search').fadeIn()
        $('#mysort').hide()
    }

    render () {
        return (
            <div className="text-center">
                <button onClick={this.handleOpen} className="btn btn-secondary btn-search"><i className="fas fa-search"></i></button>
                <div className="card" id="mysort">
                    <div className="card-header">
                        <span id="cross">
                            <span onClick={this.handleClose}><i className="close">&times;</i></span>
                        </span>
                        <span className="h1 align-middle">Trier par: </span>
                        <div className="btn-group btn-group-lg" role="group">
                            <div className="container-fluid">
                                <label htmlFor="age"><button type="button" className="btn btn-secondary" name="tri" id="age" onClick={this.props.getRange}>Âge</button></label>
                                <input type="radio" className="d-none"/>
                                <label htmlFor="pop"><button type="button" className="btn btn-secondary" name="tri" id="pop" onClick={this.props.getRange}>Popularité</button></label>
                                <input type="radio" className="d-none"/>
                                <label htmlFor="dis"><button type="button" className="btn btn-secondary" name="tri" id="dis" onClick={this.props.getRange}>Distance</button></label>
                                <input type="radio" className="d-none"/>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6">
                                    <label htmlFor="customRange1" className="h3">Filtrer par âge: <code>{this.props.filtreAge  + ' ans'}</code></label>
                                    <input type="range" className="custom-range" id="customRange1" name="customRange1" min="18" max="99" value={this.props.filtreAge} onChange={this.props.getRange}></input>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="customRange2" className="h3">Filtrer par popularité: <code>{this.props.filtrePop <= '1' && this.props.filtrePop !== '0-1000' ? this.props.filtrePop + ' match' : this.props.filtrePop + ' matchs'}</code></label>
                                    <input type="range" className="custom-range" id="customRange2" name="customRange2" min="0" max="1000" value={this.props.filtrePop} onChange={this.props.getRange}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label htmlFor="customRange1" className="h3">Filtrer par distance: <code>{this.props.filtreDis} km</code></label>
                                    <input type="range" className="custom-range" id="customRange3" name="customRange3" min="0" max="10000" value={this.props.filtreDis} onChange={this.props.getRange}></input>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="customRange1" className="h3">Filtrer par tags populaires: </label>
                                    <div className="form-check">
                                        <input className="form-check-input interest" type="checkbox" id="musique" value="musique" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="musique"><code>#musique </code></label>
                                        <input className="form-check-input interest" type="checkbox" id="sciences" value="sciences" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="sciences"><code>#sciences </code></label>
                                        <input className="form-check-input interest" type="checkbox" id="sport" value="sport" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="sport"><code>#sport </code></label>
                                        <input className="form-check-input interest" type="checkbox" id="voyage" value="voyage" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="voyage"><code>#voyage </code></label>
                                        <input className="form-check-input interest" type="checkbox" id="art" value="art" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="art"><code>#art </code></label>
                                        <input className="form-check-input interest" type="checkbox" id="humour" value="humour" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="humour"><code>#humour </code></label>
                                        <input className="form-check-input interest" type="checkbox" id="amour" value="amour" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="amour"><code>#amour </code></label>
                                        <input className="form-check-input interest" type="checkbox" id="matcha" value="matcha" onChange={this.props.interest}/>
                                        <label className="form-check-label" htmlFor="matcha"><code>#matcha </code></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterSort