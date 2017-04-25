var BCLS_REDIRECT = (function(window, document) {
    var thisURL = window.location.href,
        newURL  = thisURL.replace('/docs.brightcove.com/en/video-cloud/mobile-sdks/brightcove-player-sdk-for-ios/reference/current/', '/brightcovelearning.github.io/Brightcove-API-References/ios-sdk/'),
        content = document.getElementById('content');
        console.log("get element ",document.getElementById('content'));

        content.insertAdjacentHTML('afterbegin', '<h1 style="color:#990000;text-align:left;font-weight:bold;">This page has moved...You will be redirected in 3 seconds...</h1>');
        redirect();

        function redirect() {
            var t;
            t = window.setTimeout(go, 3000);
        }

        function go() {
            window.location.href = newURL;
        }
})(window, document);
