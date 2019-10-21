#!/bin/bash

gulp packageToProduction
gulp replaceEnvProduction
gulp uploadGcsProd