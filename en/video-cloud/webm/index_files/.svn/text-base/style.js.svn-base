/* $Id: style.js 25773 2009-10-12 15:42:24Z jsonmez $ */

NYTD = typeof NYTD == 'undefined' ? {"Video":{}} : NYTD;

NYTD.HoverBox = Class.create({
initialize: function(element) {
  this.el = element;
  this.hoverin();
  this.hoverout();
},

hoverClassOn : function(){
    this.addClassName('hoverState');
},

hoverClassOff : function(){
    this.removeClassName('hoverState');
},

hoverin: function() {
    if( (typeof( this.el ) != 'undefined') && (this.el != null) ) {
        this.el.onmouseover = this.hoverClassOn;
    } else {
        console.log( "Couldn't find element, hoverin" );
    }
},

hoverout: function() {
    if( (typeof( this.el ) != 'undefined') && (this.el != null) ) {
        this.el.onmouseout = this.hoverClassOff;
    } else {
        console.log( "Couldn't find element, hoverin" );
    }
}
});

