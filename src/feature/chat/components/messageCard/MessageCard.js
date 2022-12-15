import React from 'react';
import { Dimensions } from 'react-native';
import { Spacer } from '../../../../components/spacer/SpacerComponent';
import { Text } from '../../../../components/typography/TextComponent';
import {theme} from '../../../../infrastructure/theme'
import { MessageCardView, MessageContentView } from './MessageCardStyle';

export const MessageCard = ({messageContent, user}) => {
    const {
        message,
        from,
        to,
        time
    } = messageContent
    const date = new Date(time.seconds * 1000)
    // console.log(user.uid)
    return (
        <>
            {
                from == user?.uid ? (
                    <MessageCardView>
                        <MessageContentView
                            style={{
                                backgroundColor: theme.colors.ui.quaternary,
                                left: 0.02*Dimensions.get('window').width,
                                borderBottomRightRadius: 8,
                                borderBottomLeftRadius: -8
                            }}
                        >
                    
                        <Text
                            style={{
                                textAlign: 'left', 
                                color: theme.colors.text.primary,
                            }}
                        >{message}</Text>
                        <Spacer size="large" />
                        <Text 
                            variant="captionDate" 
                            style={{
                                textAlign: 'right', 
                                color: theme.colors.text.primary,
                            }}
                        >{date.toLocaleTimeString()}, {date.toLocaleDateString()}</Text>
                    
                        </MessageContentView>
                    </MessageCardView>
                ):(
                    <MessageCardView
                        style={{justifyContent: 'flex-end'}}
                    >
                    <MessageContentView
                        style={{
                            backgroundColor: theme.colors.ui.primary,
                            right: 0.02*Dimensions.get('window').width,
                            borderBottomRightRadius: -8,
                            borderBottomLeftRadius: 8
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'left', 
                                color: theme.colors.ui.quaternary,
                            }}
                        >{message}</Text>
                        <Spacer size="large" />
                        <Text 
                            variant="captionDate" 
                            style={{
                                textAlign: 'right', 
                                color: theme.colors.ui.quaternary,
                            }}
                        >{date.toLocaleTimeString()}, {date.toLocaleDateString()}</Text>
                    </MessageContentView></MessageCardView>
                )
            }
        </>
    )
}