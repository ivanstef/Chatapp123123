/*
 * Rollette view model
 */
var app = app || {};

app.Rollette = (function () {
    'use strict';
    app.Participants.load();

    var roletteViewModel = (function () {
        var isUserApproved = false;
        var isParticipantApproved = false;

        var show = function () {
            var participantsArray = app.Participants.participants();

            var current = window.localStorage.getItem('currentImage');
            if (current !== null)
                $('#InitiatorProfile img').attr('src', current);
            rotate(0, participantsArray.length);
        };

        function rotate(count, max) {
            var participantsArray = app.Participants.participants();
            if (count < max) {
                setTimeout(function () {

                    //for (participant in participantsArray) {
                    //}
                    var resolvedImages = app.helper.resolvePictureUrl(participantsArray[count].Image);

                    $("#foundProfile img").attr("src", resolvedImages);
                    rotate(Number(count) + 1, max)
                    if (isUserApproved && isParticipantApproved) {
                        app.mobileApp.navigate('views/chat.html');
                    }
                }, 2000);
            }
        }

        var approveParticipant = function () {
            isUserApproved = true;
            app.Participants.markAsMet();
        };

        var init = function () {
            for (var i = 0; i < 10; i++) {
                var effect = kendo.fx("#container").flipHorizontal($("#library"), $("#store")).duration(200);
                effect.play();
            }
        };
        return {
            show: show,
            init: init,
            approveParticipant: approveParticipant
        };
    }());

    return roletteViewModel;
}());