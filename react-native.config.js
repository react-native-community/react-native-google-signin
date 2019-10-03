const root = process.cwd();

module.exports = {
  dependency: {
    platforms: {
      ios: {
        project: 'ios/RNGoogleSignin.xcodeproj',
      },
    },
  },
  dependencies: {
    // the key here does not matter as long as it's not reference from native files
    // CLI will use root to find podspec and android module
    '@react-native-community/google-signin': {
      root,
    },
  },
};
