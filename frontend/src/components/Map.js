import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapG extends Component {

    render () {
        return (
            <Map style={this.props.style} initialCenter={{ lat: this.props.lat, lng: this.props.lng }} center={{ lat: this.props.lat, lng: this.props.lng }} google={this.props.google} zoom={14}>
                <Marker onClick={this.onMarkerClick} name={'Votre position'} position={{ lat: this.props.lat, lng: this.props.lng }}/>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBriVepajx5lnt2Nx74SmmktdaYVIQq840"
})(MapG)