/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'collections/channels',
    'collections/challenges',
    'views/challengeElement',
    'views/channelElement'
], function ($, _, Parse, JST, Channels, Challenges, ChallengeElement, ChannelElement) {
    'use strict';

    var DashboardView = Parse.View.extend({
        template: JST['app/scripts/templates/dashboard.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            _.bindAll(this, 'render', 'addOne', 'addAll', 'addOneChannel', 'addAllChannels');
            //this.render();

            this.challengeCollection = new Challenges({});
            this.challengeCollection.bind('reset', this.addAll);

            this.channelCollection = new Channels({});
            this.channelCollection.bind('reset', this.addAllChannels);

            this.render();

        },

        addOneChannel: function (channel) {
          var channelElement = new ChannelElement({model:channel});
          this.$('#channels').append(channelElement.el);
        },

        addAllChannels: function () {
          this.channelCollection.each(function(channel){
              self.addOneChannel(channel);
          })
        },

        addOne: function (challenge) {
            var challengeElement = new ChallengeElement({model:challenge});
            this.$('#challenges').append(challengeElement.el);
        },

        addAll: function () {
            var self = this;
            this.challengeCollection.each(function(challenge){
                self.addOne(challenge);
            })
        },

        render: function () {
            this.$el.html(this.template());
            // this.addAll();
            // this.addAllChannels();
            console.log(this.channelCollection);
            console.log(this.challengeCollection);
        }
    });

    return DashboardView;
});
