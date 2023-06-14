# Demo

Demo is a mobile app for managing notes and reminders. This README provides instructions on how to install and run the Demo app on Android devices.

## Prerequisites

- Node.js version 14.16.0 or later

## Installation

1. Make sure you have Node.js version 14.16.0 installed on your system. You can check your Node.js version by running the following command in your terminal or command prompt:

    ```bash
    $ node --version
    ```

    If you have a different version installed, you may need to update it.

2. Open your terminal or command prompt and navigate to the project's `android` directory:

    ```bash
    $ cd android
    ```

3. Install the required dependencies using Yarn:

    ```bash
    $ yarn install
    ```

4. Build and install the Demo app on your Android device:

    ```bash
    $ yarn android
    ```

5. After the installation is complete, navigate back to the project's root directory:

    ```bash
    $ cd ..
    ```

6. Install the remaining dependencies using Yarn:

    ```bash
    $ yarn install
    ```

## Running the App

1. Set the port number on your Android device by following these steps:

    - Open the ColorNote app on your Android device.
    - Press `Ctrl + M` to open the developer menu.
    - In the developer menu, go to `Settings`.
    - Find the option `Debug server host & port for device` and select it.
    - Enter the IP address of your development machine followed by the port number (e.g., `ipaddress:portnumber`).

2. Start the ColorNote app on your Android device using the following command in your terminal or command prompt:

    ```bash
    $ yarn start --port=portnumber
    ```

    Replace `portnumber` with the actual port number you want to use for the development server.

    The app will start running on your Android device, and you can interact with it from there.

Please note that these instructions assume that you have already set up the necessary environment and have the required dependencies installed. If you encounter any issues, please provide more details about the error messages or problems you are facing so that we can assist you further.
