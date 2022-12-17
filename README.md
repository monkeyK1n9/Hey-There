# Hey There

This is the react native project for Hey There. It is built with expo react native (expo.dev). Hey there is
a messaging mobile app, to send text messages to your friends who are 1km maximum away from you.

## Introduction

To get started, make sure to install:

- Android studio, if you want to have an android emulator installed
- Xcode, for iOS

## Setup

You can download the zip, or clone, then run:

```
npm install
```

This will install the necessary packages. The project is built on top of expo SDK 47.
To start the server and visualise on an emulator, run:

```
npx expo start
```

Now you are good to go.

## Editing the .env file

This project works with firebase as backend and Mapbox for setting up the MapScreen.
To continue development, you will need to provide the following:

```js
// Firebase config
FIREBASE_API_KEY =
FIREBASE_AUTH_DOMAIN =
FIREBASE_PROJECT_ID =
FIREBASE_STORAGE_BUCKET =
FIREBASE_MESSAGING_SENDER_ID =
FIREBASE_APP_ID =

// Mapbox config
```

# Contributions

Don't hesitate to do a pull request or fire an issue if you see any.

This project is built with ❤️
