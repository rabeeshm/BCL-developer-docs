// Get Output Details

/**
  * @api {get} i/v2/outputs/:outputId Get Output Details
  * @apiName Get Output Details
  * @apiGroup Outputs
  * @apiVersion 2.0.0
  *
  * @apiDescription Get details of an Output file for a job.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Parameters) {String} outputId an Output id.
  *
  *
  * @apiSuccess (200) {Number} audio_bitrate_in_kbps Audio bitrate of an Output media file
  * @apiSuccess (200) {String} audio_codec Audio codec of an Output media file
  * @apiSuccess (200) {Number} audio_sample_rate Audio sample rate of an Output media file
  * @apiSuccess (200) {Number} audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} channels The number of audio channels
  * @apiSuccess (200) {DateTimeString} created_at ISO 8601 date-time string representing when an Output file was created
  * @apiSuccess (200) {Number} duration_in_ms duration_in_ms.
  * @apiSuccess (200) {String} error_class Type of error thrown
  * @apiSuccess (200) {String} error_message Error message thrown
  * @apiSuccess (200) {Number} file_size_bytes File size
  * @apiSuccess (200) {DateTimeString} finished_at ISO 8601 date-time string representing when an Output file was finished
  * @apiSuccess (200) {String} format Format of an Output file
  * @apiSuccess (200) {Number} frame_rate Frame rate of an Output file
  * @apiSuccess (200) {Number} height Frame height of an Output file
  * @apiSuccess (200) {String} id System id of an Output file
  * @apiSuccess (200) {String} md5_checksum Checksum for an Output file
  * @apiSuccess (200) {Boolean} privacy Privacy mode
  * @apiSuccess (200) {String} state Current state of Output file processing
  * @apiSuccess (200) {Boolean} test Whether run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} updated_at ISO 8601 date-time string representing when an Output file was last modified
  * @apiSuccess (200) {Number} video_bitrate_in_kbps Video bitrate of an Output media file
  * @apiSuccess (200) {String} video_codec Video codec of an Output media file
  * @apiSuccess (200) {Number} width Frame width of an Output media file
  * @apiSuccess (200) {Number} total_bitrate_in_kbps Total bitrate of an Output media file
  * @apiSuccess (200) {String} url URL for an Output media file
  *
  * @apiSuccessExample {json} Success response for get Output details
  *    {
  *      "audio_bitrate_in_kbps": 74,
  *      "audio_codec": "aac",
  *      "audio_sample_rate": 48000,
  *      "channels": "2",
  *      "duration_in_ms": 24892,
  *      "file_size_in_bytes": 1215110,
  *      "format": "mpeg4",
  *      "frame_rate": 29.97,
  *      "height": 352,
  *      "id": 13339,
  *      "label": null,
  *      "state": "finished",
  *      "total_bitrate_in_kbps": 387,
  *      "url": "https://example.com/file.mp4",
  *      "video_bitrate_in_kbps": 313,
  *      "video_codec": "h264",
  *      "width": 624,
  *      "md5_checksum": "7f106918e02a69466afa0ee014174143"
  *    }
  *
  */

// Get Output Progress

/**
  * @api {get} /v2/outputs/:outputId/progress Get Output Progress
  * @apiName Get Output Progress
  * @apiGroup Outputs
  * @apiVersion 2.0.0
  *
  * @apiDescription Get the progress of processing for an output file. The current_event_progress number is the percent complete of the current event – so if the event is Transcoding, and current_event_progress is 99.3421, then the file is almost finished transcoding, but hasn't started uploading yet. The progress number is the overall percentage of completion for the output. The progress number is the percent complete of the current event – so if the event is Transcoding, and progress is 99.3421, then the file is almost finished transcoding, but hasn't started Uploading yet. Valid states include: waiting, queued, assigning, processing, finished, failed, cancelled, no input, and skipped. Events include: downloading, transcoding and uploading. If you're getting a 404 to a Job Progress request, make sure that you're using the output ID, not the job ID, and make sure your API key is correct. A 404 means that we didn't find an output file with the specified ID for the account linked to the provided API key.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Parameters) {String} outputId an Output id.
  *
  *
  *
  * @apiSuccess (200) {String} state State for an output: pending, waiting, processing, finished, failed, or cancelled
  * @apiSuccess (200) {Number} progress The overall percentage complete
  * @apiSuccess (200) {String} current_event The current activity
  * @apiSuccess (200) {Number} current_event_progress The current activity percentage complete
  *
  * @apiSuccessExample {json} Success response for Output Progress
  *    {
  *      "state": "processing",
  *      "current_event": "Downloading",
  *      "current_event_progress": "32.34567345",
  *      "progress": "45.2353255"
  *    }
  *
  */
