/* $Id: library.js 37683 2010-05-04 17:25:28Z mtam $ */

var isConsole = (typeof console != 'undefined') && console['log'];

/**
 * Manage all playlists on a page.  Handles interaction with player, including:
 * . moving a "playing" overlay as user advances through the play list
 * . scrolling current video into view
 * . handling "next" and "prev" paging requests
 *
 * static class - do not instantiate
 */
var NYTD_PlaylistMgr = {
    _bcExp:null,                // Brightcove experience mgr
    _modExp:null,               // experience module
    _modVP:null,                // video player module
    _modCT:null,                // content module
    _titlePlayCount:0,          // Count of titles played during this pageview
    _playlist_arr:{},           // array of ids of playlist (DOM) object being managed
    _bcPlaylistObj:null,        // Playlist object, as retrieved from BC player (different than _playlist_arr contents)
    _nextUpList:null,           // playlist which contains current playlist
    _autoAdvance:false,         // if true, automatically proceed to next title
    _cacheSkipInfo:null,
    _stop:false,                // if true, stop on next videoStart
    _userPlayTime:0,            // For WT, is the currently-pending event from the user?
    _isUserClick:false,         // Detecting user click
    _curCategory:null,          // primary videoCategory
    _userPlayTimeThresh:2500,   // If a video begins rolling within this number of millis, attribute it as a user click in WT
    _wtLatencyThresh:2500,      // Wait this long between WT calls, to prevent multiple start or stop events for the same action
    _wtRecentEvents:{},         // hash of player events, value is timestamp of event, used to filter out duplicate events to WT

    /**
    * Adds a playlist to the manager
    * @param objId {String} The id of the playlist DOM object
    * @returns {NYTD_Playlist} playlist object
    */
    addPlaylist: function (obj)
    {
        var playlist = null;
        try {
            playlist = new NYTD_Playlist(obj);
            NYTD_PlaylistMgr._playlist_arr[obj['id']] = playlist;
            if (playlist.nextUp) {
                NYTD_PlaylistMgr._nextUpList = playlist;
            }
        } catch (e) {}
        
        return playlist;
    },

    /*
    * get the playlist for the id
    * @param id {String} id of the playlist DOM object
    * @returns {NYTD_Playlist} playlist object
    */
    getPlaylist: function (id) {
        return NYTD_PlaylistMgr._playlist_arr[id];
    },

    /*
    * jump to a video in the playlist
    * @param e {Event} event used to get the index of the object clicked
    * @param idx {Number} index in the playlist of selected video
    *
    * Note: code assumes that clicked element or ancestor has an attribute
    * called visidx corresponding to the screen index of the title
    */
    gotoVideo: function (index, el) {
        index = parseInt(index, 10);
        if (!Object.isNumber(index) || !NYTD_PlaylistMgr._nextUpList) {
            return false;
        }
        
        // If user-triggered, an associated event element is available
        if (el) {
            NYTD_PlaylistMgr._userPlayTime = (new Date()).getTime();
            NYTD_PlaylistMgr._isUserClick = true;
        } else {
            NYTD_PlaylistMgr._userPlayTime = 0;
        }
        
        // get the true index based on the current page
        index += NYTD_PlaylistMgr._nextUpList.pageSize * NYTD_PlaylistMgr._nextUpList.curPage;
        
        // set the index in the player (this starts the selected title) and update screen description
        var videoList = NYTD_PlaylistMgr.getVideoList();
        if (videoList != null) {
            NYTD_PlaylistMgr._nextUpList.currentTitleIndex = index;
            NYTD_PlaylistMgr.displayNameAndDesc();
            videoList.setSelectedIndex(index);
            
            // Reload Taboola R-Box with new recommendations
            TRC.playVideo(getKnewsTitleRefId());
        } else {
            // No playlist data available in single Player mode, advance
            // to the playlist url
            var playlistUrl = el.select('.kicker a')[0].href,
                refId       = getKnewsTitleRefId();
            
            window.location.href = playlistUrl + '#' + refId;
        }
    },

    templateReady: function () {
        NYTD_PlaylistMgr.videoStart();
    },

    /*
    * callback for BC videoStart event.  Calls overlayPlaying for the next-up play list
    * and updates the screen description
    */
    videoStart: function (e)
    {
        var vid = NYTD_PlaylistMgr._modVP.getCurrentVideo();
        if (NYTD_PlaylistMgr._nextUpList != null) {
            NYTD_PlaylistMgr._nextUpList.overlayPlaying(
                NYTD_PlaylistMgr._modVP.getCurrentVideo(),
                NYTD_PlaylistMgr._stop
            );

            var currentLineupRefId = getPageKnewsLineupRefId();
            NYTD_PlaylistMgr._bcPlaylistObj = NYTD_PlaylistMgr._modCT.getPlaylist(currentLineupRefId, 'referenceId', 0, 100);
            NYTD_PlaylistMgr._nextUpList.currentTitleIndex = NYTD_PlaylistMgr._nextUpList.findIndexOfTitle(vid.referenceId);
            var videoList = NYTD_PlaylistMgr.getVideoList();

            if ((videoList != null) && (typeof NYTD_PlaylistMgr._bcPlaylistObj != 'undefined')) {
                var idx = videoList.getSelectedIndex();

                var titleAvailInfo = NYTD_PlaylistMgr.checkTitleMetaAvailByBcId( NYTD_PlaylistMgr._bcPlaylistObj.videoIds[idx], idx );
                NYTD_PlaylistMgr._cacheSkipInfo = titleAvailInfo;
                if (titleAvailInfo===false) {
                    return;
                }
                NYTD_PlaylistMgr.gotoVideo(titleAvailInfo.bcTitlePos);

                NYTD_PlaylistMgr.displayNameAndDesc();
                // Reload Taboola R-Box with new recommendations
                TRC.playVideo(getKnewsTitleRefId());
            }
        }
    },

    /*
    * display name and description for current title
    */
    displayNameAndDesc: function () {
        try {
            var title = NYTD_PlaylistMgr._nextUpList.getTitle(NYTD_PlaylistMgr._cacheSkipInfo.nytTitlePos);
            if (title != null) {
                NYTD_PlaylistMgr._curCategory = title.lname;
                $('libraryPlayerTitleName').innerHTML = title.name || "";
                $('libraryPlayerDesc').innerHTML      = title.desc || "";
                $('libraryRelatedContent').innerHTML  = title.relcon || "";
                var creditNode = $('credit'), prodContent = title.auth || "";
                if ((typeof prodContent!='undefined') && (prodContent!='') &&
                    (typeof creditNode !='undefined') && (creditNode!=null) ) {
                    creditNode.innerHTML = "Produced by "+decodeURIComponent( title.auth || "" );
                } else {
                    creditNode.innerHTML = "";
                }
            }
        } catch (e) {}
    },

    /**
    * callback for BC videoComplete event.
    */
    videoComplete: function ()
    {
        // Just in case it's gotten undefined, reset the play counter
        if (typeof NYTD_PlaylistMgr['_titlePlayCount'] == 'undefined') {
            NYTD_PlaylistMgr._titlePlayCount = 0;
        }

        // if last video in visible list has finished, go to next page
        if (NYTD_PlaylistMgr._nextUpList != null) {
            var videoList = NYTD_PlaylistMgr.getVideoList();
            if (videoList != null) {
                var next_idx = videoList.getSelectedIndex();
                NYTD_PlaylistMgr._nextUpList.videoComplete(next_idx);
            }
        }
    },

    /*
    * get the BC playlist object from the player - only in tabbed player
    * @return {Object} BC video list obj
    */
    getVideoList: function () {
        return NYTD_PlaylistMgr._modExp.getElementByID("videoList");
    },

    /*
    * handle "prev" playlist button
    * @param id {String} the id of the playlist DOM object
    */
    prev: function (id) {
        NYTD_PlaylistMgr._playlist_arr[id].page(-1);
    },

    /*
    * handle "next" playlist button
    * @param id {String} the id of the playlist DOM object
    */
    next: function (id) {
        NYTD_PlaylistMgr._playlist_arr[id].page(1);
    },

    /*
    * callback for BC contextLoad event.  This event happens the first time tha player loads
    */
    contentLoad: function () {
        // if playlist URI has a refId on the end after #, advance to that item
        var refId = window.location.hash.substr(1);
        if (NYTD_PlaylistMgr._nextUpList && refId) {
            var index = NYTD_PlaylistMgr._nextUpList.findIndexOfTitle(refId);
            if (index != null) {
                NYTD_PlaylistMgr.gotoVideo(index);
                
                var page = Math.floor(index / NYTD_PlaylistMgr._nextUpList.pageSize);
                if (page > 0) {
                    NYTD_PlaylistMgr._nextUpList.page(page);
                }
            }
        }
        
        var pageLineupRef = getPageKnewsLineupRefId();
        if( (typeof pageLineupRef == 'undefined') || !(pageLineupRef+'').match(/^\d+$/) ) {
            return;  // Sorry, can't do anything - page doesn't contain a valid lineup
        }
        NYTD_PlaylistMgr._bcPlaylistObj = NYTD_PlaylistMgr._modCT.getPlaylist( pageLineupRef, 'referenceId', 0, 100 );
    },

    checkTitleMetaAvailByBcId: function(currTitleBcId, currPos) {
        var nytTitlePtr = 0,
            bcTitlePtr  = currPos,
            bcTitleList = NYTD_PlaylistMgr._bcPlaylistObj.videoIds,
            playlistCurrent = NYTD_PlaylistMgr._playlist_arr['playlistCurrent'];

        // 1. Determine whether the current title is avail in metadata
        while ((nytTitlePtr < playlistCurrent.obj.list.length) &&
            (parseInt(playlistCurrent.obj.list[nytTitlePtr].id) != parseInt(currTitleBcId)) ) {
            nytTitlePtr++;
        }

        // 1.1 Current title found?  Return the title position
        if( nytTitlePtr < playlistCurrent.obj.list.length ) {
            return( { "bcTitlePos":bcTitlePtr, "nytTitlePos":nytTitlePtr } );
        }

        // 2. Curr title not found, so search for the next title that *is* available in metadata
        //   -Outer loop, scans the list of titles in the player
        for( bcTitlePtr=currPos; bcTitlePtr<bcTitleList.length; bcTitlePtr++ ) {

            // Inner loop, scans the list of titles in NYT metadata
            for( nytTitlePtr=0; nytTitlePtr<playlistCurrent.obj.list.length; nytTitlePtr++ ) {

                // Is there an intersection where the titles exist in both places?
                if( playlistCurrent.obj.list[nytTitlePtr].id == bcTitleList[bcTitlePtr] ) {

                    // Found the same title in BC playlist data as in NYT metadata
                    // Return the position the title was found at
                    return( { "bcTitlePos":bcTitlePtr, "nytTitlePos":nytTitlePtr } );
                }
            }
        }

        // Couldn't find any title in metadata - return false
        return false;
    },

    convertRefIdPos2BcIdPos: function(currTitleRefId, currPos) {
        var nytTitlePtr = currPos,
            bcTitlePtr  = 0,
            bcTitleList = NYTD_PlaylistMgr._bcPlaylistObj.videoIds,
            playlistCurrent = NYTD_PlaylistMgr._playlist_arr['playlistCurrent'];

        // 1. Determine whether the current title is avail in metadata
        while (nytTitlePtr < playlistCurrent.obj.list.length &&
            playlistCurrent.obj.list[nytTitlePtr].ref != currTitleRefId) {
            nytTitlePtr++;
        }

        // Now that we've found the requested title's NYT position, grab the BC ID so we can translate
        var titleBcId = playlistCurrent.obj.list[nytTitlePtr].id;

        // 2. Curr title not found, so search for the next title that *is* available in metadata
        //   -Outer loop, scans the list of titles in the player
        for (bcTitlePtr=0; bcTitlePtr<bcTitleList.length; bcTitlePtr++ ) {
            // Is there an intersection where the titles exist in both places?
            if (bcTitleList[bcTitlePtr]==titleBcId) {
                // Found the same title in BC playlist data as in NYT metadata
                // Return the position the title was found at
                return {
                    "bcTitlePos": bcTitlePtr,
                    "nytTitlePos": nytTitlePtr
                };
            }
        }

        // Couldn't find any title in metadata - return false
        return false;
    },

    /*
    * handle click on auto-advance checkbox.  set property in BC player
    * @param e {Event} event used to determine state of checkbox
    */
    toggleAutoAdvance: function (e) {
        var el = Event.element(e);
        NYTD_PlaylistMgr._autoAdvance = el.checked;
        var videoList = NYTD_PlaylistMgr.getVideoList();
        if (videoList != null) {
            videoList.setAutomaticAdvance(NYTD_PlaylistMgr._autoAdvance);
        }
    },

    shuffleList: function (id) {
        NYTD_PlaylistMgr._playlist_arr[id].shuffleList();
        NYTD_PlaylistMgr._playlist_arr[id].pageAbs(0);
    },

    RenditionMonitor:function (e) {
        var title = NYTD_PlaylistMgr._nextUpList.getTitle(),
            titleName = '',
            titleRefId = '',
            timeStamp = new Date().toLocaleString();
        if (title != null) {
            titleName = ' for ' + (title.name || "n/a");
            titleRefId = ' (' + ( title.ref || "n/a" ) + ')';
        }
        
        if( (e.type == 'renditionChange') && (typeof console != 'undefined') && console['log'] ) {
            console.log(
                "Rendition switch"
                + titleName
                + titleRefId
                + ":  (at "
                + timeStamp
                + ")\n\t"
                + e.rendition.frameWidth
                + " x "
                + e.rendition.frameHeight
                + " @ "
                + (e.rendition.encodingRate / 1000)
                + " Kbps; Screen Resolution: "
                + screen.width
                + " x "
                + screen.height
                + "\n\tFLV/RTMP: "
                + e.rendition.defaultURL
            );
        }
    }
};


var NYTD_VideoAdMgr = {
    adxAjaxHandler: function (response) {
        var jsonResp = {};
        try {
            jsonResp = response.responseText.evalJSON();
        } catch(e) {
            var errMsg = 'Error during eval: '+e;
            jsonResp = {};
        }

        // Iterate the returned ad positions
        var didPlayVideoAd = false;
        for (positionName in jsonResp) {
            // Special case: video ad
            if (positionName == "VideoPlayerAd") {
                didPlayVideoAd = true;
                NYTD_VideoAdMgr._modAds.showAd( jsonResp.VideoPlayerAd );

            // All other cases: match the position name with a DOM element named "adx" + positionName
            } else {
                var positionNameEl = $("adx" + positionName);
                if( positionNameEl ) {
                    positionNameEl.innerHTML = jsonResp[positionName];

                // Try positionName by itself, in case a dev forgot about "adx" + positionName
                } else {
                    var positionNameEl = $(positionName);
                    if( positionNameEl ) {
                        positionNameEl.innerHTML = jsonResp[positionName];
                    } else {
                        // Did not find adx position in page, nothing else we can do
                    }

                }
            }
        }
        
        if (!didPlayVideoAd) {
            NYTD_VideoAdMgr._modAds.resumeAfterExternalAd();
        }
    },

    externalAdEvent: function (ev) {
        // Just in case it's gotten undefined, reset the play counter
        if (typeof NYTD_PlaylistMgr['_titlePlayCount'] == 'undefined') {
            NYTD_PlaylistMgr._titlePlayCount = 0;
        }
        var adxCfg = window.vidLibAdxConfig;
        var campaignCounter = NYTD_PlaylistMgr._titlePlayCount % adxCfg.modBase + 1;
        NYTD_PlaylistMgr._titlePlayCount++;

        var newAdxUrl = adxCfg.baseSvcUrl
                    + '?pagename='
                    + adxCfg.basePagename
                    + campaignCounter
                    + '&positions='
                    + adxCfg.positions
                    + '&response_format='
                    + adxCfg.format
                    + '&ver='
                    + Math.random()
                    ;

        var adAjax = new Ajax.Request(
            newAdxUrl, {
                method    : 'get',
                onComplete: NYTD_VideoAdMgr.adxAjaxHandler,
                parameters: ''
            }
        );
        if (NYTD_PlaylistMgr._nextUpList != null) {
            NYTD_PlaylistMgr._nextUpList.overlayPlaying(-1);
        }
    },

    adCompleteEvent: function (ev) {
        // not curretly implemented
    }
};

/**
 * initial BC callback.  Store a refererence to player modules; start event listeners
 */

function onTemplateLoaded(pEvent) {
    ///// Acquire refs to principal BC player/adv APIs \\\\\
    NYTD_PlaylistMgr._bcExp = brightcove.getExperience(pEvent);
    NYTD_PlaylistMgr._modExp = NYTD_PlaylistMgr._bcExp.getModule(APIModules.EXPERIENCE);
    NYTD_PlaylistMgr._modVP = NYTD_PlaylistMgr._bcExp.getModule(APIModules.VIDEO_PLAYER);
    NYTD_PlaylistMgr._modCT = NYTD_PlaylistMgr._bcExp.getModule(APIModules.CONTENT);

    ///// Subscribe NYTD_PlaylistMgr to events needed for rotating in-page visible metadata \\\\\
    // needed for Acudue to get updated videoindex values
    NYTD_PlaylistMgr._modVP.addEventListener("mediaChange", onBrightcoveVideoChange);
    NYTD_PlaylistMgr._modVP.addEventListener(BCVideoEvent.VIDEO_COMPLETE, NYTD_PlaylistMgr.videoComplete);
    NYTD_PlaylistMgr._modVP.addEventListener(BCVideoEvent.VIDEO_START, NYTD_PlaylistMgr.videoStart);
    NYTD_PlaylistMgr._modExp.addEventListener(BCExperienceEvent.CONTENT_LOAD, NYTD_PlaylistMgr.contentLoad);

    if (isRenditionDebugMode()) {
        NYTD_PlaylistMgr._modVP.addEventListener('renditionChange', NYTD_PlaylistMgr.RenditionMonitor);
    }

    ///// Subscribe NYTD_WebtrendsMonitor to player events for WT tracking  \\\\\
    NYTD_PlaylistMgr._modVP.addEventListener(BCVideoEvent.STREAM_START, NYTD_WebtrendsMonitor.PlayerEventDemux);
    NYTD_PlaylistMgr._modVP.addEventListener(BCVideoEvent.VIDEO_COMPLETE, NYTD_WebtrendsMonitor.PlayerEventDemux);
    NYTD_PlaylistMgr._modExp.addEventListener('enterFullScreen', NYTD_WebtrendsMonitor.PlayerEventDemux);
    NYTD_PlaylistMgr._modExp.addEventListener('exitFullScreen', NYTD_WebtrendsMonitor.PlayerEventDemux);

    /// Advertising \\\
    /// Subscribe to 'templateReady' event, which tells us when the player has achieved a state of readiness \\\
    NYTD_PlaylistMgr._modExp.addEventListener(BCExperienceEvent.TEMPLATE_READY, NYTD_PlaylistMgr.templateReady);
}

/**
 * Added for Acudeo to get nyt_videoindex value
 */

function onBrightcoveVideoChange(evt) {
    var adxCfg = window.vidLibAdxConfig;
    var videoIndex = NYTD_PlaylistMgr._titlePlayCount % adxCfg.modBase + 1;

    //increase video played count by 1 each time Brightcove signals for media change
    NYTD_PlaylistMgr._titlePlayCount++;

    //signal acudeo plugin to change nyt_videoindex parameter
    document.myExperience.setAdParams({
        "nyt_videoindex": videoIndex
    });
    
    var title = NYTD_PlaylistMgr._nextUpList.getTitle(NYTD_PlaylistMgr._cacheSkipInfo.nytTitlePos);
    if (title != null) {
        NYTD_PlaylistMgr._curCategory = title.lname;
    }
}


/**
 * this class is a shell around playlists which are server generated
 */
var NYTD_Playlist = Class.create({
//NYTD_Playlist.prototype = {
    obj:null,                   // json obj containing the id of the playlist DOM object and a list
                                // with list meta-data in form:
                                // { id: playlistDomId, [ { ref: videoref, imgsrc: http://imgsrc, name: videoName }, ...]}
    nextUp:false,               // if true, this list is the "next Up" list
    doOverlayPlaying:false,     // if true, overlay "playing" on current video in playlist
    lastOverlayPlaying:null,    // id of element which has "playing" overlayed
    overlayElement:null,        // the overlay element
    thumbType:null,             // type of thumb to display ( timg_small, timg_wide )
    currentTitleIndex:null,     // index of the playing title

    /*
    * @param objId {String} id of the playlist DOM obj
    * @constructor (called by)
    */
    initialize: function (obj) {
        if (obj == null) {
            throw "NYTD_Playlist._init: null object";
        }
        this.obj = obj;
        var playlistObj = $(obj['id']);
        if (playlistObj == null) {
            throw "NYTD_Playlist._init: Can't find playlist: "+obj['id'];
        }
        // check for other params
        this.nextUp = (obj['nextUp'] == true);
        this.doOverlayPlaying = (obj['overlayPlaying'] == true);
        this.overlayPlayingClass = obj['overlayPlayingClass'] || "message";
        this.overlayPlayingText = obj['overlayPlayingText'] || "PLAYING";
        this.thumbType = /*obj['thumbType'] || */"timg_wide";

        this.pageSize = obj['viscnt'];
        this.titleTag = ((playlistObj.select("li").length > 0)?"li":"td");  // vert lists use li; horiz lists use td
        var fltNumPages = obj['list'].length / this.pageSize;
        var intNumPages =  Math.floor(fltNumPages);
        this.numPages = intNumPages + ((fltNumPages == intNumPages)?0:1);
        this.curPage = 0;
        this.updatePageButtons();
    },

    /*
    * update prev/next/current page buttons
    */
    updatePageButtons: function () {
        if ($(this.obj['id']+'_curPage') == null) {
            return;
        }
        
        try {
            $(this.obj['id']+'_curPage').innerHTML = ((this.numPages<1)?"":(this.curPage==0)?(this.curPage+1):' | '+(this.curPage+1));
            $(this.obj['id']+'_of').innerHTML = ((this.numPages<1)?"":"of");
            $(this.obj['id']+'_numPages').innerHTML = ((this.numPages<1)?"":(this.curPage+1==this.numPages)?this.numPages:this.numPages+' | ');

            $(this.obj['id']+'_prev').style.display = ((this.curPage > 0)?"inline":"none");
            $(this.obj['id']+'_next').style.display = (((this.curPage + 1) < this.numPages)?"inline":"none");
        } catch (e) {}
    },

    /*
    * get the title data record at index idx of the playlist
    * @param @idx {Number} idx of playlist array
    * @return {Object} title record
    */
    getTitle: function (idx) {
        if ((idx == null) || (typeof idx == 'undefined')) {
            idx = this.currentTitleIndex;
        }

        var referTo = this.obj['referToId'];
        if (referTo != null) {
            var playlist = NYTD_PlaylistMgr.getPlaylist(referTo);
            if (playlist != null) {
                return playlist.getTitle(this.obj.list[idx]);
            }
        } else if (idx < this.obj.list.length) {
            return this.obj.list[idx];
        } else {
            return null;
        }
    },

    /*
    * Search through titles of playlist for refId, returns index if found
    * @param refId {String} reference id of video
    * @returns {Number} index of video with reference id refId
    */
    findIndexOfTitle: function (refId)
    {
        if ((refId == null) || (refId == '')) {
            return null;
        }
        
        var ret = null;
        for (var i=0; i<this.obj.list.length; i++) {
            var title = this.getTitle(i);
            if ((title != null) && (title['ref'] == refId)) {
                ret = i;
                break;
            }
        }
        return ret;
    },

    /*
    * Search through titles of playlist for refId, returns index if found
    * @param refId {String} reference id of video
    * @returns {Number} index of video with reference id refId
    */
    findTitleByBcId : function (bcId) {
        if ( (typeof bcId == 'undefined') || (bcId == null) || (bcId == '') ) {
            return false;
        }
        var finTitle = false,
            title    = false;
        for (var i=0; i<this.obj.list.length; i++) {
            title = this.getTitle(i);
            if ((typeof title != 'undefined') && (title['id'] == bcId)) {
                finTitle = title;
                break;
            }
        }
        return finTitle;
    },

    /*
    * @param title {String} The reference id of the title
    * @param stop {boolean} if true, hide all overlays
    */
    overlayPlaying: function (title, stop) {
        try {
            if (this.doOverlayPlaying) {
                var playlistObj = $(this.obj['id']);
                var playlist = this;
                playlistObj.select(this.titleTag).each(function (el) {
                    if (title && (el.getAttribute('titleref') == title['referenceId']) && !stop) {
                        //display "playing"
                        el.addClassName("playing");
                        // scroll div to this title
                        if (playlistObj.scrollTo) {
                            playlistObj.scrollTo(0, el.offsetTop);
                        }
                    } else {
                        //hide "playing"
                        el.removeClassName("playing");
                    }
                });
            }
        } catch (e) {}
    },

    /*
    * handle paging of playlist.  makes the following assumtions:
    * 1. all displayed titles of the playlist live in divs which are direct children of the playlist object
    * 2. each title has one image
    * 3. anchors for the title contain the attribute "turi"
    * 4. anchors for the lineup contain the attribute "luri"
    * 5. text for the title lives in a span containing the attribute "tname"
    * 6. text for the lineup lives in a span containing the attribute "lname"
    *
    * @param relPage {Number} number of pages to move form current (ie: -1 means fo back 1 page)
    */
    page: function (relPage) {
        // set correct current page
        this.curPage += relPage;
        if (this.curPage < 0) this.curPage = 0;
        else if (this.curPage >= this.numPages) this.curPage = this.numPages;

        // iterate through title divs
        var idx = this.curPage * this.pageSize;  // index of current title in list
        var nodes = $(this.obj['id']).select(this.titleTag);
        var titleURI, randEl, nodeCount=nodes.length;
        for (var i=0; i<nodeCount; i++) {
            var el = nodes[i];  // el is the div containing playlist data for the title
            if (el.getAttribute("titleref") == null) {
                continue;
            }

            if (idx >= this.obj['list'].length) {
                el.style.visibility = "hidden"; // hide if we are past the length
                if (i>=4) {
                    el.style.display = "none";
                }
            } else {
                el.style.visibility = "visible";
                el.style.display = "";

                var title = this.getTitle(idx); // get the title data for the current index
                el.setAttribute('titleref', title.ref);
                titleURI = title.turi;
                // Using closure to associate specific titleURI with the event handler
                var ourFunFunc = (function (titleURI) {
                    var myTitleUri=titleURI;
                    return function () {
                        var href=myTitleUri.replace(/\#(\d+)/,'?r='+Math.floor(Math.random()*10000)+'#$1');
                        window.location.href = href;
                    };
                })(titleURI);

                el.onclick = ourFunFunc;

                var img = el.getElementsByTagName("IMG");  // update image
                img[0].src = title[this['thumbType']];

                var a = el.getElementsByTagName("A"); // update anchors with title/lineup URIs
                for (var j=0; j<a.length; j++) {
                    if (a[j].getAttribute("turi")) {
                        if (NYTD_PlaylistMgr._nextUpList.obj['id'] != this.obj['id']) {
                            a[j].href = title.turi;
                            a[j].onclick = ourFunFunc;
                        }
                    } else if (a[j].getAttribute("luri")) {
                        a[j].href = title.luri;
                    }
                }

                var span = el.getElementsByTagName("SPAN"); // update span with title/lineup names
                for (var j=0; j<span.length; j++) {
                    if (span[j].getAttribute("tname")) {
                        span[j].innerHTML=title.name;
                    } else if (span[j].getAttribute("lname")) {
                        span[j].innerHTML=title.lname;
                    }
                }
                idx++;
            }
        }

        this.updatePageButtons(); // update prev/next/current page buttons
    },

    pageAbs: function (absPage) {
        this.page(absPage - this.curPage);
    },

    /*
    * callback when a video complete
    * @next_idx {Number} index of next video in playlist
    */
    videoComplete: function (next_idx) {
        // when last visible video in a playlist complete, go to next page
        if (next_idx>0 & ((next_idx + (NYTD_PlaylistMgr._autoAdvance?0:1)) % this.pageSize) == 0) {
            this.page(1);
        }
    },

    shuffleList: function () {
        var i = this.obj['list'].length;
        if (i == 0) {
            return false;
        }
        
        while (--i) {
            var j = Math.floor(Math.random() * (i + 1));
            var tempi = this.obj['list'][i];
            var tempj = this.obj['list'][j];
            this.obj['list'][i] = tempj;
            this.obj['list'][j] = tempi;
        }
    }
});

/*
 * backward compatible method which scrolls element instead of whole page
 * src: http://www.garyharan.com/index.php/2007/11/26/how-to-unobtrusively-scroll-a-div-with-prototype-scriptaculous/
*/
Element.addMethods({
  scrollTo: function(element, left, top) {
    var scrollEl = $(element);
    
    if (arguments.length == 1) {
      var pos = scrollEl.cumulativeOffset();
      window.scrollTo(pos[0], pos[1]);
    } else {
      scrollEl.scrollLeft = left;
      scrollEl.scrollTop  = top;
    }
    return scrollEl;
  }
});


var NYTD_VideoEmailThis = {
    submit: function () {
        var curRefId = getKnewsTitleRefId();
        if (isNaN(parseInt(curRefId))) {
            return true;
        }
        this.RefreshETAHtmlAjaxReq(curRefId);
        return true;
    },

    RefreshETAHtmlAjaxReq: function (refId) {
        var etaUrl = window.etaUrl + refId + ".html";
        var adAjax = new Ajax.Request(etaUrl, {
            method     : 'get',
            onComplete : NYTD_VideoEmailThis.ETAAjaxHandler,
            parameters : ''
        });
    },

    ETAAjaxHandler: function (response) {
        var jsonResp = {};
        try {
            // ETA html refresh response:
            htmlResp = response.responseText;

            var emailThisForm = $('emailThisForm');
            if (typeof emailThisForm != 'undefined') {
                // Removing emailThisForm
                emailThisForm.remove();
            }

            // Replacing 'emailThisForm'
            var emailThisContainer = $('emailThisFormContainer');
            if (typeof emailThisContainer != 'undefined') {
                emailThisContainer.innerHTML = htmlResp;
            }

            // Reacquire reference to emailThisForm, as it's new
            var emailThisForm = $('emailThisForm');
            if (typeof emailThisForm != 'undefined') {
                // Submitting emailThisForm
                emailThisForm.submit();
            }

        } catch (e) {
            var errMsg = 'Error: '+e;
            typeof console !='undefined' && console['log'] ? console.log(errMsg) : 0;
        }
    }
};


var NYTD_WebtrendsMonitor = {
    DEBUG: false,
    PlayerEventDemux : function (event) {
        if (typeof NYTD_PlaylistMgr._userPlayTime != 'undefined') {
            var timeSinceClick = (new Date()).getTime() - NYTD_PlaylistMgr._userPlayTime;
        }

        var knewsId = getKnewsTitleRefId() || getPageKnewsLineupRefId() || 0;
        var eventSource;

        switch (event.type) {
            case 'streamStart' :
                evType    = 'play';
                evSubType = 'start';
                eventSource = NYTD_PlaylistMgr._isUserClick == true ? 'user' : 'auto';
                NYTD_PlaylistMgr._isUserClick = false;  //reset it for the next video
                break;

            case 'videoComplete' :
                evType      = 'finish';
                evSubType   = 'stop';
                eventSource = 'null';
                break;

            case 'enterFullScreen' :
                evType      = 'go';
                evSubType   = 'big';
                eventSource = 'null';
                break;

            case 'exitFullScreen' :
                evType      = 'go';
                evSubType   = 'small';
                eventSource = 'null';
                break;

            default:
                return;
        }

        var wtLastEventTimeKey = evType + '.' + evSubType;
        var currentEventTime = (new Date()).getTime();
        var lastEventTime = NYTD_PlaylistMgr._wtRecentEvents[wtLastEventTimeKey] || 0;
        NYTD_PlaylistMgr._wtRecentEvents[wtLastEventTimeKey] = currentEventTime;

        NYTD_WebtrendsMonitor.DEBUG && isConsole && console.log(
            (lastEventTime != 'undefined') +", "+
            lastEventTime+" + " +
            NYTD_PlaylistMgr._wtLatencyThresh +
            " >= "+currentEventTime+" = "+
            ((lastEventTime + NYTD_PlaylistMgr._wtLatencyThresh) >= currentEventTime)
        );
        if ((lastEventTime != 'undefined')
            && ((lastEventTime + NYTD_PlaylistMgr._wtLatencyThresh) >= currentEventTime )) {
            NYTD_WebtrendsMonitor.DEBUG && isConsole && console.log( "Dropping event: "+wtLastEventTimeKey );
            return;
        }

        var sectionDisplay = NYTD_PlaylistMgr._curCategory;

        NYTD_WebtrendsMonitor.DeliverWTEvent(
            evType,          // 'play', 'go', ...
            evSubType,       // play[start,stop], go[big,small]
            eventSource,     // play[user,auto]
            getShareSection(),
            sectionDisplay,
            getShareHeadline(),
            knewsId
        );
    },

    DeliverWTEvent: function (
        eventName,      // 'play', 'go', ...
        eventSub,       // play[start,stop], go[big,small]
        eventSource,    // play[user,auto]
        sectionName,
        videoCategory,
        videoTitle,
        knewsId
    ) {
        var dcsm = 0;
        var eventNameLower   = eventName.toLowerCase(),
            eventNameInitCap = eventName.substring(0,1).toUpperCase()
                            + eventNameLower.substring(1);
        var eventSubLower    = eventSub.toLowerCase(),
            eventSubInitCap  = eventSub.substring(0,1).toUpperCase()
                            + eventSubLower.substring(1);
        var videoUri = '/video/library/' + eventNameInitCap;

        if ( eventSubInitCap == 'Big' || eventSubInitCap == 'Small') {
            eventNameLower = eventNameLower + ' ' + eventSubLower;
            videoUri = videoUri + eventSubInitCap;
            dcsm = 1;
        } else {
            dcsm = 0;
        }

        NYTD_WebtrendsMonitor.DEBUG && isConsole && console.log( "wtrends: "+
            '\nDCS.dcssip=',       'www.nytimes.com',
            '\nDCS.dcsuri=',       videoUri + '.html',
            '\nWT.ti=',            'Video Library '  +
                                eventNameInitCap  +
                                eventSubInitCap,
            '\nWT.videoCategory=', videoCategory,
            '\nWT.videoEvent=',    eventNameLower,
            '\nWT.videoLoad=',     eventSource,
            '\nWT.videoName=',     videoTitle,
            '\nWT.z_gpsst=',       'Video-' +
                                eventNameInitCap,
            '\nWT.z_gpst=',        'Video',
            '\nWT.z_gpt=',         'Multimedia',
            '\nWT.z_vid=',         knewsId+'',       // coerce to string, in case it was provided as a number
            '\nWT.z_vpt=', 'Library',
            '\nWT.z_dcsm=',        dcsm

        );

        (typeof dcsMultiTrack != 'undefined') && dcsMultiTrack(
            'DCS.dcssip',       'www.nytimes.com',
            'DCS.dcsuri',       videoUri + '.html',
            'WT.ti',            'Video Library '  +
                                eventNameInitCap  +
                                eventSubInitCap,
            'WT.videoCategory', videoCategory,
            'WT.videoEvent',    eventNameLower,
            'WT.videoLoad',     eventSource,
            'WT.videoName',     videoTitle,
            'WT.z_gpsst',       'Video-' +
                                eventNameInitCap,
            'WT.z_gpst',        'Video',
            'WT.z_gpt',         'Multimedia',
            'WT.z_vid',         knewsId+'',       // coerce to string, in case it was provided as a number
            'WT.z_vpt', 'Library',
            'WT.z_dcsm',        dcsm
        );
    }
};


NYTD.VideoLibrary = (function () {
    var refId;
    
    var onVideoDataLoad = function (data) {
        if (!data) {
            throw 'BrightCove "find_video_by_reference_id" API returned invalid data';
        }

        var orderedRefIds = ['video_xxxl_hb_mm', 'video_s_3g_hp'],
            videoWidth = 500, videoHeight = 281, // 16:9 = 500/281
            videoContainerEl = $('myExperience').parentNode;
            
        var videoEl = new Element('video', {
            'poster': data.videoStillURL,
            'controls': '',
            'width': videoWidth,
            'height': videoHeight,
        });

        // Build a list of compatible H264 <source>s
        var hasCompatibleVideo = false;
        for (var i=0; i<orderedRefIds.length; i++) {
            for (var j=0, len=data.renditions.length; j<len; j++) {
                var rendition = data.renditions[j];
                if (rendition.referenceId.indexOf(orderedRefIds[i]) != -1) {
                    hasCompatibleVideo = true;
                    videoEl.appendChild(new Element('source', {
                        'src': rendition.url
                    }));
                    break;
                }
            }
        }

        videoContainerEl.update(videoEl);
        videoContainerEl.setStyle({
            'width': videoWidth + 'px',
            'height': videoHeight + 'px'
        });

        if (!hasCompatibleVideo) {
            videoContainerEl.update('<p>The video you requested is not currently available.</p>');
        }

        // WebTrends
        var knewsId       = getKnewsTitleRefId() || getPageKnewsLineupRefId() || 0;
            shareSection  = getShareSection(),
            shareHeadline = getShareHeadline()
            videoCategory = (function () {
                for (var i=0; i<data.tags.length; i++) {
                    var tag = data.tags[i];
                    if (tag.indexOf('nytsec0') > -1) {
                        return tag.substr(8);
                    }
                    return '';
                }
            })();
            
        videoEl.observe('playing', function () {
            if (this.currentTime !== 0) {
                return false;
            }

            NYTD_WebtrendsMonitor.DeliverWTEvent(
                'play',
                'start',
                // on ipad/iphone, playback has to be user-triggered (this assumption
                // might change if <video> is implemented on desktop browsers)
                'user',
                shareSection,
                videoCategory,
                shareHeadline,
                knewsId
            );
        });
        videoEl.observe('ended', function () {
            NYTD_WebtrendsMonitor.DeliverWTEvent(
                'finish',
                'stop',
                'null',
                shareSection,
                videoCategory,
                shareHeadline,
                knewsId
            );
        });
        
        TRC.playVideo(refId);
    };
    
    var convertToHtmlVideo = function () {
        // Find videoId from refId
        refId = getKnewsTitleRefId();

        // Highlight selected video in the playlist if available
        var selectedListEl = $$('#playlistCurrent ul li[titleref=' + refId + ']')[0];
        if (selectedListEl) {
            selectedListEl.addClassName('playing');
            $('playlistCurrent').scrollTo(0, selectedListEl.offsetTop);
        }

        // Grab data from BrightCove API for H.264 video URLs via JSONP
        var apiToken = 'cE97ArV7TzqBzkmeRVVhJ8O6GWME2iG_bRvjBTlNb4o.';
        var scriptEl = new Element('script', {
            'src': '//api.brightcove.com/services/library?command=find_video_by_reference_id&reference_id=' +
                refId + '&token=' + apiToken + '&callback=NYTD.VideoLibrary.onVideoDataLoad&media_delivery=http'
        });
        document.body.appendChild(scriptEl);
    };
    
    var init = function () {
        var isMobileSafari = navigator.userAgent.indexOf('AppleWebKit') && ('createTouch' in document),
            isUsingHtmlVideo = isMobileSafari; // Potentially enable HTML5 on other platforms

        if (isUsingHtmlVideo) {
            convertToHtmlVideo();
        } else {
            $$('#playlistCurrent ul')[0].observe('click', function (e) {
                // Find element with "visidx" attribute
                var el = e.element(), index;
                do {
                    index = el.getAttribute('visidx');
                    el = el.parentNode;
                } while (!index)

                e.stop();
                NYTD_PlaylistMgr.gotoVideo(index, el);
            });
        }
    }
    
    return {
        init: init,
        onVideoDataLoad: onVideoDataLoad // Make it reachable from the callback
    };
})();