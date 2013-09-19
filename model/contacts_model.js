var mongoose = require('mongoose');
var CONTACTS = mongoose.model('cl_contacts', {
  username:String, 
  contact: String,
  email: String
});