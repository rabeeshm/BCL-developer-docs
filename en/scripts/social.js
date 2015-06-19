var BCLS = (function () { 
    "use strict";
	  var proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
        serviceURL = "https://cms.api.brightcove.com/v1",
        $accountID = $("#accountID"),
        $client_id = $("#client_id"),
            // for testing purposes
            client_id = "",
        $client_secret = $("#client_secret"),
            // for testing purposes
            client_secret = "",
        $pageURL = $("#pageURL"),
        $playerID = $("#playerID"),
        $playerWidth = $("#playerWidth"),
        $playerHeight = $("#playerHeight"),
        $videoID = $("#videoID"),
        $searchTerms = $("#searchTerms"),
        $pageSize = $("#pageSize"),
        $generateButton = $("#generateButton"),
        $requestInputs = $(".papi-request"),
        $responseFrame = $("#responseFrame"),
        $generatedResults = $("#generatedResults"),
        $publishingCode = $("#publishingCode"), 
        validJSON = false,
        template, data, result, selectedVideo, $selectCode = $("#selectCode"),
        $this,
        socialTemplate = "&lt;!-- Open Graph Sharing Metadata --&gt; \n&lt;meta property=\"og:site_name\" content=\"\"/&gt; \n&lt;meta property=\"og:title\" content=\"{{name}}\"/&gt; \n&lt;meta property=\"og:description\" content=\"{{description}}\"/&gt; \n&lt;meta property=\"og:url\" content=\"{{pageURL}}\"/&gt; \n&lt;meta property=\"og:image\" content=\"{{images.thumbnail.src}}\"/&gt; \n&lt;meta property=\"og:type\" content=\"video\"/&gt; \n&lt;meta property=\"og:video:secure_url\" content=\"{{securePageURL}}\"/&gt; \n&lt;meta property=\"og:video:type\" content=\"application/x-shockwave-flash\"/&gt; \n&lt;meta property=\"og:video:width\" content=\"{{playerWidth}}\"/&gt; \n&lt;meta property=\"og:video:height\" content=\"{{playerHeight}}\"/&gt; \n\n&lt;!-- Twitter: card/meta-tags --&gt; \n&lt;meta name=\"twitter:card\" content=\"player\"/&gt; \n&lt;meta name=\"twitter:title\" content=\"{{name}}\"/&gt; \n&lt;meta name=\"twitter:description\" content=\"{{description}}\"/&gt; \n<meta name=\"twitter:url\" content=\"{{pageURL}}\"/&gt; \n&lt;meta name=\"twitter:image\" content=\"{{images.thumbnail.src}}\"/&gt; \n&lt;meta name=\"twitter:player\" content=\"{{playerURL}}\"/&gt; \n&lt;meta name=\"twitter:player:width\" content=\"{{playerWidth}}\"/&gt; \n&lt;meta name=\"twitter:player:height\" content=\"{{playerHeight}}\"/&gt;",
        // functions
        getVideo,
        generateSocialTags,
        isDefined,
        bclslog;         

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
        if ($accountID.val().length == 0 ||
            $client_id.val().length == 0 ||
            $client_secret.val().length == 0 ||
            $pageURL.val().length == 0 ||
            $playerID.val().length == 0 ||
            $playerWidth.val().length == 0 ||
            $playerHeight.val().length == 0 ||
            $videoID.val().length == 0) {
                // clicked on generate before entering data
                alert("Please enter your data before generating tags");
                return;
        }
        var options = {};
        options.client_id = (isDefined($client_id.val())) ? $client_id.val() : client_id;
        options.client_secret = (isDefined($client_secret.val())) ? $client_secret.val() : client_secret;
        options.url = serviceURL + "/accounts/" + $accountID.val() + "/videos/" + $videoID.val();
        options.requestType = "GET";
        
        bclslog("options", options);
        $.ajax({
            url: proxyURL,
            type: "POST",
            data: options,
            success : function (data) {
                try {
                    var data = JSON.parse(data);
                    console.log("successful call: " );
                    console.log(data);
                    validJSON = true;
				} catch (e) {
				    alert('invalid json');
                    $responseFrame.html("invalid json");
                    bclslog("invalid json", e);
                }
                if (validJSON) {
                    generateSocialTags(data);
                }
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, the GET request to read videos for your account was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
    };
    
    generateSocialTags = function(JSONdata) {
        console.log("generateSocialTags");
        selectedVideo = JSONdata;
        selectedVideo.playerID = $playerID.val();
        selectedVideo.pageURL = $pageURL.val();
        selectedVideo.securePageURL = "";
        if ($pageURL.val().substr(0,5) == "https") {
            selectedVideo.securePageURL = $pageURL.val();
        }
        selectedVideo.playerWidth = $playerWidth.val();
        selectedVideo.playerHeight = $playerHeight.val();
        selectedVideo.playerURL = "https://players.brightcove.net/" + $accountID.val() + "/" + $playerID.val() + "_default/index.html?videoId=" + $videoID.val();
        template = Handlebars.compile(socialTemplate);
        data = selectedVideo;
        result = template(data);
        $publishingCode.html(result);
    };
    
    // set listeners for buttons
    console.log("set button listeners");
    $generateButton.on("click", getVideo);
    $selectCode.on("click", function() {
        document.getElementById("publishingCode").select();
    });
	
})();