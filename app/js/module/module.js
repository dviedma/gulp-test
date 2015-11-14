
'use strict';

var template = require('./module.hbs');
var Backbone    = require('backbone');

module.exports = Backbone.View.extend({

    el: '#example',

    events: {},

    initialize: function(options) {

    },

    render: function() {

        this.$el.html(template({name: 'Justin Graber 2'}));

        return this;
    }
});