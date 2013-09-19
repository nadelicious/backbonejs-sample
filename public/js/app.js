(function($) {
	var contactsModel = Backbone.Model.extend({
        defaults:{
			username:'n/a',
			contact:'n/a',
			email: 'n/a'
        }
    });
	
	var contactsCollection = Backbone.Collection.extend({
       model:contactsModel 
    });
	
	var contactInfoView 
})(jQuery);