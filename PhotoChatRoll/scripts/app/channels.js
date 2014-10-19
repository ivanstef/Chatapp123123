/**
 * Channels view model
 */

var app = app || {};

app.Channels = (function () {
    'use strict';
    
    var channelsViewModel = (function(){
        
        var createChannel = function(initiatorId, participantId)
        {
            var channelId = null;
            
            app.everlive.data('Channels').create({
                InitiatorId: initiatorId,
                ParticipantId: participantId
            }, function(data){
                channelId = data.result.Id;
            }, function(error){
                app.showError('An error occured while trying to establish a connection between you and the person you chose to speak to. Excuse us for the inconvience.');
            });
            
            return channelId;
        };
        
        var removeChannel = function(channelId)
        {
            app.everlive.destroySingle({
                Id: channelId
            }, function(success){
                
            }, function(error){
                
            });
        };
        
        var getChannelByParticipants(initiatorId, participantId)
        {
            var filter = new Everlive.Query();
            filter.where().eq('InitiatorId', initiatorId).eq('ParticipantId', participantId);
            
            var channelId = null;
            app.everlive.data('Channels').get(filter).then(function(data){
                channelId = data.result.Id;
            }).then(function(error){    
            });
            
            return channelId;
        };
        
        return {
            create: createChannel,
            remove: removeChannel,
            getByParticipants: getChannelByParticipants
        };
    }());

    return channelsViewModel;
}());