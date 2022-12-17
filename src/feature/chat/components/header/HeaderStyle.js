import {View} from 'react-native';
import styled from 'styled-components/native'

export const HeaderView = styled(View)`
    flex-direction: row;
    flex: 1;
    width: 100%;
    padding-top: ${props => props.theme.space[2]};
    paddingHorizontal: ${props => props.theme.space[2]};
    align-items: flex-start;
    background-color: ${props => props.theme.colors.ui.primary}
`