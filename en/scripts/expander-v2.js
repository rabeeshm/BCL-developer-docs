var BCLS = (function(window, document) {
    var expanderHeads = document.getElementsByClassName('bcls-expander-head'),
        i,
        iMax;
    iMax = expanderHeads.length;

    function toggleBody(evt) {
        var expanderBody = this.firstChild;
        if (expanderBody.getAttribute('style') === 'height:none;') {
            expanderBody.setAttribute('style', 'height:auto;');
        } else {
            expanderBody.setAttribute('style', 'height:0;');
        }
    }

    for (i = 0; i < iMax; i++) {
        expanderHeads[i].addEventListener('click', toggleBody);
    }
})(window, document);
