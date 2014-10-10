//globally redirect to our rest api
$.ajaxPrefilter( function(options, originalOptions, jqXHR){
    options.url = "http://bartnowapi.azurewebsites.net/api" + options.url;
});
var g_Location;
(function () {
    "use strict";
    var currentLocation = "";
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
            var that = this;
        
            var HomePage = WinJS.UI.Pages.get('/pages/home/home.html');

            //Load up stations from server

            var stations = new Stations();

            stations.fetch({
                data: g_Location,
                success: function(){
                    
                    $("#progressSymbol").hide();
                }
            });
            that.$el[0].innerHTML ="";
            var hp = new HomePage(that.el, stations);
            hp.element.style.width = "100%";
            hp.element.style.height = "100%";

            return this;
        }
    });

    var StationView = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            var that = this;
            
            var StationPage = WinJS.UI.Pages.get('/pages/station/station.html');

            //Load up stations from server

            var station = new Station({
                id: this.id
            });

            station.fetch({
                success: function(){

                    //show pivot view for this station
                    ///render this view after we've loaded the data since the user already has
                    //useful data in front of them
                    that.$el[0].innerHTML ="";
                    var hp = new StationPage(that.el, station);
                    hp.element.style.width = "100%";
                    hp.element.style.height = "100%";
                    
                }
            });
            
            
            

            return this;
        }
    });

//END VIEWS 

//ROUTES
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            //:id will the station abbrevation
            'station/:id': 'station'
        }
    });

    //create the router
    var router = new AppRouter();

    //create the event handlers for the router
    router.on('route:home', function(){
        //create a new home view and place it into the contenthost
        currentLocation = "";
        var home_view = new HomeView({ el: $("#contenthost") });
    });

    router.on('route:station', function(id){
        console.log('Station route hit');
        currentLocation = "station/" + id;
        var station_view = new StationView({ el: $("#contenthost"), id: id });
    });

//END ROUTES

// BEGIN WINJS INIT

    app.addEventListener("ready", function (args) {

        //We need the current location of device.
        //if we can't do it the app will just alert
        if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){

                    g_Location = position.coords;

                    ui.processAll().then(function() {
                        
                    $("#homeButton").click(function(evt){
                        router.navigate("", {trigger: true, replace: true});
                    });

                    $("#refreshButton").click(function(evt){
                        // need to null out Backbone.history.fragement because 
                        // navigate method will ignore when it is the same as newFragment
                        Backbone.history.fragment = null;
                        router.navigate(currentLocation, {trigger: true, replace: true});
                    });

                    }).then(function(){
                        return sched.requestDrain(sched.Priority.aboveNormal + 1);
                    }).then(function(){
                        ui.enableAnimations();

                        //Necessary for bookmarkable URLS
                        Backbone.history.start();
                    });
                }, function(error) {
                    alert(error);
                }
            );
        }
        else{
            alert('Could not get your location. BartNOW Requires your location to work');
        }
        
    });
    app.start();

})();
