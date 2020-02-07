import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ChatProfile extends Component {

    _isMounted = false

    state = {
      pseudo: this.props.name,
      isPic: false
    }
  
    componentDidMount() {
      this._isMounted = true
      axios.get('http://localhost:5000/api/members/' + this.state.pseudo).then(res => {
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
      axios.get('http://localhost:5000/api/members/pictures/profile/' + this.state.pseudo).then(res => {
          if (this._isMounted) {
              this.setState({isPic: res.data.status})
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

    handleLocationView = () => {
        return (
            this.props.mobileView === true ? null : <Fragment><p className="card-text"><span className="font-weight-bold">Localisation: </span>{this.state.country}</p><hr/></Fragment>
        )
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        const pic = this.state.isPic === false ? require('../../pictures/noPicAccueil.png') : require(`../../pictures/profile/${this.state.pseudo}_1.png`)
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
                <div className={classname}>
                    <Link to={`/profile/${this.state.pseudo}`}>
                    <img className="card-img-top" src={pic} alt="Card cap" />
                    <div className="text-dark card-header text-center"><h5 className="card-title">{this.state.firstname} {this.state.lastname} <span className={isLoggued}> </span></h5></div>
                    </Link>
                    <div className="card-body text-center">
                        <p className="card-text"><span className="font-weight-bold">Age: </span>{this.getAge(new Date(this.state.year, this.state.month, this.state.day))} ans</p><hr/>
                        {this.handleLocationView()}
                        <p className="card-text"><span className="font-weight-bold">Attirance: </span>{attirance}</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Biographie: </span><br/>{bio}</p><hr/>
                        <p className="card-text"><span className="font-weight-bold">Centre d'interet: </span><br/>{interet}</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ChatProfile