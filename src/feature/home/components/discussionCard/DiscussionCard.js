import React from 'react';
import { Image } from 'react-native';
import { Spacer } from '../../../../components/spacer/SpacerComponent';
import { Text } from '../../../../components/typography/TextComponent';
import { DiscussionCardView, DiscussionHeaderView, DiscussionTextView, DiscussionProfileImageView, DiscussionUserInfoView } from './DiscussionCardStyle';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; 

export const DiscussionCard = ({discussion}) => {

    const {
        userImageUrl, 
        username, 
        lastMessage, 
    } = discussion

    return (
        <DiscussionCardView>
            <DiscussionProfileImageView>
                <Image source={{uri: userImageUrl}} style={{width: 50, height: 50, borderRadius: 22.5}} />
            </DiscussionProfileImageView>

            <DiscussionTextView>
                <DiscussionHeaderView>
                    <DiscussionUserInfoView>
                        <Text variant="usernameTitle">{username}</Text>
                        <Spacer size="small"/>
                        {lastMessage ? (

                            <Text>{lastMessage.length > 30 ? lastMessage.slice(0, 30) + '...' : lastMessage}</Text>
                        ):(
                            <Text> </Text>
                        )}
                    </DiscussionUserInfoView>

                </DiscussionHeaderView>
            </DiscussionTextView>
        </DiscussionCardView>
    )
}