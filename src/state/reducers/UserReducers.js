const initialState = {
    user: null,
    isAuthenticated: false,
    register: false,
}

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN": return {
            user: action.user,
            isAuthenticated: true,
            register: false,
        }
        case "LOGOUT": return {
            user: null,
            isAuthenticated: false,
            register: false,
        }
        case "REGISTER": return {
            user: null,
            isAuthenticated:false,
            register: true,
        }
        case "DEREGISTER": return {
            user: null,
            isAuthenticated:false,
            register: false,
        }
        default: return state
    }
}

export default UserReducer