var express = require('express');
var mongoose = require('mongoose');
var route =require('./routes/route.js');
var app =express();

mongoose.connect('localhost', 'db_contacts');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

app.configure(function(){
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/public/views');
	app.locals.pretty = true;
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
});

app.get('/',route.getMain);
app.post('/add',route.postAddContact);
app.get('/update',route.postUpdateContact);
app.get('/delete',route.postDeleteContact);

app.listen(process.env.PORT || 3000);
console.log('Application is running at localhost:3000');