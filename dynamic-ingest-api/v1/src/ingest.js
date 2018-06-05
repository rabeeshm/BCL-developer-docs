
// ingest media asset

 /**
 * @api {post} /accounts/:account_id/videos/:video_id/ingest-requests Ingest Media Asset
 * @apiName Ingest Media Asset
 * @apiGroup Ingest
 * @apiVersion 1.0.0
 *
 * @apiDescription Uploads a video, images, and/or text track (WebVTT files) and adds them to your media library. **NOTE that before you ingest a new video, you must first make a [Create Video request](https://brightcovelearning.github.io/Brightcove-API-References/cms-api/v1/doc/index.html#api-videoGroup-Create_Video).**
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {Number} video_id Video Cloud video ID; if this is a new video ingest, the ID will be the one returned by the _Create Video_ request
 * @apiParam (Request Body Fields) {Object} [master] the video master to be ingested
 * @apiParam (Request Body Fields) {String} [master.url] URL for the video source; required except for re-transcoding where a digital master has been archived, or you are adding images or text tracks to an existing video
 * @apiParam (Request Body Fields) {Boolean} [master.use_archived_master] For retranscode requests, will use the archived master if set to `true`; if set to `false`, you must also include the `url` for the source video
 * @apiParam (Request Body Fields) {String} [profile] ingest profile to use for transcoding; if absent, account default profile will be used
 * @apiParam (Request Body Fields) {Object[]} [text_tracks] array of text_track maps
 * @apiParam (Request Body Fields) {Object[]} [audio_tracks] array of audio track objects **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {String} [audio_tracks.language] Language code for the muxed in audio from the subtags in [http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (default can be set for the account by contacting Brightcove Support) **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {Boolean} [audio_tracks.merge_with_existing=false] whether to replace existing audio tracks or add the new ones (currently only `false` is supported) **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {Object[]} [audio_tracks.masters] array of audio track objects **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {String} [audio_tracks.masters.url] URL for the audio file **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {String} [audio_tracks.masters.language] Language code for the audio track from the subtags in [http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (default can be set for the account by contacting Brightcove Support) **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {String="main","alternate","commentary","dub","descriptive"} [audio_tracks.masters.variant] the type of audio track (default can be set for the account by contacting Brightcove Support) **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {String} text_tracks.url URL for a WebVTT file
 * @apiParam (Request Body Fields) {String} text_tracks.srclang ISO 639 2-letter (alpha-2) language code for the text tracks
 * @apiParam (Request Body Fields) {String="captions","subtitles","chapters","metadata"} [text_tracks.kind="captions"] how the vtt file is meant to be used
 * @apiParam (Request Body Fields) {String} [text_tracks.label] user-readable title
 * @apiParam (Request Body Fields) {Boolean} [text_tracks.default] sets the default language for captions/subtitles
 * @apiParam (Request Body Fields) {Object} [poster] the video master to be ingested
 * @apiParam (Request Body Fields) {String} poster.url URL for the video poster image
 * @apiParam (Request Body Fields) {Number} [poster.height] pixel height of the image
 * @apiParam (Request Body Fields) {Number} [poster.width] pixel width of the image
 * @apiParam (Request Body Fields) {Object} [thumbnail] the video master to be ingested
 * @apiParam (Request Body Fields) {String} thumbnail.url URL for the video thumbnail image
 * @apiParam (Request Body Fields) {Number} [thumbnail.height] pixel height of the image
 * @apiParam (Request Body Fields) {Number} [thumbnail.width] pixel width of the image
 * @apiParam (Request Body Fields) {Boolean} [capture-images] whether poster and thumbnail should be captured during transcoding; defaults to `true` if the the profile has image renditions, `false` if it does not
 * @apiParam (Request Body Fields) {String[]} [callbacks] array of URLs that [notifications](https://support.brightcove.com/node/17939) should be sent to
 *
 * @apiParamExample {json} Ingest Request Example:
 *    {
 *      "master": {
 *          "url": "http://host/master.mp4"
 *      },
 *      "profile": "multi-platform-extended-static",
 *      "audio_tracks": {
 *            "merge_with_existing": false,
 *            "masters": [
 *                {
 *                    "url": "http://learning-services-media.brightcove.com/audio/celtic_lullaby.m4a",
 *                    "language": "en",
 *                    "variant": "alternate"
 *                },
 *                {
 *                    "url": "http://learning-services-media.brightcove.com/audio/audio1.m4a",
 *                    "language": "en",
 *                    "variant": "commentary"
 *                }
 *            ]
 *        },
 *      "poster": {
 *            "url": "http://learning-services-media.brightcove.com/images/for_video/Water-In-Motion-poster.png",
 *            "width": 640,
 *            "height": 360
 *        },
 *        "thumbnail": {
 *            "url": "http://learning-services-media.brightcove.com/images/for_video/Water-In-Motion-thumbnail.png",
 *            "width": 160,
 *            "height": 90
 *        },
 *        "capture-images": false,
 *        "text_tracks": [
 *            {
 *                "url": "http://learning-services-media.brightcove.com/captions/for_video/Water-in-Motion.vtt",
 *                "srclang": "en",
 *                "kind": "captions",
 *                "label": "EN",
 *                "default": true
 *            }
 *        ],
 *        "callbacks": [
 *            "http://solutions.brightcove.com/bcls/di-api/di-callbacks.php"
 *        ]
 *    }
 *
 * @apiSuccess (200) {String} id job id for the request
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *       "id":"c6926dcf-0978-4085-8afc-e578ccfbf742"
 *    }
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {json} PROFILE 400: Unable to find profile by name
 * @apiError (Error 4xx) {json} NOT_SUBMITTED 400: Unable to submit job, please try again later
 * @apiError (Error 4xx) {json} NO_SUCH_VIDEO 400: Unable to find the referenced video
 * @apiError (Error 4xx) {json} NO_SOURCE 400: Unable to find a source to use
 * @apiError (Error 4xx) {json} CDN_CREDENTIALS 400: Unable to fetch CDN credentials
 * @apiError (Error 4xx) {json} BAD_CALLBACKS 400: Callbacks were not in expected format
 * @apiError (Error 5xx) {json} SUBMISSION_FAILURE 500: Unable to submit job please try again later.
 * @apiError (Error 4xx) {json} UNAUTHORIZED 403: Unable to authorize request.
 * @apiError (Error 4xx) {json} DYNAMIC_DELIVERY_NOT_ALLOWED 403: This account is not enabled for Dynamic Delivery, but a Dynamic Delivery profile was specified.
 * @apiError (Error 4xx) {json} CONTEXT_AWARE_ENCODING_NOT_ALLOWED 403: This account is not enabled for Context Aware Encoding, but a Context Aware Encoding profile was specified.
 * @apiError (Error 4xx) {json} MALFORMED_SOURCE_URL 422: source url is malformed.
 * @apiError (Error 4xx) {json} BAD_PROTOCOL_SOURCE_URL 422: source url uses a unsupported protocol.
 * @apiError (Error 4xx) {json} EXCEED_MAXIMUM_VTT_SOURCES 422: vtt sources exceed the maximum size.
 * @apiError (Error 4xx) {json} INVALID_VTT_KIND 422: vtt kind is invalid.
 * @apiError (Error 4xx) {json} CONSTRAINT_VIOLATION 422: capture-image is not allowed if an image source is provided.
 * @apiError (Error 4xx) {json} UNPROCESSABLE_ENTITY 422: request data contains some unprocessable entity.
 * @apiError (Error 4xx) {json} BAD_REQUEST 400: Unable to parse request body.
 * @apiError (Error 4xx) {json} RATE_LIMIT_EXCEEDED 429: Dynamic Ingest job not created. Reduce the number of concurrent jobs for this account before trying again. This error has been logged
 * @apiError (Error 4xx) {json} CDN_CONFIGS Unable to fetch CDN credentials
 * @apiError (Error 4xx) {json} AMBIGUOUS_REQUEST 400 Both a master url and use_archived_master were set in the request.
 * @apiError (Error 5xx) {json} INTERNAL_ERROR 500: Internal error, please try again later
 *
 * @apiErrorExample {json} 404 Error Response
 *     HTTP/1.1 404 Not Found
 *     [
 *         {
 *             "error_code": "RESOURCE_NOT_FOUND"
 *         }
 *     ]
 *
 * @apiErrorExample {json} 400 PROFILE
 *    HTTP/1.1 400 Bad Request
 *    [
 *        {
 *            "error_code": "PROFILE",
 *            "message": "Unable to find profile by name."
 *        }
 *    ]
 *
 * @apiErrorExample {json} 404 Not Found
 *    HTTP/1.1 404 Not Found
 *    [
 *        {
 *            "error_code": "NO_SUCH_VIDEO",
 *            "message": "Unable to find the referenced video."
 *        }
 *    ]
 *
 * @apiErrorExample 403 Forbidden
 *    HTTP/1.1 403 Forbidden
 *    [
 *        {
 *            "error_code": "UNAUTHORIZED",
 *            "message": "Unable to authorize request."
 *        }
 *    ]
 *
 * @apiErrorExample 400 Bad Request
 *    HTTP/1.1 403 Bad Request
 *    [
 *        {
 *            "error_code": "BAD_REQUEST",
 *            "message": "Unable to parse request body."
 *        }
 *    ]
 *
 * @apiErrorExample 422 CONSTRAINT_VIOLATION
 *    HTTP/1.1 422 Unprocessable Entity
 *    [
 *        {
 *            "error_code": "CONSTRAINT_VIOLATION",
 *            "message": "capture-image is not allowed if an image source is provided."
 *        }
 *    ]
 *
 * @apiErrorExample 400 AMBIGUOUS_REQUEST
 *    HTTP/1.1 400 Bad Request
 *    [
 *        {
 *            "error_code": "AMBIGUOUS_REQUEST",
 *            "message": "Both a master url and use_archived_master were set in the request."
 *        }
 *    ]
 *
 * @apiErrorExample 422 TYPE_VIOLATION
 *    HTTP/1.1 422 Unprocessable Entity
 *    [
 *        {
 *            "error_code": "TYPE_VIOLATION",
 *            "message": ".text_tracks.kind must be of type String"
 *        }
 *    ]
 *
 */

 // Get S3 URLs

  /**
  * @api {get} /accounts/:account_id/videos/:video_id/upload-urls/:source_name Get S3 URLs
  * @apiName Get S3 URLs
  * @apiGroup Ingest
  * @apiVersion 1.0.0
  *
  * @apiDescription Get temporary S3 URLs to upload source files for ingestion into Video Cloud. See [Source File Upload](https://support.brightcove.com/source-file-upload-api-dynamic-ingest) for more information. **NOTE that before you ingest a new video, you must first make a [Create Video request](https://brightcovelearning.github.io/Brightcove-API-References/cms-api/v1/doc/index.html#api-videoGroup-Create_Video).**
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {Number} video_id Video Cloud video ID; if this is a new video ingest, the ID will be the one returned by the _Create Video_ request
  * @apiParam {String} source_name the video source filename - **the name should not contain any URL-reserved characters such as ?, &, # or spaces**
  *
  * @apiParamExample {json} Get S3 URLS Example:
  *    https://ingest.api.brightcove.com/v1/accounts/57838016001/videos/67909129001/upload-urls/greatblueheron.mp4
  *
  * @apiSuccess (200) {String} bucket  the S3 bucket name
  * @apiSuccess (200) {String} object_key the access key used for authenticating the upload request (used for multipart uploads)
  * @apiSuccess (200) {String} access_key_id the access key used for authenticating the upload request (used for multipart uploads)
  * @apiSuccess (200) {String} secret_access_key the secret access key used for authenticating the upload request (used for multipart uploads)
  * @apiSuccess (200) {String} session_token the secret access key used for authenticating the upload request (used for multipart uploads)
  * @apiSuccess (200) {String} SignedUrl this is a shorthand S3 url that you can PUT your source file(s) to if you have relatively small videos and are not implementing multipart upload
  * @apiSuccess (200) {String} ApiRequestUrl this is the URL you will include in your Dynamic Ingest POST request for the Master url or url for the image/text_tracks assets
  *
  * @apiSuccessExample {json} Success Response:
  *    HTTP/1.1 200 OK
  *    {
  *    	    "bucket": "ingestion-upload-production",
  *    	    "object_key": "57838016001/67909129001/194ed2d1-cd57-420d-9139-58ed655ba70f/greatblueheron.mp4",
  *    	    "access_key_id": "ASIAI6IWBNY3QPOKC55A",
  *    	    "secret_access_key": "DXzr3VYcpMpH1Qg5JZ3qFRw3gRFdi3jAoxiUQtR0",
  *    	    "session_token": "FQoDYXdzEI///////////wEaDNnYCOYcjTzSp6seNyKMA5pkuYrKv2+oSVDI/I4xLqGg5Mc7ORWqTT1Bn72VdzqvxkbA8i/2xaOKNSYzF/ceyTAb3Bp43jah4s/mn2MqkurXPL0dfP0KzVOUAsg7Xdt9JIstycn6mhp0rhf6Qm0Rq7GGXiCchb1KF4TV33fNKZSq8+/4oGKK55LfW+lqWF8a+24Pk5x2aEeSUCFSWIHEkAyj2rBzmIYR9TyjJhe1hE8eoTZKvovz5o5S86mEr4apg77ibrMUyYHTbDTvGVr9NVmNwXQR4vbaKKzhpL6CII0RZ9PHApGbLkg78w5EWGM2MLmTfIjvkq+WWztG2DybSCjmx7c+za6rNMKDgouKTvkHnJbqqsmTlPuhFmzIkIF3e6cYZLHl3q8ku7dk46YJPWK0BwZaNxjfMyIWM93BNPQBwLJlwSMaYZsWadSjWOyBn/w/p/BtP/haKQGYMVcOFrYKdnjY5SeGTruOmHdfRKnPQAtmoB5aroxnD3d7maFdnc/2/FZoybnp1nrw9uyGa8yiPHpqCENFCm3T3iiuof/NBQ==",
  *    	    "signed_url": "https://ingestion-upload-production.s3.amazonaws.com/57838016001/67909129001/194ed2d1-cd57-420d-9139-58ed655ba70f/greatblueheron.mp4?AWSAccessKeyId=AKIAJZKRHWB4FUFMCPPA&Expires=1505829422&Signature=PKxh8SqQVtxVONt41tLSh6WSvnk%3D",
  *    	    "api_request_url": "https://ingestion-upload-production.s3.amazonaws.com/57838016001/67909129001/194ed2d1-cd57-420d-9139-58ed655ba70f/greatblueheron.mp4"
  *    }
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
  * @apiError (Error 4xx) {json} UNAUTHORIZED 403: Unable to authorize request.
  * @apiError (Error 4xx) {json} RATE_LIMIT_EXCEEDED 429: Dynamic Ingest job not created. Reduce the number of concurrent jobs for this account before trying again. This error has been logged
  * @apiError (Error 5xx) {json} INTERNAL_ERROR 500: Internal error, please try again later
  *
  * @apiErrorExample {json} 404 Error Response
  *     HTTP/1.1 404 Not Found
  *     [
  *         {
  *             "error_code": "RESOURCE_NOT_FOUND"
  *         }
  *     ]
  *
  *
  * @apiErrorExample {json} 404 Not Found
  *    HTTP/1.1 404 Not Found
  *    [
  *        {
  *            "error_code": "NO_SUCH_VIDEO",
  *            "message": "Unable to find the referenced video."
  *        }
  *    ]
  *
  * @apiErrorExample 403 Forbidden
  *    HTTP/1.1 403 Forbidden
  *    [
  *        {
  *            "error_code": "UNAUTHORIZED",
  *            "message": "Unable to authorize request."
  *        }
  *    ]
  *
  *
  */
