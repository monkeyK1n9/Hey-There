import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getApps} from 'firebase/app';
import {app} from './firebase-config'
import { AppNavigation } from './src/infrastructure/navigation/AppNavigation';
import { AccountNavigationFirst, AccountNavigationSecond } from './src/infrastructure/navigation/AccountNavigation';

import {theme} from './src/infrastructure/theme'
import {Outfit_400Regular, useFonts as useRoboto} from "@expo-google-fonts/outfit"
import { AuthenticationContextProvider } from './src/service/Authentication/AuthenticationContext';

import {enableLatestRenderer} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage'

enableLatestRenderer();


export default function App() {
  const [outfitLoaded] = useRoboto({Outfit_400Regular})
  const [isUser, setIsUser] = useState(true);
  const [isFirstOpenTime, setIsFirstOpenTime] = useState(false)

  const auth = getAuth();


  useEffect(() => {
    // AsyncStorage.removeItem('isFirstOpenTime')
    AsyncStorage.getItem('isFirstOpenTime')
    .then((val) => {
      if (val == null) {
        AsyncStorage.setItem('isFirstOpenTime', 'True')
        setIsFirstOpenTime(true)
        return
      }
    })
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true)
      } else {
        setIsUser(false)
      }
    })
  }, [])

  if(getApps().length < 1){
    app;
  }

  if (!outfitLoaded) return null
  
  return (
    <>
    <ThemeProvider theme={theme}>
        <ExpoStatusBar style="light" backgroundColor="#8231CB" translucent={true} />
        <AuthenticationContextProvider>

          {isFirstOpenTime? (
            <NavigationContainer>
              {!isUser ? <AccountNavigationFirst /> : <AppNavigation />}
            </NavigationContainer>
          ):(
            <NavigationContainer>
              {isUser ? <AppNavigation /> : <AccountNavigationSecond />}
            </NavigationContainer>
          )}
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}

