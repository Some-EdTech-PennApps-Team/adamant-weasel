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

        events: {
          'click .class-button': 'changeChannel'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'addOne', 'addAll', 'addOneChannel', 'addAllChannels');
            //this.render();

            this.channelCollection = new Channels({});
            this.channelCollection.bind('reset', this.addAllChannels);

            this.challengeCollection = new Challenges({});
            this.challengeCollection.bind('reset', this.addAll);

            this.activeId = 0;
            this.activeChannelObj = {};
        },

        addOneChannel: function (channel) {
          /*
          save var of the selected/active channel
           */
          var active = false;
          if (this.activeId == channel.id){
            //channelElement.className = 'active';
            active = true;
          }
          var channelElement = new ChannelElement({model:channel});
          channelElement.toggleActive(active);
          this.$('#channels').append(channelElement.el);

        },

        addAllChannels: function () {
          var self = this;
          self.activeId = self.channelCollection.at(0).id;
          self.activeChannelObj = self.channelCollection.at(0);
          this.render();
          this.channelCollection.each(function(channel){
              /*
              Add logic for checking to see if the channel being added is the active one
              if so - add the class "active" to the classes
              */
              self.addOneChannel(channel);
              //console.log(channel);
          })
        },

        addOne: function (challenge) {
            var challengeElement = new ChallengeElement({model:challenge});
            this.$('#challenges').append(challengeElement.el);
        },

        addAll: function (channel) {
            var self = this;
            if (channel) {
              //console.log("Channel addAll event");
              //console.log(channel);
              self.challengeCollection.each(function(challenge){
                  if(challenge.get('channel') == channel) {
                      self.addOne(challenge);
                  }
              });
            } else {
              //console.log("Value empty: " + channel);
              self.challengeCollection.each(function(challenge){
                  self.addOne(challenge);
              });
            }
        },

        changeChannel: function(event){
          var self = this;

          // Change Active Channel appearance
          $('#' + self.activeId).removeClass('active');
          self.activeId = event.currentTarget.id;
          self.activeChannelObj = self.channelCollection.get(self.activeId);
          $('#' + self.activeId).addClass('active');

          // Update challenges
          $('#challenges').empty();
          $('.class-name-header').empty();
          //console.log("Challenges emptied.");
          self.addAll(self.activeChannelObj);
          $('.class-name-header').append(self.activeChannelObj.channelName);
          console.log(self.activeChannelObj.channelName);
          // this.channelCollection.get(self.activeId);

          //self.render();

        },

        render: function () {
          var self = this;
          //var activeChannel = self.activeChannelObj.toJSON();
          var activeChannel = self.activeChannelObj;
          console.log(activeChannel);
          //this.$el.html(this.template());
          this.$el.html(this.template({
            channel: self.activeChannelObj.toJSON()
          }));

            //console.log(this.channelCollection);
            //console.log(this.challengeCollection);
        }
    });

    return DashboardView;
});
