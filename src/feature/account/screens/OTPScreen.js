import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Dimensions, Alert} from 'react-native'
import styled from 'styled-components/native'
import { RectPrimaryButton } from '../../../components/buttons/Buttons';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {theme} from '../../../infrastructure/theme'

const ContentView = styled(View)`
    padding-horizontal: ${props => props.theme.space[2]};
    align-items: center;
`

const CELL_COUNT = 6;

export const OTPScreen = ({navigation, route}) => {
    const [value, setValue] = useState('')
    const {email} = route.params
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const screenWidth = Dimensions.get('screen').width

    const submitAction = () => {
        Alert.alert('Coming soon', 'This feature is coming soon, no email was sent to your mail.',
            [
                {text: 'Ok', onPress: () => navigation.navigate('Reset')}
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
                <Text variant="h5">Hey There</Text>
                <Spacer size="medium" />
                <Text variant="title">Connecting World Around You</Text>

                <ContentView style={{alignItems: 'flex-start', width: '100%'}}>
                    <Spacer size="large" />
                    <Spacer size="large" />
                    <Spacer size="large" />
                    <Text variant={screenWidth > 550 ? "h3" : "h4"} style={{textAlign: 'left'}}>Enter OTP</Text>
                    <Spacer size="medium" />
                    <Text variant="title">A code has been sent to {email}</Text>
                    <Spacer size="large" />
                </ContentView>


                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={(t) => setValue(t)}
                    cellCount={CELL_COUNT}
                    rootStyle={{marginTop: 20}}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            onLayout={getCellOnLayoutHandler(index)}
                            style={
                                [
                                    {
                                        width: 40,
                                        height: 40,
                                        lineHeight: 38,
                                        fontSize: 24,
                                        borderWidth: 2,
                                        borderColor: theme.colors.ui.secondary,
                                        textAlign: 'center',
                                        marginHorizontal: 6
                                    },
                                    isFocused && 
                                    {
                                        borderColor: theme.colors.ui.primary,
                                    }
                                ]
                            }
                        >
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
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