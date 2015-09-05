/*global define*/

define([
    'underscore',
    'parse-js-sdk'
], function (_, Parse) {
    'use strict';

    var ChallengesModel = Parse.Object.extend({

       className: 'Challenge',

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

    return ChallengesModel;
});
