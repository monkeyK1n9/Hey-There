import { createStackNavigator } from '@react-navigation/stack';
import { CreateAccountScreen } from '../../feature/account/screens/CreateAccountScreen';
import { ForgotPasswordScreen } from '../../feature/account/screens/ForgotPasswordScreen';
import {LoginScreen} from '../../feature/account/screens/LoginScreen'
import { OnboardingScreen } from '../../feature/account/screens/OnboardingScreen';
import { OTPScreen } from '../../feature/account/screens/OTPScreen';
import { ResetPasswordScreen } from '../../feature/account/screens/ResetPasswordScreen';
import { TermsAndConditionsScreen } from '../../feature/account/screens/TermsAndConditionsScreen';
import {SafeAreaViewSection} from '../../components/safeArea/SafeAreaViewSection'


const Stack = createStackNavigator();

export const AccountNavigationFirst = () => {

    return (
        <>
            <SafeAreaViewSection>
                <Stack.Navigator>
                    <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Create Account" component={CreateAccountScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{headerShown: false}} />
                    <Stack.Screen name="OTP" component={OTPScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Reset" component={ResetPasswordScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Terms And Conditions" component={TermsAndConditionsScreen} />
                </Stack.Navigator>
            </SafeAreaViewSection>
        </>
    )
}

export const AccountNavigationSecond = () => {

    return (
        <>
            <SafeAreaViewSection>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Create Account" component={CreateAccountScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{headerShown: false}} />
                    <Stack.Screen name="OTP" component={OTPScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Reset" component={ResetPasswordScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Terms And Conditions" component={TermsAndConditionsScreen} />
                </Stack.Navigator>
            </SafeAreaViewSection>
        </>
    )
}