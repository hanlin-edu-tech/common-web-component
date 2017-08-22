#!/bin/bash

if [ -n "${TRAVIS_TAG}" ]
then
  echo "yes"
  npm run changeCurrentPath
fi

npm run uploadS3