document.addEventListener("deviceready", onDeviceReady, false);

function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() {
    cameraApp = new cameraApp();
    cameraApp.run();

    navigator.splashscreen.hide();
}



function cameraApp() {}

cameraApp.prototype = {
    _pictureSource: null,

    _destinationType: null,

    run: function () {
        var that = this;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;

        $("#capturePhotoButton").on("click", function () {
            that._capturePhoto.apply(that, arguments);
        });

    },

    _capturePhoto: function () {
        var that = this;

        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function () {
            that._onPhotoURISuccess.apply(that, arguments);
        }, function () {
            that._onFail.apply(that, arguments);
        }, {
            quality: 70,
            destinationType: that._destinationType.FILE_URI,
            allowEdit: true,
            targetWidth: 600,
            targetHeight: 600,
            ncodingType: Camera.EncodingType.JPEG
        });
    },

    _onPhotoURISuccess: function (imageURI) {
        //var smallImage = document.getElementById('capturePhotoButton');
        //smallImage.style.display = 'block';

        // Show the captured photo.
        //smallImage.src = imageURI;
        
        var localStorage = window.localStorage;
        
        localStorage.setItem('ImageURI', imageURI);
        
        $('#capturePhotoButton').attr('src', imageURI).css({width:200,height:200});
    },

    _onFail: function (message) {
        app.showError(message);
    }
}