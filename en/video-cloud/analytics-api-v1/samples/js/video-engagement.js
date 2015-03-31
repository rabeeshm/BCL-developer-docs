var BCLS = (function ($, window, AnyTime) {
    "use strict";
    var // aapi stuff
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        account_id = "20318290001",
        $client_id = $("#client_id"),
        client_id = "5746d707-db97-42b2-b4f0-3db890429ef0",
        $client_secret = $("#client_secret"),
        client_secret = "JBdg3PLg0NarokKjIihxa_05i-YVyvhICWlQ5NXMSlUX9H9tzYqQ8FE-4mMfhAWOMs0KxUHyUN3anzkZSr3Bvg",
        $scopeSelect = $("#scopeSelect"),
        scope = "account",
        $playerID = $("#playerID"),
        player_id = "baf68072-fb1a-4461-a00c-72b8a7f4cb10",
        $videoID = $("#videoID"),
        video_id = "821141023001",
        $pid = $("#pid"),
        $vid = $("#vid"),
        $requestButton = $("#requestButton"),
        $request = $("#request"),
        $submitButton = $("#submitButton"),
        $required = $(".required"),
        $requestInputs = $(".aapi-request"),
        $responseFrame = $("#responseFrame"),
        $this,
        separator = "",
        requestTrimmed = false,
        lastChar = "",
        requestURL = "",
        chartEngagement = "#chartEngagement",
        responseData,
        // functions
        isDefined,
        secondsToTime,
        removeSpaces,
        makeEngagementGraph,
        trimRequest,
        buildRequest,
        getData;

    // allow array forEach method in older browsers
    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function(fn, scope) {
            for(var i = 0, len = this.length; i < len; ++i) {
                fn.call(scope || this, this[i], i, this);
            }
        }
    }
    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if(v !== "" && v !== null && v !== "undefined") { return true; }
        else { return false; }
    }

    // utility to extract h/m/s from seconds
    secondsToTime = function (secs) {
        var hours, divisor_for_minutes, divisor_for_seconds, seconds, minutes, obj = {};
        hours = Math.floor(secs / (60 * 60));
        if (hours < 10 ) {
            hours = "0" + hours.toString();
        } else {
            hours = hours.toString();
        };
        divisor_for_minutes = secs % (60 * 60);
        minutes = Math.floor(divisor_for_minutes / 60);
        if (minutes < 10 ) {
            minutes = "0" + minutes.toString();
        } else {
            minutes = minutes.toString();
        };
        divisor_for_seconds = divisor_for_minutes % 60;
        seconds = Math.ceil(divisor_for_seconds);
        if (seconds < 10) {
            seconds = "0" + seconds.toString();
        } else {
            seconds = seconds.toString();
        };
        obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    // remove spaces from string
    removeSpaces = function (str) {
        if (isDefined(str)) {
            str = str.replace(/\s+/g, '');
        return str;
        }
    }
    // create graph
    makeEngagementGraph = function(jsonObject) {
        var options = {pointDot : false}, chartData = {}, labels = [], data = [], video_engagement = jsonObject.metrics.video_engagement.series.values, video_duration = jsonObject.video_duration, series = {}, video_name = jsonObject.video_name, options = {pointDot : false}, ctx, myNewChart;
        // process response data
        video_engagement.forEach( function (element, index, array) {
            var timeformatted = secondsToTime((index * video_duration) / 100);
            if ((index + 1) % 10 === 0) {
                labels[index] = timeformatted.m + ":" + timeformatted.s;
            } else {
                labels[index] = "";
            }

            data[index] = element;
        });
        // chartData
        chartData = {
            labels : labels,
            datasets : [
                {
                    fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    data : data
                }
            ]
        }
        //Get the context of the canvas element we want to select
        ctx = document.getElementById("chartEngagement").getContext("2d");
        myNewChart = new Chart(ctx).Line(chartData, options);
    }
    trimRequest = function () {
        if (!requestTrimmed) {
            lastChar = requestURL.charAt((requestURL.length - 1));
            if (lastChar === "?" || lastChar === "&" || lastChar === ";") {
                requestURL = requestURL.substring(0, (requestURL.length - 1));
                // recall this function until trim finished
                trimRequest(requestURL);
            } else if (requestURL.indexOf("&&") > -1) {
                requestURL = requestURL.replace("&&", "&");
            } else if (requestURL.indexOf("?&") > -1) {
                requestURL = requestURL.replace("?&", "?");
            } else {
                requestTrimmed = true;
            }
        }
    }

    buildRequest = function () {

        if (isDefined($accountID.val())) {
            account_id = $accountID.val();
        }
        // reset requestTrimmed to false in case of regenerate request
        requestTrimmed = false;

        // build the request
        requestURL = $serviceURL.val();
        requestURL += "/accounts/" + removeSpaces($accountID.val()) + "/?";
        // end the where filters
        requestURL += "&";
        trimRequest();
        $request.html(requestURL);
        $authorizationDisplay.html(authorization);
        $request.attr("value", requestURL);
        $authorization.attr("value", authorization);
    }
    // submit request
    getData = function () {
        var options = {};
        options.client_id = (isDefined($client_id.val())) ? $client_id.val() : client_id;
        options.client_secret = (isDefined($client_secret.val())) ? $client_secret.val() : client_secret;
        options.requestType = "GET";
        $.ajax({
            url: $request.attr("value"),
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function(data) {
                makeEngagementGraph(data);
                $responseFrame.html(BCLSformatJSON.formatJSON(data));
            }
        })
    }
    // set up the anytime date/time pickers
    AnyTime.picker("startDate", {
        format: "%a %M %d %Y"
    });
    AnyTime.picker("startTime", {
        format: "%H:%i:%s %@",
        labelTitle: "Time",
        labelHour: "Hour",
        labelMinute: "Minute"
    });
    AnyTime.picker("endDate", {
        format: "%a %M %d %Y"
    });
    AnyTime.picker("endTime", {
        format: "%H:%i:%s %@",
        labelTitle: "Time",
        labelHour: "Hour",
        labelMinute: "Minute"
    });

    // set event listeners
    // if we get a mapi token , hide direct input of video id
    $mapitoken.on("change", function () {
        $directVideoInput.hide();
    });
    // listener for videos request
    $requestInputs.on("change", buildRequest);
    // rebuild request when video selector changes
    // send request
    $submitButton.on("click", getData);

    // generate initial request
    // buildRequest();
    return {
        buildRequest: buildRequest,
        onGetVideos: onGetVideos
    }
})($, window, AnyTime);