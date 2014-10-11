//globally redirect to our rest api
$.ajaxPrefilter( function(options, originalOptions, jqXHR){
    options.url = "http://bartnowapi.azurewebsites.net/api" + options.url;
});
var g_Location;
(function () {
    "use strict";
    var currentLocation = "/#";
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

//MODELS

    //A Single station
    var Station = Backbone.Model.extend({
        urlRoot: '/stations'
    });

    //A collection of stations
    var Stations = Backbone.Collection.extend({
        url: '/stations'
    });

//VIEWS
    var HomeView = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){

        }
    });

    var StationView = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){

        }
    });

//END VIEWS 

//ROUTES
    //ROUTES
    var AppRouter = Backbone.Router.extend({
        routes: {
            //any request will hit this
            '*action': 'home'
        }
    });

//END ROUTES

    app.start();

})();
