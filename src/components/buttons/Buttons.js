import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Text } from '../typography/TextComponent';
import { CircPrimaryButtonView, CircSecondaryButtonView, RectPrimaryButtonView, RectSecondaryButtonView } from './ButtonsStyle';
import { Feather, Ionicons } from '@expo/vector-icons'
import { theme } from '../../infrastructure/theme';

export const RectPrimaryButton = ({type='content' || 'full', title, pressAction, isLoading=false}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={pressAction}
        >
            <RectPrimaryButtonView style={{width: type == 'full' && 0.92*Dimensions.get('window').width}}>
                {isLoading ? 
                    <ActivityIndicator animating={true} size={20} color={theme.colors.ui.quaternary} />
                    :
                    <Text variant="bodyWhite">{title}</Text>
}
            </RectPrimaryButtonView>
        </TouchableOpacity>
    )
}

export const RectSecondaryButton = ({type, title, pressAction, isLoading=false}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={pressAction}
        >
            <RectSecondaryButtonView style={{width: type == 'full' && '95%'}}>
                {!isLoading ? 
                    (<Text variant="bodyPrimary">{title}</Text>)
                    :
                    (<ActivityIndicator animating={true} size={35} color={theme.colors.ui.primary} />)
                }
            </RectSecondaryButtonView>
        </TouchableOpacity>
    )
}

export const CircPrimaryButton = ({icon = "plus", pressAction}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={pressAction}
        >
            <CircPrimaryButtonView>
                <Feather name={icon} size={24} color={theme.colors.ui.quaternary} />
            </CircPrimaryButtonView>
        </TouchableOpacity>
    )
}

export const CircSecondaryButton = ({icon = "close", pressAction}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={pressAction}
        >
            <CircSecondaryButtonView>
                <Ionicons name={icon} size={24} color={theme.colors.ui.quaternary} />
            </CircSecondaryButtonView>
        </TouchableOpacity>
    )
}