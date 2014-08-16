var APP = window.APP || {};

(function() {
	APP.Routers = APP.Routers || {};
	APP.Routers.Main = Backbone.Router.extend({
		routes: {
			'': 'home',
			'images/:whichSet': 'images',
			'bio': 'about'
		},

		initialize: function(config) {
			this.model = config.model;
		},

		home: function() {
		
			this.render('homeView');

			return this;

		},

		images: function(whichSet) {
			if (whichSet) {
				console.log('load images from: ' + whichSet);
			}

			console.log(this.model);

			this.render('imagesOpen', whichSet);
			return this;
		},

		render: function(whichPage, whichSet) {

			_.each(this.model.attributes, function(truthy, page) {
				if (page !== whichPage)
					this.model.set(page, false);
				else 
					this.model.set(page, true);
			}.bind(this));

			this.model.set('imagesToShow', whichSet);

			return this;
		}
		
	});
})();
