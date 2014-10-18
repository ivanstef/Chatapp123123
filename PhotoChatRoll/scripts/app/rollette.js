/*
 * Rollette view model
 */
var app = app || {};

app.Rollette = (function () {
    'use strict';

    var roletteViewModel = (function () {
        var show = function () {
            var current = window.localStorage.getItem('currentImage');
            if (current !== null)
                $('#InitiatorProfile img').attr('src', current);
        };
        
        var init = function () {
            $('#counter_2').countdown({
                image: 'styles/images/digits.png',
                startTime: '00:05',
                timerEnd: function () {
                    alert('end!');
                },
                format: 'mm:ss'
            });
        };

        return {
            show: show,
            init: init
        };
    }());

    return roletteViewModel;
}());