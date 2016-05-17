var BCLS = ( function () {
  var expanderHeads = document.getElementsByClassName('bcls-expander-head');
})();

$(document).ready(function(){
  $("#expanderHead").click(function(){
    $("#expanderContent").slideToggle();
    $("#expanderHead").toggleClass("changed");
  });
});
