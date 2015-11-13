console.log("hi router.js");

var Backbone    = require('backbone');
//var HomeView    = require('./views/home.view');
//var $           = require("jquery");

var Router = Backbone.Router.extend({
    routes: {
        '*path': 'default'
    },

    initialize: function() {
        Backbone.history.start();
    },

    default: function() {
        //var view = new HomeView();
        //$("#application-context").html(view.$el)
        console.log("load default route!");
    }
});

module.exports = Router;
