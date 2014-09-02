// adjust volume
var BCDEMO = BCDEMO || {};
BCDEMO.Volume = BCDEMO.Volume || {};

var BCDEMO_DEFAULT_VOLUME = 60;
var BCDEMO_CURRENT_VOLUME = BCDEMO_DEFAULT_VOLUME;

BCDEMO.Volume.getDefaultVolume = function() {
	return BCDEMO_DEFAULT_VOLUME;
}

BCDEMO.Volume.getCurrentVolume = function() {
	return ((BCDEMO_CURRENT_VOLUME > 1) ? BCDEMO_CURRENT_VOLUME : BCDEMO_DEFAULT_VOLUME);
}

BCDEMO.Volume.setCurrentVolume = function(vol) {
	var _video = BCDEMO.getVideoObject();
	if (vol > 100) _vol = 100;
	else if (vol < 1) _vol = 10;
	else _vol = vol;
	BCDEMO_CURRENT_VOLUME = _vol;
	$('#volumeSliderInner').slider('option','value',_vol);
	_video.volume = _vol/100;
}

BCDEMO.Volume.doShowVolume = function() {
	$('#volumeSlider').css({ 'display': 'block', 'visibility': 'visible' });
	//$('#volumeControl').height('115px');
	$('#volumeButton').addClass('ui-state-hover');
}

BCDEMO.Volume.doHideVolume = function() {
	$('#volumeSlider').css({ 'display': 'none', 'visibility': 'hidden' });
	$('#volumeButton').removeClass('ui-state-hover');
}

BCDEMO.Volume.doMuteUnmute = function() {
	var _video = BCDEMO.getVideoObject();
	var _current_volume = BCDEMO.Volume.getCurrentVolume();
	_video.muted = !_video.muted;
	if (_video.muted) {
		$('#volumeSliderInner').slider('option','value',0);
		$(this).addClass('bcdemo-muted');
	}
	else {
		$('#volumeSliderInner').slider('option','value',_current_volume);
		$(this).removeClass('bcdemo-muted');
	}
}

BCDEMO.Volume.doAssignShortcuts = function(event) {
	switch(event.keyCode) {
		case 38: // <up arrow> = volume up 0.1
			//BCDEMO.doShowControls();
			BCDEMO.Volume.doShowVolume();
			BCDEMO.Volume.setCurrentVolume(BCDEMO.Volume.getCurrentVolume()+10);
			var _t = setTimeout('BCDEMO.Volume.doHideVolume()', 5000);
			//BCDEMO.doHideControls();
			break;
		case 40: // <down arrow> = volume down 0.1
			//BCDEMO.doShowControls();
			BCDEMO.Volume.doShowVolume();
			BCDEMO.Volume.setCurrentVolume(BCDEMO.Volume.getCurrentVolume()-10);
			var _t = setTimeout('BCDEMO.Volume.doHideVolume()', 5000);
			// BCDEMO.doHideControls();
			break;
		case 77: // m = mute/unmute
			$('#volumeButton').trigger('click');
			break;
	}
}

BCDEMO.Volume.init = function() {
	$('#volumeButton').button();
	$('#volumeSliderInner').slider({
		orientation: 'vertical',
		range: 'min',
		min: 1,
		max: 100,
		value: BCDEMO.Volume.getDefaultVolume(),
		slide: function(event, ui) {
			BCDEMO.Volume.setCurrentVolume(ui.value);
		}
	});
	$('#volumeControl').mouseover(BCDEMO.Volume.doShowVolume).mouseout(BCDEMO.Volume.doHideVolume);
	$('#volumeButton').button().attr('title','mute/unmute').click(BCDEMO.Volume.doMuteUnmute);
	$(document).bind('keyup', function(event) { BCDEMO.Volume.doAssignShortcuts(event) });
}

$(document).ready(BCDEMO.Volume.init);