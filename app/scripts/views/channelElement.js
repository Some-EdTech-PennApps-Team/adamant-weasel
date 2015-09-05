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

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return ChannelElementView;
});
