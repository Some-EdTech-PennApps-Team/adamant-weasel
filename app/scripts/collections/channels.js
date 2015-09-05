/*global define*/

define([
    'underscore',
    'parse-js-sdk',
    'models/channel'
], function (_, Parse, Channel) {
    'use strict';

    var ChannelsCollection = Parse.Collection.extend({
        model: Channel
    });

    return ChannelsCollection;
});
