/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'collections/submission',
    'views/gallerySingle',
    'isotope'
], function ($, _, Parse, JST, Submissions, GallerySingle, Isotope) {
    'use strict';

    var GalleryView = Parse.View.extend({
        template: JST['app/scripts/templates/gallery.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function (options) {
            _.bindAll(this, 'render','addAll');
            this.submissions = new Submissions({
                challengeId: options.challengeId
            });
            this.submissions.bind('reset', this.addAll);
            this.render();
        },

        render: function () {
            this.$el.html(this.template());

        },

        addOne: function(submission) {
            var gallerySingle = new GallerySingle({model:submission});
            this.$('#gallery-container').append(gallerySingle.el);
        },

        addAll: function(){
            var self = this;
            // console.log("THIS", this.submissions);
            this.submissions.each(function(submission){
                self.addOne(submission);
            });

            var iso = new Isotope( '.grid', {
              // options
              itemSelector: '.grid-item',
              layoutMode: 'masonry'
            });

        }
    });

    return GalleryView;
});
