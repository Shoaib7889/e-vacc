export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    return (dispatch) => {
        console.log('in')
        dispatch(receiveLogin());
        const email=localStorage.getItem('email');
        const password=localStorage.getItem('password');
        console.log('email ',email,password)
        if (creds.email ==email && creds.password ==password) {
            console.log('inside')
            localStorage.setItem('authenticated', true)
        } else {
            dispatch(loginError('Something was wrong. Try again'));
        }
    }
} 
