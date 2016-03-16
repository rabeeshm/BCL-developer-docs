<<<<<<< HEAD
videojs.plugin('logo-overlay', function(options) {
=======
videojs.plugin('logoOverlay', function(options) {
>>>>>>> origin/master
    var player = this,
        overlayOptions,
        overlayContent,
        defaultOptions = {
            align: 'bottom-right',
            imageURL : '//docs.brightcove.com/en/video-cloud/brightcove-player/samples/assets/logo-overlay-plugin/bc-logo.png',
<<<<<<< HEAD
            clickThruURL: '//docs.brightcove.com/en/index.html',
            start: 'loadstart',
            end: 'ended'
        };

    function endOverlay() {
        if (isDefined(parseInt(overlayOptions.end)) && myPlayer.currentTime() >= overlayOptions.end) {
=======
            clickThruURL: '',
            start: 'loadstart',
            end: 'ended'
        };
    // console.log('options', options);
    function endOverlay() {
        if (isDefined(parseInt(overlayOptions.end)) && player.currentTime() >= overlayOptions.end) {
>>>>>>> origin/master
            player.off('timeupdate', endOverlay);
            document.getElementsByClassName('vjs-overlay')[0].className += ' bcls-hide-overlay';
        }
    }

    function showOverlay(startValue) {
<<<<<<< HEAD
=======
        // console.log('in show overlay');
>>>>>>> origin/master
        // add the overlay
        player.overlay(
            {
                content: overlayContent,
                overlays: [
                    {
                        start: startValue,
                        align: overlayOptions.align
                    }
                ]
            }
        );
        // handler for timeupdate events
        player.on('timeupdate', endOverlay);
    }

    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {*} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    function isDefined(x) {
        if ( x === '' || x === null || x === undefined || x === NaN) {
            return false;
        }
        return true;
    }

    /**
     * populates a settings object from inputs or default values
     * @param {Object} inputOptions the input values
     * @param {Object} defaultOptions the default values
     * @return {Object} the settings object
     */
    function setOptions (inputOptions, defaultOptions) {
        var prop, settings = {};
        for (prop in defaultOptions) {
            if (defaultOptions.hasOwnProperty(prop)) {
                settings[prop] = (inputOptions.hasOwnProperty(prop)) ? inputOptions[prop] : defaultOptions[prop];
            }
        }
        return settings;
    }
<<<<<<< HEAD
    // override default settings with optoins
    overlayOptions = setOptions(options, defaultOptions);

=======
    // override default settings with options
    overlayOptions = setOptions(options, defaultOptions);
    // console.log('overlayOptions', overlayOptions);
>>>>>>> origin/master
    // set the content
    if (isDefined(overlayOptions.clickThruURL)) {
        overlayContent = '<a href="' + overlayOptions.clickThruURL + '"><img src="' + overlayOptions.imageURL + '" /></a>';
    } else {
        overlayContent = '<img src="' + overlayOptions.imageURL + '" />';
    }
    // show the overlay
    showOverlay(overlayOptions.start);

});
