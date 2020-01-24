import React, { Component, Fragment } from 'react'
import Header from './Header'
import CardLove from './CardLove'

class Accueil extends Component {
    render () {
        return (
            <Fragment>
                <Header loggued="true"/>
                <br/><br/>
                <div className="container mt-5">
                    <div className="row text-center">
                        <CardLove name="Sam" age="22" country="Paris 17" isLoggued="true"/>
                        <CardLove name="Noémie" age="76" country="Bretagne" isLoggued="true"/>
                        <CardLove name="Arthur" age="27" country="Saint-Brice" isLoggued="true"/>
                        <CardLove name="Seb" age="43" country="Limousin" isLoggued="true"/>
                        <CardLove name="Nicolas" age="21" country="Paris 19" isLoggued="false"/>
                        <CardLove name="Rebecca" age="34" country="Deauville" isLoggued="false"/>
                        <CardLove name="Francis" age="42" country="Montpellier" isLoggued="false"/>
                        <CardLove name="Monica" age="99" country="Lyon" isLoggued="false"/>
                        <CardLove name="Pierre" age="53" country="Paris 15" isLoggued="false"/>
                        <CardLove name="Paul" age="55" country="Paris 11" isLoggued="false"/>
                        <CardLove name="Jacques" age="32" country="Marseille" isLoggued="false"/>
                        <CardLove name="Emma" age="19" country="Sarcelles" isLoggued="false"/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Accueil