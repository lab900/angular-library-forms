#!/bin/sh
# Used in automatic deploy on main branch
cd lib || exit
cd ..
npm i -g @angular/cli
npm i
npm run build:forms:prod
ssh-add -K /workspace/git_ssh_key
npm run deploy:showcase
cd dist/@lab900/forms || exit
npm config set -- '//registry.npmjs.org/:_authToken' "$1"
npm publish
