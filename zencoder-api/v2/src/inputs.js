// Get Input Details

/**
  * @api {get} i/v2/inputs/:inputId Get Input Details
  * @apiName Get Input Details
  * @apiGroup Inputs
  * @apiVersion 2.0.0
  *
  * @apiDescription Get details of the input file for a job.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Parameters) {String} inputId The input id.
  *
  * @apiParam (Request Body Fields) {Object} application_ad_configuration The ad configuration object
  * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_description Human readable description of the configuration.
  * @apiParam (Request Body Fields) {String="Dfp","Vast","SmartXML"} application_ad_configuration.ad_configuration_expected_response_type The expected response type based on your ad server
  * @apiParam (Request Body Fields) {String="SingleAdResponse","MultipleAdResponse"} application_ad_configuration.ad_configuration_strategy Specifies whether ad breaks should include single or muliple ads
  * @apiParam (Request Body Fields) {Object[]} application_ad_configuration.ad_configuration_transforms Array of ad configuration transforms.
  * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_transforms.xpath xpath for the transform.
  * @apiParam (Request Body Fields) {String} application_ad_configuration.ad_configuration_transforms.xslt xslt stylesheet for the transform.
  * @apiParam (Request Body Fields) {String} ad_configuration_url_format Format for the ad tag - see [Server-Side Ad Insertion Using the Brightcove Live API](https://support.brightcove.com/node/17763#ad_configuration_variables) for the available ad configuration variables.
  * @apiParam (Request Body Fields) {String} application_description Human readable description of the ad application.
  * @apiParam (Request Body Fields) {String} [account_id] Your account id.
  * @apiParam (Request Body Fields) {Number} application_segment_buffer The amount of ad content to buffer, in seconds.
  *
  *
  * @apiSuccess (200) {Number} audio_bitrate_in_kbps Audio bitrate of the input media file
  * @apiSuccess (200) {String} audio_codec Audio codec of the input media file
  * @apiSuccess (200) {Number} audio_sample_rate Audio sample rate of the input media file
  * @apiSuccess (200) {Number} audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} channels The number of audio channels
  * @apiSuccess (200) {DateTimeString} created_at ISO 8601 date-time string representing when the input file was created
  * @apiSuccess (200) {Number} duration_in_ms duration_in_ms.
  * @apiSuccess (200) {String} error_class Type of error thrown
  * @apiSuccess (200) {String} error_message Error message thrown
  * @apiSuccess (200) {Number} file_size_bytes File size
  * @apiSuccess (200) {DateTimeString} finished_at ISO 8601 date-time string representing when the input file was finished
  * @apiSuccess (200) {String} format Format of the input file
  * @apiSuccess (200) {Number} frame_rate Frame rate of the input file
  * @apiSuccess (200) {Number} height Frame height of the input file
  * @apiSuccess (200) {String} id System id of the input file
  * @apiSuccess (200) {String} md5_checksum Checksum for the input file
  * @apiSuccess (200) {Boolean} privacy Privacy mode
  * @apiSuccess (200) {String} state Current state of input file processing
  * @apiSuccess (200) {Boolean} test Whether run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} updated_at ISO 8601 date-time string representing when the input file was last modified
  * @apiSuccess (200) {Number} video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (200) {String} video_codec Video codec of the input media file
  * @apiSuccess (200) {Number} width Frame width of the input media file
  * @apiSuccess (200) {Number} total_bitrate_in_kbps Total bitrate of the input media file
  * @apiSuccess (200) {String} url URL for the input media file
  *
  * @apiSuccessExample {json} Success response for get input details
  *    {
  *      "audio_bitrate_in_kbps": 96,
  *      "audio_codec": "aac",
  *      "audio_sample_rate": 48000,
  *      "channels": "2",
  *      "duration_in_ms": 24892,
  *      "file_size_in_bytes": 1862748,
  *      "format": "mpeg4",
  *      "frame_rate": 29.98,
  *      "height": 352,
  *      "id": 6816,
  *      "job_id": 6816,
  *      "privacy": false,
  *      "state": "finished",
  *      "total_bitrate_in_kbps": 594,
  *      "url": "s3://example/file.mp4",
  *      "video_bitrate_in_kbps": 498,
  *      "video_codec": "h264",
  *      "width": 624,
  *      "md5_checksum": "7f106918e02a69466afa0ee014174143"
  *    }
  *
  */

// Input Progress

/**
  * @api {get} /v2/inputs/:inputId/progress Input Progress
  * @apiName Update Input Progress
  * @apiGroup Inputs
  * @apiVersion 2.0.0
  *
  * @apiDescription Get the progress of processing for the input file. The current_event_progress number is the percent complete of the current event – so if the event is Downloading, and current_event_progress is 99.3421, then the file is almost finished downloading, but hasn't started Inspecting yet. The progress number is the overall percentage of completion for the input. The progress number is the percent complete of the current event – so if the event is Downloading, and progress is 99.3421, then the file is almost finished downloading, but hasn't started Inspecting yet. Valid states include: waiting, pending, assigning, processing, finished, failed, cancelled. Events include: downloading and inspecting. If you're getting a 404 to an input progress request, make sure that you're using the input ID, not the job or output ID, and make sure your API key is correct. A 404 means that we didn't find an input file with the specified ID for the account linked to the provided API key.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Parameters) {String} inputId The input id.
  *
  *
  *
  * @apiSuccess (200) {String} state State for the input: pending, waiting, processing, finished, failed, or cancelled
  * @apiSuccess (200) {Number} progress The overall percentage complete
  * @apiSuccess (200) {String} current_event The current activity
  * @apiSuccess (200) {Number} current_event_progress The current activity percentage complete
  *
  * @apiSuccessExample {json} Success response for Input Progress
  *    {
  *      "state": "processing",
  *      "current_event": "Downloading",
  *      "current_event_progress": "32.34567345",
  *      "progress": "45.2353255"
  *    }
  *
  */
