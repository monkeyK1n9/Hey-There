import {View} from 'react-native';
import styled from 'styled-components/native'

export const MessageCardView = styled(View)`
    background-color: transparent;
    flex-direction: row;
    align-items: center
`
export const MessageContentView = styled(View)`
    max-width: 75%;
    padding: ${props => props.theme.space[2]};
    margin-vertical: ${props => props.theme.space[2]};
    border-top-left-radius: ${props => props.theme.space[2]};
    border-top-right-radius: ${props => props.theme.space[2]};
    position: relative
`