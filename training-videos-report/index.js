var BCLS = (function(window, document) {
  var account_id,
    client_id,
    client_secret,
    // api stuff
    proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy-v2.php',
    baseURL = 'https://cms.api.brightcove.com/v1/accounts/',
    limit = 25,
    totalVideos = 0,
    totalCalls = 0,
    callNumber = 0,
    videosCompleted = 0,
    videosArray = [],
    videosForReport = [],
    summaryData = {},
    csvStr,
    summaryCsvStr,
    customFields = [],
    // elements
    makeReport = document.getElementById('makeReport'),
    data_table_body = document.getElementById('data_table_body'),
    csvData = document.getElementById('csvData'),
    apiRequest = document.getElementById('apiRequest');

  /**
   * tests for all the ways a variable might be undefined or not have a value
   * @param {String|Number} x the variable to test
   * @return {Boolean} true if variable is defined and has a value
   */
  function isDefined(x) {
    if (x === '' || x === null || x === undefined) {
      return false;
    }
    return true;
  }

  /*
   * tests to see if a string is json
   * @param {String} str string to test
   * @return {Boolean}
   */
  function isJson(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }


  /**
   * determines whether specified item is in an array
   *
   * @param {array} array to check
   * @param {string} item to check for
   * @return {boolean} true if item is in the array, else false
   */
  function arrayContains(arr, item) {
    var i,
      iMax = arr.length;
    for (i = 0; i < iMax; i++) {
      if (arr[i] === item) {
        return true;
      }
    }
    return false;
  }

  function startCSVStrings() {
    var i = 0,
      iMax;
    csvStr = '"ID","Name","Reference ID","Description","Date Added","Date Last Modified","Filename","Resolution","Duration(sec)","HLS Renditions (bitrate range KBPS)","MP4 Renditions (bitrate range KBPS)","FLV Renditions (bitrate range KBPS)","Total Rendition Size (MB)",\r\n';
  }

  function processVideos() {
    
  }

  function writeReport() {
    var i,
      iMax,
      j,
      jMax,
      video;
    if (videosArray.length > 0) {
      iMax = videosArray.length;
      for (i = 0; i < iMax; i += 1) {
        video = videosArray[i];
        // replace any line breaks in description, as that will break the CSV
        if (video.description) {
          video.description = video.description.replace(/(?:\r\n|\r|\n)/g, ' ');
        }
        // add csv row
        csvStr += '"' + video.id + '","' + video.name + '","' + video.reference_id + '","' + video.description + '","' + video.created_at + '","' + video.updated_at + '","' + video.original_filename + '","' + resWidth + 'x' + resHeight + '","' + video.duration / 1000 + '","' + video.hlsRenditions.length + ' (' + hlsLowRate + '-' + hlsHighRate + ')","' + video.mp4Renditions.length + ' (' + mp4LowRate + '-' + mp4HighRate + ')","' + video.flvRenditions.length + ' (' + flvLowRate + '-' + flvHighRate + ')",' + '"' + (video.totalSize / 1000000) + '",\r\n';
      }
      csvData.textContent += csvStr;
      // content = document.createTextNode('Finished! See the results or get the CSV data below.');
      pLogFinish.textContent = 'Finished! See the results or get the CSV data below.';
      // reportDisplay.innerHTML = summaryReportStr + reportStr;
      enableButtons();
    }
  }

  /**
   * sets up the data for the API request
   * @param {String} id the id of the button that was clicked
   */
  function createRequest(id) {
    var endPoint = '',
      parsedData,
      options = {};
      options.proxyURL = proxyURL;
      options.account_id = account_id;
      if (isDefined(client_id) && isDefined(client_secret)) {
        options.client_id = client_id;
        options.client_secret = client_secret;
      }
    // disable buttons to prevent a new request before current one finishes
    disableButtons();
    switch (id) {
      case 'getCount':
        endPoint = account_id + '/counts/videos?sort=created_at';
        options.url = baseURL + endPoint;
        options.requestType = 'GET';
        apiRequest.textContent = options.url;
        makeRequest(options, function(response) {
          parsedData = JSON.parse(response);
          // set total videos
          video_count = parsedData.count;
          totalVideos = video_count;
          totalCalls = Math.ceil(totalVideos / limit);
          createRequest('getVideos');
        });
        break;
      case 'getVideos':
        var offset = (limit * callNumber);
        endPoint = account_id + '/videos?sort=created_at&limit=' + limit + '&offset=' + offset;
        options.url = baseURL + endPoint;
        options.requestType = 'GET';
        apiRequest.textContent = options.url;
        makeRequest(options, function(response) {
          parsedData = JSON.parse(response);
          videosArray = videosArray.concat(parsedData);
          callNumber++;
          if (callNumber < totalCalls) {
            createRequest('getVideos');
          } else {
            processVideos();
          }
        });
        break;
    }
  }

  /**
   * send API request to the proxy
   * @param  {Object} options for the request
   * @param  {String} options.url the full API request URL
   * @param  {String="GET","POST","PATCH","PUT","DELETE"} requestData [options.requestType="GET"] HTTP type for the request
   * @param  {String} options.proxyURL proxyURL to send the request to
   * @param  {String} options.client_id client id for the account (default is in the proxy)
   * @param  {String} options.client_secret client secret for the account (default is in the proxy)
   * @param  {JSON} [options.requestBody] Data to be sent in the request body in the form of a JSON string
   * @param  {Function} [callback] callback function that will process the response
   */
  function makeRequest(options, callback) {
      var httpRequest = new XMLHttpRequest(),
          response,
          requestParams,
          dataString,
          proxyURL    = options.proxyURL,
          // response handler
          getResponse = function() {
              try {
                  if (httpRequest.readyState === 4) {
                      if (httpRequest.status >= 200 && httpRequest.status < 300) {
                          response = httpRequest.responseText;
                          // some API requests return '{null}' for empty responses - breaks JSON.parse
                          if (response === '') {
                              response = null;
                          }
                          // return the response
                          callback(response);
                      } else {
                          logger.appendChild(document.createTextNode('There was a problem with the request. Request returned ' + httpRequest.status));
                      }
                  }
              } catch (e) {
                  logger.appendChild(document.createTextNode('Caught Exception: ' + e));
              }
          };
      /**
       * set up request data
       * the proxy used here takes the following request body:
       * JSON.strinify(options)
       */
      // set response handler
      httpRequest.onreadystatechange = getResponse;
      // open the request
      httpRequest.open('POST', proxyURL);
      // open and send request
      httpRequest.send(JSON.stringify(options));
  }


  function init() {
    // event listeners
    csvData.addEventListener('click', function() {
      this.select();
    });

    // button event handlers
    makeReport.addEventListener('click', function() {
      // in case of re-run, cleal the results
      csvData.textContent = '';
      // get the inputs
      account_id = '20318290001'
      // get video count
      createRequest('getCount');

    });
  }


  init();
})(window, document);
