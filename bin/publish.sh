#!/bin/sh
PUBLISH_BRANCH="gh-pages"
if [ $1 ]
  then
    if [ $1 = "-test" ]
      then
        PUBLISH_BRANCH="test"
    fi
fi
git checkout -b $PUBLISH_BRANCH
# grunt dist
# git add .
# git commit -am "Source updated."
# git branch -D $PUBLISH_BRANCH
# git checkout -b $PUBLISH_BRANCH
# mv .gitignore .gitignore.tmp
# git rm -rqf .
# mv .gitignore.tmp .gitignore
# cp -r dist/* .
# git add .
# git rm .gitignore
# git commit -m "Site updated."
# git push -f --set-upstream origin $PUBLISH_BRANCH
# git checkout src
# git push --set-upstream origin src
