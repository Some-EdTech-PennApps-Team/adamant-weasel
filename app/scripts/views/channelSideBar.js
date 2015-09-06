/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'views/channelElement',
    'collections/channels'
], function ($, _, Parse, JST, ChannelElement, Channels) {
    'use strict';

    var ChannelSideBarView = Parse.View.extend({
      template: JST['app/scripts/templates/channelSideBar.ejs'],

      tagName: 'div',

      id: '',

      className: '',

      events: {
      },

      initialize: function () {
          _.bindAll(this, 'render', 'addOneChannel', 'addAllChannels', 'setActive', 'firstLoad');

          this.render();

          this.channelCollection = new Channels({});
          this.channelCollection.bind('reset', this.firstLoad);
      },

      addOneChannel: function (channel) {
        var self = this;

        var active = false;
        if (this.activeChannelId === channel.id){
          active = true;
        }

        var channelElement = new ChannelElement({model:channel});
        channelElement.toggleActive(active);
        
        this.$('#channels').append(channelElement.el);

        channelElement.bind('selectActive', this.setActive);
      },

      addAllChannels: function () {
        var self = this;
        this.$('#channels').empty();

        this.channelCollection.each(function(channel){
          self.addOneChannel(channel);
        });
      },

      firstLoad: function() {
        this.trigger('channelsLoaded', this.channelCollection);
        this.addAllChannels();
      },

      setActive: function(activeObjectId) {
        this.activeChannelId = activeObjectId;
        var activeChannel = this.channelCollection.get(activeObjectId);
        this.trigger('selectChannel', activeChannel);
        this.addAllChannels();
      },

      render: function () {
          this.$el.html(this.template());
      }
    });

    return ChannelSideBarView;
});
