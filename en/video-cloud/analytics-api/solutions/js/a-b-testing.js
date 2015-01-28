var BCLS = (function ($, Handlebars) {
    "use strict";
    var callNumber = 0,
        accountID = 20318290001,
        $token = $("#token"),
        $playerSelector = $("#playerSelector"),
        $reportTableBody = $("#reportTableBody"),
        fromDate = "2015-01-19",
        $getData = $("#getData"),
        $gettingDataDisplay = $("#gettingDataDisplay"),
        $video_player_info = $("#video_player_info"),
        $requestURL = $("#requestURL"),
        currentPlayer,
        currentVideo,
        analyticsData = {},
        chartData = [],
        dataDisplayBodyTemplate = "{{#items}}<tr><td>{{player_name}}</td><td>{{video_view}}</td><td>{{play_rate}}</td><td>{{average_seconds_viewed}}</td><td>{{engagement_score}}</td></tr>{{/items}}",
        // more robust test for strings "not defined"
        isDefined = function (v) {
            if (v !== "" && v !== null && v !== "undefined") {
                return true;
            } else {
                return false;
            }
        },
        displayData = function () {
            var displayStr, template, results;
            currentPlayer = $playerSelector.filter(":selected").text();
            currentVideo = $videoSelector.filter(":selected").text();
            displayStr = "";
            if (currentPlayer !== "") {
                displayStr += "Player: " + currentPlayer + " ";
            }
            if (currentVideo !== "") {
                displayStr += "Video: " + currentVideo;
            }
            $video_player_info.html(displayStr);
            // table
            template = Handlebars.compile(dataDisplayBodyTemplate);
            results = template(analyticsData);
            $reportTableBody.html(results);
            // chart
            $.plot("#chartView", [chartData], {
                series: {
                    bars: {
                        show: true,
                        barWidth: 0.6,
                        align: "center"
                    }
                },
                xaxis: {
                    mode: "categories",
                    tickLength: 0
                }
            });
        },
        makeAnalyticsCall = function (callURL) {
            // clear chart data
            chartData = [];
            $.ajax({
                url: callURL,
                headers: {
                    Authorization: "Bearer " + $token.val()
                },
                success: function (data) {
                    var template, i, itemsmax, item, selectedGeo = $geoSelector.val();
                    switch (callType) {
                    case "players":
                        callNumber++;
                        template = Handlebars.compile(playerSelectTemplate);
                        $playerSelector.html(template(data));
                        $gettingDataDisplay.text("Player data retrieved");
                        // now get the videos data
                        getVideoData();
                        break;
                    case "videos":
                        callNumber++;
                        // populate the video selector
                        template = Handlebars.compile(videoSelectTemplate);
                        $videoSelector.html(template(data));
                        $gettingDataDisplay.text("Video data retrieved");
                        break;
                    case "analytics":
                        callNumber++;
                        itemsmax = data.items.length;
                        for (i = 0; i < itemsmax; i++) {
                            item = data.items[i];
                            item.avgSecondsViewed = item.video_seconds_viewed / item.video_view;
                            chartData.push([item[selectedGeo], item.video_view]);
                        }
                        analyticsData = data;
                        $gettingDataDisplay.text("Data retrieved - " + callNumber + " API calls made");
                        displayData();
                        break;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $gettingDataDisplay.text("Sorry, your request was not successful. Here's what the server sent back: " + errorThrown);
                }
            });
        },
        // get the analytics data for the videos
        getAnalyticsData = function () {
            var callURL;
            $gettingDataDisplay.text("Getting analytics data...");
            callType = "analytics";
            callURL = "https://data.brightcove.com/analytics-api/videocloud/accounts/" + $accountID.val() + "/report/?dimensions=country,city,region&sort_by=" + $sortSelector.val();


        },

        // set event listeners
        $getData.on("click", getAnalyticsData);
    return {};
})($, Handlebars);