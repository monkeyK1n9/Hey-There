import React from 'react';
import { Image } from 'react-native';
import { Spacer } from '../../../../components/spacer/SpacerComponent';
import { Text } from '../../../../components/typography/TextComponent';
import { HeaderView } from './HeaderStyle';

export const Header = ({userImageUrl, senderName}) => {
    console.log(senderName);
    return (
        <HeaderView>
            {userImageUrl ? (
                <Image source={{uri: userImageUrl}} style={{width: 40, height: 40, borderRadius: 20}} />
            ):(
                <Image source={require('../../../../../assets/userprofilesample.png')} style={{width: 40, height: 40, borderRadius: 0}} />
            )}

            <Spacer size="medium" position="left" />
            <Text variant="title">{senderName}</Text>
        </HeaderView>
    )
}