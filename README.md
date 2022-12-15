# CRAMBLE-REACTNATIVE

This is the react native project for Cramble. It is built with expo react native (expo.dev).

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

## Connecting to the database

To connect your app to the database, make sure you have a .env file in your project.
If you don't have a .env file, create one, and provide the required parameters.

1- URL of the database
The URL of the database should be the provided in the .env file.
If you are working locally, the URL will be:

```js
DATABASE_URL = http://<Your PC ip adress>:<port number>/api/<version number>
//the port number should be the same provided in the backend
```

Example:

```js
DATABASE_URL = http://199.58.48.34/3001/api/v1
```

# Contributions

Don't hesitate to do a pull request or fire an issue if you see any.

This project is built with ❤️
