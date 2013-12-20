module.exports.register = function(Handlebars, options, params) {
  "use strict";

  function eachSorted(context, options, sortCallback, filterCallback) {
    /*jshint validthis:true */

    var fn = options.fn
    , i = 0
    , ret = ""
    , data

    if (typeof context === 'function') { context = context.call(this) }

    if (options.data) {
      data = createFrame(options.data)
    }

    if(context && typeof context === 'object') {
      // if (Array.isArray(context)) {
        if (filterCallback) {
          context = context.filter(filterCallback)
        }
        if (sortCallback) {
          context = context.sort(sortCallback)
        }
        if (options.hash.limit) {
          context = context.slice(options.hash.limit)
        }
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i
            data.first = (i === 0)
            data.last = (i === (context.length-1))
          }
          ret = ret + fn(context[i], { data: data })
        }
      // } else {
      //   // @todo here
      //   for(var key in context) {
      //     if(context.hasOwnProperty(key)) {
      //       if(data) { data.key = key }
      //       ret = ret + fn(context[key], {data: data})
      //       i++
      //     }
      //   }
      // }
    }

    if(i === 0){
      ret = options.inverse(this)
    }

    return ret
  }

  var opts     = options
    , sortByDate = function sortByDate(a, b) {
      if (a.data && a.data.date) {
        if (b.data && b.data.date) {
          if (a.data.date > b.data.date) {
            return -1
          }
          if (a.data.date < b.data.date) {
            return 1
          }
        }
        else {
          return 1
        }
      }
      else if (b.data && b.data.date) {
        return -1
      }
      return 0
    }

  Handlebars.registerHelper('posts', function(context, options) {
    return eachSorted.call(this, context, options, sortByDate, function filterPost (el) {
      return el.data.type === 'post' && (el.data.draft ? options.hash.drafts && el.data.draft : true)
    })
  })

  Handlebars.registerHelper('each_dateSorted', function(context, options) {
    return eachSorted.call(this, context, options, sortByDate)
  })
}
