const initState = {
    pseudo: null,
    isAuth: false,
    lat: null,
    lng: null
}

const rootReducer = (state  = initState, action) => {
    if (action.type === 'SET_USER_PSEUDO') {
        return {
            ...state,
            pseudo: action.pseudo
        }
    }
    else if (action.type === 'SET_USER_POS') {
        return {
            ...state,
            lat: action.lat,
            lng: action.lng
        }
    }
    else if (action.type === 'SET_USER_AUTH') {
        return {
            ...state,
            isAuth: action.isAuth
        }
    }
    return state
}

export default rootReducer