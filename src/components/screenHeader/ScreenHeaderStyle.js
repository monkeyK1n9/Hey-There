import {View} from 'react-native'
import styled from 'styled-components/native'

export const ScreenHeaderView = styled(View)`
    flex-direction: row;
    padding-top: ${props => props.theme.space[2]};
    paddingHorizontal: ${props => props.theme.space[2]};
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.ui.quaternary}
`
export const ScreenHeaderTitleView = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`
export const ScreenHeaderIconOptionView = styled(View)`
    flex: 0.25
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`