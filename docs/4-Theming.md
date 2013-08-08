# Theming

Aye, you can theme happyplan, great isn't it?

_Just to let you know, everything is a theme for happyplan._

Default files are just the default theme. Local files are just a local theme.
Every theme can have a `happyplan.json` configuration, so this should be very flexible.
Here is how themes are interpreted.

1. Default theme is parsed & loaded.
2. Local theme configuration is parsed.
3. Checking if the local theme use a parent theme.
4. If there is a parent theme, loop from 2. to 4. with it.
5. Load parent theme.
6. Load local theme.

## Theme configuration

Each theme have a section in the `theme` one. Just take a look in the [default configuration][defaultconf]

## Inheritance

A theme can herit from a parent theme. To do this, just add this section to you configuration:

```json
{
    "theme": {
        "local": {
            "parent": "themename"
        }
    }
}
```

For now `themename` should be a folder accessible in `bower_components` folder.
But if you feel the need, it won't be difficult to make this lookup smarter.

To disable a theme, you can just set the value `happyplan.theme[themeName].disable` to a true value.
Ex: Disable the default parent theme.

```json
{
    "theme": {
        "default": {
            "disable": true
        }
    }
}
```

## Install a theme

    $ bower install {themename}

It will download your theme via bower. You can replace `{themename}` bye `user/repo` or whatever Bower can consume.

## Using a theme

For now, just do like the snippet above, changing `theme.local.parent` value.

[defaultconf]: https://github.com/happyplan/happyplan/blob/master/happyplan.json "default config"