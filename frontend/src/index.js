import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import NotFound from './components/NotFound'
import Auth from './components/Auth'
import Sign from './components/Sign'
import Accueil from './components/AccueilLog'
import Chat from './components/Chat/Chat'
import Profile from './components/Profile'
import MailValidation from './components/MailValidation'
import rootReducer from './reducers/rootReducer'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()

const store = createStore(rootReducer, persistedState)

store.subscribe(() => {
    saveState(store.getState())
})

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/connexion' component={Auth} />
            <Route exact path='/inscription' component={Sign} />
            <Route exact path='/accueil' component={Accueil} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/mail-validation' component={MailValidation} />
            <Route path='/pseudo/:pseudo' component={Chat} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
