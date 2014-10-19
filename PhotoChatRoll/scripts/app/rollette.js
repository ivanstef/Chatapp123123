/*
 * Rollette view model
 */
var app = app || {};

app.Rollette = (function () {
    'use strict';

    var isUserApproved = false;
    var isParticipantApproved = false;
    var roletteViewModel = (function () {
        var show = function () {
            var current = window.localStorage.getItem('currentImage');
            if (current !== null)
                $('#InitiatorProfile img').attr('src', current);
            rotate(1, 10);
        };

        function rotate(count, max) {
            if (count < max) {
                setTimeout(function () {
                    $("#foundProfile img").attr("src", "styles/images/faces/" + count + ".jpg");
                    rotate(Number(count) + 1, max)
                    if (isUserApproved && isParticipantApproved) {
                        app.
                        app.mobileApp.navigate('views/chat.html');
                    }
                }, 5000);
            }
        }

        function approveParticipant(e) {

        }

        var init = function () {
            for (var i = 0; i < 10; i++) {
                var effect = kendo.fx("#container").flipHorizontal($("#library"), $("#store")).duration(200);
                effect.play();
            }
        };
        return {
            show: show,
            init: init
        };
    }());

    return roletteViewModel;
}());