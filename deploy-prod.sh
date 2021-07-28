#!/bin/sh
# Used in automatic deploy on main branch
eval "$(ssh-agent)" || exit
echo "$2"
echo "$2" > git_ssh_key
chmod 400 git_ssh_key || exit
cat git_ssh_key
ssh-add git_ssh_key || exit
npm i -g @angular/cli
npm i
npm run build:forms:prod || exit
npm run deploy:showcase || exit
cd dist/@lab900/forms || exit
npm config set -- '//registry.npmjs.org/:_authToken' "$1"
npm publish
