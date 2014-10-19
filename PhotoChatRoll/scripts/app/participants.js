/* Participants model */
var app = app || {};

app.Participants = (function () {
    'use strict';

    var participantsModel = (function () {

        var participantsData;
        var availableParticipants;

        // Retrieve current user and all users data from Backend Services
        var loadParticipants = function () {

            // Get the data about the currently logged in user
            return app.everlive.data('Participant').get()
            .then(function (data) {
                participantsData = new kendo.data.ObservableArray(data.result);
                // Get the data about all registered users
                return app.everlive.data('AvailableParticipants').get();
            })
            .then(function (data) {
                availableParticipants = new kendo.data.ObservableArray(data.result);
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );
        };

        function isEligable(participantId) {
            var eligable = true;

            var part = null;

            var participantObj = app.everlive.data('Participant').get()
            .then(function (data) {
                part = data.result;
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  });

            //check if DECLINED
            for (object in participantObj.Declined) {
                var declinedUsers = array();
                declinedUsers = object.DeclinedUsers;
                if (declinedUsers.indexOf(participantId) === -1) {
                    eligable = false;
                }
            }

            //check if MET
            for (object in participantObj.Met) {
                var metUsers = array();
                metUsers = object.MetUsers;
                if (metUsers.indexOf(participantId) === -1) {
                    eligable = false;
                }
            }

            return eligable;
        }

        function markAsDeclined(participantId) {
            // Mark chat participant as declined for participant in database

            var participantObj = app.everlive.data('Participant').get();
            for (participant in participantObj.Declined) {
                var parsedParticipant = JSON.parse(participant);
                var arrayDeclinedUsers = array();

                for (declinedUser in parsedParticipant.declinedUsers) {
                    arrayDeclinedUsers.push(declinedUser);
                }

                if (arrayDeclinedUsers.indexOf(participantId) === -1) {
                    arrayDeclinedUsers.push(participantId);
                }
            }
            var encoded = JSON.encode(arrayDeclinedUsers);
            app.everlive.data('Participant').updateSingle({ Id: participantId, DeclinedUsers: encoded },
            function (data) {
                alert(JSON.stringify(encoded));
            },
            function (error) {
                alert("Shit happened over here.")
            });
        }

        function markAsMet(participantId) {
            // Mark participant as met

            var participantObj = app.everlive.data('Participant').get();
            alert(participantObj);
            for (participant in participantObj.Met) {
                alert(participant);
                var parsedParticipant = JSON.parse(participant);
                var arrayMetUsers = array();

                for (metUser in parsedParticipant.metUsers) {
                    arrayMetUsers.push(metUser);
                }

                if (arrayMetUsers.indexOf(participantId) === -1) {
                    arrayMetUsers.push(participantId);
                }
                var encoded = JSON.encode(arrayDeclinedUsers);
                app.everlive.data('Participant').updateSingle({ Id: participantId, MetUsers: encoded },
                function (data) {
                    alert(JSON.stringify(encoded));
                },
                function (error) {
                    alert("Shit happened over here.")
                });
            }
        }

        function rolletteMatch() {
            app.everlive.data('AvailableParticipants').get()
                .then(function (data) {
                    var partArray = array();
                    for (row in data.result) {
                        partArray.push(row.ParticipantID);
                    }
                    for (var i = 0; i < partArray.length; i + 2) {
                        if (user[i].isEligable(partArray[i])) {
                            markAsMet(partArray[i]);
                            //Check both things triggere
                        }
                    }

                    //success
                })
                .then(function (error) {
                    //error
                });
        }

        return {
            load: loadParticipants,
            participants: function () {
                return participantsData;
            },
            availableParticipants: function () {
                return availableParticipants;
            }
        };

    }());

    return participantsModel;

}());
