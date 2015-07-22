var BCLSshowContentByProduct = ( function (window, document) {
    var path = window.location.href,
        hideContent,
        doesContain,
        hasClass;

    /**
     * determines whether element has a class
     * @param {object|node} elem the element
     * @param {string} cls the name of the class you’re looking for
     * @return {boolean} true if the element has that class, false if not
     */
    function hasClass( elem, cls ) {
        return (" " + elem.className + " " ).indexOf( " " + cls + " " ) > -1;
    };

    /**
     * determines if one string contains another string
     * @param  {string} str1 - containing string
     * @param  {string} str2 - string to look for
     * @return {boolean} - returns true if str1 contains str2
     */
    doesContain = function (str1, str2) {
        if (str1.indexOf(str2) === -1) {
            return false;
        }
        return true;
    }

    /**
     * sets style attribute display:none for each element in a nodeset
     * @param  {array|collection of nodes} nodeSet [description]
     */
    hideContent = function(excludeClass) {
        var i, iMax, item,
            nodeSet = document.querySelectorAll('a, div, h1, h2, h3, h4, h5, p, span, pre, code, ul, ol, li, img, table, thead, tbody, tr, th, td, dl, dt, dd');

        iMax = nodeSet.length;
        for (i = 0; i < iMax; i++) {
            item = nodeSet[i];
            if (hasClass(item, excludeClass)) {
                item.setAttribute('style', 'display:none');
            }
        }
    }

    // if product = perform, hide video cloud content and vice-versa
    if (doesContain(path, 'perform')) {
        hideContent('video-cloud-only');
    } else if (doesContain(path, 'video-cloud')) {
        hideContent('perform-only');
    }

})(window, document);