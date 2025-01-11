#!/bin/bash
downUrl="https://adl.netease.com/d/g/mc/c/gwnew?type=android"
workDir=$(pwd)
echo "Current work directory is: $workDir"
echo "Downloading from: $downUrl"
wget -O $workDir/script.js $downUrl
echo "Download completed!"
android_link=$(grep -oP 'android_link\s*=\s*android_type\s*\?\s*"\K[^"]+' script.js)
echo "Extracted Android download link: $android_link"
wget -O $workDir/android.apk $android_link
echo "Download of Android app completed!"