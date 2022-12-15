import styled from "styled-components/native"

const defaultTextStyles = (theme) => `
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap: wrap;
    margin-top: 0px;
    margin-bottom: 0px
`
const body = (theme) => `
    font-size: ${theme.fontSizes.body}
`
const bodyDescription = (theme) => `
    font-size: ${theme.fontSizes.body}
    opacity: 0.7
`
const bodyRed = (theme) => `
    font-size: ${theme.fontSizes.body}
    color: ${theme.colors.text.error}
`
const bodyRedBold = (theme) => `
    font-size: ${theme.fontSizes.body}
    color: ${theme.colors.text.error}
    font-weight: ${theme.fontWeights.bold}
`
const bodyBold = (theme) => `
    font-size: ${theme.fontSizes.body}
    font-weight: ${theme.fontWeights.bold}
`
const bodyWhite = (theme) => `
    font-size: ${theme.fontSizes.body}
    font-weight: ${theme.fontWeights.bold}
    color: ${theme.colors.text.inverse}
`
const bodyPrimary = (theme) => `
    font-size: ${theme.fontSizes.body}
    font-weight: ${theme.fontWeights.bold}
    color: ${theme.colors.ui.primary}
`
const account = (theme) => `
    font-size: ${theme.fontSizes.body}
    color: ${theme.colors.ui.primary}
`
const usernameTitle = (theme) => `
    font-size: ${theme.fontSizes.title}
    font-weight: ${theme.fontWeights.medium}
`
const usernameHandle = (theme) => `
    font-size: ${theme.fontSizes.button}
    font-weight: ${theme.fontWeights.medium}
    color: ${theme.colors.text.secondary}
`
const postAction = (theme) => `
    font-size: ${theme.fontSizes.body}
    font-weight: ${theme.fontWeights.medium}
    color: ${theme.colors.text.secondary}
`
const hint = (theme) => `
    font-size: ${theme.fontSizes.body}
`
const error = (theme) => `
    color: ${theme.colors.text.error}
`
const caption = (theme) => `
    font-size: ${theme.fontSizes.caption}
    font-weight: ${theme.fontWeights.bold}
`
const captionDate = (theme) => `
    font-size: ${theme.fontSizes.caption}
    font-weight: ${theme.fontWeights.medium}
`
const captionWhite = (theme) => `
    font-size: ${theme.fontSizes.caption}
    font-weight: ${theme.fontWeights.bold}
    color: ${theme.colors.text.white}
`
const label = (theme) => `
    font-family: ${theme.fonts.body}
    font-size: ${theme.fontSizes.body}
    font-weight: ${theme.fontWeights.medium}
`
const title = (theme) => `
    font-size: ${theme.fontSizes.title}
    font-weight: ${theme.fontWeights.medium}
`
const titleBoldWhite = (theme) => `
    font-size: ${theme.fontSizes.h5}
    font-weight: ${theme.fontWeights.bold}
    color: ${theme.colors.text.white}
`
const titleMediumWhite = (theme) => `
    font-size: ${theme.fontSizes.title}
    font-weight: ${theme.fontWeights.medium}
    color: ${theme.colors.text.white}
`
const titleBoldBlack = (theme) => `
    font-size: ${theme.fontSizes.title}
    font-weight: ${theme.fontWeights.bold}
`
const h5 = (theme) => `
    font-size: ${theme.fontSizes.h5}
    font-weight: ${theme.fontWeights.medium}
`
const h4 = (theme) => `
    font-size: ${theme.fontSizes.h4}
    font-weight: ${theme.fontWeights.medium}
`
const h3 = (theme) => `
    font-size: ${theme.fontSizes.h3}
    font-weight: ${theme.fontWeights.medium}
`
const variants = {
    body,
    bodyDescription,
    bodyRed,
    bodyRedBold,
    bodyBold,
    bodyWhite,
    bodyPrimary,
    account,
    usernameTitle,
    usernameHandle,
    postAction,
    label,
    caption,
    captionDate,
    captionWhite,
    error,
    hint,
    title,
    titleBoldWhite,
    titleMediumWhite,
    titleBoldBlack,
    h5,
    h4,
    h3
}

export const Text = styled.Text`
  ${({theme}) => defaultTextStyles(theme)}
  ${({variant, theme}) => variants[variant](theme)}
`

Text.defaultProps = {
    variant: "body"
}