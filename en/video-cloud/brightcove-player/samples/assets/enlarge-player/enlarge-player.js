videojs.plugin('enlargePlayer', function() {
    var player = this,
        largeWidth = 640,
        largeHeight = 360,
        smallWidth = 272,
        smallHeight = 153,
        playerWrapper = document.getElementById('playerWrapper');


    function makePlayerLarge() {
        playerWrapper.setAttribute('style', 'width:' + largeWidth + 'px;height:' + largeHeight + 'px;transition: width .3s ease-in-out, height .3s ease-in-out;');
    }

    function makePlayerSmall() {
        playerWrapper.setAttribute('style', 'width:' + smallWidth + 'px;height:' + smallHeight + 'px;transition: width .3s ease-in-out, height .3s ease-in-out;');
    }

    function mouseoutOn() {
        playerWrapper.addEventListener('mouseout', makePlayerSmall);
        makePlayerSmall();
    }

    function mouseoutOff() {
        playerWrapper.removeEventListener('mouseout', makePlayerSmall);
    }

    makePlayerSmall();
    playerWrapper.addEventListener('mouseover', makePlayerLarge);
    mouseoutOn();
    player.on('play', mouseoutOff);
    player.on('ended', mouseoutOn);
});
