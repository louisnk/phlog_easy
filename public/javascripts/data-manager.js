var APP = window.APP || {};

// console.log(APP);
(function() {
  APP.Datas = APP.Datas || {};

  APP.Datas.modelCitizen = Backbone.Model.extend({
    initialize: function() {
      this.on('all', function(e) { console.log('an event fired ----' + e)})
    },

    defaults: {
      src: 'http://louisnk.com/v2/imagse/asia.jpg',
      title: 'A photo of me in Asia,'
    }
  });


  APP.Datas.ImagesCollection = Backbone.Collection.extend({
    url: '/db/getImages',
    initialize: function(e) {
      console.log("I'm ready...");
      this.on('all', function(e) { console.log('colection event ---- ' + e)});
    },
    
    model: APP.Datas.modelCitizens

  });



})();