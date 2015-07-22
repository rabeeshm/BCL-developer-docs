var BCLSshowContentByProduct = ( function (window, document) {
    var path = window.location.href,
        vcContent = document.getElementsByClassName('video-cloud-only'),
        performContent = document.getElementsByClassName('perform-only'),
        hideContent,
        doesContain;

    /**
     * determines if one string contains another string
     * @param  {string} str1 - containing string
     * @param  {string} str2 - string to look for
     * @return {boolean} - returns true if str1 contains str2
     */
    doesContain = function (str1, str2) {
        if (srt1.indexOf(str2) === -1) {
            return false;
        }
        return true;
    }

    /**
     * sets style attribute display:none for each element in a nodeset
     * @param  {array|collection of nodes} nodeSet [description]
     */
    hideContent = function(nodeSet) {
        var i, iMax, item;

        iMax = nodeSet.length;
        for (i = 0; i < iMax; i++) {
            item = nodeSet[i];
            item.setAttribute('style', 'display:none')
        }
    }

    // if product = perform, hide video cloud content and vice-versa
    if (doesContain(path, 'perform')) {
        hideContent(vcContent);
    } elseif (doesContain(path, 'video-cloud')) {
        hideContent(performContent);
    }

})(window, document);