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
          <section className="py-5">
            <div className="container">
              <h4 className="font-weight-light">Nos derniers membres inscrits</h4>
              <div className="row">
                  <div className="col-2">
                      <img className="img-fluid" src="https://picsum.photos/400" alt="lastsub" />
                  </div>
                  <div className="col-2">
                      <img className="img-fluid" src="https://picsum.photos/400" alt="lastsub" />
                  </div>
                  <div className="col-2">
                      <img className="img-fluid" src="https://picsum.photos/400" alt="lastsub" />
                  </div>
                  <div className="col-2">
                      <img className="img-fluid" src="https://picsum.photos/400" alt="lastsub" />
                  </div>
                  <div className="col-2">
                      <img className="img-fluid" src="https://picsum.photos/400" alt="lastsub" />
                  </div>
                  <div className="col-2">
                      <img className="img-fluid" src="https://picsum.photos/400" alt="lastsub" />
                  </div>
              </div>
            </div>
          </section>
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