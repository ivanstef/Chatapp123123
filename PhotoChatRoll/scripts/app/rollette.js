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
            rotate(1);
        };

        function rotate(count) {
            var participantsArray = app.Participants.participants();
            var max = participantsArray.length;
            if (count < max) {
                setTimeout(function () {

                    //for (participant in participantsArray) {
                    //}
                    var resolvedImage = app.helper.resolvePictureUrl(participantsArray[count].Image);

                   // $("#foundProfile").css({"backgroud-image": resolvedImage, 'background-size': 'cover'});
                    //$("#foundProfile img").attr('src', resolvedImage);
                    $('.km-content').css({
                        'background-image': 'url('+resolvedImage+')',
                        'background-size': 'cover'
                    });
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