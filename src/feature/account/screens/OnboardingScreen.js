import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import {theme} from "../../../infrastructure/theme"
import { Text } from '../../../components/typography/TextComponent';
import { Spacer } from '../../../components/spacer/SpacerComponent';

export const OnboardingScreen = ({navigation}) => {

    const Dot = ({ isLight, selected }) => {
        let backgroundColor;
        if (isLight) {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        } else {
            backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
        }
        return (
            <View
            style={{
                width: 6,
                height: 6,
                borderRadius:3,
                marginHorizontal: 3,
                backgroundColor,
            }}
            />
        );
    };
    
    const backgroundColor = isLight => (isLight ? theme.colors.brand.primary : theme.colors.ui.quaternary);
    const color = isLight => backgroundColor(!isLight);

    const Skip = ({isLight, ...props}) => {
        return (
            <TouchableOpacity
                style={{marginHorizontal: 16}}
                {...props}
            >
                <Text variant="bodyWhite">SKIP</Text>
            </TouchableOpacity>
        )
    }

    const Next = ({isLight, ...props}) => {
        return (
            <TouchableOpacity
                style={{marginHorizontal: 16}}
                {...props}
            >
                <Text variant="bodyWhite">NEXT</Text>
            </TouchableOpacity>
        )
    }

    const Done = ({...props}) => {
        return (
            <TouchableOpacity
                style={{marginHorizontal: 16}}
                {...props}
            >
                <Text variant="bodyWhite">DONE</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dot}
                onSkip={() => navigation.replace('Create Account')}
                onDone={() => navigation.replace('Create Account')}
                imageContainerStyles={{paddingBottom: 10}}
                pages={[
                    {
                        backgroundColor: theme.colors.ui.quaternary,
                        image: <Image source={require('../../../../assets/onboarding/image1.jpg')} style={{width: 300, height: 300}} resizeMode='contain' />,
                        title: "Connect Differently",
                        subtitle: (
                            <>
                                <Text style={{textAlign: 'center'}}>Be more social, be more close</Text>
                                <Spacer size="large" />
                                <Spacer size="large" />
                            </>
                        ),
                    },
                    {
                        backgroundColor: theme.colors.ui.quaternary,
                        image: <Image source={require('../../../../assets/onboarding/image2.jpg')} style={{width: 300, height: 300}} resizeMode='contain' />,
                        title: "Your friends, your world",
                        subtitle: (
                            <>
                                <Text style={{textAlign: 'center'}}>Connect with your friends around you</Text>
                                <Spacer size="large" />
                                <Spacer size="large" />
                            </>
                        ),
                    }
                ]}
                bottomBarColor= {theme.colors.brand.primary}
                bottomBarHeight={65}
            />
        </>
    )
}