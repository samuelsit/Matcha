import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from './components/NotFound'
import Auth from './components/Auth'
import Sign from './components/Sign'
import Accueil from './components/AccueilLog'
import Chat from './components/Chat/Chat'
import Profile from './components/Profile'

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/connexion' component={Auth} />
            <Route exact path='/inscription' component={Sign} />
            <Route exact path='/accueil' component={Accueil} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/pseudo/:pseudo' component={Chat} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
