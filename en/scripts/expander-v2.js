var BCLS = (function(window, document) {
    var expanderHeads = document.getElementsByClassName('bcls-expander-head'),
        i,
        iMax;
    iMax = expanderHeads.length;

    function toggleBody(evt) {
        console.log(evt);
        var expanderBody = this.nextElementSibling;
        if (expanderBody.getAttribute('style') === 'height:0;display:none;') {
            expanderBody.setAttribute('style', 'height:auto;display:block;');
        } else {
            expanderBody.setAttribute('style', 'height:0;display:none;');
        }
    }

    for (i = 0; i < iMax; i++) {
        expanderHeads[i].addEventListener('click', toggleBody);
    }
})(window, document);
