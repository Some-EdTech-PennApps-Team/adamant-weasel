/*global define*/

define([
    'jquery',
    'parse-js-sdk',
    'views/newChallenge',
    'views/dashboard',
    'views/gallery'
], function ($, Parse, NewChallenge, Dashboard, Gallery) {
    'use strict';

    var AppRouter = Parse.Router.extend({
	    routes: {
	      '': 'home',
	      'create': 'createChallenge',
	      'gallery/:challengeId': 'gallery'
	    },

	    initialize: function() {
	    	_.bindAll(this, "navigateHome");
	    },

	    home: function() {
				this._cleanUp();
	    	this.view = new Dashboard({});
	    	$('#content').append(this.view.el);
	    },

	    createChallenge: function() {
	    	this._cleanUp();
	    	this.view = new NewChallenge({});
	    	this.view.bind("saveSuccess", this.navigateHome);
	    	$('#content').append(this.view.el);
	    },

      gallery: function(challengeId){
	    	this._cleanUp();
	    	this.view = new Gallery({
	    		challengeId: challengeId
	    	});
	    	$('#content').append(this.view.el);
      },

      navigateHome: function(){
      	this.navigate("", true);
      },

	    _cleanUp: function() {
        if(this.view) {
          this.view.remove();
        	this.view = null;
      	}
      },
  	});

    return AppRouter;
});
