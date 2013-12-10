module.exports = function(params, callback) {
  'use strict';

  var path  = require('path')
    , dateRegExp     = /\/([0-9]{4}-[0-9]{2}-[0-9]{2})-/

  params.assemble.options.pages.forEach(function(page, i, pages) {
    var matches = page.dest.match(dateRegExp)

    if (matches && matches.length) {
      page.data.date = matches[1]
      page.dest = page.dest.replace(dateRegExp, '/')

      params.grunt.verbose.ok('Date detected '.yellow, page.data.date)
      params.grunt.verbose.ok('Dest without date '.yellow, page.dest)

      pages[i] = page
    }
  })

  callback()
}

module.exports.options = {
  stage: 'render:pre:pages'
}
