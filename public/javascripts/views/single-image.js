var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};
	APP.Views.SingleImage = Backbone.View.extend({

		url: '/getImages',

		initialize: function(config) {
			this.listen();
			this.template = APP.templates.single;
		},

		listen: function() {
			this.model.on( 'change:imageToShow', function(model, whichImage) {
				console.log(whichImage);
				if (this.model.get( 'imagesOpen' )) {
					this.setImage(whichImage).getImage();
				} else {
					this.model.set( 'imagesOpen', true)
				}
			}.bind(this));


			return this;
		},

		setImage: function(whichImage) {
			this.imageSet = this.model.get( 'imageSetToShow' );
			this.imageID = whichImage;

			return this;
		},

		getImage: function() {
			
			$.ajax({
				url: this.url,
				data: {
					'pictureSet': this.imageSet, 
					'thumbs': false, 
					'id': this.imageID 
				},
				context: this,
				success: function(data, status) {
					this.picture = { images: data };
					this.showImage();
				}
			});

			return this;
		},

		showImage: function() {
			console.log('showing image');
			console.log(this.picture);

			return this;
		},

		hideImage: function() {


			return this;
		}

	});
})();