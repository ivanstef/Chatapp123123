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
        
        var activeChannels = function () {
            var dataSource = new kendo.data.DataSource({
                type: 'everlive',
                transport: {
                    typeName: 'Channels'
                },
                schema: {
                    model: {
                        id: Everlive.idField
                    }
                },
                serverFiltering: true,
                filter: {
                    field: 'ParticipantId',
                    operator: 'eq',
                    value: (window.localStorage.getItem('currentParticipantId')).trim()
                }
            });
           
            return dataSource;
        };

        var data;
        function rotate() {
            
            activeChannels().fetch(function(){
                data = this.data();
            });
            
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
            $("#approveRollette a").attr('disabled', true).css('color', 'green');
            
            var participantId = $("#approveRollette a").data("participantId");
            var channelId = app.Channels.getByParticipants(participantId, window.localStorage.getItem("currentParticipantId"));
                                                           
            var intitiatorConfirm = false;
            var participantConfirm = false;

            if (channelId == null) {

                window.localStorage.setItem('participantId', participantId);
                var channelId = app.Channels.create(
                    window.localStorage.getItem('currentParticipantId'),
                    window.localStorage.getItem('participantId')
                );

            }
            window.localStorage.setItem('channelId', channelId);
            app.mobileApp.navigate('views/chat.html');

            isUserApproved = true;
            //app.Participants.markAsMet();
        };

        var init = function () {
            for (var i = 0; i < 10; i++) {
                var effect = kendo.fx("#container").flipHorizontal($("#library"), $("#store")).duration(200);
                effect.play();
            }
        };
        var show = function () {
            rotate();
        };
        return {
            show: show,
            init: init,
            approveParticipant: approveParticipant
        };
    }());

    return roletteViewModel;
}());