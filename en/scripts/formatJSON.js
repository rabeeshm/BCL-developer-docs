// prettify JSON data for display
var BCLS_formatJSON = ( function () {
  return {
    formatJSON : function(obj,$target) {
      formattedData = JSON.stringify(obj,null,"  ")
      $target.html(formattedData);
    }
  }
})();
