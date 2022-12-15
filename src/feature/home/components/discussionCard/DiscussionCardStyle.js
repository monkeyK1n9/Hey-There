import {View, Dimensions} from 'react-native'
import styled from 'styled-components/native'

export const DiscussionCardView = styled(View)`
    width: ${1 * Dimensions.get('window').width}px;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme.colors.ui.quaternary};
    padding-vertical: ${props => props.theme.space[2]}
    padding-horizontal: ${props => props.theme.space[2]};
    margin-bottom: 1px
`
export const DiscussionProfileImageView = styled(View)`
    flex: 0.15;
    align-items: center;
`
export const DiscussionTextView = styled(View)`
    flex: 0.8;
    padding-horizontal: ${props => props.theme.space[2]}
`
export const DiscussionHeaderView = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`
export const DiscussionUserInfoView = styled(View)`
    justify-content: center;
`