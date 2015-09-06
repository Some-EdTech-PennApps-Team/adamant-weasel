/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ChallengeElementView = Backbone.View.extend({
        template: JST['app/scripts/templates/challengeElement.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            if (this.model){
              this.render();
            }
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return ChallengeElementView;
});
