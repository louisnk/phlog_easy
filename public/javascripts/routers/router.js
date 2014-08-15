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

		home: function() {
			console.log(APP);
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
				this.target.html("You want images?!");
			}.bind(this);
			render();
			return this;
		}
		
	});
})();
