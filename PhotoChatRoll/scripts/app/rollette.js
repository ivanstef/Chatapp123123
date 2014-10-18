/*
 * Rollette view model
 */
var app = app || {};

app.Rollette = (function () {
    'use strict';
    
    var roletteViewModel = (function()
    {
        var show = function(){
            var current = window.localStorage.getItem('currentImage');
            if(current !== null)
                $('#InitiatorProfile img').attr('src', current);
        };
        
        return {
            show: show
        };
    }());
    
    return roletteViewModel;
}());