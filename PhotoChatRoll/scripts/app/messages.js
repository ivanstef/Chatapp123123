/**
 * Messages view model
 */

var app = app || {};

app.Messages = (function () {
    'use strict'

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
