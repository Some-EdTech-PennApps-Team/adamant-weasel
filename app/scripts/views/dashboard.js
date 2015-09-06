/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'collections/channels',
    'collections/challenges',
    'views/challengeElement',
    'views/channelElement',
    'views/channelSideBar'
], function ($, _, Parse, JST, Channels, Challenges, ChallengeElement, ChannelElement, ChannelSideBar) {
    'use strict';

    var DashboardView = Parse.View.extend({
        template: JST['app/scripts/templates/dashboard.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          // 'click .class-button': 'changeChannel'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'addOne', 'addAll', 'changeChannel', 'channelsLoaded');

            this.channelSideBarView = new ChannelSideBar({});
            this.channelSideBarView.bind('channelsLoaded', this.channelsLoaded);
            this.channelSideBarView.bind('selectChannel', this.changeChannel);
        },

        addOne: function (challenge) {
          var challengeElement = new ChallengeElement({model:challenge});
          this.$('#challenges').append(challengeElement.el);
        },

        addAll: function () {
          var self = this;
          
          self.$('#challenges').empty();

          if (!self.activeChannelId) {
            self.activeChannel = self.channels.at(0);
          }
          
          self.challengeCollection.each(function(challenge){
            if (challenge.get('channel').id === self.activeChannel.id) {
              self.addOne(challenge);  
            }
          });
        },

        changeChannel: function(channel){
          var self = this;
          self.activeChannelId = channel.id;
          self.activeChannel = channel; 
          self.render();
          self.addAll();
          

        },

        channelsLoaded: function(channels) {
          this.channels = channels;
          this.challengeCollection = new Challenges({});
          this.challengeCollection.bind('reset', this.addAll);

          this.render();
        },

        render: function () {
          var self = this;

          if (!self.activeChannel) {
            self.activeChannel = self.channels.at(0);
          }

          this.$el.html(this.template({
            channel: self.activeChannel.toJSON()
          }));

          this.$('#class-selection').empty();
          this.$('#class-selection').append(this.channelSideBarView.el);
            //console.log(this.channelCollection);
            //console.log(this.challengeCollection);
        }
    });

    return DashboardView;
});
