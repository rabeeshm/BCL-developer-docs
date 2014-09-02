// theme player
var BCDEMO = BCDEMO || {};
BCDEMO.Theme = BCDEMO.Theme || {};

BCDEMO.Theme.DEFAULT_TOOLTIP_CONFIG = {
	fade: false,
	gravity: 's'
}

BCDEMO.Theme.VOLUME_TOOLTIP_CONFIG = {
	fade: false,
	gravity: 'n'
}

BCDEMO.Theme.doStylePlayButton = function() {
	$('#playButton')
		.html('')
		.addClass('ui-state-default')
		.addClass('ui-corner-all')
		.addClass('bcdemo-button')
		.html('<div class="ui-icon ui-icon-play">&nbsp;</div>')
		.tipsy(BCDEMO.Theme.DEFAULT_TOOLTIP_CONFIG);
}

BCDEMO.Theme.doStyleFullScreenButton = function() {
	$('#fullScreenButton')
		.html('')
		.addClass('ui-state-default')
		.addClass('ui-corner-all')
		.addClass('bcdemo-button')
		.html('<div class="ui-icon ui-icon-arrow-4-diag">&nbsp;</div>')
		.tipsy(BCDEMO.Theme.DEFAULT_TOOLTIP_CONFIG);
}

BCDEMO.Theme.doStyleVolumeButton = function() {
	$('#volumeButton')
		.html('')
		.addClass('ui-state-default')
		.addClass('ui-corner-all')
		.addClass('bcdemo-button')
		.html('<div class="ui-icon ui-icon-volume-on">&nbsp;</div>')
		.tipsy(BCDEMO.Theme.VOLUME_TOOLTIP_CONFIG);
}

BCDEMO.Theme.doChangePlayButton = function() {
	if ($(this).hasClass('bcdemo-paused')) $(this).children('div').removeClass('ui-icon-pause').addClass('ui-icon-play');
	else $(this).children('div').removeClass('ui-icon-play').addClass('ui-icon-pause');
}

BCDEMO.Theme.doChangeVolumeButton = function() {
	if ($(this).hasClass('bcdemo-muted')) $(this).children('div').removeClass('ui-icon-volume-on').addClass('ui-icon-volume-off');
	else $(this).children('div').removeClass('ui-icon-volume-off').addClass('ui-icon-volume-on');
}

BCDEMO.Theme.init = function() {
	BCDEMO.Theme.doStylePlayButton();
	BCDEMO.Theme.doStyleFullScreenButton();
	BCDEMO.Theme.doStyleVolumeButton();
	$('#playButton').click(BCDEMO.Theme.doChangePlayButton);
	$('#volumeButton').click(BCDEMO.Theme.doChangeVolumeButton);
}

$(document).ready(BCDEMO.Theme.init);