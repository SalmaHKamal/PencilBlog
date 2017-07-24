var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
// var multer = require('multer');

mongoose.Promise = global.Promise;


app.use(function(requst, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Headers', "Origin , X-Requested-With , Content-Type , Accept , Authirization , sid");
    response.header('Access-Control-Allow-Methods', "POST , GET , DELETE , PUT");
    next();
})

var url = 'mongodb://localhost/pencilBlog';

//middleware : the arrangement is important 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect(url, function(error) {
    if (error)
        console.log("can't connect to database" + error);
    else
        console.log('connected successfully to ' + url);
});

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})

app.listen(port, function() {
    console.log('listening on port ' + port);
})