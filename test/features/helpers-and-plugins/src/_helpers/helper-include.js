/* jshint asi:true, laxcomma:true */
module.exports.register = function(Handlebars, options, params) {
  "use strict";

  var fs = require('fs')
    , _     = require('lodash')

  /*
   * Usage: {{ include [partial] }}
   */
  Handlebars.registerHelper("include", function(template, datafile) {
    var partial = Handlebars.partials[template]

    if (typeof partial === "string") {
      partial = Handlebars.compile(partial)
      Handlebars.partials[template] = partial
    }

    if (!partial) {
      return new Handlebars.SafeString('Partial **' + template + '** not found.')
    }

    var context = _.extend({}, this, JSON.parse(fs.readFileSync(datafile, 'utf8')))
    return new Handlebars.SafeString(partial(context))
  })
}
