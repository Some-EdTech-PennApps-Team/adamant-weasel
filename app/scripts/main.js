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
    'backbone',
    'jquery',
    'parse-js-sdk',
    'views/dashboard'
], function (Backbone, $, Parse, Dashboard) {

    Parse.initialize("ETWHMUaqa2oIHO6Mci3DOzi5BFgOb5PmrsR5HBg6", "X9aWYRAXrLzVfqXG7uMboGOLoQsl3q4Rhh1mzCZZ");

    var mainView = new Dashboard({});
    $('#content').append(mainView.el);

    /*
    var newchallenge = new Newchallenge({});
    $('#content').append(newchallenge.el);
     */

});
