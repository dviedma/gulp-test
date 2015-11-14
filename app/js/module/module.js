
'use strict';

//var template = require('./module.html');
var template = "<h1>Hello Module 2</h1>";
var Backbone    = require('backbone');

module.exports = Backbone.View.extend({

    el: '#example',

    events: {},

    initialize: function(options) {

    },

    render: function() {

        this.$el.html(template);

        return this;
    }
});