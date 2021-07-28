#!/bin/sh
# Used in automatic deploy on main branch
eval "$(ssh-agent)" || exit
echo "$2" > git_ssh_key
chmod 400 git_ssh_key || exit
ssh-add git_ssh_key || exit
ssh-add -l
mkdir test
cd test || exit
ssh-keyscan -H "github.com" >> ~/.ssh/known_hosts
git clone git@github.com:lab900/angular-library-forms.git || exit
cd ..
npm i -g @angular/cli || exit
npm i || exit
npm run build:forms:prod || exit
npm run deploy:showcase || exit
cd dist/@lab900/forms || exit
npm config set -- '//registry.npmjs.org/:_authToken' "$1"
npm publish
