import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native'
import { Text } from '../../../components/typography/TextComponent';
import { FlashList } from "@shopify/flash-list";
import {CircPrimaryButton} from '../../../components/buttons/Buttons'
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { FontAwesome } from '@expo/vector-icons'
import {AuthenticationContext} from '../../../service/Authentication/AuthenticationContext'
import styled from 'styled-components/native'
import {theme} from '../../../infrastructure/theme'

import { fetchMessages } from '../../../utils/fetchMessages';
import { MessageCard } from '../components/messageCard/MessageCard';
import { TextInput } from 'react-native-paper';

const BottomView = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-vertical: ${props => props.theme.space[2]};
    padding-horizontal: ${props => props.theme.space[3]};
    background-color: ${props => props.theme.colors.ui.primary}
    position: relative;
    bottom: 0
`

export const ChatScreen = ({navigation, route}) => {
    const {user} = useContext(AuthenticationContext)

    const [messages, setMessages] = useState([])
    const [textMessage, setTextMessage] = useState()

    const {roomId} = route.params

    const sendMessage = (message) => {

    }

    useEffect(() => {
        fetchMessages(roomId)
        .then((response) => {
            // console.log(response)
            setMessages(response)
        })
    }), [messages]

    return (
        <>
            <FlashList
                data={messages}
                renderItem={({ item }) =>
                    <>
                        <MessageCard messageContent={item} user={user}/>
                    </>
                }
                estimatedItemSize={100}
            />

            <BottomView>
                <TextInput
                    mode="outlined"
                    placeholder="Enter you message"
                    outlineColor={theme.colors.ui.primary}
                    style={{width: '85%', height: 40}}
                    numberOfLines={3}
                    value={textMessage}
                    onChangeText={(t) => setTextMessage(t)}
                />
                <Spacer size="medium" position="left"/>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => sendMessage(textMessage)}
                >
                    <FontAwesome name="send" size={28} color={theme.colors.ui.quaternary} />
                </TouchableOpacity>
            </BottomView>
        </>
    )
}