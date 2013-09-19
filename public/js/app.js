(function($) {
	var DATA =  $.parseJSON($('body').attr('data'));
	 var contactModel = Backbone.Model.extend({
        defaults:{
           username: '',
		   contact:'',
		   email: ''  
        }
    });

    var contactCollection = Backbone.Collection.extend({
       model:contactModel
    });

    var personView = Backbone.View.extend({
        tagName:"tr",
        template:$("#personTemplate").html(),

        render:function () {
			_.templateSettings = {
				interpolate : /\{\{(.+?)\}\}/g
			};
            var tmpl = _.template('{{'+this.template+'}}'); 
            this.$el.html(tmpl(this.model.toJSON())); 
            return this;
        },
		
		events: {
			"click .delete": "deletePerson",
			"click .update": "updatePerson"
		},
 
		deletePerson:function () {
			this.model.destroy();
			this.remove();
		},
		
		updatePerson:function(){
			this.update();
		}	
    });

	var contactView = Backbone.View.extend({
        el:$("#contacts-container"),

        initialize:function(){
            this.collection = new contactCollection(DATA);
            this.render();
			this.collection.on("add", this.renderContact, this);
			this.collection.on("remove", this.deleteContact, this);
			this.collection.on("update", this.updateContact, this);
        },

        render: function(){
            var that = this;
            _.each(this.collection.models, function(item){
                that.renderContact(item);
            }, this);
        },

        renderContact:function(item){
            var _personView = new personView({
                model: item
            });
            this.$el.append(_personView.render().el);
        },
		
		events:{
			"click .add":"addContact"
		},
		
		addContact: function(e){
			var ajax =$.ajax({
				url: '/add',
				type: 'post',
				data: ''
			});
		},
		
		deleteContact: function(e){
			var ajax =$.ajax({
				url: '/delete',
				type: 'post',
				data: ''
			});
			
			ajax.done(function(data){
				if(data){
					console.log('Added');
				}
			});
		},
		
		updateContact: function(e){
			var ajax =$.ajax({
				url: '/update',
				type: 'post',
				data: ''
			});
			
			ajax.done(function(data){
				if(data){
					console.log('Updated');
				}
			});
		}
	});
	

	var contactView = new contactView();
	
})(jQuery);

