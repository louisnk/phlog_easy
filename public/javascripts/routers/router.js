var APP = window.APP || {};

(function() {
	APP.Routers = APP.Routers || {};
	APP.Routers.Main = Backbone.Router.extend({
		routes: {
			'': 'home',
			'images/:which': 'images',
			'bio': 'about'
		},

		initialize: function(config) {
			this.model = config.model;

		},

		home: function() {
		
			this.render('homeView');

			return this;

		},

		images: function(which) {
			if (which) {
				console.log('load images from: ' + which);
			}
			this.render('imagesOpen');
			return this;
		},

		render: function(whichPage) {
			_.each(APP.pageState.attributes, function(truthy, page) {
				if (page !== whichPage)
					this.set(page, false);
				else 
					this.set(page, true);
			}.bind(APP.pageState));

			return this;
		}
		
	});
})();
