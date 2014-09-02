var BCDEMO = BCDEMO || {};

BCDEMO.getVideoMetadata = function() {
	return (typeof VIDEO !== 'undefined') ? VIDEO : false;
}

BCDEMO.getVideoObject = function() {
	//var _video = document.getElementsByTagName('video')[0];
	var _video = document.getElementById('demoVideo');
	if (typeof _video !== 'undefined') return _video;
	return false;
}

BCDEMO.getPoster = function() {
	if (BCDEMO.getVideoMetadata()) return (typeof BCDEMO.getVideoMetadata().poster !== 'undefined') ? BCDEMO.getVideoMetadata().poster : false;
	return false;
}

BCDEMO.getVideoWidth = function() {
	if (BCDEMO.getVideoMetadata()) return (typeof BCDEMO.getVideoMetadata().dimensions !== 'undefined') ? BCDEMO.getVideoMetadata().dimensions.width : false;
}

BCDEMO.getVideoHeight = function() {
	if (BCDEMO.getVideoMetadata()) return (typeof BCDEMO.getVideoMetadata().dimensions !== 'undefined') ? BCDEMO.getVideoMetadata().dimensions.height : false;
}

BCDEMO.getVideoDefaultTitle = function() {
	if (BCDEMO.getVideoMetadata()) return (typeof BCDEMO.getVideoMetadata().defaultTitle !== 'undefined') ? BCDEMO.getVideoMetadata().defaultTitle : false;
}

BCDEMO.doShowContainers = function() {
	// if Javascript is enabled, the containers should be visible
	$('#videoDemoContainer, #bcDemoContainer').css({'display': 'block', 'visibility': 'visible'});
}

BCDEMO.isSmartDevice = function() {
  // we're going to rely on the MobileCompatibility.js script from Brightcove
  return DetectSmartphone();
}

BCDEMO.doRemoveVideo = function() {
  $('#videoDemoContainer').remove();
}

BCDEMO.doLoadVideo = function() {
	if (Modernizr.video) { // checking support for the <video /> tag
		// determine if assets exist	
		var _poster = BCDEMO.getPoster();
		var _width = BCDEMO.getVideoWidth();
		var _height = BCDEMO.getVideoHeight();

		// dynamically create <video /> and other elements
		var _video = document.createElement('video');
		//_video.setAttribute('poster', _poster);
		_video.setAttribute('width', _width);
		_video.setAttribute('height', _height);
		_video.setAttribute('preload', 'auto');
		_video.setAttribute('id', 'demoVideo');
		// if this is displayed on a mobile device, we're going to use the default controls
		if (BCDEMO.isSmartDevice()) _video.setAttribute('controls', 'true');

		// sources will be appended later

		var _posterImage = document.createElement('img');
		_posterImage.setAttribute('src', _poster);
		_posterImage.setAttribute('alt', '');
		_posterImage.setAttribute('width', _width);
		_posterImage.setAttribute('height', _height);
		_posterImage.setAttribute('id', 'bcdemo-poster');

		// append elements to videoDemoContainer
		var _videoDemoContainer = document.getElementById('videoDemoContainer');
		_videoDemoContainer.appendChild(_video);

		_videoDemoContainer.appendChild(_posterImage);
	}
	else { // no support for the <video /> tag
	  BCDEMO.doRemoveVideo();
	}
}

BCDEMO.doLoadVideoSources = function() {
  var _browserCanPlayType = false;
	if (Modernizr.video && BCDEMO.getVideoMetadata()) {
		var _video = BCDEMO.getVideoObject();
		var _sources = BCDEMO.getVideoMetadata().sources;
		for (var i=0; i < _sources.length; i++) {
			var _srcTitle = ((typeof _sources[i].title !== 'undefined') && (_sources[i].title != '')) ? _sources[i].title : BCDEMO.getVideoDefaultTitle();
			var _srcVideo = _sources[i].video;
			var _srcCodecs = '';
			if (_sources[i].codecs.length > 0) {
				_srcCodecs += '; codecs="';
				for (var j=0; j < _sources[i].codecs.length; j++) {
					_srcCodecs += _sources[i].codecs[j];
					if (j+1 < _sources[i].codecs.length) _srcCodecs += ', ';
				}
				_srcCodecs += '"';
			}
			var _srcType = _sources[i].type + _srcCodecs;
			var _src = document.createElement('source');
			_src.setAttribute('title',_srcTitle);
			_src.setAttribute('src',_srcVideo);
			_src.setAttribute('type',_srcType);
			_video.appendChild(_src);
		}
    $(_video).children('source').each(function() {
  	  if ((_video.canPlayType($(this).attr('type')) == 'maybe') || (_video.canPlayType($(this).attr('type')) == 'probably')) _browserCanPlayType = true;
  	  if (!_browserCanPlayType) {
  	    var _typeNoCodecs = $(this).attr('type').split(';')[0];
  	    if ((_video.canPlayType(_typeNoCodecs) == 'maybe') || (_video.canPlayType(_typeNoCodecs) == 'probably')) _browserCanPlayType = true;
  	  }
  	});
		if (_browserCanPlayType) {
		  $('#bcDemoContainer').remove();
		}
		else {
		  BCDEMO.doRemoveVideo();
		  $('#bcDemoContainer').css({'display': 'block', 'visibility': 'visible'});
		}
	}
}

BCDEMO.doLoadVideoTitle = function() {
	var _video = BCDEMO.getVideoObject();
	$(_video).children('source').each(function() {
		if (_video.currentSrc.indexOf($(this).attr('src')) > -1) $('title, #videoTitle h1').text($(this).attr('title'));
	});
	if ($('#videoTitle h1').text() == '') $('title, #videoTitle h1').text(BCDEMO.getVideoDefaultTitle());
}

BCDEMO.getPosterObject = function() {
	var _posterImage = document.getElementById('bcdemo-poster');
	if (typeof _posterImage !== 'undefined') return _posterImage;
	return false;
}

BCDEMO.doHidePoster = function() {
	$('img#bcdemo-poster').css({'display': 'none', 'visibility': 'hidden'});
}

BCDEMO.doShowPoster = function() {
	$('img#bcdemo-poster').css({'display': 'block', 'visibility': 'visible'});
}

BCDEMO.doPositionControls = function() {
	$('#videoControlsContainer')
		.width(BCDEMO.getVideoWidth())
		.height(BCDEMO.getVideoHeight());
	var _top = BCDEMO.getVideoHeight()-55;
	var _width = BCDEMO.getVideoWidth();
	var _height = BCDEMO.getVideoHeight()-26;
	$('#videoControls').css({'top': _top, 'width': _width-26});
	$('#videoTitle').css({'width': _width});
}

BCDEMO.doShowControls = function() {
	$('#videoTitle, #videoControls').fadeIn();
}

BCDEMO.doHideControls = function() {
	if ($('#videoTitle, #videoControls').is(':visible')) $('#videoTitle, #videoControls').fadeOut();
}

BCDEMO.doPlayPause = function() {
	var _video = BCDEMO.getVideoObject();
	if (_video.paused) {
		$(this).removeClass('bcdemo-paused');
		_video.play();
	}
	else {
		$(this).addClass('bcdemo-paused');
		_video.pause();
	}
}

BCDEMO.doRewind = function() {
  BCDEMO.doShowPoster();
  BCDEMO.doShowControls();
}

BCDEMO.doFullScreen = function() {
	var _video = BCDEMO.getVideoObject();
	var _posterImage = BCDEMO.getPosterObject();
	/*
	var _currentHeight = $(_video).attr('height');
	var _currentWidth = $(_video).attr('width');
	var _maxWidth = Math.round((_currentWidth*_maxHeight)/_currentHeight);
	*/
	var _maxHeight = $(window).height();
	var _maxWidth = $(window).width();
	$(_video)
		.addClass('fullscreen')
		.attr('width',_maxWidth)
		.attr('height',_maxHeight)
		.width(_maxWidth)
		.height(_maxHeight);
	$('#videoControlsContainer')
  	.css({'top': 0, 'left': 0})
		.width(_maxWidth-16)
		.height(_maxHeight);
	$(_posterImage)
	  .addClass('fullscreen')
		.attr('width',_maxWidth)
		.attr('height',_maxHeight);
	$('#videoControls').addClass('fullscreen').css({'top': _maxHeight-60});
	$('#videoTitle').css({'width': _maxWidth-16});
	$('div').each(function() {
	  if ($(this).css('position') == 'relative') $(this).css({'position': 'inherit'});
	});
	$('#videoDemoContainer div').each(function() {
	  if ($(this).css('position') == 'inherit') $(this).css({'position': 'relative'});
	});
}

BCDEMO.doRestoreScreen = function() {
	var _video = BCDEMO.getVideoObject();
	var _posterImage = BCDEMO.getPosterObject();
	var _height = BCDEMO.getVideoHeight();
	var _width = BCDEMO.getVideoWidth();
	var _top = _height-55;
	$(_video)
		.removeClass('fullscreen')
		.attr('width',_width)
		.attr('height',_height)
		.width(_width)
		.height(_height);
	$('#videoControlsContainer')
  	.css({'top': 'auto', 'left': 'auto'})
		.width(_width)
		.height(_height);
	$(_posterImage)
	  .removeClass('fullscreen')
		.attr('width',_width)
		.attr('height',_height)
	$('#videoControls').removeClass('fullscreen').css({'top': _top});
	$('#videoTitle').css({'width': _width});
	$('div').each(function() {
	  if ($(this).css('position') == 'inherit') $(this).css({'position': 'relative'});
	});
}

BCDEMO.doSwitchScreen = function() {
	var _video = BCDEMO.getVideoObject();
	if ($(_video).hasClass('fullscreen')) BCDEMO.doRestoreScreen();
	else BCDEMO.doFullScreen();
}

BCDEMO.doAssignShortcuts = function(event) {
	switch(event.keyCode) {
		case 70: // f = restore/escape full-screen
			BCDEMO.doSwitchScreen();
			break;
		case 27: // <esc> = escape full-screen
			BCDEMO.doRestoreScreen();
			break;
		case 32: // <spacebar> = play/pause
			$('#playButton').trigger('click');
			break;
	}
	return false;
}

BCDEMO.doBCCleanup = function() {
  var _toRemove = /\- Flash Player Installation/i;
  if ($('title').html().match(_toRemove) != null) {
    $('title').html($('title').html().replace(_toRemove,""));
  }
}

BCDEMO.init = function() {
	BCDEMO.doShowContainers();
	BCDEMO.doLoadVideo();
	BCDEMO.doLoadVideoSources();
	if (!BCDEMO.isSmartDevice()) {
	 	BCDEMO.doPositionControls();
  	$('#videoDemoContainer').mouseenter(BCDEMO.doShowControls).mousemove(BCDEMO.doShowControls).mouseleave(BCDEMO.doHideControls);
  	$('#playButton').button().attr('title','play/pause').click(BCDEMO.doPlayPause);
  	$('#fullScreenButton').button().attr('title','full screen').click(BCDEMO.doSwitchScreen);
  	$(document).bind('keyup', function(event) { BCDEMO.doAssignShortcuts(event); }); 
	}
	$('video')
		.bind('play', function() { BCDEMO.doHidePoster(); })
		.bind('canplay error', function() { BCDEMO.doLoadVideoTitle(); })
		.bind('ended', function() { BCDEMO.doRewind(); });
	BCDEMO.doBCCleanup();
}

$(document).ready(BCDEMO.init);