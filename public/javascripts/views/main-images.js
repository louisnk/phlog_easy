var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};

	APP.Views.MainImageView = Backbone.View.extend({
		testData: {
			images: [
				{src: 'http://louisnk.com/v2/img/asia.jpg', description: 'me in asia'},
				{src: 'http://louisnk.com/v2/img/asia.jpg', description: 'me in asia'},
				{src: 'http://louisnk.com/v2/img/asia.jpg', description: 'me in asia'},
				{src: 'http://louisnk.com/v2/img/asia.jpg', description: 'me in asia'}
			]
		},

		url: '/db/getImages',

		initialize: function(config) {
			this.template = APP.templates.images;

			this.listen();

			return this;
		},

		listen: function() {
			
			this.model.on('change:imagesOpen', function(model, inUse) {
				if (inUse) { this.showPictures(this.model.get('imagesToShow')); }
				else { this.hidePictures();	}
			}.bind(this));

			this.model.on('change:imagesToShow', function(model, which) {
				if (this.model.get( 'imagesOpen' )) {
					this.fetchPictures(which).model.set('imagesLoaded', false);
				} else { } // Do nothing, because that's handled by the first listener
			}.bind(this));

			this.model.on('change:imagesLoaded', function(model, loaded) {
				if (loaded) { this.renderTemplate().showPictures(); }
				else this.hidePictures();
			}.bind(this));
			
			return this;
		},

		fetchPictures: function(which) {

			$.ajax({
				url: this.url,
				data: {'collection': which},
				context: this,
				success: function(data, status) {
					this.pictures = {'images': [data] };
					this.model.set('imagesLoaded', true);
				}
			});

			return this;
		},

		renderTemplate: function() {
			console.log('render something');
			this.view = this.template.render(this.pictures);

			return this;
		},

		showPictures: function() {

			this.$el.html(this.view)
					.removeClass('hidden')
					.addClass('shown');
			
			return this;
		},

		hidePictures: function() {

			this.$el.removeClass('shown')
					.addClass('hidden');

			return this;
		}
	})
})();