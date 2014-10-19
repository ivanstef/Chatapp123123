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
            rotate();
        };

        function rotate() {
            var participantsArray = app.Participants.participants();
            var count = 0;
            var max = participantsArray.length;
            if (count < max) {
                var index = 
                    setTimeout(function(){
                         var resolvedImage = app.helper.resolvePictureUrl(participantsArray[count].Image);
            
                       // $("#foundProfile").css({"backgroud-image": resolvedImage, 'background-size': 'cover'});
                        //$("#foundProfile img").attr('src', resolvedImage);
                        $("#foundProfile").closest('.km-content').css({
                            'background-image': 'url('+resolvedImage+')',
                            'background-size': 'cover'
                        });
                        
                        rotate(Number(count) + 1, max);
                        
                        if (isUserApproved && isParticipantApproved) {
                            window.localStorage.setItem('participantId', participantsArray[count].Id);
                            
                            var channelId = app.Channels.create(window.localStorage.getItem('currentParticipantId'), window.localStorage.getItem('participantId'));
                            window.localStorage.setItem('channelId', channelId);
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