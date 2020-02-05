import React, { Component, Fragment } from 'react'
import './css/App.css'
import Header from './components/Header'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"

class App extends Component {

  render() {
    if (this.props.isAuth === true) {
      return (
        <Redirect to={"/accueil"} />
      )
    }
    else {
      return (
        <Fragment>
          <Header />
          <div className="masthead">
            <div className="container-fluid h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                  <div className="font-weight-bold text-light">
                      <p className="masthead-p">Matchez. Discutez.</p>
                      <p className="masthead-p">Faites des rencontres.</p>
                      <Link to={"/inscription"}><div className="btn btn-lg btn-danger">INSCRIPTION</div></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )
    }
  }
    
}

const mapStateToProps = state => {
  return {
      isAuth: state.isAuth
  }
}

export default connect(mapStateToProps, null)(App)