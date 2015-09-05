/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var NewchallengeView = Parse.View.extend({
        template: JST['app/scripts/templates/newchallenge.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

    return NewchallengeView;
});
