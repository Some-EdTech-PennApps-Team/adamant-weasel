/*global define*/

define([
    'jquery',
    'parse-js-sdk',
    'views/newChallenge',
    'views/dashboard'
], function ($, Parse, NewChallenge, Dashboard) {
    'use strict';

    var AppRouter = Parse.Router.extend({
	    routes: {
	      "": "home",
	      "create": "createChallenge"
	    },

	    initialize: function() {
	      // this.navBarView = new NavBarView({
	      //   el: $("#nav-bar-container")
	      // });
	      // this.navBarView.bind("userLogOut", this.navigateSkills, this);
	    },

	    home: function() {
				this._cleanUp();
	    	this.view = new Dashboard({});
	    	$("#content").append(this.view.el);
	    },

	    createChallenge: function() {
	    	this._cleanUp();
	    	this.view = new NewChallenge({});
	    	$("#content").append(this.view.el);
	    },

	    _cleanUp: function() {
        if(this.view) {
          this.view.remove();
        	this.view = null;
      	}
      }   
  	});

    return AppRouter;
});
