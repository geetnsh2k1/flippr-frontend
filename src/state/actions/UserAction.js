export const AUTH_LOGIN = (action) => {
    return (dispatch) => {
        dispatch({
            type: "LOGIN",
            user: action.user
        })
    }
}

export const AUTH_LOGOUT = (action) => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
            user: null 
        })
    }
}

export const REGISTER = (action) => {
    return (dispatch) => {
        dispatch({
            type: "REGISTER"
        })
    }
}

export const DEREGISTER = (action) => {
    return (dispatch) => {
        dispatch({
            type: "DEREGISTER"
        })
    }
}