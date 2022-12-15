import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getApps} from 'firebase/app';
import {app} from './firebase-config'
import { AppNavigation } from './src/infrastructure/navigation/AppNavigation';
import { AccountNavigation } from './src/infrastructure/navigation/AccountNavigation';

import {theme} from './src/infrastructure/theme'
import {Outfit_400Regular, useFonts as useRoboto} from "@expo-google-fonts/outfit"
import { AuthenticationContextProvider } from './src/service/Authentication/AuthenticationContext';


export default function App() {
  const [outfitLoaded] = useRoboto({Outfit_400Regular})
  const [isUser, setIsUser] = useState(true);

  const auth = getAuth();
  

  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true)
      } else {
        setIsUser(false)
      }
    })
  }, []);

  if(getApps().length < 1){
    app;
  }

  if (!outfitLoaded) return null
  
  return (
    <>
    <ThemeProvider theme={theme}>
        <ExpoStatusBar style="light" backgroundColor="#8231CB" translucent={true} />
        <AuthenticationContextProvider>
          <NavigationContainer>
            {isUser ? <AppNavigation /> : <AccountNavigation />}
          </NavigationContainer>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}

