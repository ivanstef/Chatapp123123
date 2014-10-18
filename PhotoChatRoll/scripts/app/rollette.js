/*
 * Rollette view model
 */
var app = app || {};

app.Rollette = (function () {
    'use strict';

    var roletteViewModel = (function () {
            var show = function () {
                var currentUser = app.Users.currentUser;
                alert(JSON.stringify(currentUser));
                if (currentUser.data !== null)
                    $('#InitiatorProfile img').attr('src', currentUser.data.Picture);
            };

            var init = function () {
                $('#counter_2').countdown({
                    image: '../../styles/images/digits.png',
                    startTime: '00:05',
                    timerEnd: function () {
                        alert('end!');
                    },
                    format: 'mm:ss'
                });
            });
    }

    return {
        show: show,
        init: init
    };
}());

return roletteViewModel;
}());