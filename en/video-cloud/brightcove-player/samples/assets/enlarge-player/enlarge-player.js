videojs.plugin('enlargePlayer', function() {
    var player = this,
        largeWidth = 640,
        largeHeight = 360,
        smallWidth = 272,
        smallHeight = 153;


    function makePlayerLarge() {
        player.dimensions(largeWidth, largeHeight);
    }

    function makePlayerSmall() {
        player.dimensions(smallWidth, smallHeight);
    }

    function mouseoutOn() {
        player.on('mouseout', makePlayerSmall);
    }

    function mouseoutOff() {
        player.off('mouseout', makePlayerSmall);
    }

    player.on('mouseover', makePlayerLarge);
    player.on('play', mouseoutOff);
    player.on('ended', mouseoutOn);
    mouseoutOn();
});
