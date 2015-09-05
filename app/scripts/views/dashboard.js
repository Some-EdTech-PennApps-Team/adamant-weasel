/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'collections/channels',
    'collections/challenges',
    'views/challengeElement'
], function ($, _, Parse, JST, Channels, Challenges, ChallengeElement) {
    'use strict';

    var DashboardView = Parse.View.extend({
        template: JST['app/scripts/templates/dashboard.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            _.bindAll(this, 'render', 'addOne', 'addAll');
            //this.render();

            this.collection = new Challenges({});
            this.collection.bind('reset', this.render);

        },

        addOne: function (challenge) {
            var challengeElement = new ChallengeElement({model:challenge})
            this.$('#challenges').append(challengeElement.el);
        },

        addAll: function () {
            var self = this;
            this.collection.each(function(challenge){
                self.addOne(challenge);
            })
        },


        render: function () {
            this.$el.html(this.template());
            this.addAll();
            console.log(this.collection);
        }
    });

    return DashboardView;
});
