(function () {
    "use strict";

    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;
    var app = WinJS.Application;
    var map;

    window.Stations = new WinJS.Binding.List([]);

   
    WinJS.UI.Pages.define("/pages/home/home.html", {
        init: function(){
            
        },
        ready:function(element, stations){

            console.log('home page loaded!');
            //Define Home page here

            
        }
    });

    
})();
