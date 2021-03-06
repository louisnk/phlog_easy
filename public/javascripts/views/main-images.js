var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};

	APP.Views.MainImageView = Backbone.View.extend({
		
		url: '/getImages',

		initialize: function(config) {
			this.template = APP.templates.images,

			this.listen();

			return this;
		},

		listen: function() {
			
			this.model.on('change:imagesOpen', function(model, inUse) {
				if (inUse) { 
					this.fetchPictures(this.model.get('imageSetToShow'))
							.model.set('imagesLoaded', false);
				}
				else { this.hidePictures();	}
			}.bind(this));

			this.model.on('change:imageSetToShow', function(model, whichSet) {
				if (this.model.get( 'imagesOpen' )) {
					this.fetchPictures(whichSet).model.set('imagesLoaded', false);
				} else { this.hidePictures(); } 
			}.bind(this));

			this.model.on('change:imagesLoaded', function(model, loaded) {
				if (loaded) { this.renderTemplate().showPictures(); }
				else this.hidePictures();
			}.bind(this));		
			
			return this;
		},

		fetchPictures: function(whichSet) {
			
			$.ajax({
				url: this.url,
				data: {
					'pictureSet': whichSet,
					'thumbs': true
				},
				context: this,
				success: function(data, status) {

					this.pictures = { images: data };
					this.model.set('imagesLoaded', true);
				}
			});

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

			this.$el.removeClass('shown')
					.addClass('hidden');

			return this;
		},

		setImageToShow: function(e) {
			e.preventDefault();

			console.log($(e.delegateTarget));
			
		}
	})
})();