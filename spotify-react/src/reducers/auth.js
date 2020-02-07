const initialState = { 
    loggedIn: false, 
    access: null, 
    refresh: null,
    userID: null
 };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                loggedIn: action.payload.loggedIn,
                access: action.payload.access,
                refresh: action.payload.refresh,
                userID: action.payload.userID
            });
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, {
                loggedIn: false,
                access: action.payload.access,
                refresh: action.payload.refresh,
                userID: action.payload.userID
            });
        default:
            return state
    }
}