/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ChannelElementView = Backbone.View.extend({
        template: JST['app/scripts/templates/channelElement.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function (options) {
            if (this.model){
              this.render();
            }
        },

        toggleActive: function(active) {
            if (active) {
              this.$('.class-button').addClass('active');
            } else {
              this.$('.class-button').removeClass('active');
            }
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return ChannelElementView;
});
