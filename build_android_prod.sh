#!/bin/bash

cd android
./gradlew assembleRelease
jarsigner -verbose -keystore my-keystore.keystore app/build/outputs/apk/app-release-unsigned.apk name_alias
adb install app/build/outputs/apk/app-release-unsigned.apk
