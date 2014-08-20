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
				else {
					this.hidePictures();
				}
			}.bind(this));

			this.model.on('change:imagesToShow', function(model, which) {
				if (this.model.get( 'imagesOpen' )) {
					this.pictureSet = which;
					this.fetchPictures(which, this.renderTemplate);
				}
			}.bind(this))
			
			return this;
		},

		fetchPictures: function(which, callback) {
			var self = this;
			console.log(this);
			$.ajax({
				url: self.url,
				data: {'collection': which},
				context: self,
				success: function(data, status) {
					self.pictures = {'images': [data] };
					
					console.log(data);

					callback().showPictures();
				}
			})

			return this;
		},

		renderTemplate: function() {
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
			console.log('hiding');
			this.$el.removeClass('shown')
					.addClass('hidden');
			// TODO hide images to make room 
			// for other content
		}
	})
})();