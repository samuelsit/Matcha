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
                            <button type="button" className="btn btn-secondary">Âge</button>
                            <button type="button" className="btn btn-secondary">Popularité</button>
                            <button type="button" className="btn btn-secondary">Distance</button>
                            <button type="button" className="btn btn-secondary">Tags</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6">
                                    <label htmlFor="customRange1" className="h3">Filtrer par âge: <code>18-99</code></label>
                                    <input type="range" className="custom-range" id="customRange1"></input>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="customRange2" className="h3">Filtrer par popularité: <code>0-1000</code></label>
                                    <input type="range" className="custom-range" id="customRange2"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label htmlFor="customRange1" className="h3">Filtrer par distance: <code>en km</code></label>
                                    <input type="range" className="custom-range" id="customRange1"></input>
                                </div>
                                <div className="col-lg-6">
                                    <label htmlFor="customRange1" className="h3">Filtrer par tags populaires: </label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1"><code>#matcha </code></label>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox2"><code>#matcha </code></label>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox3"><code>#matcha </code></label>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox4"><code>#matcha</code></label>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox5"><code>#money</code></label>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox6"><code>#money</code></label>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox7"><code>#money</code></label>
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineCheckbox8"><code>#money</code></label>
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