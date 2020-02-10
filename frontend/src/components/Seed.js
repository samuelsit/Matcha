import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'

class Seed extends Component {

    componentDidMount() {
        var numberOfSeed = prompt('Combien de membres voulez-vous genérer ?')
        console.log(numberOfSeed);
        for (let i = 0; i < numberOfSeed; i++) {
            axios.post('http://localhost:5000/api/members/seed', {
                seed: i
            })
        }
    }

    render() {
        return (
            <Header/>
        )
    }
}

export default Seed