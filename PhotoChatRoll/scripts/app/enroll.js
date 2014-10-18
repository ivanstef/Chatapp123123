/* Enroll view model */
var app = app || {};

app.Enroll = (function () {
    'use strict';
    var enrollViewModel = (function () {

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

            var Participant = app.everlive.data('Participant');
            
            Participant.create({
                Nickname: UserName
            }, function(data){
                
                var ParticipantId = data.result.Id;
                
                app.everlive.data('AvailableParticipants').create({
                    ParticipantId: ParticipantId
                });
                
                 // Handle image upload
                var lStorage = window.localStorage;

                var imageURI = lStorage.getItem('ImageURI');
                var uploadUrl = app.everlive.Files.getUploadUrl();

                //var image = imageURI.substring(imageURI.lastIndexOf('/') + 1);

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = ParticipantId + '.jpg';
                options.mimeType = "image/jpeg";
                options.params = {Owner: ParticipantId};
                options.headers = app.everlive.buildAuthHeader();

                var ft = new FileTransfer();
                ft.upload(imageURI, uploadUrl, function (r) {
                    var responseCode = r.responseCode;

                    var res = JSON.parse(r.response);
                    var uploadedFileId = res.Result[0].Id;
                    var uploadedFileUri = res.Result[0].Uri;

                    // Set relation of the image to the user
                    app.everlive.data('Participant').updateSingle({
                        Id: ParticipantId,
                        Image: uploadedFileId
                    }, function (data) {
                       lStorage.setItem('currentImage', app.helper.resolvePictureUrl(uploadedFileId));
                        //alert('successfuly associated image with user');
                      
                        app.mobileApp.navigate('views/rollette.html');
                    }, function (error) {
                        alert("An error has occurred:" + JSON.stringify(error) + ' a1');
                    });
                    // use the Id and the Uri of the uploaded file
                }, function (error) {
                    alert("An error has occurred:" + JSON.stringify(error) + ' a1');
                }, options);
                
            }, function(error){
                alert(JSON.stringify(error));
            });
            
        };

        return {
            Intentions: intentionsDataSource,
            Distances: distanceDataSource,
            enroll: enroll
        }
    }());

    return enrollViewModel;
}());