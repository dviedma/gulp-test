console.log("hi router.js");

var Backbone    = require('backbone');
var ModuleView  = require('./module/module');
var $           = require("jquery");

var Router = Backbone.Router.extend({
    routes: {
        '*path': 'default'
    },

    initialize: function() {
        Backbone.history.start();
    },

    default: function() {
        console.log("loading default route");

        var view = new ModuleView();
        $("#example").html(view.$el)
    }
});

module.exports = Router;
