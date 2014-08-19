var APP = window.APP || {};

(function(APP) {
  APP = _.extend(APP, {
    navState: new Backbone.Model({
      navOpen: false,
      navPosition: 'left',
      navType: 'link', // link, toggle, radio
      footerAvailable: false,
      footerTakeover: false,
      canvasHeader: Modernizr.canvas,
      mainBg: 'url(/images/enchanted3.jpg)'
    }),

    pageState: new Backbone.Model({
      homeView: true,
      imagesOpen: false,
      imagesToShow: 'day'
    }),

    init: function() {
      var Views = this.Views,
          viewConfig = function(selector) {
            return { el: selector, model: this.navState };
          }.bind(this),
          pageConfig = function(selector) {
            return { el : selector, model: this.pageState };
          }.bind(this);

      this.activeViews = {
        nav: new Views.NavSidebar(viewConfig('#nav-container')),
        mainContent: new Views.MainContent(viewConfig('#main-content')),
        mainHeader: new Views.MainHeader(viewConfig('#mobile-header')),
        mainFooter: new Views.MainFooter(viewConfig('#mobile-footer'))
      };

      this.availableViews = {
        home: new Views.WelcomeContent(pageConfig('#home-content')),
        images: new Views.MainImageView(pageConfig('#image-scroller'))
      };

      this.mainRouter = new APP.Routers.Main({model: this.pageState});
      Backbone.history.start();

      this.ImageCollection = new APP.Datas.ImagesCollection();
      this.bindNavAction();
      this.stopLocalLinks();
      
      // this.navState.set('footerAvailable', false);
    },

    bindNavAction: function() {
      $('.nav-toggle').bind('click touchstart', function(e) {
        e.stopPropagation();
        this.navState.set('navOpen', !this.navState.get('navOpen'));
      }.bind(this));
    }, 

    stopLocalLinks: function() {
      $('body a[href^="#/"]').bind('click touchstart', function(e) {
        e.preventDefault();

        this.mainRouter.navigate(
          $(e.target).parents('a').attr('href'), {
           trigger: true 
         });
      }.bind(this));
    }
    

  });

  $(document).ready(function() {
    APP.init();
  });

})(APP);
