import React, { Component, Fragment } from 'react'
import Header from './Header'
import CardLove from './CardLove'
import DiscussionButton from './DiscussionButton'
import FilterSort from './FilterSort'
import axios from 'axios'
import { getDistance, convertDistance } from 'geolib'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import '../css/Accueil.css'

class Accueil extends Component {
    _isMounted = false

    state = {
        card: [],
        attirance: {
            male: false,
            female: false
        },
        myGender: '',
        skip: 0,
        limit: 4,
        page: 1,
        pageMax: 1,
        redirect: false,
        filtreAge: 18,
        filtreDis: 10000,
        filtrePop: 0,
        tri: null,
        tag: {
            musique: false,
            science: false,
            sport: false,
            voyage: false,
            art: false,
            humour: false,
            amour: false,
            matcha: false
        },
        compteur: 0
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/members/' + this.props.pseudo).then(res => {
            if (this._isMounted) {
                this.setState({
                    attirance: {
                        male: res.data.member.attirance.male,
                        female: res.data.member.attirance.female
                    },
                    myGender: res.data.member.myGender
                })              
            }           
        })
        .then(() => {
            if (this.state.myGender !== 'male' && this.state.myGender !== 'female' && this._isMounted) {
                this.setState({ redirect: true })
            }
            axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
                attirance: {
                    male: this.state.attirance.male,
                    female: this.state.attirance.female
                },
                myGender: this.state.myGender
            })
            .then(res => {
                if (this._isMounted) {
                    this.setState({pageMax: Math.ceil(res.data.members.length / 4)})
                    this.setState({card: res.data.members
                        .map((el, i) => {
                            return (
                                <CardLove
                                    key={i}
                                    isLoggued={el.isLoggued.toString()}
                                    name={el.firstname}
                                    age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                                    country={el.country.name}
                                    distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                                    gender={el.myGender}
                                    love={this.orientationSexuelle(el.myGender, el.attirance)}
                                    interet={el.interet}
                                    pseud={el.pseudo}
                                    img={el.pictures._1}
                                />
                            )
                        })
                        .slice(this.state.skip, this.state.limit)
                    })
                }
            })
            .then(() => {
                if (this.props.isAuth === true && this._isMounted) {
                    this.DisablePage()
                }
            })
        })
    }

    getDistanceFrom = (lat, lng) => {
        const CoordsMember = {latitude: lat, longitude: lng}
        const CoordsUser = {latitude: this.props.lat, longitude: this.props.lng}
        var distance = convertDistance(getDistance(CoordsUser, CoordsMember, 1000), 'km')        
        return distance
    }

    getAge = date => { 
        var diff = Date.now() - date.getTime();
        var age = new Date(diff); 
        return Math.abs(age.getUTCFullYear() - 1970);
    }

    orientationSexuelle = (genre, attirance) => {
        if (genre === "male") {
            if (attirance.male === true && attirance.female === true) {
                return ("bi")
            }
            if (attirance.male === true && attirance.female === false) {
                return ("ho")
            }
            if (attirance.male === false && attirance.female === true) {
                return ("het")
            }
        }
        else {
            if (attirance.male === true && attirance.female === true) {
                return ("bi")
            }
            if (attirance.male === false && attirance.female === true) {
                return ("ho")
            }
            if (attirance.male === true && attirance.female === false) {
                return ("het")
            }
        }
    }

    getNewMembers = () => {
        if (this._isMounted && this.props.isAuth) {
            this.DisablePage()
        }
        axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
            skip: this.state.skip,
            attirance: {
                male: this.state.attirance.male,
                female: this.state.attirance.female
            },
            myGender: this.state.myGender
        }).then(res => {
            if (this._isMounted) {
                this.setState({card: res.data.members
                    .map((el, i) => (
                        <CardLove
                            key={i}
                            isLoggued={el.isLoggued.toString()}
                            name={el.firstname}
                            age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                            country={el.country.name}
                            distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                            gender={el.myGender}
                            love={this.orientationSexuelle(el.myGender, el.attirance)}
                            interet={el.interet}
                            pseud={el.pseudo}
                            img={el.pictures._1}
                        />
                    ))
                    .slice(this.state.skip, this.state.limit)
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleNext = () => {
        if (this.state.page < this.state.pageMax) {
            this.setState({skip: this.state.skip + 4, limit: this.state.limit + 4, page: this.state.page + 1}, this.getNewMembers)
        }
    }

    handlePrev = () => {
        if (this.state.page > 1) {
            this.setState({skip: this.state.skip - 4, limit: this.state.limit - 4, page: this.state.page - 1}, this.getNewMembers)
        }
    }

    handleRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={"/profile"} />
            )
        }
    }

    DisablePage = () => {
        var btnprev = document.getElementById('prev')
        var btnnext = document.getElementById('next')
        if (this.state.page === 1) {
            btnprev.classList.add("disabled");
        }
        else {
            btnprev.classList.remove("disabled");
        }        
        if (this.state.page === this.state.pageMax) {
            btnnext.classList.add("disabled");
        }
        else {
            btnnext.classList.remove("disabled");
        }
    }

    handleRangeToState = event => {
        const id = event.target.name
        if (id === "customRange1") {
            const filtreAge = event.target.value
            this.setState({filtreAge}, this.filterMember)
        }
        else if (id === "customRange2") {
            const filtrePop = event.target.value
            this.setState({filtrePop}, this.filterMember)
        }
        else if (id === "customRange3") {
            const filtreDis = event.target.value
            this.setState({filtreDis}, this.filterMember)
        }
        else if (id === "tri") {
            const tri = event.target.id
            if (tri === this.state.tri) {
                this.setState({compteur: this.state.compteur + 1})
            }
            else {
                this.setState({tri, compteur: 0})
            }
        }
    }

    filter = el => {
        return this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day)) >= this.state.filtreAge
        && this.getDistanceFrom(el.country.lat, el.country.lng) <= this.state.filtreDis
        && el.popularity >= this.state.filtrePop
    }

    filterMusique = el => {
        if (this.state.tag.musique) {
            return el.interet.indexOf('musique') !== -1 || el.interet.indexOf('Musique') !== -1 || el.interet.indexOf('Music') !== -1 || el.interet.indexOf('music') !== -1
        }
        else {
            return el
        }
    }

    filterSciences = el => {
        if (this.state.tag.science) {
            return el.interet.indexOf('science') !== -1 || el.interet.indexOf('Science') !== -1 || el.interet.indexOf('sciences') !== -1 || el.interet.indexOf('Sciences') !== -1
        }
        else {
            return el
        }
    }

    filterSport = el => {
        if (this.state.tag.sport) {
            return el.interet.indexOf('sport') !== -1 || el.interet.indexOf('Sport') !== -1 || el.interet.indexOf('sports') !== -1 || el.interet.indexOf('Sports') !== -1
        }
        else {
            return el
        }
    }

    filterVoyage = el => {
        if (this.state.tag.voyage) {
            return el.interet.indexOf('voyage') !== -1 || el.interet.indexOf('Voyage') !== -1 || el.interet.indexOf('voyages') !== -1 || el.interet.indexOf('Voyages') !== -1
        }
        else {
            return el
        }
    }

    filterArt = el => {
        if (this.state.tag.art) {
            return el.interet.indexOf('art') !== -1 || el.interet.indexOf('Art') !== -1 || el.interet.indexOf('arts') !== -1 || el.interet.indexOf('Arts') !== -1
        }
        else {
            return el
        }
    }

    filterHumour = el => {
        if (this.state.tag.humour) {
            return el.interet.indexOf('humour') !== -1 || el.interet.indexOf('Humour') !== -1
        }
        else {
            return el
        }
    }

    filterAmour = el => {
        if (this.state.tag.amour) {
            return el.interet.indexOf('amour') !== -1 || el.interet.indexOf('Amour') !== -1 || el.interet.indexOf('love') !== -1 || el.interet.indexOf('Love') !== -1
        }
        else {
            return el
        }
    }

    filterMatcha = el => {
        if (this.state.tag.matcha) {
            return el.interet.indexOf('matcha') !== -1 || el.interet.indexOf('Matcha') !== -1
        }
        else {
            return el
        }
    }

    filterMember = () => {
        if (this._isMounted && this.props.isAuth) {
            this.DisablePage()
        }
        axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
            skip: this.state.skip,
            attirance: {
                male: this.state.attirance.male,
                female: this.state.attirance.female
            },
            myGender: this.state.myGender
        }).then(res => {            
            if (this._isMounted) {
                this.setState({card: res.data.members
                    .filter(this.filter)
                    .map((el, i) => {                      
                        return (
                            <CardLove
                                key={i}
                                isLoggued={el.isLoggued.toString()}
                                name={el.firstname}
                                age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                                country={el.country.name}
                                distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                                gender={el.myGender}
                                love={this.orientationSexuelle(el.myGender, el.attirance)}
                                interet={el.interet}
                                pseud={el.pseudo}
                                img={el.pictures._1}
                            />
                        )
                    })
                    .slice(this.state.skip, this.state.limit)
                })
            }
        })
    }

    sortMemberAge = compteur => {        
        if (this._isMounted && this.props.isAuth) {
            this.DisablePage()
        }
        axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
            skip: this.state.skip,
            attirance: {
                male: this.state.attirance.male,
                female: this.state.attirance.female
            },
            myGender: this.state.myGender
        }).then(res => {            
            if (this._isMounted) {
                this.setState({card: res.data.members
                    .filter(this.filter)
                    .sort((a, b) => {
                        if (compteur % 2 === 0) {
                            return this.getAge(new Date(a.birthday.year, a.birthday.month, a.birthday.day)) - this.getAge(new Date(b.birthday.year, b.birthday.month, b.birthday.day))
                        }
                        else {
                            return this.getAge(new Date(b.birthday.year, b.birthday.month, b.birthday.day)) - this.getAge(new Date(a.birthday.year, a.birthday.month, a.birthday.day))
                        }
                    })
                    .map((el, i) => {                      
                        return (
                            <CardLove
                                key={i}
                                isLoggued={el.isLoggued.toString()}
                                name={el.firstname}
                                age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                                country={el.country.name}
                                distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                                gender={el.myGender}
                                love={this.orientationSexuelle(el.myGender, el.attirance)}
                                interet={el.interet}
                                pseud={el.pseudo}
                                img={el.pictures._1}
                            />
                        )
                    })
                    .slice(this.state.skip, this.state.limit)
                })
            }
        })
    }

    sortMemberPop = compteur => {
        if (this._isMounted && this.props.isAuth) {
            this.DisablePage()
        }
        axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
            skip: this.state.skip,
            attirance: {
                male: this.state.attirance.male,
                female: this.state.attirance.female
            },
            myGender: this.state.myGender
        }).then(res => {            
            if (this._isMounted) {
                this.setState({card: res.data.members
                    .filter(this.filter)
                    .sort((a, b) => {
                        if (compteur % 2 === 0) {
                            return b.popularity - a.popularity
                        }
                        else {
                            return a.popularity - b.popularity
                        }
                    })
                    .map((el, i) => {                      
                        return (
                            <CardLove
                                key={i}
                                isLoggued={el.isLoggued.toString()}
                                name={el.firstname}
                                age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                                country={el.country.name}
                                distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                                gender={el.myGender}
                                love={this.orientationSexuelle(el.myGender, el.attirance)}
                                interet={el.interet}
                                pseud={el.pseudo}
                                img={el.pictures._1}
                            />
                        )
                    })
                    .slice(this.state.skip, this.state.limit)
                })
            }
        })
    }

    sortMemberDis = compteur => {
        if (this._isMounted && this.props.isAuth) {
            this.DisablePage()
        }
        axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
            skip: this.state.skip,
            attirance: {
                male: this.state.attirance.male,
                female: this.state.attirance.female
            },
            myGender: this.state.myGender
        }).then(res => {            
            if (this._isMounted) {
                this.setState({card: res.data.members
                    .filter(this.filter)
                    .sort((a, b) => {
                        if (compteur % 2 === 0) {
                            return this.getDistanceFrom(a.country.lat, a.country.lng) - this.getDistanceFrom(b.country.lat, b.country.lng)
                        }
                        else {
                            return this.getDistanceFrom(b.country.lat, b.country.lng) - this.getDistanceFrom(a.country.lat, a.country.lng)
                        }
                    })
                    .map((el, i) => {                      
                        return (
                            <CardLove
                                key={i}
                                isLoggued={el.isLoggued.toString()}
                                name={el.firstname}
                                age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                                country={el.country.name}
                                distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                                gender={el.myGender}
                                love={this.orientationSexuelle(el.myGender, el.attirance)}
                                interet={el.interet}
                                pseud={el.pseudo}
                                img={el.pictures._1}
                            />
                        )
                    })
                    .slice(this.state.skip, this.state.limit)
                })
            }
        })
    }

    componentDidUpdate(previousProps, previousState) {
        if ((previousState.tri !== this.state.tri) || (previousState.compteur !== this.state.compteur)) {
            if (this.state.tri === 'age') {
                this.sortMemberAge(this.state.compteur)
            }
            else if (this.state.tri === 'dis') {
                this.sortMemberDis(this.state.compteur)
            }
            else if (this.state.tri === 'pop') {
                this.sortMemberPop(this.state.compteur)
            }
        }
    }

    memberTag = () => {
        if (this._isMounted && this.props.isAuth) {
            this.DisablePage()
        }
        axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
            skip: this.state.skip,
            attirance: {
                male: this.state.attirance.male,
                female: this.state.attirance.female
            },
            myGender: this.state.myGender
        }).then(res => {            
            if (this._isMounted) {
                this.setState({card: res.data.members
                    .filter(this.filter)
                    .filter(this.filterMusique)
                    .filter(this.filterSciences)
                    .filter(this.filterSport)
                    .filter(this.filterVoyage)
                    .filter(this.filterArt)
                    .filter(this.filterHumour)
                    .filter(this.filterAmour)
                    .filter(this.filterMatcha)
                    .map((el, i) => {                      
                        return (
                            <CardLove
                                key={i}
                                isLoggued={el.isLoggued.toString()}
                                name={el.firstname}
                                age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                                country={el.country.name}
                                distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                                gender={el.myGender}
                                love={this.orientationSexuelle(el.myGender, el.attirance)}
                                interet={el.interet}
                                pseud={el.pseudo}
                                img={el.pictures._1}
                            />
                        )
                    })
                    .slice(this.state.skip, this.state.limit)
                })
            }
        })
    }

    checkBoxesManagement = () => {
        const cB = document.getElementsByClassName('interest')
        const musique = cB[0].checked
        const science = cB[1].checked
        const sport = cB[2].checked
        const voyage = cB[3].checked
        const art = cB[4].checked
        const humour = cB[5].checked
        const amour = cB[6].checked
        const matcha = cB[7].checked
        const tag = {
            musique: musique,
            science: science,
            sport: sport,
            voyage: voyage,
            art: art,
            humour: humour,
            amour: amour,
            matcha: matcha
        }
        if (this._isMounted === true) {
            this.setState({tag}, this.memberTag)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        if (this.props.isAuth === true) {
            return (
                <Fragment>
                    {this.handleRedirect()}
                    <Header />
                    <br/>
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col">
                                <FilterSort interest={this.checkBoxesManagement} getRange={this.handleRangeToState} filtreAge={this.state.filtreAge} filtreDis={this.state.filtreDis} filtrePop={this.state.filtrePop} tri={this.state.tri}/>
                            </div>
                        </div><hr/>
                        <div className="row text-center">
                            { this.state.card }
                        </div>
                        <div className="row">
                            <div className="col">
                                <nav aria-label="Page navigation example" className="mt-3">
                                    <ul className="pagination justify-content-start">
                                        <li id="prev" className="page-item cursor-pagination" onClick={this.handlePrev}>
                                            <div className="page-link">Précédente</div>
                                        </li>
                                        <li id="next" className="page-item cursor-pagination" onClick={this.handleNext}>
                                            <div className="page-link">Suivante</div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <DiscussionButton/>
                </Fragment>
            )
        }
        else {
            return (
                <Redirect to={"/connexion"} />
            )
        }
        
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        pseudo: state.pseudo,
        lat: state.lat,
        lng: state.lng
    }
}

export default connect(mapStateToProps, null)(Accueil)