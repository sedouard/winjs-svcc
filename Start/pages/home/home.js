(function () {
    "use strict";

    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;
    var app = WinJS.Application;
    var map;

    window.Stations = new WinJS.Binding.List([]);

    var addStationToMap = function (model) {
        var stationLoc = new Microsoft.Maps.Location(model.attributes.latitude, model.attributes.longitude)

        var descriptionString = "";

        if (model.attributes.etd[0].formattedArrivals) {
            descriptionString += model.attributes.etd[0].formattedArrivals;
        }

        if (model.attributes.etd[1].formattedArrivals) {
            descriptionString += '\n' + model.attributes.etd[1].formattedArrivals;
        }

        if (model.attributes.etd[2].formattedArrivals) {
            descriptionString += '\n' + model.attributes.etd[2].formattedArrivals;
        }

        var infoOptions = {
            title: model.attributes.name,
            width: 200,
            height: 100,
            description: descriptionString
        };
        var pinInfobox = new Microsoft.Maps.Infobox(stationLoc, infoOptions);
        var stationPin = new Microsoft.Maps.Pushpin(stationLoc, { infobox: pinInfobox, icon: '/images/bartIcon20x20.png', width: 20, height: 20 });
        map.entities.push(pinInfobox);
        map.entities.push(stationPin);
    }

    var addStationToList = function (model) {
        //our view model requires at least 2 estimations with formatted arrivals.
        //0 to 3 blank entries


        if (model.attributes.etd) {
            var blankCount = 3 - model.attributes.etd.length;
            for (var z = 0; z < blankCount; z++) {

                model.attributes.etd.push({
                    formattedArrivals: ""
                });
            }
        }
        else {
            model.attributes.etd = [];
            for (var z = 0; z < 3; z++) {
                model.attributes.etd.push({
                    formattedArrivals: ""
                });
            }
        }
        window.Stations.push(model);
    }
   
    WinJS.UI.Pages.define("/pages/home/home.html", {
        init: function(){
            
        },
        ready:function(element, stations){

            console.log('homeapge loaded!');
            //Define Home page here

            
        }
    });

    
})();
