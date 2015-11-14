
'use strict';

//var template = require('./module.html');
var template = "<h1>Hello Module</h1>";
var Backbone    = require('backbone');

module.exports = Backbone.View.extend({

    className: 'module',

    events: {},

    initialize: function(options) {

    },

    render: function() {
        this.$el.html(template());

        return this;
    }
});