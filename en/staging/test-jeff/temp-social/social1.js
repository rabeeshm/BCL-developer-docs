var BCLS = (function () {
    "use strict";
    var accountID = document.getElementById('accountID'),
            // for testing purposes
            account_id = "1752604059001",
        apiBaseURL = 'https://edge.api.brightcove.com/playback/v1/accounts/',
        policyKey = document.getElementById('policyKey'),
          // for testing purposes
          policy_key = "BCpkADawqM3_9ax216PJYuUTLApMLkLJ3apjFlTRKHHS4q0DE33J0XsiDWmc6SfKwrwRAhejCZpTbwljz4-OlUwyqKi64L25Dwy4yhY1eSZ9ZduI-dO0mjSNVcR9C8nz0jtkimOOtzQgswCr",
        pageURL = document.getElementById('pageURL'),
        securePageURL = "",
        pageTwitter = document.getElementById('pageTwitter'),
          // for testing purposes
          page_twitter = "@username",
        playerID = document.getElementById('playerID'),
            // for testing purposes
            player_id = "rkhHnDth",
        playerWidth = document.getElementById('playerWidth'),
        playerHeight = document.getElementById('playerHeight'),
        videoID = document.getElementById('videoID'),
            // for testing purposes
            video_id = "5141730843001",
        searchTerms = document.getElementById('searchTerms'),
        pageSize = document.getElementById('pageSize'),
        generateButton = document.getElementById('generateButton'),
        requestInputs = document.getElementById('.papi-request'),
        responseFrame = document.getElementById("responseFrame"),
        generatedResults = document.getElementById("generatedResults"),
        publishingCode = document.getElementById("publishingCode"),
        validJSON = false,
        template, data, result, videoInfo,
        selectCode = document.getElementById("selectCode"),
        options,
        playerURL,
        securePageURL = "",
        requestURL,
        socialTemplate,
        requestData = {};

        console.log("account id= ",accountID);

    /**
     * Logging function - safe for IE
     * @param  {string} context description of the data
     * @param  {*} message the data to be logged by the console
     * @return {}
     */
    function bclslog(context, message) {
        if (window["console"] && console["log"]) {
            console.log(context, message);
        };
        return;
    };

    // more robust test for strings "not defined"
    function isDefined(v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        } else { return false; }
    };

    // submit request to get video data for account
    function getVideo() {
        // if (accountID.value == "" ||
        //     policyKey.value =="" ||
        //     pageURL.value == "" ||
        //     playerID.value == "" ||
        //     videoID.value == "") {
        //         // clicked on generate before entering data
        //         alert("Please enter your data before generating tags");
        //         return;
        // }

        account_id = (isDefined(accountID.value) ? accountID.value : account_id);
        policy_key = (isDefined(policyKey.value) ? policyKey.value : policy_key);
        video_id = (isDefined(videoID.value) ? videoID.value : video_id);
        player_id = (isDefined(playerID.value) ? playerID.value : player_id);
        page_twitter = (isDefined(pageTwitter.value) ? pageTwitter.value : page_twitter);

        // add the account id and video id to the base URL.
        requestURL = apiBaseURL + account_id + '/videos/' + video_id;

        // add the query string to the request URL
        requestData.url = requestURL;
        // set the request type to GET
        requestData.requestType = 'GET';

        bclslog("requestData", requestData);

        // make the Playback API request to get video information
        getVideoInfo(requestData, function (data) {
            generateSocialTags(data);
        });
    };


    // +++ Make the Playback API request +++
    /**
      * request data from the Playback API
      */
    function getVideoInfo(options, callback) {
      var httpRequest = new XMLHttpRequest(),
          responseData,
          parsedData,
          // response handler
          getResponse = function() {
            try {
              if (httpRequest.readyState === 4) {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                  responseData = httpRequest.responseText;
                  parsedData = JSON.parse(responseData);
                  callback(parsedData);
                } else {
                  alert('There was a problem with the request. Request returned ' + httpRequest.status);
                }
              }
            } catch (e) {
              alert('Caught Exception: ' + e);
            }
          };
      // set the response handler
      httpRequest.onreadystatechange = getResponse;
      // open the request
      httpRequest.open('GET', requestData.url);
      // set the headers
      httpRequest.setRequestHeader('Accept', 'application/json;pk=' + policy_key);
      // open and send the request
      httpRequest.send();
    };

    function generateSocialTags(videoInfo) {
        console.log("videoInfo= ",videoInfo);

        playerURL = "https://players.brightcove.net/" + account_id + "/" + player_id + "_default/index.html?videoId=" + video_id;

        console.log("playerURL= ",playerURL);

        socialTemplate = "<!-- Open Graph Sharing Metadata --> \n&lt;meta property=\"og:site_name\" content=\"\"/&gt; \n&lt;meta property=\"og:title\" content=\"" + videoInfo.name + "\"/&gt; \n&lt;meta property=\"og:description\" content=\"" + videoInfo.description + "\"/&gt; \n&lt;meta property=\"og:url\" content=\"" + pageURL.value + "\"/&gt; \n&lt;meta property=\"og:image\" content=\"" + videoInfo.thumbnail + "\"/&gt; \n&lt;meta property=\"og:type\" content=\"video\"/&gt;";

        if (pageURL.value.substr(0,5) == "https") {
            securePageURL = pageURL.value;
            socialTemplate += "\n&lt;meta property=\"og:video:secure_url\" content=\"" + securePageURL + "\"/&gt;";
        }

        socialTemplate += "\n&lt;meta property=\"og:video:type\" content=\"application/x-shockwave-flash\"/&gt; \n&lt;meta property=\"og:video:width\" content=\"" + playerWidth.value + "\"/&gt; \n&lt;meta property=\"og:video:height\" content=\"" + playerHeight.value + "\"/&gt; \n\n&lt;!-- Twitter: card/meta-tags --&gt; \n&lt;meta name=\"twitter:card\" content=\"player\"/&gt; \n&lt;meta name=\"twitter:site\" content=\"" + page_twitter + "\"/&gt; \n&lt;meta name=\"twitter:title\" content=\""+ videoInfo.name + "\"/&gt; \n&lt;meta name=\"twitter:description\" content=\"" + videoInfo.description + "\"/&gt; \n&lt;meta name=\"twitter:image\" content=\"" + videoInfo.thumbnail + "\"/&gt; \n&lt;meta name=\"twitter:player\" content=\"" + playerURL + "\"/&gt; \n&lt;meta name=\"twitter:player:width\" content=\"" + playerWidth.value + "\"/&gt; \n&lt;meta name=\"twitter:player:height\" content=\"" + playerHeight.value + "\"/&gt; \n<meta name=\"twitter:stream\" content=\"" + pageURL.value + "\"/&gt; \n<meta name=\"twitter:stream:content_type\" content=\"video/mp4\"/&gt;";

        console.log("socialTemplate= ",socialTemplate);

        publishingCode.innerHTML = socialTemplate;
    };

    // set listeners for buttons
    generateButton.addEventListener("click", getVideo);
    // selectCode.addEventListener("click", function() {
    //     document.getElementById("publishingCode").select();
    // });

})();
