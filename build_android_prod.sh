#!/bin/bash

cd android
./gradlew assembleRelease

#cd .. && react-native run-android --variant=release
jarsigner -verbose -keystore my-keystore.keystore app/build/outputs/apk/app-release-unsigned.apk name_alias
adb install -r app/build/outputs/apk/app-release-unsigned.apk
