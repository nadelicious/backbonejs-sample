//
var  contacts = require('../model/contacts_model.js');
exports.getMain = function(req,res){
	contacts.fetchContact({},function(err,data){
		if(err){
			res.statusCode= 404;
			console.log(error);
		}
		if(data){
			res.render('index.ejs',{
				DATA: JSON.stringify(data)
			});
		}	
	});
}

exports.postAddContact = function(req,res){
	contacts.saveContact(req.body,function(err,data){
		if(err){
			res.statusCode= 404;
			console.log(error);
		}
		if(data) res.redirect('/');
	});
}


exports.postUpdateContact = function(req,res){
	contacts.updateContact({_id: req.body._id},req.body,function(err,data){
		if(err){
			res.statusCode= 404;
			console.log(error);
		}
		if(data) res.redirect('/');
	});
}

exports.postDeleteContact = function(req,res){
	contacts.deleteContact({_id: req.body._id},function(err,data){
		if(err){
			res.statusCode= 404;
			console.log(error);
		}
		if(data) res.redirect('/');
	});
}
