/*global define*/

define([
    'underscore',
    'parse-js-sdk'
], function (_, Parse) {
    'use strict';

    var ChannelsModel = Parse.Object.extend({

        className: 'Channel',

        url: '',

        initialize: function() {
        },

        // defaults: {
        // },

        // validate: function(attrs, options) {
        // },

        // parse: function(response, options)  {
        //     return response;
        // }
    });

    return ChannelsModel;
});
