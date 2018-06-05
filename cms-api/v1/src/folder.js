/**
 * @apiDefine folderGroup Folders
 * Folder operations allow you to create, retrieve, update, and delete folders, as well as add videos to or remove them from a folder.
 */

// get folders

/**
 * @api {get} /accounts/:account_id/folders Get Folders
 * @apiName Get Folders
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets list of folders for the account
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam (URL Parameters) {Number} [limit=20] number of folders to return
 * @apiParam (URL Parameters) {Number} [offset=0] number of folders to skip in the response
 *
 * @apiParamExample {String} Get Folders Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/folders
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {String} created_at date/time folder created
 * @apiSuccess (200) {String} updated_at date/time folder last modified
 * @apiSuccess (200) {String} id system id for the folder
 * @apiSuccess (200) {String} name folder name
 * @apiSuccess (200) {String} video_count number of videos in the folder
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *    [
 *        {
 *            "account_id": "57838016001",
 *            "created_at": "2015-09-21T17:09:51.375Z",
 *            "id": "560039dfe4b0471bef470c47",
 *            "name": "birds",
 *            "updated_at": "2015-09-21T17:11:23.839Z",
 *            "video_count": 17
 *        },
 *        {
 *            "account_id": "57838016001",
 *            "created_at": "2015-09-21T17:09:57.260Z",
 *            "id": "560039e5e4b0e69e4b01cacd",
 *            "name": "fish",
 *            "updated_at": "2015-09-21T17:12:08.955Z",
 *            "video_count": 12
 *        },
 *        {
 *            "account_id": "57838016001",
 *            "created_at": "2015-09-21T17:10:09.422Z",
 *            "id": "560039f1e4b0e69e4b01cad3",
 *            "name": "water",
 *            "updated_at": "2015-09-21T17:12:09.037Z",
 *            "video_count": 26
 *        }
 *    ]
 *
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

// get folder information

/**
 * @api {get} /accounts/:account_id/folders/:folder_id Get Folder Information
 * @apiName Get FolderInformation
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets information about a folder
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {Number} folder_id Video Cloud folder ID.
 *
 * @apiParamExample {String} Get Folder Information Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/folders/560039dfe4b0471bef470c47
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {String} created_at date/time folder created
 * @apiSuccess (200) {String} updated_at date/time folder last modified
 * @apiSuccess (200) {String} id system id for the folder
 * @apiSuccess (200) {String} name folder name
 * @apiSuccess (200) {String} video_count number of videos in the folder
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "created_at": "2015-09-21T17:09:51.375Z",
 *        "id": "560039dfe4b0471bef470c47",
 *        "name": "birds",
 *        "updated_at": "2015-09-21T17:11:23.839Z",
 *        "video_count": 17
 *    }
 *
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

// get videos in folder

/**
 * @api {get} /accounts/:account_id/folders/:folder_id/videos Get Videos in Folder
 * @apiName Get Videos in Folder
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets list of video objects in a folder
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {Number} folder_id the folder ID.
 * @apiParam (URL Parameters) {Number} [limit=20] number of videos to return
 * @apiParam (URL Parameters) {Number} [offset=0] number of videos to skip in the response
 *
 * @apiParamExample {String} Get Videos in Folder Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/folders/560039dfe4b0471bef470c47/videos
 *
 * @apiSuccess (200) {String} id video id
 * @apiSuccess (200) {String} name video title
 * @apiSuccess (200) {Boolean} complete whether processing is complete
 * @apiSuccess (200) {String} created_at when the video was created
 * @apiSuccess (200) {Object} custom_fields={} map of fieldname-value pairs
 * @apiSuccess (200) {Object} cue_points array of cue point maps
 * @apiSuccess (200) {String} cue_points.name cue point name
 * @apiSuccess (200) {String} cue_points.type=AD cue point type
 * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
 * @apiSuccess (200) {String} cue_points.metadata=null optional metadata string (128 single-byte characters maximum)
 * @apiSuccess (200) {Boolean} cue_points.force-stop=false whether video is force-stopped at the cue point
 * @apiSuccess (200) {String} description video short description
 * @apiSuccess (200) {Number} duration video duration in milliseconds
 * @apiSuccess (200) {String} digital_master_id asset id of the digital master
 * @apiSuccess (200) {String} Economics whether video is AD_ENABLED (used by the Smart Player, not by the Brightcove Player)
 * @apiSuccess (200) {Object} geo map of geo-filtering properties
 * @apiSuccess (200) {String} geo.countries=null array of ISO 3166 list of 2-letter codes(https://www.iso.org/obp/ui/#home) (search for "country codes")
 * @apiSuccess (200) {Boolean} geo.exclude_countries=false if true, country array is treated as a list of countries excluded from viewing
 * @apiSuccess (200) {Boolean} geo.restricted=false whether geo-restriction is enabled for this video
 * @apiSuccess (200) {Object} images map of image maps
 * @apiSuccess (200) {Object} images.poster map of poster properties
 * @apiSuccess (200) {String} images.poster.asset_id asset id for the poster
 * @apiSuccess (200) {Object[]} images.poster.sources array of poster source maps
 * @apiSuccess (200) {String} images.poster.sources.src URL for a poster source image
 * @apiSuccess (200) {String} images.poster.src URL for the default poster source image
 * @apiSuccess (200) {Object} images.thumbnail map of thumbnail properties
 * @apiSuccess (200) {String} images.thumbnail.asset_id asset id for the thumbnail
 * @apiSuccess (200) {Object[]} images.thumbnail.sources array of thumbnail source maps
 * @apiSuccess (200) {String} images.thumbnail.sources.src URL for a thumbnail source image
 * @apiSuccess (200) {String} images.thumbnail.src URL for the default thumbnail source image
 * @apiSuccess (200) {Object} link map of scheduling properties
 * @apiSuccess (200) {String} link.text text for the link
 * @apiSuccess (200) {String} link.url URL for the link
 * @apiSuccess (200) {String} long_description video long description
 * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
 * @apiSuccess (200) {Object} schedule map of scheduling properties
 * @apiSuccess (200) {String} starts_at start date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} ends_at end date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} state state determines whether the video is playable or not
 * @apiSuccess (200) {Object} sharing map of the sharing properties for the video
 * @apiSuccess (200) {Boolean} sharing.by_external_acct whether the video was shared from another account
 * @apiSuccess (200) {String} sharing.by_id id of the account that shared the video; __note that this field is populated only for the shared copy, not for the original video__
 * @apiSuccess (200) {String} sharing.source_id id of the video in its original account; __note that this field is populated only for the shared copy, not for the original video__
 * @apiSuccess (200) {Boolean} sharing.to_external_acct whether the video is shared to another account
 * @apiSuccess (200) {Boolean} sharing.by_reference whether the video is shared by reference
 * @apiSuccess (200) {String[]} tags array of tags
 * @apiSuccess (200) {Object} text_tracks array of text track maps
 * @apiSuccess (200) {String} text_tracks.src URL for the .vtt file
 * @apiSuccess (200) {String} text_tracks.kind kind of text track
 * @apiSuccess (200) {String} text_tracks.srclang 2-letter language code, such as "en" or "ko"
 * @apiSuccess (200) {String} text_tracks.mime_type mime-type for the track
 * @apiSuccess (200) {String} text_tracks.label label for the track
 * @apiSuccess (200) {Boolean} text_tracks.default whether this is the default track
 * @apiSuccess (200) {String} updated_at when the video was last modified
  *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    [
 *        {
 *            "id": "3931368155001",
 *            "account_id": "57838016001",
 *            "complete": true,
 *            "created_at": "2014-12-09T06:07:11.877Z",
 *            "cue_points": [
 *                {
 *                    "id": "3981500051001",
 *                    "name": "cue3",
 *                    "type": "CODE",
 *                    "time": 17.319,
 *                    "metadata": "Mother-child interaction",
 *                    "force_stop": false
 *                },
 *                {
 *                    "id": "3981500052001",
 *                    "name": "Pre-roll",
 *                    "type": "AD",
 *                    "time": 0,
 *                    "metadata": null,
 *                    "force_stop": false
 *                },
 *                {
 *                    "id": "3981500053001",
 *                    "name": "cue2",
 *                    "type": "CODE",
 *                    "time": 10.527,
 *                    "metadata": "Owl turns face to us",
 *                    "force_stop": false
 *                },
 *                {
 *                    "id": "3981500055001",
 *                    "name": "Post-roll",
 *                    "type": "AD",
 *                    "time": 41.237,
 *                    "metadata": null,
 *                    "force_stop": false
 *                },
 *                {
 *                    "id": "3981500054001",
 *                    "name": "cue1",
 *                    "type": "CODE",
 *                    "time": 4.418,
 *                    "metadata": "owl turns away",
 *                    "force_stop": false
 *                }
 *            ],
 *            "custom_fields": {
 *                "associated-topics": "Air, Nature",
 *                "subject": "Birds"
 *            },
 *            "description": "Mother and child owls...",
 *            "digital_master_id": "4508192940001",
 *            "duration": 41237,
 *            "economics": "AD_SUPPORTED",
 *            "folder_id": "560039dfe4b0471bef470c47",
 *            "geo": null,
 *            "images": {
 *                "thumbnail": {
 *                    "asset_id": "4508192962001",
 *                    "remote": false,
 *                    "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201509/826/57838016001_4508192962001_3931368155001-th.jpg?pubId=57838016001&videoId=3931368155001",
 *                    "sources": [
 *                        {
 *                            "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201509/826/57838016001_4508192962001_3931368155001-th.jpg?pubId=57838016001&videoId=3931368155001"
 *                        }
 *                    ]
 *                },
 *                "poster": {
 *                    "asset_id": "4508192954001",
 *                    "remote": false,
 *                    "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201509/826/57838016001_4508192954001_3931368155001-vs.jpg?pubId=57838016001&videoId=3931368155001",
 *                    "sources": [
 *                        {
 *                            "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201509/826/57838016001_4508192954001_3931368155001-vs.jpg?pubId=57838016001&videoId=3931368155001"
 *                        }
 *                    ]
 *                }
 *            },
 *            "link": {
 *                "text": "Brightcove Developer Documentation",
 *                "url": "http://docs.brightcove.com"
 *            },
 *            "long_description": "A large owl with perky ears that look like horns",
 *            "name": "Great Horned Owl",
 *            "reference_id": "greathornedowl.mp4_1418105221982",
 *            "schedule": {
 *                "ends_at": "2017-01-01T05:00:00.000Z",
 *                "starts_at": "2015-01-13T05:00:00.000Z"
 *            },
 *            "sharing": {
 *                "by_external_acct": false,
 *                "by_id": null,
 *                "source_id": null,
 *                "to_external_acct": true,
 *                "by_reference": false
 *            },
 *            "state": "ACTIVE",
 *            "tags": [
 *                "bird",
 *                "nature",
 *                "foo",
 *                "air",
 *                "bar"
 *            ],
 *            "text_tracks": [
 *
 *            ],
 *            "updated_at": "2015-09-25T07:19:15.473Z"
 *        }
 *    ]
 *
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

// create folder

/**
 * @api {post} /accounts/:account_id/folders Create Folder
 * @apiName Create Folder
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a new folder for the account
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam (Request Body Fields) {String} name name of the folder (must be unique in the account)
 *
 * @apiParamExample {json} Create Folder Example:
 *     {
 *         "name": "mammals"
 *     }
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {String} created_at date/time folder created
 * @apiSuccess (200) {String} updated_at date/time folder last modified
 * @apiSuccess (200) {String} id system id for the folder
 * @apiSuccess (200) {String} name folder name
 * @apiSuccess (200) {String} video_count number of videos in the folder
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 201 Created
 *    {
 *        "account_id": "57838016001",
 *        "created_at": "2015-09-22T12:52:43.406Z",
 *        "id": "56014f1be4b056563efe284e",
 *        "name": "mammals",
 *        "updated_at": "2015-09-22T12:52:43.406Z",
 *        "video_count": 0
 *    }
 *
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

// update folder

/**
 * @api {patch} /accounts/:account_id/folders/:folder_id Update Folder Name
 * @apiName Update Folder Name
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Update the folder name
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} folder_id the folder ID
 * @apiParam (Request Body Fields) {String} name name of the folder (must be unique in the account)
 *
 * @apiParamExample {json} Update Folder Example:
 *     {
 *         "name": "quadrupeds"
 *     }
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {String} created_at date/time folder created
 * @apiSuccess (200) {String} updated_at date/time folder last modified
 * @apiSuccess (200) {String} id system id for the folder
 * @apiSuccess (200) {String} name folder name
 * @apiSuccess (200) {String} video_count number of videos in the folder
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "created_at": "2015-09-21T17:09:51.375Z",
 *        "id": "560039dfe4b0471bef470c47",
 *        "name": "quadrupeds",
 *        "updated_at": "2015-09-22T19:42:24.497Z",
 *        "video_count": 25
 *    }
 *
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

// add video to folder

/**
 * @api {put} /accounts/:account_id/folders/:folder_id/videos/:video_id Add Video to Folder
 * @apiName Add Video to Folder
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Add a video to a folder
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} folder_id the folder ID
 * @apiParam {String} video_id the video ID
 *
 * @apiParamExample {json} Add Video to Folder Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/folders/560039dfe4b0471bef470c47/videos/4442677263001
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 204 No Content
 *
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

// remove video from folder

/**
 * @api {delete} /accounts/:account_id/folders/:folder_id/videos/:video_id Remove Video from Folder
 * @apiName Remove Video from Folder
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Remove a video from a folder
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} folder_id the folder ID
 * @apiParam {String} video_id the video ID
 *
 * @apiParamExample {json} Remove Video from Folder Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/folders/560039dfe4b0471bef470c47/videos/4442677263001
 *
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 204 No Content
 *
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

// delete folder

/**
 * @api {delete} /accounts/:account_id/folders/:folder_id Delete Folder
 * @apiName Delete Folder
 * @apiGroup folderGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete a folder
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} folder_id the folder ID
 * @apiParam (Request Body Fields) {String} name name of the folder (must be unique in the account)
 *
 * @apiParamExample {json} Update Folder Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/folders/560039dfe4b0471bef470c47
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {String} created_at date/time folder created
 * @apiSuccess (200) {String} updated_at date/time folder last modified
 * @apiSuccess (200) {String} id system id for the folder
 * @apiSuccess (200) {String} name folder name
 * @apiSuccess (200) {String} video_count number of videos in the folder
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 204 No Content
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
