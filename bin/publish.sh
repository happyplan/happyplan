#!/bin/sh
grunt
git add .
git commit -am "Source updated"
git branch -D gh-pages
git checkout -b gh-pages
mv .gitignore .gitignore.tmp
git rm -rqf .
mv .gitignore.tmp .gitignore
cp -r build/* .
git add .
git rm .gitignore
git commit -m "Site updated"
git push -f --set-upstream origin gh-pages
git checkout dev
git push