import {View} from 'react-native';
import styled from 'styled-components/native'

export const HeaderView = styled(View)`
    flex-direction: row;
    flex: 1;
    width: 100%;
    paddingVertical: ${props => props.theme.space[2]};
    align-items: center;
`