# Hey There

This is the react native project for Hey There. It is built with expo react native (expo.dev). Hey there is
a messaging mobile app, to send text messages to your friends who are 1km maximum away from you.

## Screenshots

Here are some screenshots

| Splash Screen                                                                                              | Onboarding Screen                                                                                          | Chat Screen                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![](https://user-images.githubusercontent.com/91855362/208896666-f3601e2f-b2e3-4aeb-8327-0901a9d5cadb.png) | ![](https://user-images.githubusercontent.com/91855362/208896703-50bb490b-e1f4-49f3-9bfd-9edca0fd1b11.png) | ![](https://user-images.githubusercontent.com/91855362/208896739-a80f2946-41e5-45d8-9c83-cad92e6cb9c3.png) |

| Map Screen                                                                                                 | Create Account                                                                                             | Home Screen                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![](https://user-images.githubusercontent.com/91855362/208896783-27e162a6-b6f4-4593-9e26-46cb1d510a4b.png) | ![](https://user-images.githubusercontent.com/91855362/208896923-1ac931f7-fa26-42bc-b821-66296352a819.png) | ![](https://user-images.githubusercontent.com/91855362/208896946-c7cbd722-4059-485a-a4be-a8c9b3610ac1.png) |

## Introduction

To get started, make sure to install:

- Android studio, if you want to have an android emulator installed
- Xcode, for iOS

## Setup

You can download the zip, or clone, then run:

```
yarn install
```

This will install the necessary packages. The project is built on top of expo SDK 47.

Run prebuild to regenerate the android and ios folders

```js
npx expo prebuild
```

To start the server and visualise on an emulator, run:

```
npx expo start
```

Now you are good to go.

## Editing the .env file

This project works with firebase as backend and Google Maps for setting up the MapScreen.
To continue development, you will need to provide the following:

```js
// Firebase config
FIREBASE_API_KEY =
FIREBASE_AUTH_DOMAIN =
FIREBASE_PROJECT_ID =
FIREBASE_STORAGE_BUCKET =
FIREBASE_MESSAGING_SENDER_ID =
FIREBASE_APP_ID =

```

## Google-services.json file

Download the google-services.json file from firebase and place it in your project folder (./Hey THere)

## Google Maps API

This project uses Google Maps as provider. You will need an API Key to access the map.
If you don't have a key, get one here. To obtain an API key,

1- Register a Google Cloud API project and enable the Maps SDK for Android:
Open your browser to the Google API Manager and create a project.
Once it's created, go to the project and enable the Maps SDK for Android.

2- Copy your app's SHA-1 certificate fingerprint:
For Google Play Store:
If you are deploying your app to the Google Play Store, you'll need to upload your app binary to Google Play console at least once. This is required for Google to generate your app signing credentials.
Go to the Google Play Console > (your app) > Release > Setup > App integrity > App Signing.
Copy the value of SHA-1 certificate fingerprint.

3- Create an API key:
Go to Google Cloud Credential manager and click Create Credentials, then API Key.
In the modal, click Edit API key.
Under Key restrictions > Application restrictions, choose Android apps.
Under Restrict usage to your Android apps, click Add an item.
Add your android.package from app.json (for example: com.company.myapp) to the package name field.
Then, add the SHA-1 certificate fingerprint's value from step 2.
Click Done and then click Save.

You can now add your API key in your AndroidManifest.xml file

# Contributions

Don't hesitate to do a pull request or fire an issue if you see any.

This project is built with ❤️
