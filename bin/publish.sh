#!/bin/sh
grunt dist
git add .
git commit -am "Source updated."
git branch -D gh-pages
git checkout -b gh-pages
mv .gitignore .gitignore.tmp
git rm -rqf .
mv .gitignore.tmp .gitignore
cp -r dist/* .
git add .
git rm .gitignore
git commit -m "Site updated."
git push -f --set-upstream origin gh-pages
git checkout src
git push --set-upstream origin src
