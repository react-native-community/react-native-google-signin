const path = require('path');
const fs = require('fs-extra');
const watch = require('node-watch');
const rimraf = require('rimraf');
const minimatch = require('minimatch');

function copyAndWatch(source, destination, fileGlob) {
  console.log(`Cleaning "${destination}"`);
  rimraf(destination, () => {
    console.log(`Copying "${source}" to "${destination}"`);
    fs.copy(source, destination, (err) => {
      if (err) console.error(err);
    });

    console.log(`Watching "${source}"`);
    watch(source, (filename) => {
      const localPath = filename.split(source).pop();
      if (matchesFile(localPath, fileGlob)) {
        const destinationPath = `${destination}${localPath}`;
        console.log(`Copying "${filename}" to "${destinationPath}"`);
        fs.copy(filename, destinationPath, (err) => {
          if (err) console.error(err);
        });
      }
    });
  });
}

function matchesFile(filename, fileGlob) {
  if (fileGlob == null) return true;
  return minimatch(path.basename(filename), fileGlob);
}

rimraf('node_modules/react-native-google-signin/example', () => {
  console.log('Cleaning node_modules/react-native-google-signin/example')
})

// JavaScript
copyAndWatch(
  '../src',
  'node_modules/react-native-google-signin/src'
);

// Android
copyAndWatch(
  '../android',
  'node_modules/react-native-google-signin/android',
  '*.java'
);

// iOS
copyAndWatch(
  '../ios',
  'node_modules/react-native-google-signin/ios',
  '{*.m,*.h}'
);
