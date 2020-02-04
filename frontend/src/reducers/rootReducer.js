const initState = {
    email: null,
    isAuth: false,
    lat: null,
    lng: null
}

const rootReducer = (state  = initState, action) => {
    if (action.type === 'SET_USER_EMAIL') {
        return {
            ...state,
            email: action.email
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
        console.log(action);
        
        return {
            ...state,
            isAuth: action.isAuth
        }
    }
    return state
}

export default rootReducer