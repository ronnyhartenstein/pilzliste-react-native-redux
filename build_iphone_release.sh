#!/bin/bash

# Automating the Build Process
# https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/08-automation.html
# http://stackoverflow.com/questions/5010062/xcodebuild-simulator-or-device
# http://stackoverflow.com/questions/34003723/build-and-run-an-app-on-simulator-using-xcodebuild?rq=1

cd ios

# Fastlane: https://fastlane.tools
# Gym: https://github.com/fastlane/fastlane/tree/master/gym
fastlane gym --scheme "Pilzliste" --clean --silent --export_method development

# Push to device
# http://stackoverflow.com/questions/14535392/how-to-install-an-ipa-app-file-into-iphone-with-command-line/14652288#14652288
# Generate and Install IPA's file in device through Command Line: https://gist.github.com/phynet/38afad2170907d2c1ccd
# ideviceinstaller: http://www.libimobiledevice.org
# Install via: 
#    brew install --HEAD libimobiledevice
#    brew install ideviceinstaller
# Fix lockdownd rights: https://github.com/libimobiledevice/ideviceinstaller/issues/47
# sudo chmod -R 777 /var/db/lockdown/
ideviceinstaller -i Pilzliste.ipa
# Unlock developer account on iDevice: Settings -> Allgemein -> Geräteverwaltung
