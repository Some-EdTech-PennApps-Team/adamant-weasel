/*global define*/

define([
    'jquery',
    'underscore',
    'parse-js-sdk',
    'templates',
    'collections/channels'
], function ($, _, Parse, JST, Channels) {
    'use strict';

    var NewChallengeView = Parse.View.extend({
      template: JST['app/scripts/templates/newChallenge.ejs'],

      tagName: 'div',

      id: '',

      className: '',

      events: {
        'submit form': 'submitChallenge',
        'change #promptImage': 'updateImage',
        'change #challengeTitle': 'updatePreview',
        'change #promptText': 'updatePreview',
        'change #promptText': 'updatePreview'
      },

      initialize: function (options) {
        //this.listenTo(this.model, 'change', this.render);
        _.bindAll(this, 'render', 'submitChallenge');
        
        this.channels = new Channels({});
        this.channels.bind('reset', this.render);

      },

      render: function () {
        
        var channels = this.channels.toJSON();
        this.$el.html(this.template({
          channels: channels
        }));
      },

      submitChallenge: function(e) {
        e.preventDefault();
        
        var self = this;

        var challengeTitle = this.$('#challengeTitle').val();
        var promptText = this.$('#promptText').val();
        var promptImage = this.$('#promptImage').val();
        var channelId = this.$('#channelSelect').val();
        var selectedChannel = self.channels.get(channelId);
        var expires = new Date(new Date(Date.now()).getTime() + 60 * 60 * 24 * 1000);

        var Challenge =Parse.Object.extend("Challenge");
        var challenge = new Challenge();
        challenge.set('challengeTitle', challengeTitle);
        challenge.set('promptText', promptText);
        challenge.set('channel', selectedChannel);
        challenge.set('expires', expires);

        challenge.save( null, {
          success: function(result) {
            self.saveImage(result);
          },
          error: function() {

          }
        });
      },

      updateImage: function() {
        var self = this;
        var fileUploadControl = this.$("#promptImage")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = file.name;
          var promptImageFile = new Parse.File(name, file);

          promptImageFile.save().then(function(savedFile) { 
            var img = '<img class="image-preview" src="'+savedFile.url()+'" />';
            console.log("IMG", img);
            self.$('#imagePreview').append(img);
          });
        };
      },

      saveImage: function(challenge){
        var self = this;
        var fileUploadControl = this.$("#promptImage")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = file.name;
          var promptImageFile = new Parse.File(name, file);

          promptImageFile.save().then(function() { 
             challenge.set('promptImage', promptImageFile);
             challenge.save();
          });
        }
      },

      updatePreview: function() {
        var challengeTitle = this.$('#challengeTitle').val();
        var promptText = this.$('#promptText').val();
        var promptImage = this.$('#promptImage').val();
        var channelId = this.$('#channelSelect').val();
        var selectedChannel =this.channels.get(channelId);

        this.$("#title-preview").html(challengeTitle);
        this.$("#prompt-preview").html(promptText);
        this.$("#channel-preview").html(selectedChannel.get("channelName")); 
      }
    });

    return NewChallengeView;
});
