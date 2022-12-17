import React, {useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {theme} from '../theme'
import { HomeScreen } from '../../feature/home/screens/HomeScreen';
import { MapScreen } from '../../feature/map/screens/MapScreen';
import { ChatScreen } from '../../feature/chat/screens/ChatScreen'
import {SafeAreaViewSection} from '../../components/safeArea/SafeAreaViewSection'
import { ScreenHeader } from '../../components/screenHeader/ScreenHeader';
import { DiscussionContextProvider } from '../../service/Discussion/DiscussionContext';
import { Header } from '../../feature/chat/components/header/Header';

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const HomeTabs = () => {
    return (
        <>
            <ScreenHeader title={'Home'}/>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    animationEnabled: true,
                    tabBarActiveTintColor: theme.colors.text.primary,
                    tabBarInactiveTintColor: theme.colors.ui.secondary,
                    tabBarHideOnKeyboard: true,
                })}
            >
                <Tab.Screen 
                    name='Home' 
                    component={HomeScreen} 
                    options={{header: "Home"}}
                />
                <Tab.Screen 
                    name='Map' 
                    component={MapScreen} 
                    options={{header: "Map"}}
                />
        </Tab.Navigator>
        </>
    )
}

export const AppNavigation = () => {
    
    return (
        <>
            <SafeAreaViewSection>
                <DiscussionContextProvider>
                    <Stack.Navigator>
                            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{headerShown: false, }}/>
                            <Stack.Screen name="Chat" component={ChatScreen} options={({route}) => ({
                                headerTitle: () => <Header userImageUrl={route.params.userImageUrl} senderName={route.params.senderName} />
                            })}/>
                    </Stack.Navigator>
                </DiscussionContextProvider>
            </SafeAreaViewSection>
        </>
    )
}