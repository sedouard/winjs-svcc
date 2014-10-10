(function () {
    "use strict";

    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;
    var app = WinJS.Application;
    
    WinJS.UI.Pages.define("/pages/station/station.html", {
        ready:function(element, station){
            console.log('hello there!');
            var stationData = new WinJS.Binding.List(station.attributes.etd);
            window.StationName = station.attributes.name;
            //Another way we can declare bindable data is by creating a WinJS.Namespace
            WinJS.Namespace.define('BartNow.Station', {
                stationData : stationData,
                name : station.attributes.name
            });

            //define your page here
        }
    });

    
})();
