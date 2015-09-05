/*global define*/

define([
    'underscore',
    'parse-js-sdk',
    'models/challenge'
], function (_, Parse, Challenge) {
    'use strict';

    var ChallengesCollection = Parse.Collection.extend({
        model: Challenge,

        initialize: function(){
          this.query = new Parse.Query('Challenge');
          this.fetch();
        }

    });

    return ChallengesCollection;
});
