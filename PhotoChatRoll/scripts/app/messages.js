/**
 * Messages view model
 */

var app = app || {};

window.localStorage.setItem('channelId', '1c56e950-56fd-11e4-90ab-35bf04915830');
window.localStorage.setItem('currentParticipantId', '06dad090-56f4-11e4-8f7c-0fa55703a46a');
window.localStorage.setItem('participantId', '02818bc0-56f8-11e4-8078-ad8a3e51b7f2');

app.Messages = (function () {
    'use strict';

    app.Participants.load();

    var messagesViewModel = (function () {
        
        var loadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    var ortcClient = null,
        channel = window.localStorage.getItem('channelId');

    // Sends a message
    var send = function(Msg) {
        ortcClient.send(channel, Msg);
    };

   

    // Creates the client and the connection
    var createClient = function () {
        loadOrtcFactory(IbtRealTimeSJType, function (factory, error) {
            // Checks if we have successfuly created the factory
            if (error != null) {
                console.error(error);
            } else {
                // Creates the factory
                ortcClient = factory.createClient();
                ortcClient.setClusterUrl(appSettings.ortc.url);

                // Callback for when we're connected
                ortcClient.onConnected = function (ortc) {
                    ortcClient.subscribe(channel, true, onMessage);
                };

                ortcClient.connect(appSettings.ortc.applicationKey, appSettings.ortc.authenticationToken);
            }
        });
    };

    $(function () {
        document.addEventListener("deviceready", function () {
            var isAndroid = (navigator.userAgent.match(/Android/i)) == "Android" ? true : false;

            if (isAndroid) {
                loadScript("scripts/lib/phonegap-websocket.js", function () {
                    createClient();
                });
            } else {
                createClient();
            }
        });
        /*
        $('#sendMsg').on('click tap', function(e){
            e.preventDefault();
            alert('1');
            var Msg = {
                senderId: window.localStorage.getItem('currentParticipantId'),
                receiverId: window.localStorage.getItem('participantId'),
                msg: $('#msg').val()
            };
            
            send(JSON.stringify(Msg));
            
            $('#msg').val('');
        });*/
    });
        var sendMsg = function(){
            
            var Msg = {
                senderId: window.localStorage.getItem('currentParticipantId'),
                receiverId: window.localStorage.getItem('participantId'),
                msg: document.getElementById('Msg').value
            };
            
            send(JSON.stringify(Msg));
            document.getElementById('Msg').value = '';
        };


        var messageModel = {
            id: 'Id',
            fields: {
                Content: {
                    field: 'Content',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                ChannelId: {
                    field: 'ChannelId',
                    defaultValue: null
                },
                ReceiverId: {
                    field: 'ReceiverId',
                    defaultValue: null
                },
                SenderId: {
                    field: 'SenderId',
                    defaultValue: null
                }
            },
            CreatedAtFormatted: function () {
                return app.helper.formatDate(this.get('CreatedAt'));
            },
            Receiver: function () {

                var ReceiverId = this.get('ReceiverId');

                var receiver = $.grep(app.Participants.participants(), function (e) {
                    return e.Id === ReceiverId;
                })[0];

                return receiver ? receiver.Nickname : 'Anonymous';
            },
            Sender: function () {

                var SenderId = this.get('SenderId');

                var sender = $.grep(app.Participants.participants(), function (e) {
                    return e.Id === SenderId;
                })[0];

                return sender ? sender.Nickname : 'Anonymous';
            },
            IsInitiator: function () {
                 return this.get('SenderId') === window.localStorage.getItem('currentParticipantId');
            }
        };

        var messagesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: messageModel
            },
            transport: {
                typeName: 'Message'
            },
            serverFiltering: true,

            sort: {
                field: 'CreatedAt',
                dir: 'asc'
            },
            filter: {
                field: 'ChannelId',
                operator: 'eq',
                value: window.localStorage.getItem('channelId')
            }
        });
         // Displays a message received
        var onMessage = function (client, channel, message) {
            var msg = JSON.parse(message);
            app.everlive.data('Message').create({
                ChannelId: window.localStorage.getItem('channelId'),
                ReceiverId: msg.receiverId,
                SenderId: msg.senderId,
                Content: msg.msg
            }, function(data){
                console.log(messagesDataSource.fetch());
               // $("#msg-listview").data("kendoListView").refresh();
            }, function(error){
            });
        };
        return {
            messages: messagesDataSource,
            sendMsg: sendMsg
        };

    }());

    return messagesViewModel;

}());