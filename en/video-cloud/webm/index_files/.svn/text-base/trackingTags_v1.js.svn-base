//  CONFIGURE HOST BASED ON ENVIRONMENT
var NYTD = NYTD || {};

NYTD.Hosts = NYTD.Hosts ||  (function(){
  var host, scripts = document.getElementsByTagName("script");

  for (var i = 0, script; script = scripts[i]; i++) {
    host = script.src &&
/^(.+\.nytimes.com)\/js\/app\/analytics\/trackingTags_v1\.1\.js/.test(script.src) ? RegExp.$1 :'';
    if (host) { break };
  };

  return {
    imageHost: host,
    jsHost: host,
    cssHost: host
  }
})();


// START WEBTRENDS JS TAG
var gtrackevents=false;
var gdcsid="dcsym57yw10000s1s8g0boozt_9t1x";
var gfpcdom=".nytimes.com";
var gdomain="wt.o.nytimes.com";
var js_host;
if (window.location.protocol.indexOf('https:')==-1) {
  js_host =  NYTD.Hosts.jsHost + "/js/app/analytics/";
} else {
  js_host = "https://select.nytimes.com/js/app/analytics/";
}


// Include WebTrends wtid.js
var wt_initObj = { enabled:true, fpc:"WT_FPC", domain:gdomain, dcsid:gdcsid };
if (wt_initObj.enabled&&(document.cookie.indexOf(wt_initObj.fpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
var wtid_js_host="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+wt_initObj.domain+"/"+wt_initObj.dcsid+"/"
var wtidjs = document.createElement('script');
wtidjs.setAttribute('type', 'text/javascript');
wtidjs.setAttribute('src', wtid_js_host+'wtid.js');
document.getElementsByTagName('head').item(0).appendChild(wtidjs);
}

var wtInc = document.createElement('script');
wtInc.setAttribute('language', 'javascript');
wtInc.setAttribute('type', 'text/javascript');
wtInc.setAttribute('src', js_host+'controller_v1.1.js');
document.getElementsByTagName('head').item(0).appendChild(wtInc);
// END WEBTRENDS JS TAG

// START REVENUE SCIENCE PIXELLING CODE
var revSc = document.createElement('script');
revSc.setAttribute('language', 'javascript');
revSc.setAttribute('type', 'text/javascript');
revSc.setAttribute('src', js_host+'gw.js?csid=H07707');
document.getElementsByTagName('head').item(0).appendChild(revSc);

var customRevSci = document.createElement('script');
customRevSci.setAttribute('language', 'javascript');
customRevSci.setAttribute('type', 'text/javascript');
customRevSci.setAttribute('src', js_host+'revenuescience.js');
document.getElementsByTagName('head').item(0).appendChild(customRevSci);
// END REVENUE SCIENCE PIXELLING CODE

// Duped in common.js
(function(){
  if (NYTD.require) {
    return;
  }
  
  var windowLoaded = false;
  var document_scripts;
  
  if (window.addEventListener) {
    window.addEventListener ("load", function(){ windowLoaded = true }, false);
  } else if (window.attachEvent) {
    window.attachEvent ("onload", function(){ windowLoaded = true });
  }
  
  function scriptLoaded(src) {
    document_scripts = document_scripts || {};
    
    if (document_scripts[src]) { return true; }
    else {
      var script_tags= document.getElementsByTagName("script");
      for (var i = 0, script; script = script_tags[i]; i++) {
        if(script.src) { document_scripts[script.src] = 1; }
      };
      if (document_scripts[src]) { return true; }
      else { return false; }
    }
    
  }

  NYTD.require = function(file, callback) {
    
    if (windowLoaded) { throw('Cannot require file, document is already loaded'); }  

    // If matches root relative url (single slash, not protocol-agnostic double slash)
    var url = /^\/[^\/]/.test(file) ?  NYTD.Hosts.jsHost + file : file;
    var force = arguments[arguments.length - 1] === true;
    var needsCallbackScriptTag;
    
    if (force || !scriptLoaded(url)) { 
      document.write('<script src="' + url + '" type="text/javascript" charset="utf-8" onerror="throw(\'NYTD.require: An error occured: \' + this.src)"><\/script>');
      document_scripts[url] = 1;
      needsCallbackScriptTag = true;
    }

    if (typeof callback == 'function') {

      if (document.addEventListener) {
        if (needsCallbackScriptTag) { 
          document.write('<script type="text/javascript" charset="utf-8">(' + callback.toString() + ')();<\/script>');
        }
        else {
          window.setTimeout(function(){
            callback()
          }, 0)
        }
      }
      else {
        NYTD.require.callbacks = NYTD.require.callbacks || [];
        NYTD.require.callbacks.push(callback);
        NYTD.require.callbacks.count = (++NYTD.require.callbacks.count) || 0;
        document.write("<script id=__onAfterRequire" + NYTD.require.callbacks.count + " src=//:><\/script>");
        document.getElementById("__onAfterRequire" + NYTD.require.callbacks.count).onreadystatechange = function() {
          if (this.readyState == "complete") {
            this.onreadystatechange = null;
            (NYTD.require.callbacks.pop())();
            this.parentNode.removeChild(this);
          }
        };
      }

    }

  };
})();

if (!window.TimesPeople && 
   location.pathname.indexOf('/gst/articleSkimmer') === -1 && 
   location.pathname.indexOf('timesskimmer') === -1 &&
   !window.location.hostname.match('cnet|nytimes\.com\.com')) { 

  NYTD.require('/js/app/lib/prototype/1.6.0.2/prototype.js');    
  NYTD.require('/js/app/lib/NYTD/0.0.1/template.js');
  
  NYTD.require('/js/app/timespeople_1.5/lib/urilist.js');
  NYTD.require('/js/app/timespeople_1.5/loader.js');
}

// comScore beacon
NYTD.require((window.location.protocol == 'https:' ? 'https://sb' : 'http://b') +
'.scorecardresearch.com/beacon.js', function () {
  var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
  
  var section = (function () {
    var metaTagEls = document.getElementsByTagName('meta');
    for (var i=0; i<metaTagEls.length; i++) {
      if (metaTagEls[i].name=='CG') {
        return metaTagEls[i].content.toLowerCase();
      }
    }
    return '';
  })();

  COMSCORE.beacon({
    c1: 2,
    c2: 3005403,
    c3: '',
    c4: url,
    c5: section,
    c6: '', 
    c15: ''
  });
});

// Nielsen tagging
NYTD.require('//secure-us.imrworldwide.com/v60.js', function () {
    var trac = nol_t({
        cid: 'us-nytimes',
        content: '0',
        server: 'secure-us'
    });
    trac.record().post();
});
