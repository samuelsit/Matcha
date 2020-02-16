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
        page: 1,
        pageMax: 1,
        redirect: false,
        filtreAge: 18,
        filtreDis: 10000,
        filtrePop: 1000,
        tri: null
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
                skip: this.state.skip,
                attirance: {
                    male: this.state.attirance.male,
                    female: this.state.attirance.female
                },
                myGender: this.state.myGender
            }).then(res => {
                if (this._isMounted) {
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
                    })
                }
            })
            .then(() => {
                axios.post('http://localhost:5000/api/members/CountAll/' + this.props.pseudo, {
                    skip: this.state.skip,
                    attirance: {
                        male: this.state.attirance.male,
                        female: this.state.attirance.female
                    },
                    myGender: this.state.myGender
                }).then(res => {
                    if (this._isMounted) {
                        this.setState({pageMax: Math.ceil(res.data.nbMembers / 4)})
                    }
                }).then(() => {
                    if (this.props.isAuth === true && this._isMounted) {
                        this.DisablePage()
                    }
                })
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
                this.setState({card: res.data.members.map((el, i) => (
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
                ))})
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleNext = () => {
        if (this.state.page < this.state.pageMax) {
            this.setState({skip: this.state.skip + 4, page: this.state.page + 1}, this.getNewMembers)
        }
    }

    handlePrev = () => {
        if (this.state.page > 1) {
            this.setState({skip: this.state.skip - 4, page: this.state.page - 1}, this.getNewMembers)
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
            this.setState({tri})
        }
    }

    async getPop(pseudo, callback) {
        let pop = await axios
                .get('http://localhost:5000/api/interactions/like/count/' + pseudo)
                .then(res => res.data.interactions)
        return (callback(pop))
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
                    .map((el, i) => {
                        //let pop = this.getPop(el.pseudo, res => res)
                        //let pop = this.getPop(el.pseudo, res => { console.log(res) })
                        if (this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day)) >= this.state.filtreAge
                        && this.getDistanceFrom(el.country.lat, el.country.lng) <= this.state.filtreDis) {// && pop <= this.state.filtrePop) {
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
                        }
                        else {
                            return null
                        }
                    })
                })
            }
        })
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
                                <FilterSort getRange={this.handleRangeToState} filtreAge={this.state.filtreAge} filtreDis={this.state.filtreDis} filtrePop={this.state.filtrePop}/>
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