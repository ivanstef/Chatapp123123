/*
 * Rollette view model
 */
var app = app || {};

app.Rollette = (function () {
    'use strict';
    
    var roletteViewModel = (function()
    {
        var show = function(){
            var currentUser = app.Users.currentUser;
            alert(JSON.stringify(currentUser));
            if(currentUser.data !== null)
                $('#InitiatorProfile img').attr('src', currentUser.data.Picture);
        };
        
        return {
            show: show
        };
    }());
    
    return roletteViewModel;
}());