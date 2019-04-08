#!/bin/bash
cd ehanlin-platform-layout
npm install aws-sdk

if [ -n "${TRAVIS_TAG}" ]; then
	npm run changeCurrentPath
	npm run changeFBpixel
fi

npm run uploadS3