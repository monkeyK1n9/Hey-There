import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Dimensions} from 'react-native'
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

export const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const screenWidth = Dimensions.get('screen').width

    const submitAction = () => {
        if (!email) {
            setError('Please enter a valid email')
            return
        }
        navigation.navigate('OTP', {email: email})
        setError('')
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
                <Text variant="h5">Hey There</Text>
                <Spacer size="medium" />
                <Text variant="title">Connecting World Around You</Text>

                <ContentView style={{alignItems: 'flex-start', width: '100%'}}>
                    <Spacer size="large" />
                    <Spacer size="large" />
                    <Spacer size="large" />
                    <Text variant={screenWidth > 550 ? "h3" : "h4"} style={{textAlign: 'left'}}>Forgot Password?</Text>
                    <Spacer size="medium" />
                    <Text variant="title">Don’t worry it happens. Please enter the address associated with your account</Text>
                    <Spacer size="large" />
                </ContentView>


                <TextInput
                    mode='outlined'
                    maxLength={100}
                    placeholder={"Email/user ID"}
                    keyboardType="email-address"
                    outlineColor={theme.colors.ui.primary}
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    style={{width: '95%'}}
                />
                {error && <Text variant="error">{error}</Text>}
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