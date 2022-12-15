import React, {useState, useContext} from 'react';
import {Image, TouchableOpacity, View, Dimensions} from 'react-native'
import styled from 'styled-components/native'
import { RectPrimaryButton } from '../../../components/buttons/Buttons';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import {TextInput} from 'react-native-paper'
import {theme} from '../../../infrastructure/theme'
import {AuthenticationContext} from '../../../service/Authentication/AuthenticationContext'

const ContentView = styled(View)`
    padding-horizontal: ${props => props.theme.space[2]};
    align-items: center;
`
const TextView = styled(View)`
    padding-horizontal: ${props => props.theme.space[3]};
    flex-direction: row;
`

export const LoginScreen = ({navigation}) => {
    const {onLogin, error, setError, isLoading} = useContext(AuthenticationContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const screenWidth = Dimensions.get('screen').width

    const loginAction = () => console.log('Home')
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

                <Spacer size="large" />
                <Text variant={screenWidth > 550 ? "h3" : "h4"} style={{textAlign: 'center'}}>Welcome back!</Text>
                <Spacer size="medium" />
                <Text variant="title">Login to continue</Text>
                <Spacer size="large" />
                <Spacer size="large" />


                <TextInput
                    mode='outlined'
                    maxLength={100}
                    placeholder={"Email"}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    outlineColor={theme.colors.ui.primary}
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    style={{width: '95%'}}
                />
                <Spacer size="medium" />

                <TextInput
                    mode='outlined'
                    maxLength={100}
                    placeholder={"Password"}
                    keyboardType="password"
                    secureTextEntry={true}
                    outlineColor={theme.colors.ui.primary}
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    style={{width: '95%'}}
                />
                {error && <Text variant="error">{error}</Text>}
                <Spacer size="large" />
            </ContentView>
            <TextView>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Forgot Password')}
                >
                    <Text variant="title" style={{color: theme.colors.ui.primary, textAlign: 'left'}}>Forgot Password?</Text>
                </TouchableOpacity>
            </TextView>
            <Spacer size="small" />
            <Spacer size="large" />
            <ContentView>
                <RectPrimaryButton
                    type="full"
                    title='Login'
                    isLoading={isLoading}
                    pressAction={() => onLogin(email, password)}
                />
                <Spacer size="large" />
                <TextView>
                    <Text variant="title">New to Cramble? </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setError('')
                            navigation.navigate('Create Account')
                        }}
                    >
                        <Text variant="title" style={{color: theme.colors.ui.primary, textAlign: 'left'}}>Create Account</Text>
                    </TouchableOpacity>
                </TextView>
            </ContentView>
        </>
    )
}