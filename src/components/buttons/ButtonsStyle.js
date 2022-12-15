import {View} from 'react-native';
import styled from 'styled-components/native'

export const RectPrimaryButtonView = styled(View)`
    background-color: ${props => props.theme.colors.ui.primary};
    border-radius: ${props => props.theme.space[2]};
    padding-horizontal: ${props => props.theme.space[3]};
    padding-vertical: ${props => props.theme.space[3]};
    align-items: center;
    justify-content: center;
`
export const RectSecondaryButtonView = styled(View)`
    border-radius: ${props => props.theme.space[2]};
    border-color: ${props => props.theme.colors.ui.primary});
    border-style: solid;
    border-width: 1px;
    align-items: center;
    justify-content: center;
`
export const CircPrimaryButtonView = styled(View)`
    width: ${props => props.theme.space[5]}
    height: ${props => props.theme.space[5]};
    border-radius: ${props => props.theme.space[4]};
    background-color: ${props => props.theme.colors.ui.primary};
    align-items: center;
    justify-content: center;
`
export const CircSecondaryButtonView = styled(View)`
    width: ${props => props.theme.space[5]}
    height: ${props => props.theme.space[5]};
    border-radius: ${props => props.theme.space[4]};
    border-color: ${props => props.theme.colors.ui.primary});
    border-style: solid;
    border-width: 1px;
    align-items: center;
    justify-content: center;
`