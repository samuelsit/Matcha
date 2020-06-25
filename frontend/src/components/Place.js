import React, { Component, Fragment } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {GoogleApiWrapper} from 'google-maps-react';
import '../css/Place.css'

class Place extends Component {
    state = {
        address: this.props.value
    }

    componentDidUpdate(props) {
        if (props.value !== this.props.value) {
            this.setState({address: this.props.value})
        }
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
                        <input id="place" className={this.props.style_w} onChange={this.setAddress} {...getInputProps({ placeholder: "Indiquez votre ville 📍" })} required onBlur={this.props.submitBlur} value={this.state.address}/>
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