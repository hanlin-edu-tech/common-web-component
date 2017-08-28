#!/bin/bash

if [ -n "${TRAVIS_TAG}" ]
then
  echo "yes"
  npm run changeCurrentPath
  npm run changeFBpixel
fi

npm run uploadS3