#!/bin/sh
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

CURRENT_BRANCH="$(parse_git_branch)"

PUBLISH_BRANCH="gh-pages"
if [ $1 ] && [ $1 = "--master" ] || [ $1 ] && [ $1 = "-m" ]
  then
    PUBLISH_BRANCH="master"
fi

if [ $PUBLISH_BRANCH = "master" ] && [ $CURRENT_BRANCH = "(master)" ]
  then
    echo "Wow, wow, wow! Won't publish on 'master' which is your current branch!"
    echo "Quit."
    exit
fi

grunt dist
git add .
git commit -am "Source updated."
git branch -D $PUBLISH_BRANCH
git checkout -b $PUBLISH_BRANCH
mv .gitignore .gitignore.tmp
git rm -rqf .
mv .gitignore.tmp .gitignore
cp -r dist/* .
git add .
git rm .gitignore
git commit -m "Site updated."
git push -f --set-upstream origin $PUBLISH_BRANCH
git checkout src
git push --set-upstream origin src
