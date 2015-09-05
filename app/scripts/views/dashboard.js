/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'collections/channels',
    'collections/challenges'
], function ($, _, Parse, JST, Channels, Challenges) {
    'use strict';

    var DashboardView = Parse.View.extend({
        template: JST['app/scripts/templates/dashboard.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();

            var queryChannels = new Parse.Query(Channels);
            var queryChallenges = new Parse.Query(Challenges);




        },

        render: function () {
            this.$el.html(this.template());
        }
    });

    return DashboardView;
});
