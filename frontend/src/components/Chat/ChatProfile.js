import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Slider from '../Slider'
import '../../css/CardLove.css'
import { connect } from 'react-redux'

class ChatProfile extends Component {

    _isMounted = false

    state = {
        pseudo: this.props.name,
        isPic1: false,
        isPic2: false,
        isPic3: false,
        isPic4: false,
        isPic5: false,
        _1: '',
        _2: '',
        _3: '',
        _4: '',
        _5: '',
        lastVisite: ''
    }
  
    componentDidMount() {
      this._isMounted = true
      axios.get('http://localhost:5000/api/disconnect/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }})
        .then(res => {
            if (this._isMounted) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                const date = new Date(res.data.last)
                this.setState({ lastVisite: date.toLocaleDateString(undefined, options)})
            }
      })
      axios.get('http://localhost:5000/api/interactions/like/ismatch/' + this.state.pseudo + '/' + this.props.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
            if (res.data.interactions === 1) {
                document.getElementById("isLike").style.display = "block";
            }
      })
      axios.get('http://localhost:5000/api/members/pictures/profile/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
          if (this._isMounted) {
              this.setState({isPic1: res.data.status, _1: res.data.pic})
          }
      })
      axios.get('http://localhost:5000/api/members/pictures/2/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
          if (this._isMounted) {
              this.setState({isPic2: res.data.status, _2: res.data.pic})
          }
      })
      axios.get('http://localhost:5000/api/members/pictures/3/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
          if (this._isMounted) {
              this.setState({isPic3: res.data.status, _3: res.data.pic})
          }
      })
      axios.get('http://localhost:5000/api/members/pictures/4/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
          if (this._isMounted) {
              this.setState({isPic4: res.data.status, _4: res.data.pic})
          }
      })
      axios.get('http://localhost:5000/api/members/pictures/5/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
          if (this._isMounted) {
              this.setState({isPic5: res.data.status, _5: res.data.pic})
          }
      })
      axios.get('http://localhost:5000/api/members/' + this.state.pseudo, {headers: { "x-access-token": this.props.token }}).then(res => {
          if (this._isMounted) {
                this.setState({
                    firstname: res.data.member.firstname,
                    lastname: res.data.member.lastname,
                    country: res.data.member.country.name,
                    isLoggued: res.data.member.isLoggued,
                    day: res.data.member.birthday.day,
                    month: res.data.member.birthday.month,
                    year: res.data.member.birthday.year,
                    bio: res.data.member.biographie,
                    interet: res.data.member.interet,
                    attirancemale: res.data.member.attirance.male,
                    attirancefemale: res.data.member.attirance.female
                })
          }
      }).catch(error => {
          console.log(error)
      })
    }

    getAge = date => { 
        var diff = Date.now() - date.getTime();
        var age = new Date(diff); 
        return Math.abs(age.getUTCFullYear() - 1970);
    }

    handleView = () => {
        this.setState({
            redirect: true
        })
    }

    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={`/profile/${this.state.pseudo}`} />
            )
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        let pic1 = /^(http|https):/.test(this.state._1) ? this.state._1 : this.state.isPic1 === false ? require('../../pictures/profile/noPicAccueil.png') : require(`../../pictures/profile/${this.state.pseudo}_1.png`)
        let pic2 = /^(http|https):/.test(this.state._2) ? this.state._2 : this.state.isPic2 === false ? require('../../pictures/profile/noPicAccueil.png') : require(`../../pictures/profile/${this.state.pseudo}_2.png`)
        let pic3 = /^(http|https):/.test(this.state._3) ? this.state._3 : this.state.isPic3 === false ? require('../../pictures/profile/noPicAccueil.png') : require(`../../pictures/profile/${this.state.pseudo}_3.png`)
        let pic4 = /^(http|https):/.test(this.state._4) ? this.state._4 : this.state.isPic4 === false ? require('../../pictures/profile/noPicAccueil.png') : require(`../../pictures/profile/${this.state.pseudo}_4.png`)
        let pic5 = /^(http|https):/.test(this.state._5) ? this.state._5 : this.state.isPic5 === false ? require('../../pictures/profile/noPicAccueil.png') : require(`../../pictures/profile/${this.state.pseudo}_5.png`)
        var isLoggued = this.state.isLoggued === true ? "badge badge-pill badge-success" : "badge badge-pill badge-danger"
        var bio = this.state.bio === '' ? 'Non renseignée' : this.state.bio
        var interet = this.state.interet === '' ? 'Pas de centre d\'interet' : this.state.interet
        var attirance = ''
        var classname
        if (this.state.attirancemale === true && this.state.attirancefemale === true) {
            attirance = 'Homme, Femme'
        }
        else if (this.state.attirancemale === true && this.state.attirancefemale === false) {
            attirance = 'Homme'
        }
        else {
            attirance = 'Femme'
        }
        if (this.props.mobileView === true) {
            classname = "card mt-5"
        }
        else {
            classname = "card mt-5 d-none d-lg-block"
        }

        return (
            <Fragment>
                {this.handleRedirect()}
                <div className={classname}>
                    <div>
                        <span id="isLike" className="text-light w-100 position-absolute border isLike border border-white">Cet utilisateur vous like</span>
                        <Slider
                            img1={pic1}
                            img2={pic2}
                            img3={pic3}
                            img4={pic4}
                            img5={pic5}
                        />
                        <div onClick={this.handleView} className="text-dark card-header text-center"><h5 className="card-title">{this.state.firstname} {this.state.lastname} <span className={isLoggued}> </span><br/><small><code>{this.state.isLoggued === false ? 'Dernière connexion : ' + this.state.lastVisite : null}</code></small></h5></div>
                    </div>
                    <div className="card-body text-center">
                        <p className="card-text"><span className="font-weight-bold">Age: </span>{this.getAge(new Date(this.state.year, this.state.month, this.state.day))} ans</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Localisation: </span>{this.state.country}</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Attirance: </span>{attirance}</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Biographie: </span><br/>{bio}</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Centre d'interet: </span><br/>{interet}</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        pseudo: state.pseudo,
        token: state.token
    }
}

export default connect(mapStateToProps, null)(ChatProfile)