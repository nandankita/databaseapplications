#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var app      = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongodbConnectionString = "mongodb://admin:2uhHW6PewWEc@127.12.162.130:27017/databaseapplications";
if (typeof process.env.OPENSHIFT_MONGODB_DB_URL == "undefined") {
    mongodbConnectionString = "webdev";
}

var db = mongojs(mongodbConnectionString, ["applications"]);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;


app.get('/',function (req,res){
 res.send('hello');
})

app.get("/seqs", function(req,res){
	db.applications.find(function(err, docs){
		res.json(docs);
	});
});

app.post("/seqs", function(req,res){
	 var value = req.body;
	 console.log(value);
	 db.applications.insert(value, function(err, doc){
		res.json(doc);
	 });
});

app.get("/seqs/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.applications.findOne({_id : mongojs.ObjectId(id)},
	function(err, doc){
		res.json(doc);
	});
});

app.put("/seqs/:id",function(req,res){
	var id = req.params.id;
	db.applications.findAndModify({query:{_id : mongojs.ObjectId(id)}, update: { $set: {name: req.body.name}},
	new: true
	}, function(err, doc, lastErrorObject){
		res.json(doc);
	});
});

app.delete("/seqs/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.applications.remove({_id : mongojs.ObjectId(id)},
	function(err, doc){
		res.json(doc);
	});
});

app.listen(port,ipaddress);
