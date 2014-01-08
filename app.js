var express = require('express');
var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(app.router);

app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000);
console.log('Express app started on port 3000');