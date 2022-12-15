import React, {useState, useContext} from 'react';
import {Image, ScrollView, TouchableOpacity, View, Dimensions} from 'react-native'
import styled from 'styled-components/native'
import { RectPrimaryButton } from '../../../components/buttons/Buttons';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import {TextInput, Checkbox} from 'react-native-paper'
import {theme} from '../../../infrastructure/theme'
import { AuthenticationContext } from '../../../service/Authentication/AuthenticationContext';

const ContentView = styled(View)`
    padding-horizontal: ${props => props.theme.space[2]};
    align-items: center;
`
const AgreeTermsView = styled(View)`
    padding-horizontal: ${props => props.theme.space[2]};
    width: ${0.85*Dimensions.get("window").width}px;
    max-width: 300px     
    flex-direction: row;
    align-items: center
`
const TextView = styled(View)`
    padding-horizontal: ${props => props.theme.space[3]};
    flex-direction: row;
`

export const CreateAccountScreen = ({navigation}) => {
    const {onCreateAccount, error, setError, isLoading} = useContext(AuthenticationContext)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const [errorAgree, setErrorAgree] = useState(false)


    const screenWidth = Dimensions.get('screen').width

    return (
        <>
            <ScrollView>
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            <ContentView>
                <Image source={require('../../../../assets/logo.png')} style={{width: 70, height: 70}} resizeMode="center"/>
                <Spacer size="large" />
                <Text variant="h5">Hey There</Text>

                <Spacer size="large" />
                <Text variant={screenWidth > 550 ? "h3" : "h4"} style={{textAlign: 'center'}}>Create an account!</Text>
                <Spacer size="large" />
                <Spacer size="large" />

                <TextInput
                    mode='outlined'
                    maxLength={100}
                    placeholder={"username"}
                    keyboardType="twitter"
                    outlineColor={theme.colors.ui.primary}
                    value={username}
                    onChangeText={(t) => setUsername(t)}
                    style={{width: '95%'}}
                    textContentType="username"
                />
                <Spacer size="medium" />

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
                <Spacer size="medium" />

                <TextInput
                    mode='outlined'
                    maxLength={100}
                    placeholder={"Confirm Password"}
                    keyboardType="password"
                    secureTextEntry={true}
                    outlineColor={theme.colors.ui.primary}
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                    style={{width: '95%'}}
                />
                {error && <Text variant="error">{error}</Text>}
                <Spacer size="large" />
            </ContentView>
            <AgreeTermsView>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    color={theme.colors.ui.primary}
                />
                <Text>I agree to the </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Terms And Conditions')}
                >
                    <Text variant="account">terms and conditions</Text>
                </TouchableOpacity>

            </AgreeTermsView>
            <AgreeTermsView>
                {errorAgree && (
                    <Text variant="error">Error: You need to agree to the terms and conditions
                    </Text>
                )}
            </AgreeTermsView>
            <Spacer size="large" />
            <ContentView>
                <RectPrimaryButton
                    type="full"
                    title='Create Account'
                    isLoading={isLoading}
                    pressAction={() => {
                        if(checked) {
                            setErrorAgree(false)
                            onCreateAccount(username, email, password, confirmPassword)
                            return
                        }
                        setErrorAgree(true)
                    }}
                />
                <Spacer size="large" />
                <TextView>
                    <Text variant="title">Already have an account? </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setError('')
                            navigation.navigate('Login')
                        }}
                    >
                        <Text variant="title" style={{color: theme.colors.ui.primary, textAlign: 'left'}}>Login</Text>
                    </TouchableOpacity>
                </TextView>
            </ContentView>
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            <Spacer size="large" />
            </ScrollView>
        </>
    )
}