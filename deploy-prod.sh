#!/bin/sh
# Used in automatic deploy on main branch
cd lib || exit
cd ..
eval "$(ssh-agent)" || exit
chmod 400 /workspace/git_ssh_key || exit
ssh-add /workspace/git_ssh_key || exit
npm i -g @angular/cli
npm i
npm run build:forms:prod || exit
npm run deploy:showcase || exit
cd dist/@lab900/forms || exit
npm config set -- '//registry.npmjs.org/:_authToken' "$1"
npm publish
