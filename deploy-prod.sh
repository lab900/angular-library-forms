#!/bin/sh
# Used in automatic deploy on main branch
mkdir ./lib
git clone git@github.com:lab900/angular-library-forms.git ./lib|| exit

cd lib || exit
cd ..
npm i -g @angular/cli || exit
npm i || exit
npm run build:forms:prod || exit
npm run deploy:showcase || exit
cd dist/@lab900/forms || exit
#npm config set -- '//registry.npmjs.org/:_authToken' "$1"
#npm publish
