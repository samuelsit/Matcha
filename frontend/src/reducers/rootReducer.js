const initState = {
    email: '',
    lat: 0,
    lng: 0
}

const rootReducer = (state  = initState, action) => {
    if (action.type === 'SET_USER_EMAIL') {
        return {
            ...state,
            email: state.email
        }
    }
    else if (action.type === 'SET_USER_POS') {
        return {
            ...state,
            lat: state.lat,
            lng: state.lng
        }
    }
    return state
}

export default rootReducer