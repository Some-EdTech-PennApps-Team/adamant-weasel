/*global define*/

define([
    'underscore',
    'parse-js-sdk',
    'models/challenges'
], function (_, Parse, ChallengesModel) {
    'use strict';

    var ChallengesCollection = Parse.Collection.extend({
        model: Challenges
    });

    return ChallengesCollection;
});
