# Getting Started

## Installation

When [requirements](0-Requirements.md) are okay, just run in your project root:

    $ npm init
    $ npm install happyplan --save-dev

That's it. Now you can start your website bro', using default command

    $ happyplan

`/!\` _`npm init` will help you to create `package.json` which will be used for minimal requirements (title & version)._

## Development

You just need to launch default task to start using the watcher that will allow you to test your posts _with livereload started_.

    $ happyplan

This should make a first fresh build, start a static server & the livereload one, then open the appropriate page in your browser.

Now you can start to add/modify assets or posts & save them.
BOOM.
Livreload do the magic & files should be automatically reloaded into your browser.

## Build

To build the website before distributing.

    $ happyplan dist

This task build the website with some stuff optimized (minify assets mainly).

## Publish on gh-pages (github)

If you want to publish your build on the gh-pages:

    $ happyplan publish

This task will build the website (same as `happy dist`) & _commit + push_ on your `gh-pages` branch.
Branch can be changed using `happyplan.git.branch`.
See example below.

#### Warning for username.github.com

`username.github.com` is a bit special.
Indeed, the `master` branch acts like a `gh-pages` so you have to publish your website on `master` and not `gh-pages` (just don't try `gh-pages`, it won't work).

For that, create or modify `happyplan.json` and add this option:

```json
{
    "git": {
        "branch": "master"
    }
}
```

Now you can easily push your website on this branch via `happyplan publish`.

## Create a new post

    $ happyplan newpost --name="This is a test" --tags="change,me,dude"

This will create a new post in your draft folder (`src/_posts/_drafts` by default).
For more informations about posts, just read [Jekyll's post documentation](http://jekyllrb.com/docs/posts/).

---

Now lets go to [fine tune your project](2-Configuring-Project.md)