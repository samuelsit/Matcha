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
        members: [],
        attirance: {
            male: false,
            female: false
        },
        myGender: '',
        myCoords: [],
        skip: 0,
        page: 1,
        pageMax: 0
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
        .then(res => {
            axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
                skip: this.state.skip,
                attirance: {
                    male: this.state.attirance.male,
                    female: this.state.attirance.female
                },
                myGender: this.state.myGender
            }).then(res => {
                if (this._isMounted) {
                    this.setState({members: res.data.members})
                }
            }).then(() => {
                axios.post('http://localhost:5000/api/members/CountAll/' + this.props.pseudo, {
                    skip: this.state.skip,
                    attirance: {
                        male: this.state.attirance.male,
                        female: this.state.attirance.female
                    },
                    myGender: this.state.myGender
                }).then(res => {
                    if (this._isMounted) {
                        this.setState({pageMax: res.data.nbMembers / 4})
                    }
                })
            }).catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    getDistanceFrom = (lat, lng) => {
        navigator.geolocation.getCurrentPosition(position => {            
            if (this._isMounted) {
                this.setState({myCoords: {latitude: position.coords.latitude, longitude: position.coords.longitude}})
                this.props.setUserPos(position.coords.latitude, position.coords.longitude)
            }
        })
        const cardCoords = {latitude: lat, longitude: lng}
        var distance = convertDistance(getDistance(this.state.myCoords, cardCoords, 1000), 'km')            
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
        axios.post('http://localhost:5000/api/members/all/' + this.props.pseudo, {
            skip: this.state.skip,
            attirance: {
                male: this.state.attirance.male,
                female: this.state.attirance.female
            },
            myGender: this.state.myGender
        }).then(res => {
            if (this._isMounted) {
                this.setState({members: res.data.members})
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

    componentDidUpdate() {
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

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        let card = this.state.members.map((el, i) => (
            <CardLove
                key={i}
                isLoggued={el.isLoggued.toString()}
                name={el.firstname}
                age={this.getAge(new Date(el.birthday.year, el.birthday.month, el.birthday.day))}
                country={el.country.name}
                distance={this.getDistanceFrom(el.country.lat, el.country.lng)}
                isLoved={el.popularity}
                gender={el.myGender}
                love={this.orientationSexuelle(el.myGender, el.attirance)}
                interet={el.interet}
                pseud={el.pseudo}
                img={el.pictures._1}
            />
        ))

        if (this.props.isAuth === true) {
            return (
                <Fragment>
                    <Header />
                    <br/>
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col">
                                <FilterSort getRange={this.handleRangeToState}/>
                            </div>
                        </div><hr/>
                        <div className="row text-center">
                            {
                                card
                            }
                        </div>
                        <div className="row">
                            <div className="col">
                                <nav aria-label="Page navigation example" className="mt-3">
                                    <ul className="pagination justify-content-start">
                                        <li id="prev" className="page-item disable cursor-pagination" onClick={this.handlePrev}>
                                            <div className="page-link">Previous</div>
                                        </li>
                                        <li id="next" className="page-item cursor-pagination" onClick={this.handleNext}>
                                            <div className="page-link">Next</div>
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

const mapDispatchToProps = dispatch => {
    return {
        setUserPos: (lat, lng) => {
            dispatch({ type: 'SET_USER_POS', lat: lat, lng: lng })
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        pseudo: state.pseudo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accueil)