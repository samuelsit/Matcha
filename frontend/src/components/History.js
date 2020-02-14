import React, { Component, Fragment } from 'react'
import Header from './Header'
import DiscussionButton from './DiscussionButton'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import HistoryMember from './HistoryMember'

class History extends Component {
    _isMounted = false

    state = {
        lastMembers: []
    }

    componentDidMount() {
        this._isMounted = true
        axios.get('http://localhost:5000/api/interactions/lastView/' + this.props.pseudo)
        .then(res => {
            if (this._isMounted) {
                this.setState({lastMembers: res.data.interactions})
            }
        }).catch(error => {
            console.log(error)
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render () {
        let historyMember = this.state.lastMembers.map((el, i) => (
            <HistoryMember
                key={i}
                login={el.to}
            />
        ))

        if (this.props.isAuth === true) {
            return (
                <Fragment>
                    <Header/>
                    <br/><br/><br/><br/>
                    <div className="container h-100">
                        <div className="col-12 text-center">
                            <h1>DERNIERS PROFILS VISITÉS</h1>
                            <div className="p-1 shadow-lg">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col">Photo</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Prénom</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { historyMember }
                                    </tbody>
                                </table>
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
        pseudo: state.pseudo
    }
}

export default connect(mapStateToProps, null)(History)