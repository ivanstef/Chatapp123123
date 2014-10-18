/**
 * Participants model
 */

var app = app || {};

app.Participants = (function () {
    'use strict';

    var participantsModel = (function () {

        var participantsData;

        // Retrieve current user and all users data from Backend Services
        var loadParticipants = function () {

            // Get the data about the currently logged in user
            return app.everlive.Users.currentUser()
            .then(function (data) {
          
                // Get the data about all registered users
                return app.everlive.Users.get();
            })
            .then(function (data) {

                participantsData = new kendo.data.ObservableArray(data.result);
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
        };

        return {
            load: loadParticipants,
            participants: function () {
                return participantsData;
            }
        };

    }());

    return participantsModel;

}());
