import React from 'react';
import { ScreenHeaderIconOptionView, ScreenHeaderTitleView, ScreenHeaderView } from './ScreenHeaderStyle';
import { Ionicons, Feather } from '@expo/vector-icons'
import { Image, TouchableOpacity } from 'react-native';
import { Text } from '../typography/TextComponent';
import {Spacer} from '../spacer/SpacerComponent'
import {theme} from '../../infrastructure/theme'

export const ScreenHeader = ({title, searchAction, awardAction, userAction}) => {
    return (
        <ScreenHeaderView>
            <ScreenHeaderTitleView>
                {title == "Home" ? (
                    <>
                        <Image source={require('../../../assets/logo.png')} resizeMode="contain" style={{width: 32, height: 32}} />
                        <Spacer size="medium" position="right" />
                        <Text variant="titleBoldBlack">Hey There</Text>
                    </>
                ):(
                    <Text variant="titleBoldBlack">{title}</Text>
                )}
            </ScreenHeaderTitleView>

            <ScreenHeaderIconOptionView>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <Ionicons name="search" size={22} color={theme.colors.text.secondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <Feather name="user" size={22} color={theme.colors.text.secondary} />
                </TouchableOpacity>

            </ScreenHeaderIconOptionView>
        </ScreenHeaderView>
    )
}