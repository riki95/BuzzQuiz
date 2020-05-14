#!/bin/bash
DEPLOY_FOLDER='TO_DEPLOY_FOLDER'
ORIGIN='https://git.heroku.com/buzz-quiz.git'
DATE=`date '+%Y-%m-%d %H:%M'`

# Clean previous deployment
rm -rf $DEPLOY_FOLDER
rm -rf client/static

# Build client app
cd client
npm run build
cd ..

# Create folder to deploy
mkdir $DEPLOY_FOLDER

# Copy server files
cp server/Procfile $DEPLOY_FOLDER/Procfile
cp server/package.json $DEPLOY_FOLDER/package.json
cp server/package-lock.json $DEPLOY_FOLDER/package-lock.json
cp server/Dockerfile $DEPLOY_FOLDER/Dockerfile
cp -R server/src $DEPLOY_FOLDER/

# Copy built client files
cp -R client/static $DEPLOY_FOLDER/src/

cd $DEPLOY_FOLDER
git init
git remote add origin $ORIGIN
git add .
git commit -m "Deploy ${DATE}"
git push -f

# Clean build folders
cd ..
rm -rf $DEPLOY_FOLDER
rm -rf client/static
