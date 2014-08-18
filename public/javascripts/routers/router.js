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
		
			this.setActiveView( 'homeView' );

			return this;

		},

		images: function(whichSet) {

			if (this.model.get( 'imagesOpen' )) {
				this.setImagesToShow(whichSet);
			} else {
				this.setActiveView( 'imagesOpen' );
			}

			return this;
		},

		setActiveView: function(activePage) {

			_.each(this.model.attributes, function(truthy, page) {
				if (page !== activePage) { this.model.set(page, false); }
				else { this.model.set(page, true); }

			}.bind(this));


			return this;
		},

		setImagesToShow: function(whichSet) {			
			this.model.set('imagesToShow', whichSet);
			return this;
		}
		
	});
})();
