#!/bin/bash
cd ./packages/ehanlin-platform-layout
npm install aws-sdk

if [ -n "${TRAVIS_TAG}" ]; then
	npm run changeCurrentPath
	npm run changeFBpixel
	npm run uploadS3
fi