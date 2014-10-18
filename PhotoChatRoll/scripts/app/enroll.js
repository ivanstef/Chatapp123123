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

            var UserName = $('#username').val();

            var Users = app.everlive.Users;
            var AvailableUsers = app.everlive.data('AvailableUsers');

            Users.register(UserName, 'pass', {},
                function (data) {

                    var UserId = data.result.Id;

                    app.everlive.Users.login(UserName,
                        'pass',
                        function (data) {
                            alert(JSON.stringify(data));
                        },
                        function (error) {
                            alert(JSON.stringify(error));
                        });

                    // Add the newly created user to the waiting list
                    AvailableUsers.create({
                        UserId: UserId
                    });

                    // Handle image upload
                    var lStorage = window.localStorage;

                    var imageURI = lStorage.getItem('ImageURI');
                    var uploadUrl = app.everlive.Files.getUploadUrl();

                    var image = imageURI.substring(imageURI.lastIndexOf('/') + 1);

                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = image;
                    options.mimeType = "image/jpeg";
                    options.params = {Owner: UserId};
                    options.headers = app.everlive.buildAuthHeader();

                    var ft = new FileTransfer();
                    ft.upload(imageURI, uploadUrl, function (r) {
                        var responseCode = r.responseCode;

                        var res = JSON.parse(r.response);
                        var uploadedFileId = res.Result[0].Id;
                        var uploadedFileUri = res.Result[0].Uri;

                        // Set relation of the image to the user
                        app.everlive.Users.updateSingle({
                            Id: UserId,
                            Picture: uploadedFileId
                        }, function (data) {
                            alert('successfuly associated image with user');
                            lStorage.removeItem('ImageURI');
                        }, function (error) {
                            alert("An error has occurred:" + JSON.stringify(error) + ' a1');
                        });
                        // use the Id and the Uri of the uploaded file 
                    }, function (error) {
                        alert("An error has occurred:" + JSON.stringify(error) + ' a1');
                    }, options);
                }, function (error) {
                    app.showError(error);
                });

            AvailableUsers.create({

            });

            app.mobileApp.navigate('views/rollette.html');
        };


        return {
            Intentions: intentionsDataSource,
            name: nameDataSource,
            // cameraUpload: cameraUploadsDataSource,
            Distances: distanceDataSource,
            enroll: enroll
        }
    }());

    return enrollViewModel;
}());