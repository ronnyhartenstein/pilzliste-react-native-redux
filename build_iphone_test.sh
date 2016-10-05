#!/bin/bash

# Automating the Test Process
# https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/08-automation.html

cd ios
xcodebuild test -project Pilzliste.xcodeproj -scheme Pilzliste -destination 'platform=iOS,name=iPhone von Ronny Hartenstein'
