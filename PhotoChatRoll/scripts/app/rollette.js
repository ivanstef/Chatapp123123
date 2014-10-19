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
        var resolvedImage = false;
        var show = function () {
            rotate();
        };

        function rotate() {
            var participantsArray = app.Participants.participants();
            var count = 0;
            var max = participantsArray.length;
            if (count < max) {
                setTimeout(function () {

                    //for (participant in participantsArray) {
                    //}
                    resolvedImage = app.helper.resolvePictureUrl(participantsArray[count].Image);
                    $("#approveRollette a").data("participantId", participantsArray[count].Id);

                    //$("#foundProfile img").attr("src", resolvedImages);
                    $("#foundProfile").closest('.km-content').css({
                        'background-image': 'url(' + resolvedImage + ')',
                        'background-size': 'cover'
                    });
                    rotate(Number(count) + 1, max)



                }, 5000);
            }
        }

        var approveParticipant = function () {
            var participantId = $("#approveRollette a").data("participantId");
            var channelId = app.Channels.getByParticipants(participantId, getItem("currentParticipantId"));

            var intitiatorConfirm = false;
            var participantConfirm = false;

            if (channelId == null) {
                
                window.localStorage.setItem('participantId', participantId);
                var channelId = app.Channels.create(
                    window.localStorage.getItem('currentParticipantId'),
                    window.localStorage.getItem('participantId')
                );

                app.mobileApp.navigate('views/chat.html');
            }
            window.localStorage.setItem('channelId', channelId);


            isUserApproved = true;
            //app.Participants.markAsMet();
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