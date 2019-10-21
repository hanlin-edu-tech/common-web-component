#!/bin/bash

gulp packageToTest
gulp replaceEnvTest
gulp uploadGcsTest