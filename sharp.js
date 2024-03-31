const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/base');
const smallDestination = path.resolve(__dirname, 'src/public/images/small');
const largeDestination = path.resolve(__dirname, 'src/public/images/large');

if (!fs.existsSync(largeDestination)) {
  fs.mkdirSync(largeDestination);
}

if (!fs.existsSync(smallDestination)) {
  fs.mkdirSync(smallDestination);
}

fs.readdirSync(target)
  .forEach((image) => {
    sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(
        __dirname,
        `${largeDestination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`,
      ));

    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(
        __dirname,
        `${smallDestination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ));
  });
