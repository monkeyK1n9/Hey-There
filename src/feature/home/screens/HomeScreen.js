import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Modal, ScrollView, Dimensions} from 'react-native'
import { Text } from '../../../components/typography/TextComponent';
import { FlashList } from "@shopify/flash-list";
import {CircPrimaryButton, RectPrimaryButton} from '../../../components/buttons/Buttons'
import { DiscussionCard } from '../components/discussionCard/DiscussionCard';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import {MaterialIcons} from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native-paper';

import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

import {theme} from '../../../infrastructure/theme'

import {AuthenticationContext} from '../../../service/Authentication/AuthenticationContext'
import { DiscussionContext } from '../../../service/Discussion/DiscussionContext';

const auth = getAuth()
const ButtonView = styled(View)`
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 100;
`
const ModalView = styled(View)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
`
const ModalContentView = styled(View)`
    padding-top: ${props => props.theme.space[2]};
    padding-bottom: ${props => props.theme.space[4]};
    padding-left: ${props => props.theme.space[3]};
    padding-right: ${props => props.theme.space[3]};
    background-color: ${props => props.theme.colors.ui.quaternary};
    border-radius: ${props => props.theme.space[2]};
    min-width: ${0.5 * Dimensions.get("window").width}px;
    width: 85%;
    max-width: ${0.85 * Dimensions.get("window").width}px;
    max-height: 90%
    shadow-color: ${props => props.theme.colors.text.primary};
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 6;
`
const ContentView= styled(View)`
    align-items: center;
    justify-content: center;
`
const ModalOptionView = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding-horizontal: ${props => props.theme.space[3]}
`
const CloseModalIconView = styled(View)`
    align-items: flex-end;
    justify-content: center
`

export const HomeScreen = ({navigation}) => {
    const {user} = useContext(AuthenticationContext)
    const {discussionsList, isLoading} = useContext(DiscussionContext)

    const [isFirstOpened, setIsFirstOpened] = useState(false)

    const addDiscussion = () => {
        navigation.navigate('Map')
    }

    const openDiscussion = (item) => {
        const {
            id,
            lastMessage,
            roomId,
            sender,
            userImageUrl,
            username,
        } = item
        navigation.navigate('Chat', {roomId: roomId, userImageUrl: userImageUrl, senderName: sender, senderId: id, lastMessage: lastMessage, username: username})
    }

    // welcome modal
    useEffect(() => {
        //for development only
        // AsyncStorage.removeItem('isFirstOpened')
        AsyncStorage.getItem('isFirstOpened')
        .then((value) => {
            if (value == null) {
                setIsFirstOpened(true)
                AsyncStorage.setItem('isFirstOpened', 'true')
                return
            }
        })
    }, [])


    return (
        <>
            {isFirstOpened && !discussionsList && (
                <ContentView>
                    <Spacer size="large" />
                    <Spacer size="large" />
                    <Text variant='title'>No Discussions</Text>
                    <Spacer size="medium" />
                    <Text>Start a new discussion by pressing the buttion below</Text>
                </ContentView>
            )}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isFirstOpened}
                onRequestClose={() => {
                    setIsFirstOpened(false);
                }}
            >
                <ModalView>
                    <ModalContentView>
                        <CloseModalIconView>
                            <MaterialIcons 
                                name={'close'} 
                                size={30} 
                                color={theme.colors.text.coursesymbol} 
                                onPress={() => setIsFirstOpened(false)}
                            />
                        </CloseModalIconView>


                        <Text variant="title" style={{fontWeight: '700'}}>Welcome</Text>
                        <Spacer size="medium" />

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text>Welcome {auth.currentUser?.displayName || user.displayName}, you can now connect with your friends around you.</Text>
                            <Spacer size="small" />
                            <Text>Start by looking for your friends, chat, have fun!</Text>
                            <Spacer size="large" />

                            <ModalOptionView>
                                <RectPrimaryButton
                                    type="full"
                                    pressAction={() => {
                                        setIsFirstOpened(false)
                                    }}
                                    title='Get started'
                                />
                            </ModalOptionView>
                        </ScrollView>
                    </ModalContentView>
                </ModalView>
            </Modal>
            <FlashList
                data={discussionsList}
                renderItem={({ item }) =>{

                    if (item.lastMessage?.length > 0) {
                        return (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => openDiscussion(item)}
                                >
                                    <DiscussionCard discussion={item} />
                                </TouchableOpacity>
                            </>
                        )
                    }
                    return (
                        <>
                            <ContentView
                                style={{width: Dimensions.get('window').width, height:0.75*Dimensions.get('window').height}}
                            >
                                <Text variant="title">No chat</Text>
                                <Spacer size="medium" />
                                <Text>Add a new discussion</Text>
                            </ContentView>
                        </>
                    )
                }}
                estimatedItemSize={100}
                ListEmptyComponent={() => {
                    return (
                        <>
                            <ContentView
                                style={{width: Dimensions.get('window').width, height:0.75*Dimensions.get('window').height}}
                            >
                                <ActivityIndicator 
                                    size={55} 
                                    color={theme.colors.ui.primary} 
                                />
                            </ContentView>
                            
                        </>
                    )
                }}
            />
            <ButtonView>
                <CircPrimaryButton
                    icon='plus'
                    pressAction={() => addDiscussion()}
                />
            </ButtonView>
        </>
    )
}