/**
 * Login view model
 */

var app = app || {};

app.Login = (function () {
    'use strict';
    var loginViewModel
    var loginViewModel = (function () {

        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

        var $loginUsername;
        var $loginPassword;

        var isFacebookLogin = app.isKeySet(appSettings.facebook.appId) && app.isKeySet(appSettings.facebook.redirectUri);
        var isGoogleLogin = app.isKeySet(appSettings.google.clientId) && app.isKeySet(appSettings.google.redirectUri);
        var isLiveIdLogin = app.isKeySet(appSettings.liveId.clientId) && app.isKeySet(appSettings.liveId.redirectUri);
        var isAdfsLogin = app.isKeySet(appSettings.adfs.adfsRealm) && app.isKeySet(appSettings.adfs.adfsEndpoint);
        var isAnalytics = analytics.isAnalytics();

        var init = function () {

            if (!app.isKeySet(appSettings.everlive.apiKey)) {
                app.mobileApp.navigate('views/noApiKey.html', 'fade');
            }

            $loginUsername = $('#loginUsername');
            $loginPassword = $('#loginPassword');

            if (!isFacebookLogin) {
                $('#loginWithFacebook').addClass('disabled');
                console.log('Facebook App ID and/or Redirect URI not set. You cannot use Facebook login.');
            }
            if (!isGoogleLogin) {
                $('#loginWithGoogle').addClass('disabled');
                console.log('Google Client ID and/or Redirect URI not set. You cannot use Google login.');
            }
            if (!isLiveIdLogin) {
                $('#loginWithLiveID').addClass('disabled');
                console.log('LiveID Client ID and/or Redirect URI not set. You cannot use LiveID login.');
            }
            if (!isAdfsLogin) {
                $('#loginWithADSF').addClass('disabled');
                console.log('ADFS Realm and/or Endpoint not set. You cannot use ADFS login.');
            }
            if (!isAnalytics) {
                console.log('EQATEC product key is not set. You cannot use EQATEC Analytics service.');
            }
        };

        var show = function () {
            $loginUsername.val('');
            $loginPassword.val('');
        };        

        var showMistAlert = function () {
            alert(appSettings.messages.mistSimulatorAlert);
        };

        return {
            init: init,
            show: show,
            getYear: app.getYear,
            login: login,
            loginWithFacebook: loginWithFacebook,
            loginWithGoogle: loginWithGoogle,
            loginWithLiveID: loginWithLiveID,
            loginWithADSF: loginWithADSF
        };

    }());

    return loginViewModel;

}());
