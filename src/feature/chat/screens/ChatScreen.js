import React, {useContext, useEffect, useState, useRef} from 'react';
import {ToastAndroid, TouchableOpacity, View} from 'react-native'
import { Text } from '../../../components/typography/TextComponent';
import { FlashList } from "@shopify/flash-list";
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { FontAwesome } from '@expo/vector-icons'
import styled from 'styled-components/native'
import {theme} from '../../../infrastructure/theme'

import { fetchMessages } from '../../../utils/fetchMessages';
import { MessageCard } from '../components/messageCard/MessageCard';
import { TextInput } from 'react-native-paper';

import {AuthenticationContext} from '../../../service/Authentication/AuthenticationContext'

import {db} from '../../../../firebase-config'
import {getAuth} from 'firebase/auth'
import {arrayUnion, doc, getDoc, setDoc, updateDoc, where} from 'firebase/firestore'

const auth = getAuth()

const BottomView = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-vertical: ${props => props.theme.space[2]};
    padding-horizontal: ${props => props.theme.space[3]};
    background-color: ${props => props.theme.colors.ui.primary}
    width: 100%
`

export const ChatScreen = ({navigation, route}) => {
    const {user} = useContext(AuthenticationContext)

    const flashListRef = useRef()

    const [messages, setMessages] = useState([])
    const [textMessage, setTextMessage] = useState()

    const {roomId, userImageUrl, senderName, senderId, lastMessage, username} = route.params

    const date = new Date()

    const sendMessage = async (message) => {
        setTextMessage('')

        const userDiscussions = await getDoc(doc(db, 'discussionsList', auth.currentUser?.uid))

        if (userDiscussions.exists()){
            const userChats = userDiscussions.data().data.filter((discussion) => discussion.id != senderId)
            userChats.unshift({
                id: senderId,
                lastMessage: message,
                roomId: roomId,
                sender: auth.currentUser?.displayName || user.displayName,
                userImageUrl: userImageUrl,
                username: senderName
            })

            await updateDoc(doc(db, 'discussionsList', auth.currentUser?.uid), {
                data: userChats
            })

        }

        const friendDiscussions = await getDoc(doc(db, 'discussionsList', senderId))

        if (friendDiscussions.exists()) {
            const friendChats = friendDiscussions.data().data.filter((discussion) => discussion.id != (auth.currentUser?.uid || user.uid))
            friendChats.unshift({
                id: auth.currentUser?.uid || user.uid,
                lastMessage: message,
                roomId: roomId,
                sender: auth.currentUser?.displayName || user.displayName,
                userImageUrl: userImageUrl,
                username: auth.currentUser?.displayName || user.displayName
            })

            await updateDoc(doc(db, 'discussionsList', senderId), {
                data: friendChats
            })
        }

        try {
            await updateDoc(doc(db, 'messages', roomId), {
                data: arrayUnion({
                    from: auth.currentUser?.uid || user.uid,
                    id: roomId,
                    message: message,
                    msgType: "text",
                    time: date.getTime(),
                    to: senderId
                })
            })
        }
        catch (err) {
            await setDoc(doc(db, 'messages', roomId), {
                data: arrayUnion({
                    from: auth.currentUser?.uid || user.uid,
                    id: roomId,
                    message: message,
                    msgType: "text",
                    time: date.getTime(),
                    to: senderId
                })
            })
        }

        flashListRef.current.scrollToIndex({index: 0})
    }

    useEffect(() => {
        fetchMessages(roomId)
        .then((response) => {
            if (messages.length < response[0].data) {
                setMessages(response[0].data.reverse())
                flashListRef.current.scrollToIndex({index: 0})
                return
            }
            setMessages(response[0].data.reverse())
        })
    }, [messages])

    useEffect(() => {
        flashListRef.current.scrollToIndex({index: 0})
      
    }, [])

    return (
        <>
            <FlashList
                ref={flashListRef}
                data={messages}
                renderItem={({ item }) =>{

                    if (item.message.length > 0) {
                        return (
                            <>
                                <MessageCard messageContent={item} user={user}/>
                            </>
                        )
                    }}
                }
                estimatedItemSize={100}
                inverted
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
                    showSoftInputOnFocus
                />
                <Spacer size="medium" position="left"/>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if (textMessage.length == 0) {
                            ToastAndroid.show('Enter a message', ToastAndroid.SHORT)
                            return
                        }
                        sendMessage(textMessage)
                    }}
                >
                    <FontAwesome name="send" size={28} color={theme.colors.ui.quaternary} />
                </TouchableOpacity>
            </BottomView>
        </>
    )
}