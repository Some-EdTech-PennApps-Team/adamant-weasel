/*global define*/

define([
    'underscore',
    'parse-js-sdk',
    'models/channels'
], function (_, Parse, ChannelsModel) {
    'use strict';

    var ChannelsCollection = Parse.Collection.extend({
        model: Channels
    });

    return ChannelsCollection;
});
