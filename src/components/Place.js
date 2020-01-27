import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import '../css/Place.css'

export default function Place() {
    const [address, setAddress] = React.useState("")
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    })

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latLng)
    }

    if (coordinates.lat !== null && coordinates.lng !== null) {
        console.log("latitude: " + coordinates.lat, " longitude: " + coordinates.lng)
    }

    return (
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input onChange={setAddress} {...getInputProps({ placeholder: "Indiquez votre ville 📍" })} required/>
                    <div>
                        {loading ? <div>Loading...</div> : null}
                        {suggestions.map((suggestion) => {
                            const style = {
                                backgroundColor: suggestion.active ? "#343A40" : "#fff",
                                color: suggestion.active ? "#fff" : "#343A40"
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
    )
}