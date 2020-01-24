import React, { Component, Fragment } from 'react'
import Header from './Header'

class Profile extends Component {
    render () {
        return (
            <Fragment>
                <Header loggued="true"/><br/><br/><br/>
                <div className="container">
                    <div className="row p-2">
                        <div className="col-lg-5 text-center">
                            <div className="bg-dark p-4 rounded">
                                <h1 className="text-light">MES INFOS</h1>
                                <form>
                                    <input type="text" className="bg-dark text-white w-100 rounded text-center font-weight-bold form-control" value="Sam" required disabled /><br/>
                                    <input type="text" name="nom" placeholder="Nom" className="bg-dark text-white w-100 rounded text-center font-weight-bold form-control" value="Sitruk" required /><br/>
                                    <input type="text" name="prenom" placeholder="Prénom" className="bg-dark text-white mt-1 w-100 rounded text-center font-weight-bold form-control" value="Samuel" required /><br/>
                                    <input type="text" name="phone" placeholder="Téléphone" className="bg-dark text-white mt-1 w-100 rounded text-center font-weight-bold form-control" value="0646418150" required /><br/>
                                    <input type="email" name="email" placeholder="E-mail" className="bg-dark text-white mt-1 w-100 rounded text-center font-weight-bold form-control" value="samsitruk@gmail.com" required /><br/><br/>
                                    <input type="submit" className="btn btn-light" value="MODIFIER" />
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-7 text-center">
                            <div className="row rounded">
                                <div className="col-12 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Profile