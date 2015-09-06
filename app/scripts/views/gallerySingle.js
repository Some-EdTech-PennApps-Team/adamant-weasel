/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var GallerySingleView = Backbone.View.extend({
        template: JST['app/scripts/templates/gallerySingle.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.render();
        },

        render: function () {
            var url = this.model.get("submissionImage").url();
            var user = this.model.get('user');
            // console.log("USER", user);
            this.$el.html(this.template({
                model:this.model.toJSON(),             
                url:url,
                user: user.toJSON()
            }));
        }
    });

    return GallerySingleView;
});
