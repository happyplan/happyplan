# Migrations

We previously use [Jekyll that have a nice migration doc](http://jekyllrb.com/docs/migrations/)

Note: For Wordpress, [wordpress-to-jekyll-exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) seems a quick & good choice (+ keep disqus thread id !)

Now we are using _assemble_ for the engine, we need to add on top of that another
migration from liquid to handlebars.
Here is a good start:

+ https://github.com/jonschlinkert/grunt-refactor
+ https://github.com/assemble/boilerplate-bootstrap/blob/master/tasks/replacements.js
+ https://github.com/assemble/boilerplate-bootstrap/blob/master/Gruntfile.js#L51


After that maybe you will need to rename all .md to .html.hbs & then wrap the post section by

    {{#markdown}}
    your content here
    {{/markdown}}
