/*global require*/
'use strict';

require.config({
   shim: {
       bootstrap: {
           deps: [
               'jquery'
           ],
           exports: 'jquery'
       },
       'parse-js-sdk': {
           deps:[
           'jquery'
           ],
           exports:'Parse'
       }
   },
   paths: {
       jquery: '../bower_components/jquery/dist/jquery',
       backbone: '../bower_components/backbone/backbone',
       underscore: '../bower_components/lodash/dist/lodash',
       bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
       'bootstrap-sass-official': '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
       chai: '../bower_components/chai/chai',
       lodash: '../bower_components/lodash/dist/lodash.compat',
       mocha: '../bower_components/mocha/mocha',
       modernizr: '../bower_components/modernizr/modernizr',
       'parse-js-sdk': '../bower_components/parse-js-sdk/lib/parse',
       requirejs: '../bower_components/requirejs/require',
       'requirejs-text': '../bower_components/requirejs-text/text'
   },
   packages: [

   ]
});

require([
    'backbone'
], function (Backbone) {
    Backbone.history.start();
});
