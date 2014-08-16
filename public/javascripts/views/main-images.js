var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};

	APP.Views.MainImageView = Backbone.View.extend({
		initialize: function(config) {
			this.template = APP.templates.images;
			
			this.model.on('change:picRollOpen', function(model, inUse) {
				if (inUse) { this.showPictures(); }
				else {
					this.hidePictures();
				}
			}.bind(this));



			return this;
		},

		showPictures: function() {
			var test = {
				images: [
					{src: 'http://louisnk.com/v2/img/asia.jpg', description: 'me in asia'}
				]
			}

			this.$el.html(this.template.render(test));
			
			return this;
		},

		hidePictures: function() {
			this.$el.empty();
		}
	})
})();