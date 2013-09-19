var mongoose = require('mongoose');
var CONTACTS = mongoose.model('cl_contacts', {
  username:String, 
  contact: String,
  email: String
});



exports.fetchContact = function(obj,callback){
	CONTACTS.find(obj,function(err,res){
		if(err) return callback(err);
		callback(null,res);
	});
}

exports.saveContact = function(obj,callback){
	var contacts = new CONTACTS(obj);
	contacts.save(function(err,res){
		if(err) return callback(err);
		callback(null,1);
	});
}

exports.updateContact = function(qry, obj, callback){
	CONTACTS.update(qry, { $set: obj }, {}, function(err, data){
		if(err) return callback(err);
		callback(null,1);	
	});
}

exports.deleteContact = function(qry,callback){
	CONTACTS.remove(qry,function(err,res){
		if(err) return callback(err);
		callback(null,1);
	});
}


