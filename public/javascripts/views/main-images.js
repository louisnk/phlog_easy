var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};

	APP.Views.MainImageView = Backbone.View.extend({
		initialize: function(config) {
			this.template = APP.templates.images;
			
			this.model.on('change:picRollOpen', function(model, inUse) {
				if (inUse) { this.render(); }
			}.bind(this));

			return this;
		},

		render: function() {
			var test = {
				images: [
					{src: 'https://avatars3.githubusercontent.com/u/6484924?v=2&s=460', description: 'me'},
					{src: 'http://louisnk.com/v2/img/asia.jpg', description: 'me in asia'}
				]
			}

			this.$el.html(this.template.render(test));
			
			return this;
		},

		hidePicNRoll: function() {
			console.log('I should go away now');
		}
	})
})();