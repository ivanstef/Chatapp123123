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
            app.mobileApp.showLoading();
            
            var UserName = $('#username').val();
            var currentParticipantId = window.localStorage.getItem('currentParticipantId');
            
            if( currentParticipantId === null )
            {
                var Participant = app.everlive.data('Participant');

                Participant.create({
                    Nickname: UserName
                }, function (data) {
    
                    var ParticipantId = data.result.Id;
                    window.localStorage.setItem('currentParticipantId', ParticipantId);
    
                    app.everlive.data('AvailableParticipants').create({
                        ParticipantId: ParticipantId
                    });
    
                    // Handle image upload
                    var lStorage = window.localStorage;
    
                    var imageURI = lStorage.getItem('ImageURI');
    
                    if (imageURI == null) {
                        app.showError('You need to take a photo of yourself to continue');
                        return;
                    }
    
                    var uploadUrl = app.everlive.Files.getUploadUrl();
    
                    //var image = imageURI.substring(imageURI.lastIndexOf('/') + 1);
    
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = ParticipantId + '.jpg';
                    options.mimeType = "image/jpeg";
                    options.params = {
                        Owner: ParticipantId
                    };
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
                            alert("An error has occurred:" + JSON.stringify(error));
                        });
                        // use the Id and the Uri of the uploaded file
                    }, function (error) {
                        alert("An error has occurred:" + JSON.stringify(error));
                    }, options);
    
                }, function (error) {
                    alert(JSON.stringify(error));
                });
            }
            
            // If we have a participant, update his/her info
            if( currentParticipantId !== null )
            {
                app.everlive.data('Participant').updateSingle({
                    Id: currentParticipantId,
                    Nickname: UserName
                }, function(data){
                    
                }, function(error){
                    
                });
                
                // if the current participant is not present in the AvailableParticipants, add him/her
                var filter = new app.everlive.Query();
                filter.where().eq('ParticipantId', currentParticipantId);
                app.everlive.data('AvailableParticipants').get(filter).then(function(data){
                    if(data.result.length > 0)
                        return;
                    
                    app.everlive.data('AvailableParticipants').create({
                        ParticipantId: currentParticipantId
                    }, function(data){
                    }, function(error){
                    });
                    
                }, function(error){
                });
            }
            
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/rollette.html');
        };

        return {
            Intentions: intentionsDataSource,
            Distances: distanceDataSource,
            enroll: enroll
        }
    }());

    return enrollViewModel;
}());