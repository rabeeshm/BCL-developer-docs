// monitor progress
var BCDEMO = BCDEMO || {};
BCDEMO.Scrubber = BCDEMO.Scrubber || {};
var BCDEMO_CURRENT = '';
var BCDEMO_DURATION = '';

BCDEMO.Scrubber.getDuration = function() {
	var _video = BCDEMO.getVideoObject();
	return (Math.round(_video.duration*100)/100);
}

BCDEMO.Scrubber.getCurrentTime = function() {
	var _video = BCDEMO.getVideoObject();
	return (Math.round(_video.currentTime*100)/100);
}

BCDEMO.Scrubber.setCurrentTime = function(t) {
	var _video = BCDEMO.getVideoObject();
	_video.currentTime = t;
}

BCDEMO.Scrubber.doUpdateTime = function() {
	var _video = BCDEMO.getVideoObject();
	$('#scrubberSliderInner').slider('option','value',BCDEMO.Scrubber.getPercentComplete());
	var _currentTimeMinutes = Math.floor(BCDEMO.Scrubber.getCurrentTime()/60).toString();
	var _currentTimeSeconds = Math.round(BCDEMO.Scrubber.getCurrentTime() - (_currentTimeMinutes * 60)).toString();
	var _durationMinutes = Math.floor(BCDEMO.Scrubber.getDuration()/60).toString();
	var _durationSeconds = Math.round(BCDEMO.Scrubber.getDuration() - (_durationMinutes * 60)).toString();
	if (_durationSeconds.length < 2) _durationSeconds = '0' + _durationSeconds;
	if (_currentTimeSeconds.length < 2) _currentTimeSeconds = '0' + _currentTimeSeconds;
	BCDEMO_DURATION = _durationMinutes + ':' + _durationSeconds;
	BCDEMO_CURRENT = _currentTimeMinutes + ':' + _currentTimeSeconds;
	$('#scrubberTime').html(BCDEMO_CURRENT);
	$('#scrubberDuration').html(BCDEMO_DURATION);
}

BCDEMO.Scrubber.getPercentComplete = function() {
	var _currentTime = BCDEMO.Scrubber.getCurrentTime();
	var _duration = BCDEMO.Scrubber.getDuration();
	var _percentComplete = Math.round(Number(_currentTime/_duration)*100);
	return (_percentComplete);	
}

BCDEMO.Scrubber.doSeek = function(pos) {
	var _video = BCDEMO.getVideoObject();
	var _duration = BCDEMO.Scrubber.getDuration();
	var _currentTime = Math.round((pos/100)*_duration);
	BCDEMO.Scrubber.setCurrentTime(_currentTime);
	BCDEMO.Scrubber.doUpdateTime();
}

BCDEMO.Scrubber.doRewind = function() {
	var _video = BCDEMO.getVideoObject();
	BCDEMO.Scrubber.setCurrentTime(0);
	$('#scrubberSliderInner').slider('option','value',0);
	//$('#playButton').children('span').text('Play');
	_video.pause();
}

BCDEMO.Scrubber.doAssignShortcuts = function(event) {
	switch(event.keyCode) {
		case 37: // <left arrow> = seek 10 seconds back
			BCDEMO.Scrubber.setCurrentTime(BCDEMO.Scrubber.getCurrentTime() - 10);
			BCDEMO.Scrubber.doUpdateTime();
			break;
		case 39: // <right arrow> = seek 10 seconds ahead
			BCDEMO.Scrubber.setCurrentTime(BCDEMO.Scrubber.getCurrentTime() + 10);
			BCDEMO.Scrubber.doUpdateTime();
			break;
	}
}

BCDEMO.Scrubber.init = function() {
	$('#rewindButton').button().click(BCDEMO.Scrubber.doRewind);
	$('#scrubberSliderInner').slider({
	  range: 'min',
		min: 0,
		max: 100,
		value: 0,
		change: function(event, ui) {
			// the slider is always going to change. checking to see if the user or script is causing it.
			if (typeof event.originalEvent !== 'undefined') {
				BCDEMO.Scrubber.doSeek(ui.value);
			}
		}
	});
	$('video')
		.bind('durationchange timeupdate', function() { BCDEMO.Scrubber.doUpdateTime(); })
		.bind('ended', function() { BCDEMO.Scrubber.doRewind(); });
	$(document).bind('keyup', function(event) { BCDEMO.Scrubber.doAssignShortcuts(event) });
}

$(document).ready(BCDEMO.Scrubber.init);