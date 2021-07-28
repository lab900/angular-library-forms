#!/bin/sh
# Used in automatic deploy on main branch
echo "$2" > git_ssh_key
chmod 400 git_ssh_key || exit
eval "$(ssh-agent)" || exit
ssh-add git_ssh_key || exit
mkdir ~/.ssh
ssh-keygen -R github.com
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
mkdir test
cd test || exit
git clone git@github.com:lab900/angular-library-forms.git || exit
cd ..
npm i -g @angular/cli || exit
npm i || exit
npm run build:forms:prod || exit
npm run deploy:showcase || exit
cd dist/@lab900/forms || exit
npm config set -- '//registry.npmjs.org/:_authToken' "$1"
npm publish
