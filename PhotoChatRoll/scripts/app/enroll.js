/* Enroll view model */
var app = app || {};

app.Enroll = (function () {
    'use strict';
    var enrollViewModel = (function () {

        var nameDataSource = (function () {
            var name = $('#loginUsername').val();


        });

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

        var distanceDataSource = [
            {
                DistanceID: 1,
                Distance: '10 km'
            },
            {
                DistanceID: 2,
                Distance: '50 km'
            },
            {
                DistanceID: 3,
                Distance: '100 km'
            },
            {
                DistanceID: 4,
                Distance: '200 km'
            }
        ];

        var enroll = function () {
            app.mobileApp.navigate('views/rollette.html');
        };


        return {
            intentions: intentionsDataSource,
            name: nameDataSource,
            cameraUpload: cameraUploadsDataSource,
            distances: distancesDataSource,
            enroll: enroll
        }
    }());
    return enrollViewModel;
}());