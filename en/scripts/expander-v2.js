var BCLS = (function(window, document) {
    var expanderHeads = document.getElementsByClassName('bcls-expander-head'),
        i,
        iMax;
    iMax = expanderHeads.length;

    function toggleBody() {
        var expanderBody = this.nextElementSibling;
        if (expanderBody.getAttribute('style') === 'height:0;visibility:hidden;display:none;') {
            expanderBody.setAttribute('style', 'height:auto;visibility:visible;display:block;');
            this.setAttribute('class', 'bcls-expander-head changed');
        } else {
            expanderBody.setAttribute('style', 'height:0;visibility:hidden;display:none;');
            this.setAttribute('class', 'bcls-expander-head');
        }
    }

    for (i = 0; i < iMax; i++) {
        expanderHeads[i].addEventListener('click', toggleBody);
    }
})(window, document);
