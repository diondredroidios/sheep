# Sheep
## A weather app

Sheep is a weather app build on React Native. You can choose from a pre-defined list of cities, and view both current and forecast data. On the backed, this app uses the OpenWeatherMap API for data. Calls are made for both current weather data, and an extended forecast.

React Native makes development easier, with modern JavaScript/ECMAScript features available. Code is compiled for both major platforms (Android and iOS), resulting in "native" apps for both systems. The tradeoff here is that the devloper has less control over code form and optimization, compared to writing a truly native app in Java or Swift (Android, iOS, respectively).

## Development / Usage
### MacOS
1. You'll need Homebrew first. Install Homebrew [here](https://brew.sh/).
2. Next, install Node and Watchman
   
    `brew install node`

    `brew install watchman`
3. Install the React Native CLI

    `npm install -g react-native-cli`

 4. Install XCode from the Mac App Store
 5. Go to this directory, then run `react-native run-ios`. E.g.,

    `cd ~/Projects/Sheep`

    `react-native run-ios`

    After some time, React Native should launch an iPhone simulator with the running app. More information on React Native can be found [here](https://facebook.github.io/react-native/docs/getting-started).