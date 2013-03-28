/**
 * Node.js server. (http://nodejs.org/api/index.html)
 */
var connect = require('connect');
connect.createServer(
    connect.static(__dirname + '/dist')
).listen(8080);