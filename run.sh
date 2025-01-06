#!/bin/bash
downUrl="https://adl.netease.com/d/g/mc/c/gwnew?type=android"
workDir=$(pwd)
Arch="arm64-v8a"
sudo apt update
sudo apt upgrade -y
sudo apt install -y wget 7zip-standalone
echo "Current work directory is: $workDir"
echo "Downloading from: $downUrl"
wget -O $workDir/script.js $downUrl
echo "Download completed!"
android_link=$(grep -oP 'android_link\s*=\s*android_type\s*\?\s*"\K[^"]+' script.js)
echo "Extracted Android download link: $android_link"
wget -O $workDir/android.apk $android_link
echo "Download of Android app completed!"
7zz x $workDir/android.apk -o$workDir/android_app
echo "Extracting Android app completed!"
cp $workDir/android_app/lib/$Arch/libminecraftpe.so $workDir/libminecraftpe.so
echo "Copying libminecraftpe.so completed!"
rm -rf $workDir/script.js $workDir/android.apk $workDir/android_app