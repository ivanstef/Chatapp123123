/**
 * Messages view model
 */

var app = app || {};

app.Messages = (function () {
    'use strict';
    
    var loadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    
    var ortcClient = null,
        channel = 'YOUR_CHANNEL';
    
     // Sends a message
        function send() {
            var message = document.getElementById('txtMessage').value;
            ortcClient.send(channel, message);
        };

        // Displays a message received
        var onMessage = function (client, channel, message) {
        };

        // Creates the client and the connection
        var createClient = function () {
            loadOrtcFactory(IbtRealTimeSJType, function (factory, error) {
                // Checks if we have successfuly created the factory
                if (error != null) {
                    console.error(error);
                }
                else {
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

                if(isAndroid){
                    loadScript("scripts/lib/phonegap-websocket.js",function(){
                        createClient();
                    });
                }else{
                    createClient();
                }
            });
        });

    var messagesViewModel = (function () {
        
        var messageModel = {
            id: 'Id',
            fields: {
                Msg: {
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
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#msg-listview').kendoMobileListView({
                        dataSource: e.items,
                        template: kendo.template($('#msgTemplate').html())
                    });
                } else {
                    $('#msg-listview').empty();
                }
            },
            sort: { field: 'CreatedAt', dir: 'asc' }
        });
        
        return {
            messages: messagesDataSource
        };
        
    }());
    
    return messagesViewModel;

}());
