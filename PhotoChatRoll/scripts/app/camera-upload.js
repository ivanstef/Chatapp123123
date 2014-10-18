document.addEventListener("deviceready", onDeviceReady, false);

function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() {
    window.localStorage.removeItem('ImageURI');
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

        id("capturePhotoButton").addEventListener("click", function () {
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
            quality: 60,
            destinationType: that._destinationType.FILE_URI,
            //allowEdit: true,
            //targetWidth: 600,
            //targetHeight: 600,
            ncodingType: Camera.EncodingType.JPEG
        });
    },

    _onPhotoURISuccess: function (imageURI) {
        var localStorage = window.localStorage;
        
        localStorage.setItem('ImageURI', imageURI);
        
        $('#capturePhotoButton').attr('src', imageURI).css();
    },

    _onFail: function (message) {
        app.showError(message);
    }
}