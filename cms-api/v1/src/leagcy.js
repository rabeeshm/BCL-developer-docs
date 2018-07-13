/**
* @apiDefine assetGroup Legacy
* These operations are associated with legacy technologies such as the legacy ingest system and the smart player. No one should be using the smart player anymore, and if your account was created recently or has been converted to Dynamic Delivery, these operations are not relevant to you.
*/


 // get captions

 /**
  * @api {get} /accounts/:account_id/videos/:video_id/assets/caption Get Caption List
  * @apiName Get Caption List
  * @apiGroup assetGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Gets the caption file for a given video (DFXP captions for the Smart Player). **Note**: 1) the caption endpoint is ONLY for working with DFXP captions used in the legacy Smart Player - WebVTT captions (text_tracks) for the new Brightcove Player are managed using the Update Video operation; 2) you can use `/videos/ref:reference_id` instead of `/videos/video_id`
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
  *
  *
  * @apiParamExample {String} Caption list Example:
  *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/caption
  *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to captions
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
  *
 * @apiSuccessExample {Object} Success Response:
  *    HTTP/1.1 200 OK
  *    {
  *        "account_id": "57838016001",
  *        "audio_only": false,
  *        "cdn_origin_id": "",
  *        "complete": true,
  *        "controller_type": "DEFAULT",
  *        "current_filename": "",
  *        "id": "4665727870001",
  *        "name": "",
  *        "progressive_download": false,
  *        "reference_id": "",
  *        "remote_stream_name": "",
  *        "remote_url": "http://learning-services-media.brightcove.com/captions/Video-Cloud.DFXP.xml",
  *        "size": 0,
  *        "type": "CAPTION",
  *        "updated_at": "2015-12-18T14:52:47.758Z",
  *        "uploaded_at": "2015-12-18T14:52:47.758Z"
  *    }
  *
  * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
  * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
  * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
  * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
  * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
  *
  * @apiErrorExample {Object[]} 401 UNAUTHORIZED
  *     HTTP/1.1 401 UNAUTHORIZED
  *     [
  *         {
  *             "error_code": "UNAUTHORIZED",
  *             "message": "Permission denied."
  *         }
  *     ]
  *
  * @apiErrorExample {Object[]} 404 Error Response
  *     HTTP/1.1 404 Not Found
  *     [
  *         {
  *             "error_code": "RESOURCE_NOT_FOUND"
  *         }
  *     ]
  *
  *
  */

 // get caption

 /**
  * @api {get} /accounts/:account_id/videos/:video_id/assets/caption/:asset_id Get Caption
  * @apiName Get Caption
  * @apiGroup assetGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Gets a caption file for a given video (DFXP captions for the Smart Player). **Note**: 1) the caption endpoint is ONLY for working with DFXP captions used in the legacy Smart Player - WebVTT captions (text_tracks) for the new Brightcove Player are managed using the Update Video operation; 2) you can use `/videos/ref:reference_id` instead of `/videos/video_id`
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
  * @apiParam {String} asset_id the asset id
  *
  *
  * @apiParamExample {String} Caption Example:
  *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/caption/77874616001
  *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to captions
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
  *
  * @apiSuccessExample {Object} Success Response:
  *    HTTP/1.1 200 OK
  *    {
  *        "account_id": "57838016001",
  *        "audio_only": false,
  *        "cdn_origin_id": "",
  *        "complete": true,
  *        "controller_type": "DEFAULT",
  *        "current_filename": "",
  *        "id": "4665727870001",
  *        "name": "",
  *        "progressive_download": false,
  *        "reference_id": "",
  *        "remote_stream_name": "",
  *        "remote_url": "http://learning-services-media.brightcove.com/captions/Video-Cloud.DFXP.xml",
  *        "size": 0,
  *        "type": "CAPTION",
  *        "updated_at": "2015-12-18T14:52:47.758Z",
  *        "uploaded_at": "2015-12-18T14:52:47.758Z"
  *    }
  *
  * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
  * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
  * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
  * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
  * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
  *
  * @apiErrorExample {Object[]} 401 UNAUTHORIZED
  *     HTTP/1.1 401 UNAUTHORIZED
  *     [
  *         {
  *             "error_code": "UNAUTHORIZED",
  *             "message": "Permission denied."
  *         }
  *     ]
  *
  * @apiErrorExample {Object[]} 404 Error Response
  *     HTTP/1.1 404 Not Found
  *     [
  *         {
  *             "error_code": "RESOURCE_NOT_FOUND"
  *         }
  *     ]
  *
  *
  */

 // post captions

 /**
  * @api {post} /accounts/:account_id/videos/:video_id/assets/caption Add Caption
  * @apiName Add Caption
  * @apiGroup assetGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Adds a caption file for a remote asset (DFXP captions for the Smart Player). **Note**: 1) the caption endpoint is ONLY for working with DFXP captions used in the legacy Smart Player - WebVTT captions (text_tracks) for the new Brightcove Player are managed using the Update Video operation; 2) you can use `/videos/ref:reference_id` instead of `/videos/video_id`
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
  *
  * @apiParam (Request Body Fields) {String} [reference_id] video reference id (must be unique within the account)
  * @apiParam (Request Body Fields) {String {1-250}} remote_url the url for a remote asset (not applicable to ingested assets)
  *
  * @apiParamExample {Object} Add Captions Request Data Example:
  *    {
  *        "remote_url": "http://learning-services-media.brightcove.com/captions/Video-Cloud-Analytics-Performance-Report.DFXP.xml"
  *    }
  *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to captions
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
  *
 * @apiSuccessExample {Object} Success Response:
  *    HTTP/1.1 200 OK
  *    {
  *        "account_id": "57838016001",
  *        "audio_only": false,
  *        "cdn_origin_id": "",
  *        "complete": true,
  *        "controller_type": "DEFAULT",
  *        "current_filename": "",
  *        "id": "4665727870001",
  *        "name": "",
  *        "progressive_download": false,
  *        "reference_id": "",
  *        "remote_stream_name": "",
  *        "remote_url": "http://learning-services-media.brightcove.com/captions/Video-Cloud.DFXP.xml",
  *        "size": 0,
  *        "type": "CAPTION",
  *        "updated_at": "2015-12-18T14:52:47.758Z",
  *        "uploaded_at": "2015-12-18T14:52:47.758Z"
  *    }
  *
  * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
  * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
  * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
  * @apiError (Error 4xx) {Object[]} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
  * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: The specified reference id is already in use
  * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
  * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
  *
  *
  * @apiErrorExample {Object[]} 401 UNAUTHORIZED
  *     HTTP/1.1 401 UNAUTHORIZED
  *     [
  *         {
  *             "error_code": "UNAUTHORIZED",
  *             "message": "Permission denied."
  *         }
  *     ]
  *
  * @apiErrorExample {Object[]} 404 RESOURCE_NOT_FOUND
  *     HTTP/1.1 404 RESOURCE_NOT_FOUND
  *     [
  *         {
  *             "error_code": "RESOURCE_NOT_FOUND"
  *         }
  *     ]
  *
  * @apiErrorExample {Object[]} 409 CONFLICT
  *     HTTP/1.1 409 CONFLICT
  *     [
  *         {
  *             "error_code": "REFERENCE_ID_IN_USE",
  *             "message": "Reference id moose_2015_09_17 is already in use."
  *         }
  *     ]
  *
  * @apiErrorExample 400 Bad Request
  *    HTTP/1.1 400 Bad Request
  *    {
  *        "error_code": "BAD_VALUE",
  *        "message": "Unable to process JSON"
  *    }
  *
  * @apiErrorExample 422 ILLEGAL_FIELD
  *    HTTP/1.1 422 Unprocessable Entity
  *    [
  *        {
  *            "error_code": "VALIDATION_ERROR",
  *            "message": "foo: ILLEGAL_FIELD"
  *        }
  *    ]
  *
  * @apiErrorExample 422 REQUIRED_FIELD
  *    HTTP/1.1 422 Unprocessable Entity
  *    [
  *        {
  *            "error_code": "VALIDATION_ERROR",
  *            "message": "remote_url: REQUIRED_FIELD"
  *        }
  *    ]
  *
  */

 // patch captions

 /**
  * @api {patch} /accounts/:account_id/videos/:video_id/assets/caption/:asset_id Update Caption
  * @apiName Update Caption
  * @apiGroup assetGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Updates the location of a remote caption file for a remote asset (DFXP captions for the Smart Player). **Note**: 1) the caption endpoint is ONLY for working with DFXP captions used in the legacy Smart Player - WebVTT captions (text_tracks) for the new Brightcove Player are managed using the Update Video operation; 2) you can use `/videos/ref:reference_id` instead of `/videos/video_id`
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
  * @apiParam {String} asset_id id for the asset
  *
  * @apiParam (Request Body Fields) {String} [reference_id] video reference id (must be unique within the account)
  * @apiParam (Request Body Fields) {String {1-250}} remote_url the url for a remote asset (not applicable to ingested assets)
  *
  * @apiParamExample {Object} Add Captions Request Data Example:
  *    {
  *        "remote_url": "http://learning-services-media.brightcove.com/captions/Video-Cloud-Analytics-Performance-Report.DFXP.xml"
  *    }
  *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to captions
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
  *
 * @apiSuccessExample {Object} Success Response:
  *    HTTP/1.1 200 OK
  *    {
  *        "account_id": "57838016001",
  *        "audio_only": false,
  *        "cdn_origin_id": "",
  *        "complete": true,
  *        "controller_type": "DEFAULT",
  *        "current_filename": "",
  *        "id": "4665727870001",
  *        "name": "",
  *        "progressive_download": false,
  *        "reference_id": "",
  *        "remote_stream_name": "",
  *        "remote_url": "http://learning-services-media.brightcove.com/captions/Video-Cloud.DFXP.xml",
  *        "size": 0,
  *        "type": "CAPTION",
  *        "updated_at": "2015-12-18T14:52:47.758Z",
  *        "uploaded_at": "2015-12-18T14:52:47.758Z"
  *    }
  *
  * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
  * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
  * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
  * @apiError (Error 4xx) {Object[]} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
  * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: The specified reference id is already in use
  * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
  * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
  *
  *
  * @apiErrorExample {Object[]} 401 UNAUTHORIZED
  *     HTTP/1.1 401 UNAUTHORIZED
  *     [
  *         {
  *             "error_code": "UNAUTHORIZED",
  *             "message": "Permission denied."
  *         }
  *     ]
  *
  * @apiErrorExample {Object[]} 404 RESOURCE_NOT_FOUND
  *     HTTP/1.1 404 RESOURCE_NOT_FOUND
  *     [
  *         {
  *             "error_code": "RESOURCE_NOT_FOUND"
  *         }
  *     ]
  *
  * @apiErrorExample {Object[]} 409 CONFLICT
  *     HTTP/1.1 409 CONFLICT
  *     [
  *         {
  *             "error_code": "REFERENCE_ID_IN_USE",
  *             "message": "Reference id moose_2015_09_17 is already in use."
  *         }
  *     ]
  *
  * @apiErrorExample 400 Bad Request
  *    HTTP/1.1 400 Bad Request
  *    {
  *        "error_code": "BAD_VALUE",
  *        "message": "Unable to process JSON"
  *    }
  *
  * @apiErrorExample 422 ILLEGAL_FIELD
  *    HTTP/1.1 422 Unprocessable Entity
  *    [
  *        {
  *            "error_code": "VALIDATION_ERROR",
  *            "message": "foo: ILLEGAL_FIELD"
  *        }
  *    ]
  *
  *
  */

  // delete caption

  /**
   * @api {delete} /accounts/:account_id/videos/:video_id/assets/caption/:asset_id Delete Caption
   * @apiName Delete Caption
   * @apiGroup assetGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Deletes a caption file for a remote asset (DFXP captions for the Smart Player). **Note**: 1) the caption endpoint is ONLY for working with DFXP captions used in the legacy Smart Player - WebVTT captions (text_tracks) for the new Brightcove Player are managed using the Update Video operation; 2) you can use `/videos/ref:reference_id` instead of `/videos/video_id`
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
   * @apiParam {String} asset_id the asset id
   *
   *
   * @apiParamExample {String} Delete Caption Example:
   *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/caption/77874616001
   *
   *
  * @apiSuccessExample {null} Success Response:
   *    HTTP/1.1 204 NO CONTENT
   *
   * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
   * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
   * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
   * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
   * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
   *
   * @apiErrorExample {Object[]} 401 UNAUTHORIZED
   *     HTTP/1.1 401 UNAUTHORIZED
   *     [
   *         {
   *             "error_code": "UNAUTHORIZED",
   *             "message": "Permission denied."
   *         }
   *     ]
   *
   * @apiErrorExample {Object[]} 404 Error Response
   *     HTTP/1.1 404 Not Found
   *     [
   *         {
   *             "error_code": "RESOURCE_NOT_FOUND"
   *         }
   *     ]
   *
   *
   */



  // get posters

  /**
   * @api {get} /accounts/:account_id/videos/:video_id/assets/poster Get Poster List
   * @apiName Get Poster List
   * @apiGroup assetGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Gets the poster file for a given video. Note that you can only add one poster for a video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
   *
   *
   * @apiParamExample {String} Poster list Example:
   *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/poster
   *
  * @apiSuccess (200) {String} id the asset id
  * @apiSuccess (200) {Boolean} audio_only not applicable to posters
  * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
  * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
  * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
  * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
  * @apiSuccess (200) {String} name asset name
  * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
  * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
  * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
  * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
  * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
  * @apiSuccess (200) {String} type the type of the asset
  * @apiSuccess (200) {String} updated_at when the video was last modified
  * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
   *
  * @apiSuccessExample {Object} Success Response:
   *    HTTP/1.1 200 OK
   *    {
   *        "account_id": "57838016001",
   *        "audio_only": false,
   *        "cdn_origin_id": "",
   *        "complete": true,
   *        "controller_type": "DEFAULT",
   *        "current_filename": "",
   *        "frame_height": null,
   *        "frame_width": null,
   *        "id": "4665727869001",
   *        "name": "",
   *        "progressive_download": false,
   *        "reference_id": "",
   *        "remote_stream_name": "",
   *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-poster.png",
   *        "size": 0,
   *        "type": "VIDEO_STILL",
   *        "updated_at": "2015-12-18T14:42:22.439Z",
   *        "uploaded_at": "2015-12-18T14:42:22.436Z"
   *    }
   *
   * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
   * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
   * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
   * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
   * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
   *
   * @apiErrorExample {Object[]} 401 UNAUTHORIZED
   *     HTTP/1.1 401 UNAUTHORIZED
   *     [
   *         {
   *             "error_code": "UNAUTHORIZED",
   *             "message": "Permission denied."
   *         }
   *     ]
   *
   * @apiErrorExample {Object[]} 404 Error Response
   *     HTTP/1.1 404 Not Found
   *     [
   *         {
   *             "error_code": "RESOURCE_NOT_FOUND"
   *         }
   *     ]
   *
   *
   */

  // get poster

  /**
   * @api {get} /accounts/:account_id/videos/:video_id/assets/poster/:asset_id Get Poster
   * @apiName Get Poster
   * @apiGroup assetGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Gets a poster file for a given video. Note that you can only add one poster for a video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
   * @apiParam {String} asset_id the asset id
   *
   *
   * @apiParamExample {String} Poster Example:
   *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/poster/77874616001
   *
  * @apiSuccess (200) {String} id the asset id
  * @apiSuccess (200) {Boolean} audio_only not applicable to posters
  * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
  * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
  * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
  * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
  * @apiSuccess (200) {String} name asset name
  * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
  * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
  * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
  * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
  * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
  * @apiSuccess (200) {String} type the type of the asset
  * @apiSuccess (200) {String} updated_at when the video was last modified
  * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
   *
  * @apiSuccessExample {Object} Success Response:
   *    HTTP/1.1 200 OK
   *    {
   *        "account_id": "57838016001",
   *        "audio_only": false,
   *        "cdn_origin_id": "",
   *        "complete": true,
   *        "controller_type": "DEFAULT",
   *        "current_filename": "",
   *        "frame_height": null,
   *        "frame_width": null,
   *        "id": "4665727869001",
   *        "name": "",
   *        "progressive_download": false,
   *        "reference_id": "",
   *        "remote_stream_name": "",
   *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-poster.png",
   *        "size": 0,
   *        "type": "VIDEO_STILL",
   *        "updated_at": "2015-12-18T14:42:22.439Z",
   *        "uploaded_at": "2015-12-18T14:42:22.436Z"
   *    }
   *
   * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
   * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
   * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
   * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
   * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
   *
   * @apiErrorExample {Object[]} 401 UNAUTHORIZED
   *     HTTP/1.1 401 UNAUTHORIZED
   *     [
   *         {
   *             "error_code": "UNAUTHORIZED",
   *             "message": "Permission denied."
   *         }
   *     ]
   *
   * @apiErrorExample {Object[]} 404 Error Response
   *     HTTP/1.1 404 Not Found
   *     [
   *         {
   *             "error_code": "RESOURCE_NOT_FOUND"
   *         }
   *     ]
   *
   *
   */

  // post posters

  /**
   * @api {post} /accounts/:account_id/videos/:video_id/assets/poster Add Poster
   * @apiName Add Poster
   * @apiGroup assetGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Adds a poster file for a remote asset. Ingested assets must be added via the [Dynamic Ingest API](https://support.brightcove.com/node/17948). **Notes**: 1) you can use `/videos/ref:reference_id` instead of `/videos/video_id`; 2) only one poster can be added to a video.
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
   *
   * @apiParam (Request Body Fields) {String} [reference_id] video reference id (must be unique within the account)
   * @apiParam (Request Body Fields) {String {1-250}} remote_url the url for a remote asset (not applicable to ingested assets)
   *
   * @apiParamExample {Object} Add Posters Request Data Example:
   *    {
   *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-poster.png"
   *    }
   *
  * @apiSuccess (200) {String} id the asset id
  * @apiSuccess (200) {Boolean} audio_only not applicable to posters
  * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
  * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
  * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
  * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
  * @apiSuccess (200) {String} name asset name
  * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
  * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
  * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
  * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
  * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
  * @apiSuccess (200) {String} type the type of the asset
  * @apiSuccess (200) {String} updated_at when the video was last modified
  * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
   *
  * @apiSuccessExample {Object} Success Response:
   *    HTTP/1.1 200 OK
   *    {
   *        "account_id": "57838016001",
   *        "audio_only": false,
   *        "cdn_origin_id": "",
   *        "complete": true,
   *        "controller_type": "DEFAULT",
   *        "current_filename": "",
   *        "frame_height": null,
   *        "frame_width": null,
   *        "id": "4665727869001",
   *        "name": "",
   *        "progressive_download": false,
   *        "reference_id": "",
   *        "remote_stream_name": "",
   *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-poster.png",
   *        "size": 0,
   *        "type": "VIDEO_STILL",
   *        "updated_at": "2015-12-18T14:42:22.439Z",
   *        "uploaded_at": "2015-12-18T14:42:22.436Z"
   *    }
   *
   * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
   * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
   * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
   * @apiError (Error 4xx) {Object[]} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
   * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: The specified reference id is already in use
   * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
   * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
   *
   *
   * @apiErrorExample {Object[]} 401 UNAUTHORIZED
   *     HTTP/1.1 401 UNAUTHORIZED
   *     [
   *         {
   *             "error_code": "UNAUTHORIZED",
   *             "message": "Permission denied."
   *         }
   *     ]
   *
   * @apiErrorExample {Object[]} 404 RESOURCE_NOT_FOUND
   *     HTTP/1.1 404 RESOURCE_NOT_FOUND
   *     [
   *         {
   *             "error_code": "RESOURCE_NOT_FOUND"
   *         }
   *     ]
   *
   * @apiErrorExample {Object[]} 409 CONFLICT
   *     HTTP/1.1 409 CONFLICT
   *     [
   *         {
   *             "error_code": "REFERENCE_ID_IN_USE",
   *             "message": "Reference id moose_2015_09_17 is already in use."
   *         }
   *     ]
   *
   * @apiErrorExample 400 Bad Request
   *    HTTP/1.1 400 Bad Request
   *    {
   *        "error_code": "BAD_VALUE",
   *        "message": "Unable to process JSON"
   *    }
   *
   * @apiErrorExample 422 ILLEGAL_FIELD
   *    HTTP/1.1 422 Unprocessable Entity
   *    [
   *        {
   *            "error_code": "VALIDATION_ERROR",
   *            "message": "foo: ILLEGAL_FIELD"
   *        }
   *    ]
   *
   * @apiErrorExample 422 REQUIRED_FIELD
   *    HTTP/1.1 422 Unprocessable Entity
   *    [
   *        {
   *            "error_code": "VALIDATION_ERROR",
   *            "message": "remote_url: REQUIRED_FIELD"
   *        }
   *    ]
   */

  // patch poster

  /**
   * @api {patch} /accounts/:account_id/videos/:video_id/assets/poster/:asset_id Update Poster
   * @apiName Update Poster
   * @apiGroup assetGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Updates the location of a remote poster file for a remote asset. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
   * @apiParam {String} asset_id id for the asset
   *
   * @apiParam (Request Body Fields) {String} [reference_id] video reference id (must be unique within the account)
   * @apiParam (Request Body Fields) {String {1-250}} remote_url the url for a remote asset (not applicable to ingested assets)
   *
   * @apiParamExample {Object} Add Posters Request Data Example:
   *    {
   *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-poster.png"
   *    }
   *
  * @apiSuccess (200) {String} id the asset id
  * @apiSuccess (200) {Boolean} audio_only not applicable to posters
  * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
  * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
  * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
  * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
  * @apiSuccess (200) {String} name asset name
  * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
  * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
  * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
  * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
  * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
  * @apiSuccess (200) {String} type the type of the asset
  * @apiSuccess (200) {String} updated_at when the video was last modified
  * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
   *
  * @apiSuccessExample {Object} Success Response:
   *    HTTP/1.1 200 OK
   *    {
   *        "account_id": "57838016001",
   *        "audio_only": false,
   *        "cdn_origin_id": "",
   *        "complete": true,
   *        "controller_type": "DEFAULT",
   *        "current_filename": "",
   *        "frame_height": null,
   *        "frame_width": null,
   *        "id": "4665727869001",
   *        "name": "",
   *        "progressive_download": false,
   *        "reference_id": "",
   *        "remote_stream_name": "",
   *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-poster.png",
   *        "size": 0,
   *        "type": "VIDEO_STILL",
   *        "updated_at": "2015-12-18T14:42:22.439Z",
   *        "uploaded_at": "2015-12-18T14:42:22.436Z"
   *    }
   *
   * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
   * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
   * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
   * @apiError (Error 4xx) {Object[]} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
   * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: The specified reference id is already in use
   * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
   * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
   *
   *
   * @apiErrorExample {Object[]} 401 UNAUTHORIZED
   *     HTTP/1.1 401 UNAUTHORIZED
   *     [
   *         {
   *             "error_code": "UNAUTHORIZED",
   *             "message": "Permission denied."
   *         }
   *     ]
   *
   * @apiErrorExample {Object[]} 404 RESOURCE_NOT_FOUND
   *     HTTP/1.1 404 RESOURCE_NOT_FOUND
   *     [
   *         {
   *             "error_code": "RESOURCE_NOT_FOUND"
   *         }
   *     ]
   *
   * @apiErrorExample {Object[]} 409 CONFLICT
   *     HTTP/1.1 409 CONFLICT
   *     [
   *         {
   *             "error_code": "REFERENCE_ID_IN_USE",
   *             "message": "Reference id moose_2015_09_17 is already in use."
   *         }
   *     ]
   *
   * @apiErrorExample 400 Bad Request
   *    HTTP/1.1 400 Bad Request
   *    {
   *        "error_code": "BAD_VALUE",
   *        "message": "Unable to process JSON"
   *    }
   *
   * @apiErrorExample 422 ILLEGAL_FIELD
   *    HTTP/1.1 422 Unprocessable Entity
   *    [
   *        {
   *            "error_code": "VALIDATION_ERROR",
   *            "message": "foo: ILLEGAL_FIELD"
   *        }
   *    ]
   *
   *
   */

   // delete poster

   /**
    * @api {delete} /accounts/:account_id/videos/:video_id/assets/poster/:asset_id Delete Poster
    * @apiName Delete Poster
    * @apiGroup assetGroup
    * @apiVersion 1.0.0
    *
    * @apiDescription Deletes a poster file for a remote asset. Note that you can only add one poster for a video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
    *
    * @apiHeader {String} Content-Type Content-Type: application/json
    * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
    *
    * @apiParam {String} account_id Video Cloud account ID.
    * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
    * @apiParam {String} asset_id the asset id
    *
    *
    * @apiParamExample {String} Delete Poster Example:
    *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/poster/77874616001
    *
    *
 * @apiSuccessExample {null} Success Response:
    *    HTTP/1.1 204 NO CONTENT
    *
    * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
    * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
    * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
    * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
    * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
    * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
    *
    * @apiErrorExample {Object[]} 401 UNAUTHORIZED
    *     HTTP/1.1 401 UNAUTHORIZED
    *     [
    *         {
    *             "error_code": "UNAUTHORIZED",
    *             "message": "Permission denied."
    *         }
    *     ]
    *
    * @apiErrorExample {Object[]} 404 Error Response
    *     HTTP/1.1 404 Not Found
    *     [
    *         {
    *             "error_code": "RESOURCE_NOT_FOUND"
    *         }
    *     ]
    *
    *
    */


// get thumbnails

/**
 * @api {get} /accounts/:account_id/videos/:video_id/assets/thumbnail Get Thumbnail List
 * @apiName Get Thumbnail List
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the thumbnail for a given video. Note that you can only add one thumbnail for a video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
 *
 *
 * @apiParamExample {String} Thumbnail list Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/thumbnail
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to thumbnails
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "frame_height": null,
 *        "frame_width": null,
 *        "id": "4665727869001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-thumbnail.png",
 *        "size": 0,
 *        "type": "THUMBNAIL",
 *        "updated_at": "2015-12-18T14:42:22.439Z",
 *        "uploaded_at": "2015-12-18T14:42:22.436Z"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
 *
 * @apiErrorExample {Object[]} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
 *
 * @apiErrorExample {Object[]} 404 Error Response
 *     HTTP/1.1 404 Not Found
 *     [
 *         {
 *             "error_code": "RESOURCE_NOT_FOUND"
 *         }
 *     ]
 *
 *
 */

// get thumbnail

/**
 * @api {get} /accounts/:account_id/videos/:video_id/assets/thumbnail/:asset_id Get Thumbnail
 * @apiName Get Thumbnail
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a thumbnail file for a given video. Note that you can only add one thumbnail for a video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
 * @apiParam {String} asset_id the asset id
 *
 *
 * @apiParamExample {String} Thumbnail Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/thumbnail/77874616001
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to thumbnails
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "frame_height": null,
 *        "frame_width": null,
 *        "id": "4665727869001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-thumbnail.png",
 *        "size": 0,
 *        "type": "THUMBNAIL",
 *        "updated_at": "2015-12-18T14:42:22.439Z",
 *        "uploaded_at": "2015-12-18T14:42:22.436Z"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
 *
 * @apiErrorExample {Object[]} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
 *
 * @apiErrorExample {Object[]} 404 Error Response
 *     HTTP/1.1 404 Not Found
 *     [
 *         {
 *             "error_code": "RESOURCE_NOT_FOUND"
 *         }
 *     ]
 *
 *
 */

// post thumbnails

/**
 * @api {post} /accounts/:account_id/videos/:video_id/assets/thumbnail Add Thumbnail
 * @apiName Add Thumbnail
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Adds a thumbnail file for a remote asset. Ingested assets must be added via the [Dynamic Ingest API](https://support.brightcove.com/node/17948). **Notes**: 1) you can use `/videos/ref:reference_id` instead of `/videos/video_id`; 2) only one thumbnail can be added to a video.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/node/17948))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
 *
 * @apiParam (Request Body Fields) {String} [reference_id] video reference id (must be unique within the account)
 * @apiParam (Request Body Fields) {String {1-250}} remote_url the url for a remote asset (not applicable to ingested assets)
 *
 * @apiParamExample {Object[]} Add Thumbnails Request Data Example:
 *    {
 *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-thumbnail.png"
 *    }
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to thumbnails
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "frame_height": null,
 *        "frame_width": null,
 *        "id": "4665727869001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-thumbnail.png",
 *        "size": 0,
 *        "type": "THUMBNAIL",
 *        "updated_at": "2015-12-18T14:42:22.439Z",
 *        "uploaded_at": "2015-12-18T14:42:22.436Z"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 4xx) {Object[]} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
 * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: The specified reference id is already in use
 * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
 *
 *
 * @apiErrorExample {Object[]} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
 *
 * @apiErrorExample {Object[]} 404 RESOURCE_NOT_FOUND
 *     HTTP/1.1 404 RESOURCE_NOT_FOUND
 *     [
 *         {
 *             "error_code": "RESOURCE_NOT_FOUND"
 *         }
 *     ]
 *
 * @apiErrorExample {Object[]} 409 CONFLICT
 *     HTTP/1.1 409 CONFLICT
 *     [
 *         {
 *             "error_code": "REFERENCE_ID_IN_USE",
 *             "message": "Reference id moose_2015_09_17 is already in use."
 *         }
 *     ]
 *
 * @apiErrorExample 400 Bad Request
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "error_code": "BAD_VALUE",
 *        "message": "Unable to process JSON"
 *    }
 *
 * @apiErrorExample 422 ILLEGAL_FIELD
 *    HTTP/1.1 422 Unprocessable Entity
 *    [
 *        {
 *            "error_code": "VALIDATION_ERROR",
 *            "message": "foo: ILLEGAL_FIELD"
 *        }
 *    ]
 *
 * @apiErrorExample 422 REQUIRED_FIELD
 *    HTTP/1.1 422 Unprocessable Entity
 *    [
 *        {
 *            "error_code": "VALIDATION_ERROR",
 *            "message": "remote_url: REQUIRED_FIELD"
 *        }
 *    ]
 */

// patch thumbnail

/**
 * @api {patch} /accounts/:account_id/videos/:video_id/assets/thumbnail/:asset_id Update Thumbnail
 * @apiName Update Thumbnail
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates the location of a remote thumbnail file for a remote asset. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/node/17948))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
 * @apiParam {String} asset_id id for the asset
 *
 * @apiParam (Request Body Fields) {String} [reference_id] video reference id (must be unique within the account)
 * @apiParam (Request Body Fields) {String {1-250}} remote_url the url for a remote asset (not applicable to ingested assets)
 *
 * @apiParamExample {Object[]} Add Thumbnails Request Data Example:
 *    {
 *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-thumbnail.png"
 *    }
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to thumbnails
 * @apiSuccess (200) {Boolean} complete whether processing is complete for the asset (will be true for remote assets if a remote_url is supplied)
 * @apiSuccess (200) {String} controller_type the controller type for ingested renditions (not applicable to remote renditions or other types of assets)
 * @apiSuccess (200) {String} current_filename the filename for an ingested asset in the Video Cloud system (not applicable to remote assets)
 * @apiSuccess (200) {String} cdn_origin_id an internally used id (not applicable to remote assets)
 * @apiSuccess (200) {String} name asset name
 * @apiSuccess (200) {Boolean} progressive_download whether ingested rendition is available by progressive download (not applicable to other asset types or remote renditions)
 * @apiSuccess (200) {String} reference_id video reference id (must be unique within the account)
 * @apiSuccess (200) {String} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiSuccess (200) {String} remote_stream_name name for remote streams (not applicable to asset types other than rendition)
 * @apiSuccess (200) {Number} size the size of the asset in bytes (integer)
 * @apiSuccess (200) {String} type the type of the asset
 * @apiSuccess (200) {String} updated_at when the video was last modified
 * @apiSuccess (200) {String} uploaded_at when the asset was added to the video in Video Cloud
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "frame_height": null,
 *        "frame_width": null,
 *        "id": "4665727869001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/images/great-blue-heron-thumbnail.png",
 *        "size": 0,
 *        "type": "THUMBNAIL",
 *        "updated_at": "2015-12-18T14:42:22.439Z",
 *        "uploaded_at": "2015-12-18T14:42:22.436Z"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 4xx) {Object[]} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
 * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: The specified reference id is already in use
 * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
 *
 *
 * @apiErrorExample {Object[]} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
 *
 * @apiErrorExample {Object[]} 404 RESOURCE_NOT_FOUND
 *     HTTP/1.1 404 RESOURCE_NOT_FOUND
 *     [
 *         {
 *             "error_code": "RESOURCE_NOT_FOUND"
 *         }
 *     ]
 *
 * @apiErrorExample {Object[]} 409 CONFLICT
 *     HTTP/1.1 409 CONFLICT
 *     [
 *         {
 *             "error_code": "REFERENCE_ID_IN_USE",
 *             "message": "Reference id moose_2015_09_17 is already in use."
 *         }
 *     ]
 *
 * @apiErrorExample 400 Bad Request
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "error_code": "BAD_VALUE",
 *        "message": "Unable to process JSON"
 *    }
 *
 * @apiErrorExample 422 ILLEGAL_FIELD
 *    HTTP/1.1 422 Unprocessable Entity
 *    [
 *        {
 *            "error_code": "VALIDATION_ERROR",
 *            "message": "foo: ILLEGAL_FIELD"
 *        }
 *    ]
 *
 *
 */

 // delete thumbnail

 /**
  * @api {delete} /accounts/:account_id/videos/:video_id/assets/thumbnail/:asset_id Delete Thumbnail
  * @apiName Delete Thumbnail
  * @apiGroup assetGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Deletes a thumbnail file for a remote asset. Note that you can only add one thumbnail for a video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/node/17948))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
  * @apiParam {String} asset_id the asset id
  *
  *
  * @apiParamExample {String} Delete Thumbnail Example:
  *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/thumbnail/77874616001
  *
  *
 * @apiSuccessExample {null} Success Response:
  *    HTTP/1.1 204 NO CONTENT
  *
  * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
  * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
  * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
  * @apiError (Error 5xx) {Object[]} UNKNOWN 500: Issue in Brightcove system; try again later.
  * @apiError (Error 5xx) {Object[]} TIMEOUT 500: Server likely too busy; try again later.
  *
  * @apiErrorExample {Object[]} 401 UNAUTHORIZED
  *     HTTP/1.1 401 UNAUTHORIZED
  *     [
  *         {
  *             "error_code": "UNAUTHORIZED",
  *             "message": "Permission denied."
  *         }
  *     ]
  *
  * @apiErrorExample {Object[]} 404 Error Response
  *     HTTP/1.1 404 Not Found
  *     [
  *         {
  *             "error_code": "RESOURCE_NOT_FOUND"
  *         }
  *     ]
  *
  *
  */
