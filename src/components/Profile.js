import React, { Component, Fragment } from 'react'
import Header from './Header'
import DiscussionBar from './DiscussionBar'
import '../css/Profile.css'

class Profile extends Component {
    render () {
        return (
            <Fragment>
                <Header loggued="true"/><br/><br/><br/>
                <div className="container-fluid">
                    <div className="row p-2">
                        <div className="col-lg-8 text-center">
                            <div className="bg-dark p-4 rounded">
                                <h1 className="text-light">MES INFOS</h1>
                                <form>
                                    <input type="text" className="form-control w-75 mx-auto text-center" value="Sam" required disabled /><br/>
                                    <input type="text" name="nom" placeholder="Nom" className="form-control w-75 mx-auto text-center" value="Sitruk" required /><br/>
                                    <input type="text" name="prenom" placeholder="Prénom" className="form-control w-75 mx-auto text-center" value="Samuel" required /><br/>
                                    <input type="text" name="phone" placeholder="Téléphone" className="form-control w-75 mx-auto text-center" value="0646418150" required /><br/>
                                    <input type="email" name="email" placeholder="E-mail" className="form-control w-75 mx-auto text-center" value="samsitruk@gmail.com" required /><br/>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group text-center">
                                                    <div className="text-light">Que recherchez-vous ?</div>
                                                    <input id="getmale" type="checkbox" name="getGender" onChange={this.handleGetGenderMale} />
                                                    <label htmlFor="getmale" id="check-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                    <input id="getfemale" type="checkbox" name="getGender" onChange={this.handleGetGenderFemale} />
                                                    <label htmlFor="getfemale" id="check-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                    <div className="invalid-feedback" id="getErr">Votre préference est requise</div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group text-center">
                                                    <div className="text-light">Quel est votre genre ?</div>
                                                    <input id="immale" type="radio" name="myGender" value="male"  onChange={this.handleMyGender} />
                                                    <label htmlFor="immale" id="rad-sam-1" className="border radio-inline fas fa-male text-light"><p className="font-sam text-white h6">Homme</p></label>
                                                    <input id="imfemale" type="radio" name="myGender" value="female" onChange={this.handleMyGender} />
                                                    <label htmlFor="imfemale" id="rad-sam-2" className="border radio-inline fas fa-female text-light"><p className="font-sam text-white h6">Femme</p></label>
                                                    <div className="invalid-feedback" id="getErr2">Votre sexe est requis</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleFormControlTextarea1" className="text-light">Biographie</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez.vous pouvez transmettre une partie de votre monde, de ce qui vous anime, de ce que vous aimez." rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleFormControlInput1" className="text-light">Centre d'interet</label>
                                        <input type="text" className="form-control text-center" id="exampleFormControlInput1" placeholder="#matcha, #money" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="row rounded">
                                <div className="col-12 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3 mt-lg-0 mt-2 mb-2">
                                    <img className="card-img-top" src="https://picsum.photos/268/180" alt="Card cap" />
                                </div>
                            </div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.7722085199825!2d2.3140814160258785!3d48.88161887928986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fb6d1f1e111%3A0x7f0d14613fc72a83!2s2%20Avenue%20de%20Villiers%2C%2075017%20Paris!5e0!3m2!1sfr!2sfr!4v1579977923449!5m2!1sfr!2sfr" width="100%" height="450" frameborder="0" allowfullscreen="" title="ifrm"></iframe>
                        </div>
                    </div>
                </div>
                <DiscussionBar/>
            </Fragment>
        )
    }
}

export default Profile