/*
 * Rollette view model
 */
var app = app || {};

app.Rollette = (function () {
    'use strict';
    
    var roletteViewModel = (function()
    {
        var show = function(){
            var current = window.localStorage.getItem('current');
            alert(JSON.stringify(current));
            if(current.Image !== null)
                $('#InitiatorProfile img').attr('src', current.Image);
        };
        
        return {
            show: show
        };
    }());
    
    return roletteViewModel;
}());