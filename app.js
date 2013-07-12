
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user_route = require('./routes/user_route')
  , http = require('http')
  , path = require('path')
  , config = require('./config')
  , port = config.config.port;

var app = express();

// all environments
app.set('port', process.env.PORT || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/savename', user_route.savename);
app.get('/google', user_route.google);
app.get('/innerRedirect', user_route.innerRedirect);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
