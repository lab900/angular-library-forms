#!/bin/sh
# Used in automatic deploy on main branch
#git init
git config --global user.name "lab900-winand-vandenbergh"
git config --global user.email "winand.vandenbergh@lab900.com"
git config --global --list
git config --local --list

echo "$2" > git_ssh_key
chmod 400 git_ssh_key || exit
eval "$(ssh-agent)" || exit
ssh-add git_ssh_key || exit
mkdir ~/.ssh
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
printf "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
cat ~/.ssh/config
cat ~/.ssh/known_hosts

cd lib || exit
cd ..
npm i -g @angular/cli || exit
npm i || exit
npm run build:forms:prod || exit
npm run deploy:showcase || exit
cd dist/@lab900/forms || exit
#npm config set -- '//registry.npmjs.org/:_authToken' "$1"
#npm publish
