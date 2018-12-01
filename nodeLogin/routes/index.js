var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/', function(req, res, next) {

	if(!req.body.email || !req.body.username || !req.body.password || !req.body.passwordConf){
		res.send();
	} else {
		if (req.body.password == req.body.passwordConf) {

			User.findOne({email:req.body.email},function(err,data){
				if(!data){
					User.findOne({},function(err,data){

						var newPerson = new User({
							email:req.body.email,
							username: req.body.username,
							password: req.body.password,
							passwordConf: req.body.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered ."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			 
			res.send({"Success":"password is not matched"});
		}
	}
});

router.post('/login', function (req, res, next) {
	
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

module.exports = router;