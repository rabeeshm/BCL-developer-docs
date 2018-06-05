"Delete_HLS_Manifest",
"Get_HDS_Manifest_List",
"Get_HDS_Manifest",
"Add_HDS_Manifest",
"Update_HDS_Manifest",
"Delete_HDS_Manifest",



// get hds_manifests

/**
 * @api {get} /accounts/:account_id/videos/:video_id/assets/hds_manifest Get HDS Manifest List
 * @apiName Get HDS Manifest List
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the hds_manifest file for a given video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
 *
 *
 * @apiParamExample {String} HDS Manifest list Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/hds_manifest
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to hds_manifests
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
 * @apiSuccess (200) {Number} video_duration video duration in seconds (present if you included it when you created the asset)
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "id": "4665727974001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/avideo/hds/chickadee/chickadee.f4v",
 *        "size": 0,
 *        "type": "HDS_MANIFEST",
 *        "updated_at": "2015-12-18T17:02:08.167Z",
 *        "uploaded_at": "2015-12-18T17:02:08.165Z"
 *    }
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {json} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {json} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 5xx) {json} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
 *
 * @apiErrorExample {json} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
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
 */

// get hds_manifest

/**
 * @api {get} /accounts/:account_id/videos/:video_id/assets/hds_manifest/:asset_id Get HDS Manifest
 * @apiName Get HDS Manifest
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the hds_manifest file for a given video. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
 *
 *
 * @apiParamExample {String} HDS Manifest list Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/hds_manifest/77874616001
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to hds_manifests
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
 * @apiSuccess (200) {Number} video_duration video duration in seconds (present if you included it when you created the asset)
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "id": "4665727974001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/avideo/hds/chickadee/chickadee.f4v",
 *        "size": 0,
 *        "type": "HDS_MANIFEST",
 *        "updated_at": "2015-12-18T17:02:08.167Z",
 *        "uploaded_at": "2015-12-18T17:02:08.165Z"
 *    }
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {json} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {json} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 5xx) {json} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
 *
 * @apiErrorExample {json} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
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
 */

// post hds_manifests

/**
 * @api {post} /accounts/:account_id/videos/:video_id/assets/hds_manifest Add HDS Manifest
 * @apiName Add HDS Manifest
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Adds the location of an hds_manifest file for a remote asset. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
 *
 * @apiParam (Request Body Fields) {String} [reference_id] video reference id (must be unique within the account)
 * @apiParam (Request Body Fields) {String {1-250}} remote_url the url for a remote asset (not applicable to ingested assets)
 * @apiParam (Request Body Fields) {Number} [video_duration] the duration of the video in seconds
 *
 * @apiParamExample {json} Add HDS Manifest Request Data Example:
 *    {
 *        "remote_url": "http://learning-services-media.brightcove.com/avideo/hls/chickadee/chickadee.f4v"
 *    }
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to hds_manifests
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
 * @apiSuccess (200) {Number} video_duration video duration in seconds (present if you included it when you created the asset)
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "id": "4665727974001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/avideo/hds/chickadee/chickadee.f4v",
 *        "size": 0,
 *        "type": "HDS_MANIFEST",
 *        "updated_at": "2015-12-18T17:02:08.167Z",
 *        "uploaded_at": "2015-12-18T17:02:08.165Z"
 *    }
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {json} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {json} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 4xx) {json} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
 * @apiError (Error 5xx) {json} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
 *
 *
 * @apiErrorExample {json} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
 *
 * @apiErrorExample {json} 404 RESOURCE_NOT_FOUND
 *     HTTP/1.1 404 RESOURCE_NOT_FOUND
 *     [
 *         {
 *             "error_code": "RESOURCE_NOT_FOUND"
 *         }
 *     ]
 *
 * @apiErrorExample {json} 409 CONFLICT
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
 *     ]
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

// patch hds_manifests

/**
 * @api {patch} /accounts/:account_id/videos/:video_id/assets/hds_manifest/:asset_id Update HDS Manifest
 * @apiName Update HDS Manifest
 * @apiGroup assetGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates the location of a remote hds_manifest file for a remote asset. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
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
 * @apiParam (Request Body Fields) {Number} [video_duration] the duration of the video in seconds
 *
 * @apiParamExample {json} Add HDS Manifest Request Data Example:
 *    {
 *        "remote_url": "http://learning-services-media.brightcove.com/avideo/hls/chickadee/chickadee.f4v"
 *    }
 *
 * @apiSuccess (200) {String} id the asset id
 * @apiSuccess (200) {Boolean} audio_only not applicable to hds_manifests
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
 * @apiSuccess (200) {Number} video_duration video duration in seconds (present if you included it when you created the asset)
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "",
 *        "id": "4665727974001",
 *        "name": "",
 *        "progressive_download": false,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "http://learning-services-media.brightcove.com/avideo/hds/chickadee/chickadee.f4v",
 *        "size": 0,
 *        "type": "HDS_MANIFEST",
 *        "updated_at": "2015-12-18T17:02:08.167Z",
 *        "uploaded_at": "2015-12-18T17:02:08.165Z"
 *    }
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {json} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
 * @apiError (Error 4xx) {json} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 4xx) {json} VALIDATION_ERROR 422: "remote_url: REQUIRED_FIELD" &mdash; this endpoint can only be used to add remote assets
 * @apiError (Error 4xx) {json} REFERENCE_ID_IN_USE 409: The specified reference id is already in use
 * @apiError (Error 5xx) {json} UNKNOWN 500: Issue in Brightcove system; try again later.
 * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
 *
 *
 * @apiErrorExample {json} 401 UNAUTHORIZED
 *     HTTP/1.1 401 UNAUTHORIZED
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED",
 *             "message": "Permission denied."
 *         }
 *     ]
 *
 * @apiErrorExample {json} 404 RESOURCE_NOT_FOUND
 *     HTTP/1.1 404 RESOURCE_NOT_FOUND
 *     [
 *         {
 *             "error_code": "RESOURCE_NOT_FOUND"
 *         }
 *     ]
 *
 * @apiErrorExample {json} 409 CONFLICT
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

 // delete hds_manifest

 /**
  * @api {delete} /accounts/:account_id/videos/:video_id/assets/hds_manifest/:asset_id Delete HDS Manifest
  * @apiName Delete HDS Manifest
  * @apiGroup assetGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Deletes an hds_manifest file for a remote asset. **Note**: you can use `/videos/ref:reference_id` instead of `/videos/video_id`
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
  *
  *
  * @apiParamExample {String} Delete HDS Manifest list Example:
  *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/assets/hds_manifest/77874616001
  *
  *
 * @apiSuccessExample {json} Success Response:
  *    HTTP/1.1 204 NO CONTENT
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {json} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
  * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is temporarily unavailable
  * @apiError (Error 4xx) {json} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
  * @apiError (Error 5xx) {json} UNKNOWN 500: Issue in Brightcove system; try again later.
  * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
  *
  * @apiErrorExample {json} 401 UNAUTHORIZED
  *     HTTP/1.1 401 UNAUTHORIZED
  *     [
  *         {
  *             "error_code": "UNAUTHORIZED",
  *             "message": "Permission denied."
  *         }
  *     ]
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
  */
