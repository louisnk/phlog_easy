var APP = window.APP || {};

(function() {
	APP.Views = APP.Views || {};

	APP.Views.mainImageView = Backbone.View.extend({
		initialize: function(config) {
			this.template = APP.templates.images;
			this.render();

			return this;
		},

		render: function() {
			var test = {
				images: [
					{src: 'https://avatars3.githubusercontent.com/u/6484924?v=2&s=460', description: 'me'}
				]
			}

			this.$el.html(_.template(this.template, test));
			
			return this;
		}
	})
})();