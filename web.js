var express = require('express');
var ejs = require('ejs')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json()); // για αναγνωριζεται το req.body
app.use(bodyParser.urlencoded({ extended: false })); // για αναγνωριζεται το req.body

app.set('view enigne', 'ejs')
app.set('views', './views')
app.use("/WebProject",express.static("WebProject"));

app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(8080, function() {
    console.log("Server Started on port: 8080");
});

app.get('/', function (req, res){
    res.render('Register.ejs')
});