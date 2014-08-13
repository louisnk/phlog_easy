var APP = window.APP || {};

(function() {
  APP.Views = APP.Views || {};
  APP.Views.MainHeader = Backbone.View.extend({
    initialize: function() {
      // if (Modernizr.canvas) this.upgradeHeader();
    },
    upgradeHeaderTitle: function() {
      var $canvas = $('<canvas>')
        .addClass('title-canvas')
        .attr('width', '400')
        .attr('height', '80');

      // this.$el.find('h1').remove();
      this.$el.append($canvas);
    },

    upgradeHeader: function() {
      var colorThief = new ColorThief(),
          img = new Image(),
          colors = [];

      // should do this with a regex, but need to research removing last )
      // regex (/(url)\(/ ... ?) <-- will replace vvvvvv soon.
      img.src = this.model.attributes.mainBg.split('(')[1].slice(0,-1);

      img.onload = function() {
        if (img.width > 0) {
          colors = colorThief.getColor(img);
          colors.push('0.7');
          
          if ((colors[0] + colors[1] + colors[2]) / 3 > 120) {
            this.$el.addClass('inverted');
          } else this.$el.removeClass('inverted');

          this.$el.css({
            'background': 'rgba(' + colors.join(',') + ')'});
        }
      }.bind(this);

    }
  });

})();