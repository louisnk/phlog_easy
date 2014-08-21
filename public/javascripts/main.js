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
      imagesToShow: 'day',
      imagesLoaded: false
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
      // Backbone.history = Backbone.history || new Backbone.history(); 
      Backbone.history.start({pushState: true});

      this.bindNavAction().stopLocalLinks().checkEntryPoint();
      
      // this.navState.set('footerAvailable', false);
    },

    bindNavAction: function() {
      $('.nav-toggle').bind('click touchstart', function(e) {
        e.stopPropagation();
        this.navState.set('navOpen', !this.navState.get('navOpen'));
      }.bind(this));
      return this;
    }, 

    stopLocalLinks: function() {
      $('body a[href^="/"]').bind('click touchstart', function(e) {
        e.preventDefault();

        this.mainRouter.navigate(
          $(e.target).parents('a').attr('href'), {
           trigger: true 
         });
      }.bind(this));
      return this;
    },

    checkEntryPoint: function() {
      if (window.location.pathname !== '/') {
        console.log(window.location.pathname);
        this.mainRouter.navigate(window.location.pathname, { trigger: true });
      }

      return this;
    }
    

  });

  $(document).ready(function() {
    APP.init();
  });

})(APP);
