import React, { Component, Fragment } from 'react'
import Header from './Header'
import axios from 'axios'

class Seed extends Component {

    _isMounted = false

    state = {
        phrase: 'Génération non finie'
    }

    componentDidMount() {
        this._isMounted = true
        var numberOfSeed = prompt('Combien de membres voulez-vous genérer ?')
        for (let i = 0; i < numberOfSeed; i++) {
            axios.post('http://localhost:5000/api/members/seed', {
                seed: i
            })
            .then(() => {
                if (this._isMounted) {
                    this.setState({phrase: 'Vous avez généré ' + numberOfSeed + ' membres.'})
                }
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <br/><br/><br/><br/>
                <div className="container h-100">
                    <div className="col-12 text-center">
                        <div className="h2 font-weight-bold text-light bg-dark p-5 rounded shadow-lg">
                            <p>{this.state.phrase}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Seed