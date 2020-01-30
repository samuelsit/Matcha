import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import '../css/Place.css'

export default function Place({ getLocalisation }) {
    const [address, setAddress] = React.useState("")

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        getLocalisation(results[0].formatted_address, latLng.lat, latLng.lng)
        setAddress(value)
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