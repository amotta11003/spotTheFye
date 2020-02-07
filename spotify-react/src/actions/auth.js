import { history, parseTokens } from '../helpers';
import { api } from '../services';

//Selectors
export const getUser = state => state.authentication;

export const login = () => dispatch => {
    console.log("LOGGING IN");
    window.location.href = 'http://localhost:9000/auth/login';
};

export const saveLogin = () => dispatch => {
    console.log("SAVING LOGIN");
    const tokensAndID = parseTokens();
    const access = tokensAndID[0];
    const refresh = tokensAndID[1];
    const userID = tokensAndID[2];

    if (access && refresh) {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('userID', userID);
      history.push('/');
    }
    return dispatch(loginSuccess({
            loggedIn: true,
            access: access,
            refresh: refresh,
            userID: userID
        }));
};

export function loginSuccess (user) {
    console.log("DISPATCHED LOGIN_SUCCESS")
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
};

export const logout = () => dispatch => {
    console.log("LOGGING OUT");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userID');
    history.push('/login');
    return dispatch(logoutSuccess({
            loggedIn: false,
            access: null,
            refresh: null,
            userID: null
        })); 
};

export function logoutSuccess (user) {
    console.log("DISPATCHED LOGOUT_SUCCESS")
    return {
        type: "LOGOUT_SUCCESS",
        payload: user
    }
};