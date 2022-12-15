import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Dimensions, Alert} from 'react-native'
import styled from 'styled-components/native'
import { RectPrimaryButton } from '../../../components/buttons/Buttons';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import {TextInput} from 'react-native-paper'
import {theme} from '../../../infrastructure/theme'

const ContentView = styled(View)`
    padding-horizontal: ${props => props.theme.space[2]};
    align-items: center;
`
const TextView = styled(View)`
    padding-horizontal: ${props => props.theme.space[3]};
    flex-direction: row;
`

export const ResetPasswordScreen = ({navigation}) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const screenWidth = Dimensions.get('screen').width

    const submitAction = () => {
        Alert.alert('Coming soon', "This feature is coming soon, you can't reset your password",
            [
                {text: 'Ok', onPress: () => navigation.navigate('Login')}
            ]
        )
    }
    return (
        <>
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            <ContentView>
                <Image source={require('../../../../assets/logo.png')} style={{width: 70, height: 70}} resizeMode="center"/>
                <Spacer size="large" />
                <Text variant="h5">Cramble</Text>
                <Spacer size="medium" />
                <Text variant="title">Connecting World through Gaming</Text>

                <ContentView style={{alignItems: 'flex-start', width: '100%'}}>
                    <Spacer size="large" />
                    <Spacer size="large" />
                    <Spacer size="large" />
                    <Text variant={screenWidth > 550 ? "h3" : "h4"} style={{textAlign: 'left'}}>Reset Password</Text>
                    <Spacer size="large" />
                </ContentView>


                <TextInput
                    mode='outlined'
                    maxLength={100}
                    placeholder={"New Password"}
                    keyboardType="password"
                    secureTextEntry={true}
                    outlineColor={theme.colors.ui.primary}
                    value={newPassword}
                    onChangeText={(t) => setNewPassword(t)}
                    style={{width: '95%'}}
                />
                <Spacer size="medium" />

                <TextInput
                    mode='outlined'
                    maxLength={100}
                    placeholder={"Confirm New Password"}
                    keyboardType="password"
                    secureTextEntry={true}
                    outlineColor={theme.colors.ui.primary}
                    value={confirmNewPassword}
                    onChangeText={(t) => setConfirmNewPassword(t)}
                    style={{width: '95%'}}
                />
                <Spacer size="medium" />

            </ContentView>
            <Spacer size="small" />
            <Spacer size="large" />
            <ContentView>
                <RectPrimaryButton
                    type="full"
                    title="Submit"
                    pressAction={submitAction}
                />
                <Spacer size="large" />
            </ContentView>
        </>
    )
}