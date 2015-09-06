/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'collections/submission',
    'views/gallerySingle',
    // 'isotope'
], function ($, _, Parse, JST, Submissions, GallerySingle) {
    'use strict';

    var GalleryView = Parse.View.extend({
        template: JST['app/scripts/templates/gallery.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function (options) {
            _.bindAll(this, 'render','addAll');

            var self = this;
            self.challengeId = options.challengeId;

            var Challenge = Parse.Object.extend("Challenge");
            var query = new Parse.Query(Challenge);
            query.get(options.challengeId, {
              success: function(result) {
                // The object was retrieved successfully.
                self.challenge = result;
                self.render();
              },
              error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
              }
            });

            this.submissions = new Submissions({
                challengeId: self.challengeId
            });
            this.submissions.bind('reset', this.addAll);
        },

        render: function () {
            this.$el.html(this.template(this.challenge.toJSON()));

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

            // var iso = new Isotope( '.grid', {
            //   // options
            //   itemSelector: '.grid-item',
            //   layoutMode: 'masonry'
            // });

        }
    });

    return GalleryView;
});
