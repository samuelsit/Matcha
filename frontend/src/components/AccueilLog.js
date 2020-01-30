import React, { Component, Fragment } from 'react'
import Header from './Header'
import CardLove from './CardLove'
import DiscussionBar from './DiscussionBar'
import FilterSort from './FilterSort'
import Pagination from './Pagination'

class Accueil extends Component {
    render () {
        return (
            <Fragment>
                <Header loggued="true"/>
                <br/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col">
                            <FilterSort/>
                        </div>
                    </div><hr/>
                    <div className="row text-center">
                        <CardLove name="Sam" age="22" country="Paris 17" isLoggued="true" isLoved="10" gender="male" love="het"/>
                        <CardLove name="Noémie" age="76" country="Bretagne" isLoggued="true" isLoved="4" gender="female" love="ho"/>
                        <CardLove name="Arthur" age="27" country="Saint-Brice" isLoggued="true" isLoved="34" gender="male" love="bi"/>
                        <CardLove name="Seb" age="43" country="Limousin" isLoggued="true" isLoved="234" gender="male" love="het"/>
                        <CardLove name="Nicolas" age="21" country="Paris 19" isLoggued="true" isLoved="2" gender="male" love="ho"/>
                        <CardLove name="Rebecca" age="34" country="Deauville" isLoggued="false" isLoved="45" gender="female" love="het"/>
                        <CardLove name="Francis" age="42" country="Montpellier" isLoggued="false" isLoved="99" gender="male" love="ho"/>
                        <CardLove name="Monica" age="99" country="Lyon" isLoggued="false" isLoved="126" gender="female" love="bi"/>
                        <CardLove name="Pierre" age="53" country="Paris 15" isLoggued="false" isLoved="0" gender="male" love="het"/>
                        <CardLove name="Paul" age="55" country="Paris 11" isLoggued="false" isLoved="76" gender="male" love="het"/>
                        <CardLove name="Jacques" age="32" country="Marseille" isLoggued="false" isLoved="1" gender="male" love="ho"/>
                        <CardLove name="Emma" age="19" country="Sarcelles" isLoggued="false" isLoved="1000" gender="female" love="het"/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Pagination/>
                        </div>
                    </div>
                </div>
                <DiscussionBar/>
            </Fragment>
        )
    }
}

export default Accueil