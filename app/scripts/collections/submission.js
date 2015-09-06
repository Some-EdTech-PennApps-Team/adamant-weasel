/*global define*/

define([
    'underscore',
    'parse-js-sdk',
    'models/submission'
], function (_, Parse, SubmissionModel) {
    'use strict';

    var SubmissionCollection = Parse.Collection.extend({
        model: SubmissionModel,

        initialize: function(options) {
        	this.challengeId = options.challengeId;
        	console.log('CI', this.challengeId);
        	var Challenge = Parse.Object.extend('Challenge');
        	var challenge = new Challenge({});
        	challenge.id = this.challengeId;

        	this.query = new Parse.Query('ChallengeSubmission');
          this.query.equalTo('challenge', challenge);
          this.query.include('user');
          this.fetch();
        }
    });

    return SubmissionCollection;
});
