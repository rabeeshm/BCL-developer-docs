$(document).ready(function(){
  $("#expanderHead").click(function(){
    $("#expanderContent").slideToggle();
    $("#expanderHead").toggleClass("changed");
  });
});