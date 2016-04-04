videojs.plugin('enlargePlayer', function() {
    var player = this,
        playerEl = player.el(),
        playerParent = playerEl.parentNode,
        largeWidth = 640,
        largeHeight = 360,
        smallWidth = 272,
        smallHeight = 153,
        wrapper = document.createElement('div');

    playerWrapper.setAttribute('id', 'playerWrapper');
    playerParent.insertBefore(wrapper, playerEl);
    wrapper.appendChild(playerEl);
    playerWrapper = document.getElementById('playerWrapper');



    function makePlayerLarge() {
        playerWrapper.setAttribute('style', 'width:' + largeWidth + 'px;height:' + largeHeight + 'px;transition: width .4s ease-in-out, height .4s ease-in-out;');
    }

    function makePlayerSmall() {
        playerWrapper.setAttribute('style', 'width:' + smallWidth + 'px;height:' + smallHeight + 'px;transition: width .4s ease-in-out, height .4s ease-in-out;');
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
