define( function ( require ) {
	"use strict";

	var CMS = require("CMS"),
		View = CMS.View.extend({

			el: "#CrsMSContainer",

			initialize: function () {
				this.render();
				this.$el.find( ".error-message" ).hide();
				this.listenTo( this.model, "invalid", function ( model, error ) {
					this.errorMessage( model, error );
				} );
			},
				
			template: _.template( require( "text!../template/loginTemplate.html" ) ),

			render: function () {
				this.$el.html( this.template( this.model.toJSON() ) );
				return this;
			},

			events: {
				"blur #email" : "validEmail",
				"blur #password" : "validPassword"
			},

			validEmail: function () {
				this.$el.find( ".email" ).removeClass( "has-error" );
				this.$el.find( ".error-message" ).hide();
				var newEmail = $( "#email" ).val();
				this.model.set( { email : newEmail }, { validate: true } );
			},

			validPassword: function () {
				this.$el.find( ".password" ).removeClass( "has-error" );
				this.$el.find( ".error-message" ).hide();
				var newPassword = $( "#password" ).val();
				this.model.set( { password : newPassword }, { validate: true } );
			},
				
			errorMessage: function ( model, errors ) {
				_.forEach( errors, function ( error ) {
				this.$el.find( "." + error.name ).addClass( "has-error" ); 
				}, this );

				this.$el.find( ".error-message" ).show();
			}
		});

	return View;
});