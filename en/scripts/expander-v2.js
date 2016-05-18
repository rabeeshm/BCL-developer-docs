var BCLS = (function() {
    var expanderHeads = document.getElementsByClassName('bcls-expander-head'),
        i,
        iMax;
    iMax = expanderHeads.length;

    function toggleBody(evt) {
        
    }

    for (i = 0; i < iMax; i++) {
        expanderHeads[i].addEventListener('click', toggleBody);
    }
})();

$(document).ready(function() {
    $("#expanderHead").click(function() {
        $("#expanderContent").slideToggle();
        $("#expanderHead").toggleClass("changed");
    });
});
