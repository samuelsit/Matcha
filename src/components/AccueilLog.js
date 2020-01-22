import React, { Component, Fragment } from 'react'
import Header from './Header'

class Accueil extends Component {
    render () {
        return (
            <Fragment>
                <Header/>
                <br/><br/><br/>
                <div className="container mt-5">
                    <div className="row text-center">
                        <div className="col-6 col-lg-3 mt-2">
                            <div className="card">
                                <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                <div className="card-body">
                                    <div className="text-dark"><h5 className="card-title">Florian</h5></div>
                                    <p className="card-text">31 ans - Bruxelles</p>
                                    <div className="btn btn-danger btn-circle btn-lg text-light mx-2"><i className="far fa-heart"></i></div>
                                    <div className="btn btn-primary btn-circle btn-lg text-light mx-2"><i className="far fa-comments"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 mt-2">
                            <div className="card">
                                <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                <div className="card-body">
                                    <div className="text-dark"><h5 className="card-title">Florian</h5></div>
                                    <p className="card-text">31 ans - Bruxelles</p>
                                    <div className="btn btn-danger btn-circle btn-lg text-light mx-2"><i className="far fa-heart"></i></div>
                                    <div className="btn btn-primary btn-circle btn-lg text-light mx-2"><i className="far fa-comments"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 mt-2">
                            <div className="card">
                                <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                <div className="card-body">
                                    <div className="text-dark"><h5 className="card-title">Florian</h5></div>
                                    <p className="card-text">31 ans - Bruxelles</p>
                                    <div className="btn btn-danger btn-circle btn-lg text-light mx-2"><i className="far fa-heart"></i></div>
                                    <div className="btn btn-primary btn-circle btn-lg text-light mx-2"><i className="far fa-comments"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 mt-2">
                            <div className="card">
                                <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                <div className="card-body">
                                    <div className="text-dark"><h5 className="card-title">Florian</h5></div>
                                    <p className="card-text">31 ans - Bruxelles</p>
                                    <div className="btn btn-danger btn-circle btn-lg text-light mx-2"><i className="far fa-heart"></i></div>
                                    <div className="btn btn-primary btn-circle btn-lg text-light mx-2"><i className="far fa-comments"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Accueil