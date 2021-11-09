import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOG_IN_USER: "LOG_IN_USER",
    ERROR_MSG: "ERROR_MSG"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: ""
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: auth.error
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: auth.error
                })
            }
            case AuthActionType.LOG_IN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: auth.error
                })
            }
            case AuthActionType.ERROR_MSG: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: payload.error
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch(err){

        }
    }

    auth.loginUser = async function (userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOG_IN_USER,
                    payload: {
                            user: response.data.user,
                            loggedIn: response.data.loggedIn
                        }
                    });
                }
                history.push("/");
                store.loadIdNamePairs();
        }
        catch(err)
        {
            let e = err;

            console.log(err);
            let msg = err.response.data.errorMessage
            authReducer({
                type: AuthActionType.ERROR_MSG,
                payload:{
                    error: msg
                }
            })
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err)
        {
            let msg = err.response.data.errorMessage
            authReducer({
                type: AuthActionType.ERROR_MSG,
                payload:{
                    error: msg
                }
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };