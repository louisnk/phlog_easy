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

		initialize: function(config) {
			this.template = APP.templates.images;
			
			this.templates = {
				day: this.template.render(this.testData),
				night: this.template.render(this.testData),
				abroad: this.template.render(this.testData)
			}

			this.model.on('change:imagesOpen', function(model, inUse) {
				if (inUse) { this.showPictures(this.model.get('imagesToShow')); }
				else {
					this.hidePictures();
				}
			}.bind(this));


			return this;
		},

		showPictures: function(whichPics) {
			console.log(whichPics);
			this.$el.html(this.templates[whichPics])
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