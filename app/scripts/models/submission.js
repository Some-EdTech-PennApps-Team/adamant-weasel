/*global define*/

define([
    'underscore',
    'parse-js-sdk'
], function (_, Parse) {
    'use strict';

    var SubmissionModel = Parse.Object.extend('ChallengeSubmission', {
        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return SubmissionModel;
});
