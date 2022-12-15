import React, {useState, createContext, useEffect} from "react"
import {ToastAndroid} from 'react-native'
import { doc, setDoc} from "firebase/firestore"
import {getAuth, onAuthStateChanged, signOut, updateProfile} from "firebase/auth"
import { createAccountRequest, loginRequest } from "./AuthenticationService"
import { db } from "../../../firebase-config";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState()
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');



    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
                }
            if (finalStatus !== 'granted') {
                alert(t('createAccount.failedNotificationPermission'));
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            // console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token
    }


    useEffect(() => {
        registerForPushNotificationsAsync()
        .then(token => {
            setExpoPushToken(token)
        });
    },[])


    const createUserDatabase = async (id, username) => {
        try {
            await setDoc(doc(db, "users", id), {
                data: {
                    id,
                    username,
                    expoPushToken
                }
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (usr) => {
    if (usr) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(usr)
        setIsLoading(false)
        setError(null)
        // storeUserAuth('true')
    } else {
        // User is signed out
        setIsLoading(false)
    }
    });

    const onLogin = (email, password) => {
        setIsLoading(false)
        setIsAuthenticated(false)
        loginRequest(email, password)
            .then ((u) => {
                setUser(u)
                setIsAuthenticated(true)
                ToastAndroid.show('Login successful', ToastAndroid.SHORT)
                setIsLoading(true)
                setError('')
            })
            .catch((e) => {
                setIsLoading(false)
                setError('Email or password is/are incorrect')
            })
    }

    const onCreateAccount = (userName, email, password, confirmPassword) => {
        setIsLoading(true)
        setError('')
        setIsAuthenticated(false)
        if(password !== confirmPassword) {
            setError('Error: Password must match')
            return
        }
        createAccountRequest(email, password)
            .then ((u) => {
                updateProfile(auth.currentUser, {displayName: userName})
                setUser(u)
                createUserDatabase(user.uid, userName)
                setIsAuthenticated(true)
                ToastAndroid.show('Accounted created', ToastAndroid.SHORT)
                setIsLoading(false)
                setError('')
            })
            .catch((e) => {
                setError('Email or Password is/are incorrect')
                setIsLoading(false)
            })
    }

    const onLogout = () => {
        const auth = getAuth()
        signOut(auth)
        setUser(null)
    }

    const resetPassword = () => {
        alert('Feature coming soon')
    }


    return (
        <AuthenticationContext.Provider
            value={{
                user,
                isLoading: !!user,
                error,
                isAuthenticated: !!user,
                setError,
                setIsLoading,
                onCreateAccount,
                onLogin,
                onLogout,
                resetPassword,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}