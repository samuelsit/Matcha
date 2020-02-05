import React, { Component, Fragment } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {GoogleApiWrapper} from 'google-maps-react';
import '../css/Place.css'

class Place extends Component {
    state = {
        address: ""
    }

    setAddress = address => {
        this.setState({ address });
    }

    handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        this.props.getLocalisation(results[0].formatted_address, latLng.lat, latLng.lng)
        this.setAddress(value)
    }

    render() {
        const searchOptions = {
            types: ['(regions)'],
            componentRestrictions: {country: "fr"}
        }

        return (
            <Fragment>
            <PlacesAutocomplete value={this.state.address} onChange={this.setAddress} onSelect={this.handleSelect} searchOptions={searchOptions}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input onChange={this.setAddress} {...getInputProps({ placeholder: "Indiquez votre ville 📍" })} required/>
                        <div>
                            {loading ? <div>Loading...</div> : null}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#6C757D" : "#fff",
                                    color: suggestion.active ? "#fff" : "#6C757D"
                                }
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            </Fragment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBriVepajx5lnt2Nx74SmmktdaYVIQq840"
})(Place)