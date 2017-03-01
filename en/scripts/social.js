var BCLS = (function () {
    "use strict";
    var proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
        serviceURL = "https://cms.api.brightcove.com/v1",
        $accountID = document.getElementById("accountID"),
            // for testing purposes
            account_id = "1486906377",
        $client_id = document.getElementById("client_id"),
            // for testing purposes
            client_id = "",
        $client_secret = document.getElementById("client_secret"),
            // for testing purposes
            client_secret = "",
        $pageURL = document.getElementById("pageURL"),
        $playerID = document.getElementById("playerID"),
            // for testing purposes
            player_id = "rkhHnDth",
        $playerWidth = document.getElementById("playerWidth"),
        $playerHeight = document.getElementById("playerHeight"),
        $videoID = document.getElementById("videoID"),
            // for testing purposes
            video_id = "4779638563001",
        $searchTerms = document.getElementById("searchTerms"),
        $pageSize = document.getElementById("pageSize"),
        $generateButton = document.getElementById("generateButton"),
        $requestInputs = document.getElementById(".papi-request"),
        $responseFrame = document.getElementById("responseFrame"),
        $generatedResults = document.getElementById("generatedResults"),
        $publishingCode = document.getElementById("publishingCode"),
        validJSON = false,
        template, data, result, selectedVideo,
        $selectCode = document.getElementById("selectCode"),
        $this,
        socialTemplate = "&lt;!-- Open Graph Sharing Metadata --&gt; \n&lt;meta property=\"og:site_name\" content=\"\"/&gt; \n&lt;meta property=\"og:title\" content=\"{{name}}\"/&gt; \n&lt;meta property=\"og:description\" content=\"{{description}}\"/&gt; \n&lt;meta property=\"og:url\" content=\"{{pageURL}}\"/&gt; \n&lt;meta property=\"og:image\" content=\"{{images.thumbnail.src}}\"/&gt; \n&lt;meta property=\"og:type\" content=\"video\"/&gt; \n&lt;meta property=\"og:video:secure_url\" content=\"{{securePageURL}}\"/&gt; \n&lt;meta property=\"og:video:type\" content=\"application/x-shockwave-flash\"/&gt; \n&lt;meta property=\"og:video:width\" content=\"{{playerWidth}}\"/&gt; \n&lt;meta property=\"og:video:height\" content=\"{{playerHeight}}\"/&gt; \n\n&lt;!-- Twitter: card/meta-tags --&gt; \n&lt;meta name=\"twitter:card\" content=\"player\"/&gt; \n&lt;meta name=\"twitter:site\" content=\"@username\"/&gt; \n&lt;meta name=\"twitter:title\" content=\"{{name}}\"/&gt; \n&lt;meta name=\"twitter:description\" content=\"{{description}}\"/&gt; \n&lt;meta name=\"twitter:image\" content=\"{{images.thumbnail.src}}\"/&gt; \n&lt;meta name=\"twitter:player\" content=\"{{playerURL}}\"/&gt; \n&lt;meta name=\"twitter:player:width\" content=\"{{playerWidth}}\"/&gt; \n&lt;meta name=\"twitter:player:height\" content=\"{{playerHeight}}\"/&gt; \n<meta name=\"twitter:stream\" content=\"{{pageURL}}\"/&gt; \n<meta name=\"twitter:stream:content_type\" content=\"video/mp4\"/&gt;",
        // functions
        getVideo,
        generateSocialTags,
        isDefined,
        bclslog,
        options;

    /**
     * Logging function - safe for IE
     * @param  {string} context description of the data
     * @param  {*} message the data to be logged by the console
     * @return {}
     */
    bclslog = function (context, message) {
        if (window["console"] && console["log"]) {
            console.log(context, message);
        };
        return;
    };

    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        } else { return false; }
    };

    // submit request to get video data for account
    getVideo = function () {
        if ($accountID.value == "" ||
            $client_id.value == "" ||
            $client_secret.value == "" ||
            $pageURL.value == "" ||
            $playerID.value == "" ||
            $videoID.value == "") {
                // clicked on generate before entering data
                alert("Please enter your data before generating tags");
                return;
        }

        account_id = (isDefined($accountID.value) ? $accountID.value : account_id);
        video_id = (isDefined($videoID.value) ? $videoID.value : video_id);
        player_id = (isDefined($playerID.value) ? $playerID.value : player_id);

        options = {};
        options.client_id = (isDefined($client_id.value) ? $client_id.value : client_id);
        options.client_secret = (isDefined($client_secret.value) ? $client_secret.value : client_secret);
        options.url = serviceURL + "/accounts/" + account_id + "/videos/" + video_id;
        options.requestType = "GET";

        bclslog("options", options);

        // make the CMS API request to get matching video IDs
        getVideoData(options, function (data) {
            generateSocialTags(data);
        });
    };

    /**
     * make the API request
     */
    function getVideoData(options, callback) {
        var httpRequest = new XMLHttpRequest(),
            responseRaw,
            parsedData,
            requestParams,
            dataReturned;
        // set up request data
        requestParams = 'url=' + encodeURIComponent(options.url) + '&requestType=' + options.requestType + '&client_id=' + options.client_id + '&client_secret=' + options.client_secret;
        // set response handler
        httpRequest.onreadystatechange = getResponse;
        // open the request
        httpRequest.open('POST', proxyURL);
        // set headers
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // open and send request
        httpRequest.send(requestParams);
        // response handler
        function getResponse() {
            dataReturned = false;
            try {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        responseRaw = httpRequest.responseText;
                        parsedData = JSON.parse(responseRaw);
                        dataReturned = true;
                    } else {
                        alert('There was a problem with the request. Request returned ' + httpRequest.status);
                    }
                }
            } catch (e) {
                alert('Caught Exception: ' + e);
            }
            if (dataReturned) {
                callback(parsedData);
            }
        }
    }

    generateSocialTags = function(JSONdata) {
        selectedVideo = JSONdata;
        selectedVideo.playerID = player_id;
        selectedVideo.pageURL = $pageURL.value;
        selectedVideo.securePageURL = "";
        if ($pageURL.value.substr(0,5) == "https") {
            selectedVideo.securePageURL = $pageURL.value;
        }
        selectedVideo.playerWidth = $playerWidth.value;
        selectedVideo.playerHeight = $playerHeight.value;
        selectedVideo.playerURL = "https://players.brightcove.net/" + account_id + "/" + player_id + "_default/index.html?videoId=" + video_id;
        template = Handlebars.compile(socialTemplate);
        data = selectedVideo;
        result = template(data);
        $publishingCode.innerHTML = result;
    };

    // set listeners for buttons
    $generateButton.addEventListener("click", getVideo);
    $selectCode.addEventListener("click", function() {
        document.getElementById("publishingCode").select();
    });

})();
