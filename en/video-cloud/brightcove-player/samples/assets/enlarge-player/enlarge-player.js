videojs.plugin('enlargePlayer', function() {
    var player = this,
        largeWidth = 640,
        largeHeight = 360,
        smallWidth = 272,
        smallHeight = 153,
        inpagePlayerWrapper = document.getElementById('inpagePlayerWrapper');


    function makePlayerLarge() {
        console.log('make large');
        inpagePlayerWrapper.setAttribute('style', 'width:' + largeWidth + 'px;height:' + largeHeight + 'px');
    }

    function makePlayerSmall() {
        console.log('make small');
        inpagePlayerWrapper.setAttribute('style', 'width:' + smallWidth + 'px;height:' + smallHeight + 'px;');
    }

    function mouseoutOn() {
        player.on('mouseout', makePlayerSmall);
        makePlayerSmall();
    }

    function mouseoutOff() {
        player.off('mouseout', makePlayerSmall);
    }

    makePlayerSmall();
    inpagePlayerWrapper.addEventListener('mouseover', makePlayerLarge);
    inpagePlayerWrapper.addEventListener('mouseout', makePlayerSmall);
    player.on('play', mouseoutOff);
    player.on('ended', mouseoutOn);
    mouseoutOn();
});
