import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native'
import styled from 'styled-components/native'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { RectPrimaryButton } from '../../../components/buttons/Buttons';
import * as Location from 'expo-location';

const ContentView = styled(View)`
    align-items: center;
    justify-content: center;
    flex: 1;
    width: ${Dimensions.get('screen').width}px
`

const ButtonView = styled(View)`
    align-items: center
`


export const MapScreen = () => {
    const [userPosition, setUserPosition] = useState()

    useEffect(() => {
        const requestPermission = async () => {
            let { status } = await  Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
               alert('Permission to access location was denied');
               return;
            } else {
              Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
              .then((position) => {
                setUserPosition(position);
              })
            }
        }

        requestPermission()
    },[])

    return (
        <>
            <ContentView>
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    region= {{
                        latitude: userPosition?.latitude,
                        longitude: userPosition?.longitude,
                        latitudeDelta: 1,
                        longitudeDelta: 1,
                      }}
                      style={{flex: 1, width: '100%', height: '100%'}}
                />
            {/* <ButtonView>
                <Spacer size="large" />
                <RectPrimaryButton
                    title="Look for chat mates"
                />
            </ButtonView> */}
            </ContentView>

        </>
    )
}