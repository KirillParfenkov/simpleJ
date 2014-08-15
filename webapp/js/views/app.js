define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
	'events',
  'libs/queue/queue',
  'models/user',
  'text!templates/layout.html' 
], function($, _, Backbone, Vm, Events, Queue, User, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.container',
    events : {
      'click .tabLink__sys' : 'selectTab'
    },
    template: layoutTemplate,
    tabs : [],
    initialize: function () {
    },
    render: function ( tabs, callback ) {
      var view = this;
      var queue = new Queue([
        function(queue) {
          view.loadData();
          queue.next();
        },
        function(queue) {
          view.renderWithData( tabs );
          if ( callback ) {
            callback();
          }
        }]);
      queue.start();
		},

    loadData : function () {
    },

    selectTab : function ( e ) {
      $('.sideBar').html('');
      $( '#tabMenu' ).find('li').removeClass( 'active' );
      $(e.currentTarget).parent().addClass('active');
    },

    renderWithData : function ( tabs ) {
      $(this.el).html(_.template(layoutTemplate, {tabs : tabs}));
    }
	});
  return AppView;
});