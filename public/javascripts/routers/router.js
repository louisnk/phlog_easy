var APP = window.APP || {};

(function() {
	APP.Routers = APP.Routers || {};
	APP.Routers.Main = Backbone.Router.extend({
		routes: {
			'': 'home',
			'images': 'images',
			'images/:which': 'images',
			'bio': 'about'
		},

		target: $('#mobile-under'),

		initialize: function(config) {
			this.model = config.model;

		},

		home: function() {
			render = function() {
				this.target.html("I'm working to route things :)");
			}.bind(this);
			render();

			return this;
		},

		images: function(which) {
			if (which) {
				console.log('render images from: ' + which);
			}
			render = function() {
				APP.state.set('picRollOpen', true);
			}.bind(this);
			
			render();
			return this;
		}
		
	});
})();
