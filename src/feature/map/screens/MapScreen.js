import React, {useEffect, useState, useRef, useContext} from 'react';
import {Dimensions, ToastAndroid, View, Modal, TouchableOpacity, Image} from 'react-native'
import styled from 'styled-components/native'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import {Text} from '../../../components/typography/TextComponent'
import { RectPrimaryButton, RectSecondaryButton } from '../../../components/buttons/Buttons';
import * as Location from 'expo-location';
import {AuthenticationContext} from '../../../service/Authentication/AuthenticationContext'

import {db} from '../../../../firebase-config'
import {getAuth} from 'firebase/auth'
import {arrayUnion, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'

import { mapFilter } from '../../../utils/mapFilter';
import {theme} from '../../../infrastructure/theme'

//update user location in firebase
const auth = getAuth()

const ContentView = styled(View)`
    align-items: center;
    justify-content: center;
    flex: 1;
    width: ${Dimensions.get('screen').width}px;
    height: ${Dimensions.get('screen').height}px
`
const ButtonView = styled(View)`
    align-items: center;
    position: absolute;
    bottom: 20px;
`
const ModalContentView = styled(View)`
    flex: 1
    align-items: center;
    justify-content: center
    background-color: rgba(0,0,0,0.5)
`
const ModalView = styled(View)`
    align-items: center;
    justify-content: center
    padding-vertical: ${props => props.theme.space[3]};
    padding-horizontal: ${props => props.theme.space[3]};
    border-radius: ${props => props.theme.space[2]}
    justify-content: center;
    background-color: ${props => props.theme.colors.ui.quaternary};
    width: ${0.8*Dimensions.get('window').width}px
`
const ModalOptionsView = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: ${props => props.theme.space[2]};
`


export const MapScreen = ({navigation}) => {
    const {user} = useContext(AuthenticationContext)

    const [userPosition, setUserPosition] = useState({})
    const [usersAround, setUsersAround] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isMapModal, setIsMapModal] = useState(false)
    const [futureFriend, setFutureFriend] = useState({})
    const [roomId, setRoomId] = useState()

    const mapRef = useRef()

    const updateLocation = async (id, latitude, longitude) => {
        await updateDoc(doc(db, "users", id), {
            "data.location": [latitude, longitude]
        })
    }  

    const searchUsers = async (id) => {
        let { status } = await  Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        } else {

            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High, timeInterval: 10000})
            
            setUserPosition(position.coords);
            mapRef.current?.animateToRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }, 2000)
            
            const usersLocationAround = await mapFilter(id)
            setUsersAround(usersLocationAround)

            if (usersAround?.length == 1) {
                ToastAndroid.show("No users around", ToastAndroid.SHORT)
            }
        }
    }

    const requestUsersAround = async () => {
        let { status } = await  Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        } else {
            try {
                const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High, timeInterval: 10000})
              
                setUserPosition(position.coords);
                mapRef.current?.animateToRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }, 2000)
                
                await updateLocation(auth.currentUser?.uid || user.uid, position.coords.latitude, position.coords.longitude);
                await searchUsers(auth.currentUser?.uid || user.uid)
            }
            catch (err) {
                // console.error(err)
            }
    
        }

    }

    const randomRoomId = () => {
        const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const code = []

        for (let i = 0; i < 10; i++) {
            code.push(str[Math.floor(Math.random() * str.length)])
        }
        setRoomId(code.join(''))
    }

    const date = new Date()

    useEffect(() => {

        requestUsersAround()

    }, [])

    return (
        <>
        <Modal
                animationType="fade"
                visible={isMapModal}
                onDimiss={()=>setIsMapModal(false)}
                transparent
            >
                <ModalContentView>
                <ModalView>
                    <Image source={{uri: "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"}} style={{width: 150, height: 150}} resizeMode="stretch" />
                    <Spacer size="medium" />
                    <RectPrimaryButton
                        type='content'
                        title="Chat"
                        pressAction={async () => {
                            const discussions = await getDoc(doc(db, 'discussionsList', auth.currentUser?.uid))

                            if (discussions.exists()){
                                let list = discussions.data()
                                const chat = list.data.filter((discussion) => discussion.id == futureFriend.data.id)

                                if (chat.length == 0) {
                                    await updateDoc(doc(db, 'discussionsList', auth.currentUser?.uid), {
                                        data: arrayUnion({
                                            id: futureFriend.data.id,
                                            lastMessage: "",
                                            roomId: roomId,
                                            sender: futureFriend.data.username,
                                            userImageUrl: "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
                                            username: futureFriend.data.username
                                        })
                                    })

                                    await updateDoc(doc(db, 'discussionsList', futureFriend.data.id), {
                                        data: arrayUnion({
                                            id: auth.currentUser?.uid || user.uid,
                                            lastMessage: "",
                                            roomId: roomId,
                                            sender: auth.currentUser?.displayName || user.displayName,
                                            userImageUrl: "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg",
                                            username: auth.currentUser?.displayName || user.displayName
                                        })
                                    })

                                    try {
                                        await updateDoc(doc(db, 'messages', roomId), {
                                            data: arrayUnion({
                                                from: auth.currentUser?.uid || user.uid,
                                                id: roomId,
                                                message: "",
                                                msgType: "text",
                                                time: date.getTime(),
                                                to: futureFriend.data.id
                                            })
                                        })
                                    }
                                    catch (err) {
                                        await setDoc(doc(db, 'messages', roomId), {
                                            data: arrayUnion({
                                                from: auth.currentUser?.uid || user.uid,
                                                id: roomId,
                                                message: "",
                                                msgType: "text",
                                                time: date.getTime(),
                                                to: futureFriend.data.id
                                            })
                                        })
                                    }

                                    navigation.navigate('Chat', {
                                        roomId: roomId, 
                                        userImageUrl: "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg", 
                                        senderName: futureFriend.data.username,
                                        senderId: futureFriend.data.id, 
                                        lastMessage: "", 
                                        username: futureFriend.data.username
                                    })
                                    return
                                }

                                navigation.navigate('Chat', {
                                    roomId: chat[0].roomId, 
                                    userImageUrl: "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg", 
                                    senderName: futureFriend.data.username,
                                    senderId: chat[0].id, 
                                    lastMessage: chat[0].lastMessage, 
                                    username: chat[0].username
                                })
                                return
                            }
                            setIsMapModal(false)
                        }}
                        isLoading={isLoading}
                    />
                    <Spacer size="medium" />

                    <ModalOptionsView>
                        <RectSecondaryButton
                            type='content'
                            title="Cancel"
                            pressAction={() => {
                                setFutureFriend({})
                                setIsMapModal(false)
                            }}
                        />
                    </ModalOptionsView>

                </ModalView>
                </ModalContentView>
            </Modal>
            <ContentView>
                <MapView 
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    initialRegion= {{
                        latitude: userPosition?.latitude || 3,
                        longitude: userPosition?.longitude || 14,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                    }}
                    style={{flex: 1, width: '100%', height: '100%'}}
                >
                    {usersAround && (
                        usersAround.map((friend, index) => {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: friend.data.location[0],
                                        longitude: friend.data.location[1]
                                    }}
                                    
                                    key={index}
                                    onPress={() => {
                                        console.log(friend.data.id)
                                        if (friend.data.id == user.uid) {
                                            return
                                        }
                                        else {
                                            randomRoomId()
                                            setFutureFriend(friend)
                                            setIsMapModal(!isMapModal)
                                        }
                                    }}
                                >
                                    
                                    <Image source={{uri: "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"}} style={{width: 55, height: 55, borderRadius: 27.5}} />
                                </Marker>
                            )
                        })
                        
                    )}
                </MapView>
                <ButtonView>
                    <RectPrimaryButton
                        type='full'
                        title="Search users"
                        pressAction={() => searchUsers(auth.currentUser?.uid || user.uid)}
                        isLoading={isLoading}
                    />
                </ButtonView>
            </ContentView>

        </>
    )
}