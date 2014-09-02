var tmParams = { tm1 : "" };
var quantcastJsonUrl = 'http://pixel.quantserve.com/api/segments.json?a=p-05mj7FO2c-yBQ&callback=qcResults';
var exelateJsonUrl = 'http://load.exelator.com/load/?p=173&g=002&j=j';
//var turnPreCheckSwfUrl = 'http://www.localhost.com/turnPreCheck.swf';
//var turnCookieExistByteSize = 784;

var ready = {quantcast:false, exelate:false};

var exelateExcludeList = new Array;
exelateExcludeList[0] = "nytimes.com";

//addTurnPreCheckSwf(turnPreCheckSwfUrl);
getQuantcastTargeting(quantcastJsonUrl);
loadExelate(exelateJsonUrl);

//---------------functions-------------------------//
function getTremorParams() {
	return tmParams;
}

function isReady(){
	return ready.quantcast;
}

function loadExternalJS(url) {
	var e = document.createElement("script");
	e.src = url;
	e.type="text/javascript";
	document.getElementsByTagName("head")[0].appendChild(e);
}

function appendToTremorParams(name, value) {
	var param = tmParams[name];
	if (param.length > 0){
		param += ";";
	}
	
	param += value;
	tmParams[name] = param;
}

//----------------Turn Pre Check-------------------//
function turnPreCheck(totalBytes){
	if (totalBytes == turnCookieExistByteSize){
		appendToTremorParams("tm1", "kvt=1");
	}
}

function addTurnPreCheckSwf(url){
  e = document.createElement("div");
  e.style.position = "absolute";
  e.style.top="0px";
  e.style.left="0px";
  e.style.width="0px";
  e.style.height="0px";
  e.style.overflow="hidden";
  
  //e.style.visibility = "hidden";
  
  e.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' +
						'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ' +
						'width="1" ' +
						'height="1" ' +
						'id="turnPreCheck" ' +
						'align="middle">' + 
						'<param name="allowScriptAccess" value="always" />' +
						'<param name="allowFullScreen" value="false" />' +
						'<param name="movie" value="' + url + '" />' +
					'<embed type="application/x-shockwave-flash" ' + 
						'pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
						'src="' + url + '" ' +
						'width="1" height="1" name="turnPreCheck" align="middle" ' +
						'allowScriptAccess="always" allowFullScreen="false" />' +
					'</object>';

  document.getElementsByTagName("body")[0].appendChild(e);
}

//----------------Quantcast------------------------//
function getQuantcastTargeting(jsUrl){
	var storedValue = readCookie('tmq');
	
	if (storedValue == null){
		loadExternalJS(jsUrl);
	}else{
		appendToTremorParams("tm1", decodeURIComponent(storedValue));
		ready.quantcast = true;
	}
}

function qcResults(result) {
	var newParams = "";
	for (var i = 0; i < result.segments.length; i++) {
		if (i > 0){
			newParams += ";";
		}
		newParams += 'kvq=' + result.segments[i].id;
	}
	
	if (newParams.length > 0){
		createCookie("tmq",encodeURIComponent(newParams),1);
		appendToTremorParams("tm1", newParams);
	}
	
	ready.quantcast = true;
}

//----------------Exelate------------------------//
function callback_function(result) {
	//result = {"service" : "on", "segments" : ["seg1", "seg2"]};
	var newParams = "";
	if (result.service == "on"){
		for (var i = 0; i < result.segments.length; i++) {
			if (i > 0){
				newParams += ";";
			}
			newParams += 'kve=' + result.segments[i];
		}
	}
	
	appendToTremorParams("tm1", newParams);
	ready.exelate = true;
}

function loadExelate(jsUrl){
	if (shouldCallExelate()){
		loadExternalJS(jsUrl);
	}
}

function shouldCallExelate(){
	var siteDomain = document.domain;
	
	for (var i=0; i<exelateExcludeList.length; i++){
		if (siteDomain.indexOf(exelateExcludeList[i]) >= 0){
			return false;
		}
	}

	return true;
}
//-----------------cookie functions------------------//
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
