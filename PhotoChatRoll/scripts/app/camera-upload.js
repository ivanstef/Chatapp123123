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
            destinationType: that._destinationType.FILE_URI
        });
    },

    _onPhotoURISuccess: function (imageURI) {
        var smallImage = document.getElementById('cameraResult');
        smallImage.style.display = 'block';

        // Show the captured photo.
        smallImage.src = imageURI;
    },

    _onFail: function (message) {
        alert(message);
    }
}