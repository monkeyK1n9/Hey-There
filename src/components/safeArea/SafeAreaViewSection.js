import styled from "styled-components/native"
import { StatusBar, SafeAreaView } from "react-native"

export const SafeAreaViewSection = styled(SafeAreaView)`
    background-color: ${props => props.theme.colors.ui.bg};
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
`