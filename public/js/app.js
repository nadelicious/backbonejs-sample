/*
----------------------------------------------------------
	Initialize App
----------------------------------------------------------
*/
(function() {
	window.COUNT=1;
	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};
	window.vent = _.extend({}, Backbone.Events);
	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};
})();


/*
----------------------------------------------------------
	Initialize Model
----------------------------------------------------------
*/
App.Models.Contact = Backbone.Model.extend({
	validate: function(attrs) {
		if ( ! attrs.username ) {
			return 'Username is required';
		}
		
		if( ! attrs.contact){
			return 'Please enter a valid number';
		}

		if ( ! attrs.email ) {
			return 'Please enter a valid email address.';
		}
	},
	idAttribute : "_id",
	urlRoot: "/contacts",
	defaults : {
		_id: null
	}
});



/*
----------------------------------------------------------
	Initialize Collection
----------------------------------------------------------
*/
App.Collections.Contacts = Backbone.Collection.extend({
	model: App.Models.Contact,
	url: '/contacts'
});



/*
----------------------------------------------------------
	Main  App View
----------------------------------------------------------
*/
App.Views.App = Backbone.View.extend({
	initialize: function() {
		var addContactView = new App.Views.AddContact({ collection: App.contacts });
		var allContactsView = new App.Views.Contacts({ collection: App.contacts });
		$('table#contacts-container').append($(allContactsView.render().el));
	}
});


/*
----------------------------------------------------------
	Add Contact View
----------------------------------------------------------
*/
App.Views.AddContact = Backbone.View.extend({
	el: 'a.add',

	initialize: function() {
		this.username= $('#add-contacts-container td input[name=username]');
		this.contact= $('#add-contacts-container td input[name=contact]');
		this.email= $('#add-contacts-container td input[name=email]');
	},

	events: {
		'click': 'addContact'
	},

	addContact: function(e) {
		e.preventDefault();
		this.collection.create({
			username: this.username.val(),
			contact: this.contact.val(),
			email: this.email.val(),
		}, { wait: true });
		this.clearForm();
	},

	clearForm: function() {
		this.username.val('');
		this.contact.val('');
		this.email.val('');
	}
});


/*
----------------------------------------------------------
	All Contacts View
----------------------------------------------------------
*/
App.Views.Contacts = Backbone.View.extend({
	tagName: 'tbody',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(contact) {
		contact.attributes.__v = COUNT++;
		console.log(contact.attributes.__v);
		var contactView = new App.Views.Contact({ model: contact });
		this.$el.append(contactView.render().el);
	}
});



/*
----------------------------------------------------------
	Single Contact View
----------------------------------------------------------
*/
App.Views.Contact = Backbone.View.extend({
	tagName: 'tr',

	template: template('contactsTemplate'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
	},

	events: {
		'click a.delete': 'deleteContact',
		'click a.edit'  : 'editContact',
		'click a.update' : 'updateContact',
		'click a.cancel' : 'cancelEdit'
	},

	editContact: function(ev) {
		var el = $(ev.currentTarget);
		var el_show =el.siblings('.update , .cancel');
		var el_hide = el.siblings('.delete');
		var inputs = el.parents('tr').find('input');
		el.hide();
		el_hide.hide();
		el_show.show();
		inputs.attr('disabled',false);
	},
	
	updateContact: function(ev){
		var el = $(ev.currentTarget);
		var username = el.parents('tr').find('input[name=username]');
		var contact = el.parents('tr').find('input[name=contact]');
		var email = el.parents('tr').find('input[name=email]');
		this.model.save({
			username: $.trim(username.val()),
			contact: $.trim(contact.val()),
			email: $.trim(email.val())
		});
	},
	
	cancelEdit: function(ev){
		var el = $(ev.currentTarget);
		var el_show =el.siblings('.edit , .delete');
		var el_hide = el.siblings('.update');
		var inputs = el.parents('tr').find('input');
		el.hide();
		el_hide.hide();
		el_show.show();
		inputs.attr('disabled',true);
	},

	deleteContact: function() {
		this.model.destroy();
	},

	render: function() {
		var obj =this.model.toJSON();
		this.$el.html( this.template( obj ) );
		return this;
	},

	unrender: function() {
		this.remove();
	}
});



/*
----------------------------------------------------------
	Set up Route
----------------------------------------------------------
*/
App.Router = Backbone.Router.extend({
	routes: {
		'': 'index'
	},
	index: function() {
		//console.log( 'INDEX' );
	}
});


/*
----------------------------------------------------------
	Deploy App
----------------------------------------------------------
*/

new App.Router;
Backbone.history.start();

App.contacts = new App.Collections.Contacts;
App.contacts.fetch().then(function() {
	new App.Views.App({ collection: App.contacts });
});









