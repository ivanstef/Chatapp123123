/**
 * Intentions view model
 */

var app = app || {};

app.Intentions = (function(){
    'use strict'
    
    var intentionsViewModel = (function () {
        
        var intentionsDataSource = [
            {
                IntentionID: 1,
                Intention: 'Meet new people'
            },
            {
                IntentionID: 2,
                Intention: 'Just pass the time'
            },
            {
                IntentionID: 3,
                Intention: 'Other'
            }
        ];
        
        return {
            intentions: intentionsDataSource
        };
        
    }());
    
    return intentionsViewModel;
}());