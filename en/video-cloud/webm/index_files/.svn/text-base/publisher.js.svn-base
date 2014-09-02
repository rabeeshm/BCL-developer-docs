var trc_properties = {"language":"en","testmode":false,"direction":"ltr","default-thumbnail":"http://graphics8.nytimes.com/images/video/t-thumbnail-190x126.jpg","domains":"","sponsored-link-text":"Sponsored Link","sponsored-video-text":"Sponsored Video","branding-url":{},"configuration-version":"0","external-credentials":"MDhcs_hM7HZEUOs06_vXx2RPiwpIeimFUouI_CszCgc.","publisher-start":function() {
    var is_ie=document.attachEvent?true:false;var is_ie7=is_ie&&window.XMLHttpRequest;var is_khtml=document.all&&document.addEventListener?true:false;var is_safari=document.childNodes&&!document.all&&!navigator.taintEnabled&&!navigator.accentColorName;var is_dom=document.getElementById?true:false;
    var is_gecko=!is_ie&&!is_khtml&&!is_safari&&is_dom;
    if (is_gecko) {
        window.addEventListener("load", function() { window.trc_nytimes_hacked_onload_has_happened = true; }, false);
        TRC.prototype._logTrcEvent=TRC.prototype.logTrcEvent;
        TRC.prototype.logTrcEvent = function(type,params) {
            if (!window.trc_nytimes_hacked_onload_has_happened) {
                window.addEventListener("load",function() {
                    window.setTimeout(function() {
                        window.TRCImpl._logTrcEvent(type,params);
                    },0);
                },false);
            } else
                this.logTrcEvent = this._logTrcEvent;
            this._logTrcEvent.apply(this, arguments);
        }
    }

    if(window.location.href.search("/playlist/") >= 0 || (window.location.pathname == "/")) {
	try {
    	    delete window['trc_video_id'];
	} catch (e) {
	    window.trc_video_id = null;
	}
    }
    window.TRC.prototype.get_intent = function(box){
        var url = window.location.href;
        if(box.item_id_array.length == 0){
            if(url.search("/"+box.reqParams["item-id"]+"/")>=0)
                    return "s";
            if(url.search("/playlist/") >= 0){
                if(window.location.hash != "")
                        return "s";
                if((url.search("/editors-choice/") >= 0) ||(url.search("/latest-video/") >= 0))
                    return "p";
                else{
                    return "cp";
                }
            }
            return "p";
        }

        if(box.item_id_array.length>0){
            if(url.search("/playlist/") >= 0){
                if((url.search("/editors-choice/") >= 0) ||(url.search("/latest-video/") >= 0))
                    return "n";
                else{
                    return "cn";
                }
            }
            return "n";
        }

        return "u";

    }
}
,"get-user":function(){return null;},"get-creator":function(){var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta');for(var i=0;i<m.length;i++){if(m[i].name=='uploader'||m[i].name=='item-uploader')return m[i].content;}},"get-views":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta');for(var i=0;i<m.length;i++){if(m[i].name=='views'||m[i].name=='item-views')return m[i].content;}},"get-rating":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta');for(var i=0;i<m.length;i++){if(m[i].name=='rating'||m[i].name=='item-rating'){ if(!isNaN(parseFloat(m[i].content))) return m[i].content;}}}
,"get-tags":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta');for(var i=0;i<m.length;i++){if(m[i].name=='keywords'||m[i].name=='item-keywords')return m[i].content.split(',');}return [];},"logo-image":"http://cdn.taboolasyndication.com/taboola/powered-by-small-dark.png","modes":{"rbox-blended":{"tabbed":false,"expandable":false,"list-size":8,"orientation":"horizontal","navigation-type":"paging","auto-scroll":"none","loading-animation-url":"http://cdn.taboolasyndication.com/taboola/ajax-loader.gif","thumbnail-width":190,"thumbnail-height":126,"format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s','category':'%s'}
,"detail-order":"category,title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"");}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"item-renderer":function(box,vid) {
    var is_ie = document.attachEvent ? true : false;
    var is_ie7 = is_ie && window.XMLHttpRequest;

    if (typeof window.trc_rbox_itemRenderer == 'function') {
        window.trc_rbox_itemRenderer(box,vid);
        return;
    }
    if(vid.type!="video")
        return;
    var dataLink = box.getElementsByTagName('a');

   var overlay = document.createElement('span');
    overlay.className = "overlay";
    var playButton = document.createElement('span');
    playButton.className = "playButton";
    overlay.appendChild(playButton);
    var message = document.createElement('span');
    message.className = "message";
    message.style.display = "none";
    message.innerHTML = "Play";
    overlay.appendChild(message);
    dataLink[0].appendChild(overlay);
    if((is_ie)&&(!is_ie7)){
        box.attachEvent("onmouseover", function(){ message.style.display = "block";});
        box.attachEvent("onmouseout",function(){ message.style.display="none";});
    }
    else{
        box.onmouseover = function(){  message.style.display = "block";  }
        box.onmouseout = function(){ message.style.display = "none";  }
    }
} 
,"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d);}}},"has_valid_rss":false,"actionscript_version":"3","brightcove-uses-reference":true,"publisher-end":function(id){
    var next = document.getElementById('pager_next_'+id);
    var prev = document.getElementById('pager_prev_'+id);
    var is_ie = document.attachEvent ? true : false;
    var is_ie7 = is_ie && window.XMLHttpRequest;

    if(next != null){
        var inner = "Next "+ next.innerHTML;
        next.innerHTML = "";
        var next_pipe_div = document.createElement('div');
        var str = 'text-decoration:none; color:#999999;';
        next_pipe_div.innerHTML = " | ";
        if( typeof(next_pipe_div.style.cssText) == 'string' )
            next_pipe_div.style.cssText = str;
        else
            next_pipe_div.setAttribute('style',str);

        next.appendChild(next_pipe_div);
        var next_div = document.createElement('div');
        next_div.className = "next";
        next_div.innerHTML = inner;
        next.appendChild(next_div);
        if((is_ie)&&(!is_ie7)){
            next.attachEvent("onmouseover", function(){ next_div.className = next_div.className + "_hover";});
            next.attachEvent("onmouseout",function(){next_div.className = next_div.className.split("_hover")[0];});

        }
    }
    if(prev != null){
        var inner = prev.innerHTML +" Prev";
        prev.innerHTML = "";
        var next_pipe_div = document.createElement('div');
        var str = 'text-decoration:none; color:#999999;';
        next_pipe_div.innerHTML = " | ";
        if( typeof(next_pipe_div.style.cssText) == 'string' )
            next_pipe_div.style.cssText = str;
        else
            next_pipe_div.setAttribute('style',str);

        var prev_div = document.createElement('div');
        prev_div.className = "prev";
        prev_div.innerHTML = inner;

        prev.appendChild(prev_div);
        prev.appendChild(next_pipe_div);
        if((is_ie)&&(!is_ie7)){
            prev.attachEvent("onmouseover", function(){prev_div.className = prev_div.className + "_hover";});
            prev.attachEvent("onmouseout",function(){prev_div.className = prev_div.className.split("_hover")[0];});

        }
    }
}
,"ie-logo-image":"http://cdn.taboolasyndication.com/taboola/powered-by-small.gif","attribution":true,"notify-loaded":true,"auto-advance":0}