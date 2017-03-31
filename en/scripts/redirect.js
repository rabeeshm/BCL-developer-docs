var BCLS_REDIRECT = (function(window, document) {
    var thisURL = window.location.href,
        newURL  = thisURL.replace('/video-cloud/', '/player/'),
        body = document.getElementsByTagName('body')[0];

        body.insertAdjacentHTML('afterbegin', '<h1 style="color:#990000;text-align:right;">This page has moved...You will be redirected in 3 seconds...</h1>');
        redirect();

        function redirect() {
            var t;
            t = window.setTimeout(go, 3000);
        }

        function go() {
            window.location.href = newURL;
        }
})(window, document);
