/**
 * @apiDefine videoGroup Video
 * The video operations allow you to create, retrieve, update, and delete video objects in Video Cloud. (You cannot ingest any assets with the CMS API &mdash;
 * to add actual asset files, including videos, use the [Dynamic Ingest API](https://support.brightcove.com/node/17948).) You
 * can also search for videos, get a count of all your videos or of search results, get the sources, images, and digital master for a video, get the playlists
 * the video belongs to, and remove it from all playlists. There is also a GET request to return all custom fields for the account.
 */

// get videos

/**
 * @api {get} /accounts/:account_id/videos Get Videos
 * @apiName Get Videos
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a page of video objects
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 *
 * @apiParam (URL Parameters) {Number} [limit=20] number of videos to return
 * @apiParam (URL Parameters) {Number} [offset=0] number of videos to skip in the response
 * @apiParam (URL Parameters) {String} [q] search string - see [search guide](https://support.brightcove.com/node/18005#combinesearchcriteria) for details
 * @apiParam (URL Parameters) {String="name", "reference_id", "created_at", "published_at", "updated_at", "schedule_starts_at", "schedule_ends_at", "state", "plays_total", "plays_trailing_week"} [sort="-updated_at"] field to sort results by; if absent and there is a search string, results are sorted by relevance &mdash; note that `plays_total` and `plays_trailing_week` are **not** included in the response - note: to sort in descending order, preface the sort field name with a minus (-) sign
 *
 * @apiParamExample {String} Search Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos?q=tags:nature,name:nature
 *
 * @apiSuccess (200) {String} id video id
 * @apiSuccess (200) {String} name video title
 * @apiSuccess (200) {Boolean} complete whether processing is complete &mdash; __Note: when you create a new video, the complete property is automatically set to `false`. As soon as one rendition exists for the video, the complete property will be automatically set to `true`__
 * @apiSuccess (200) {String} created_at when the video was created
 * @apiSuccess (200) {String} ad_keys string representing the ad key/value pairs assigned to the video. Key/value pairs are formatted as key=value and are separated by ampersands. For example: `"adKeys": "category=sports&live=true"`
 * @apiSuccess (200) {String} clip_source_video_id The ID of the source video that was clipped to produce this video or `null` if this video is not a clip of another video
 * @apiSuccess (200) {Object} custom_fields map of fieldname-value pairs
 * @apiSuccess (200) {Object} cue_points array of cue point maps
 * @apiSuccess (200) {String} cue_points.name cue point name
 * @apiSuccess (200) {String} cue_points.type cue point type
 * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
 * @apiSuccess (200) {String} cue_points.metadata optional metadata string (128 single-byte characters maximum)
 * @apiSuccess (200) {Boolean} cue_points.force_stop whether video is force_stopped at the cue point
 * @apiSuccess (200) {String} delivery_type video delivery type - `remote`, `static_origin`, `dynamic_origin`, `live_origin` or `unknown`
 * @apiSuccess (200) {String} description video short description
 * @apiSuccess (200) {Boolean} drm_disabled if `true`, the video is not DRM-packaged
 * @apiSuccess (200) {Number} duration video duration in milliseconds
 * @apiSuccess (200) {String} digital_master_id asset id of the digital master
 * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
 * @apiSuccess (200) {String} folder_id id for the folder the video belongs to
 * @apiSuccess (200) {Object} geo map of geo-filtering properties
 * @apiSuccess (200) {String} geo.countries array of ISO 3166 list of 2-letter codes(https://www.iso.org/obp/ui/#home) (search for "country codes")
 * @apiSuccess (200) {Boolean} geo.exclude_countries if true, country array is treated as a list of countries excluded from viewing
 * @apiSuccess (200) {Boolean} geo.restricted whether geo-restriction is enabled for this video
 * @apiSuccess (200) {Boolean} has_digital_master whether video has an archived master than can be used for retranscoding
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
 * @apiSuccess (200) {Boolean} offline_enabled whether video is enabled for offline viewing
 * @apiSuccess (200) {String} original_filename the original file name for the uploaded video
 * @apiSuccess (200) {String} projection used for 360 videos
 * @apiSuccess (200) {String} published_at start date-time of first activation in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
 * @apiSuccess (200) {Object} schedule map of scheduling properties
 * @apiSuccess (200) {String} schedule.starts_at start date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} schedule.ends_at end date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} state state determines whether the video is playable or not
 * @apiSuccess (200) {Object} sharing map of sharing properties (applicable only to multiple accounts)
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
 * @apiSuccess (200) {String} text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
 *
 * @apiSuccessExample {Object[]} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *              "account_id": "1752604059001",
 *              "complete": true,
 *              "created_at": "2015-09-17T16:08:37.108Z",
 *              "cue_points": [],
 *              "custom_fields": {},
 *              "description": null,
 *              "digital_master_id": "4492154733001",
 *              "duration": 155573,
 *              "economics": "AD_SUPPORTED",
 *              "folder_id": null,
 *              "geo": null,
 *              "id": "4492075574001",
 *              "images": {
 *                  "poster": {
 *                      "asset_id": "4492153571001",
 *                      "sources": [
 *                          {
 *                              "src": "https://bcsecure01-a.akamaihd.net/6/1752604059001/201509/3164/1752604059001_4492153571001_4492075574001-vs.jpg?pubId=1752604059001&videoId=4492075574001"
 *                          }
 *                      ],
 *                      "src": "https://bcsecure01-a.akamaihd.net/6/1752604059001/201509/3164/1752604059001_4492153571001_4492075574001-vs.jpg?pubId=1752604059001&videoId=4492075574001"
 *                  },
 *                  "thumbnail": {
 *                      "asset_id": "4492154714001",
 *                      "sources": [
 *                          {
 *                              "src": "https://bcsecure01-a.akamaihd.net/6/1752604059001/201509/3164/1752604059001_4492154714001_4492075574001-th.jpg?pubId=1752604059001&videoId=4492075574001"
 *                          }
 *                      ],
 *                      "src": "https://bcsecure01-a.akamaihd.net/6/1752604059001/201509/3164/1752604059001_4492154714001_4492075574001-th.jpg?pubId=1752604059001&videoId=4492075574001"
 *                  }
 *              },
 *              "link": null,
 *              "long_description": null,
 *              "name": "sea_marvels.mp4",
 *              "reference_id": null,
 *              "schedule": null,
 *              "sharing": null,
 *              "state": "ACTIVE",
 *              "tags": [],
 *              "text_tracks": [
 *                  {
 *                      "asset_id": "0cbd3425-8e94-46e6-9a10-a0d4491d4893",
 *                      "default": true,
 *                      "id": "c9001cee-d7f9-4b67-955c-9764cfc3d1f4",
 *                      "kind": "captions",
 *                      "label": null,
 *                      "mime_type": "text/vtt",
 *                      "sources": [
 *                          {
 *                              "src": "https://bcsecure01-a.akamaihd.net/3/1752604059001/201509/3164/1752604059001_0cbd3425-8e94-46e6-9a10-a0d4491d4893_intro-vcs.vtt?pubId=1752604059001&videoId=4492075574001"
 *                          }
 *                      ],
 *                      "src": "https://bcsecure01-a.akamaihd.net/3/1752604059001/201509/3164/1752604059001_0cbd3425-8e94-46e6-9a10-a0d4491d4893_intro-vcs.vtt?pubId=1752604059001&videoId=4492075574001",
 *                      "srclang": "en"
 *                  }
 *              ],
 *              "updated_at": "2015-09-17T17:41:20.782Z"
 *          }
 *     ]
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: Resource not found
 * @apiError (Error 4xx) {Object[]} INVALID_SORT 400: sort parameter specified and invalid field
 * @apiError (Error 4xx) {Object[]} ILLEGAL_QUERY 400: The search string syntax was invalid - example: 1) doing a `tags` search that ends with a comma or has an unclosed quote
 * @apiError (Error 4xx) {Object[]} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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
 * @apiErrorExample {Object[]} 400 Error Response
 *     HTTP/1.1 400 INVALID_SORT
 *     [
 *         {
 *             "error_code": "INVALID_SORT",
 *             "message": "attempted to sort by invalid property: 'foo'"
 *         }
 *     ]
 *
 *
 */

// get video count

/**
 * @api {get} /accounts/:account_id/counts/videos Get Video Count
 * @apiName Get Video Count
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets count of videos for the account or a search
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 *
  * @apiParam (URL Parameters) {String} [q] search string - see [search guide](https://support.brightcove.com/node/18005#combinesearchcriteria) for details
 * @apiParam (URL Parameters) {String="name", "reference_id", "created_at", "published_at", "updated_at", "schedule_starts_at", "schedule_ends_at", "state", "plays_total", "plays_trailing_week"} [sort="-updated_at"] field to sort results by; if absent and there is a search string, results are sorted by relevance &mdash; note that `plays_total` and `plays_trailing_week` are **not** included in the response
 *
 * @apiParamExample {String} Search Count Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/counts/videos?q=tags:nature,name:nature
 *
 * @apiSuccess (200) {Number} count the count of videos found
 *
 * @apiSuccessExample {Object} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "count": 2678
 *     }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} INVALID_SORT 400: sort parameter specified and invalid field
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
 * @apiErrorExample {Object[]} 400 Error Response
 *     HTTP/1.1 400 INVALID_SORT
 *     [
 *         {
 *             "error_code": "INVALID_SORT",
 *             "message": "attempted to sort by invalid property: 'foo'"
 *         }
 *     ]
 *
 *
 *
 */

// get video by id

 /**
 * @api {get} /accounts/:account_id/videos/:video_id Get Video by ID or Reference ID
 * @apiName Get Video by ID or Reference ID
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a video object
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or multiple ids separated by commas) (or `ref:reference_id` - only one reference id)
  *
 * @apiParamExample {String} Get Video Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4492075574001
 *     // or
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/ref:my_reference_id
 *
 * @apiSuccess (200) {String} id video id
 * @apiSuccess (200) {String} name video title
 * @apiSuccess (200) {Boolean} complete whether processing is complete &mdash; __Note: when you create a new video, the complete property is automatically set to `false`. As soon as one rendition exists for the video, the complete property will be automatically set to `true`__
 * @apiSuccess (200) {String} ad_keys string representing the ad key/value pairs assigned to the video. Key/value pairs are formatted as key=value and are separated by ampersands. For example: `"adKeys": "category=sports&live=true"`
 * @apiSuccess (200) {String} clip_source_video_id The ID of the source video that was clipped to produce this video or `null` if this video is not a clip of another video
 * @apiSuccess (200) {String} created_at when the video was created
 * @apiSuccess (200) {Object} custom_fields map of fieldname-value pairs
 * @apiSuccess (200) {Object} cue_points array of cue point maps
 * @apiSuccess (200) {String} cue_points.name cue point name
 * @apiSuccess (200) {String} cue_points.type cue point type
 * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
 * @apiSuccess (200) {String} cue_points.metadata optional metadata string (128 single-byte characters maximum)
 * @apiSuccess (200) {Boolean} cue_points.force_stop whether video is force_stopped at the cue point
 * @apiSuccess (200) {String} delivery_type video delivery type - `remote`, `static_origin`, `dynamic_origin`, `live_origin` or `unknown`
 * @apiSuccess (200) {String} description video short description
 * @apiSuccess (200) {Boolean} drm_disabled if `true`, the video is not DRM-packaged
 * @apiSuccess (200) {Number} duration video duration in milliseconds
 * @apiSuccess (200) {String} digital_master_id asset id of the digital master
 * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
 * @apiSuccess (200) {String} folder_id id of the folder that contains the video
 * @apiSuccess (200) {Object} geo map of geo-filtering properties
 * @apiSuccess (200) {String} geo.countries array of ISO 3166 list of 2-letter codes(https://www.iso.org/obp/ui/#home) (search for "country codes")
 * @apiSuccess (200) {Boolean} geo.exclude_countries if true, country array is treated as a list of countries excluded from viewing
 * @apiSuccess (200) {Boolean} geo.restricted whether geo-restriction is enabled for this video
 * @apiSuccess (200) {Boolean} has_digital_master whether video has an archived master than can be used for retranscoding
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
 * @apiSuccess (200) {Boolean} offline_enabled whether video is enabled for offline viewing
 * @apiSuccess (200) {String} original_filename the original file name for the uploaded video
 * @apiSuccess (200) {String} projection used for 360 videos
 * @apiSuccess (200) {String} published_at start date-time of first activation in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
 * @apiSuccess (200) {Object} schedule map of scheduling properties
 * @apiSuccess (200) {String} schedule.starts_at start date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} schedule.ends_at end date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
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
 * @apiSuccess (200) {String} text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
 * @apiSuccess (200) {String} updated_at when the video was last modified
 *
 * @apiSuccessExample {Object} Success Response:
 *     HTTP/1.1 200 OK
 *    {
 *    	"id": "5566317640001",
 *    	"account_id": "57838016001",
 *    	"ad_keys": null,
 *    	"clip_source_video_id": null,
 *    	"complete": true,
 *    	"created_at": "2017-09-06T12:52:08.639Z",
 *    	"cue_points": [
 *    	],
 *    	"custom_fields": {
 *    		"purpose": "Demo",
 *    		"downloadable": "no",
 *    		"uploader-userid": "rcrooks@brightcove.com"
 *    	},
 *    	"delivery_type": "static_origin",
 *    	"description": null,
 *    	"digital_master_id": "5566327803001",
 *    	"duration": 16207,
 *    	"economics": "AD_SUPPORTED",
 *    	"folder_id": null,
 *    	"geo": null,
 *    	"has_digital_master": true,
 *    	"images": {
 *    		"thumbnail": {
 *    			"asset_id": "5566327984001",
 *    			"remote": false,
 *    			"src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201709/1425/57838016001_5566327984001_5566317640001-th.jpg?pubId=57838016001&videoId=5566317640001",
 *    			"sources": [
 *    				{
 *    					"src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201709/1425/57838016001_5566327984001_5566317640001-th.jpg?pubId=57838016001&videoId=5566317640001",
 *    					"height": 90,
 *    					"width": 160
 *    				},
 *    				{
 *    					"src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/57838016001/201709/1425/57838016001_5566327984001_5566317640001-th.jpg?pubId=57838016001&videoId=5566317640001",
 *    					"height": 90,
 *    					"width": 160
 *    				}
 *    			]
 *    		},
 *    		"poster": {
 *    			"asset_id": "5566326010001",
 *    			"remote": false,
 *    			"src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201709/1425/57838016001_5566326010001_5566317640001-vs.jpg?pubId=57838016001&videoId=5566317640001",
 *    			"sources": [
 *    				{
 *    					"src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201709/1425/57838016001_5566326010001_5566317640001-vs.jpg?pubId=57838016001&videoId=5566317640001",
 *    					"height": 720,
 *    					"width": 1280
 *    				},
 *    				{
 *    					"src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/57838016001/201709/1425/57838016001_5566326010001_5566317640001-vs.jpg?pubId=57838016001&videoId=5566317640001",
 *    					"height": 720,
 *    					"width": 1280
 *    				}
 *    			]
 *    		}
 *    	},
 *    	"link": null,
 *    	"long_description": null,
 *    	"name": "Adult-and-young-swan-Sizergh-Castlle-Cumbria",
 *    	"original_filename": "Adult-and-young-swan-Sizergh-Castlle-Cumbria.mov",
 *    	"projection": null,
 *    	"published_at": "2017-09-06T12:52:08.639Z",
 *    	"reference_id": null,
 *    	"schedule": null,
 *    	"sharing": {
 *    		"by_external_acct": false,
 *    		"by_id": null,
 *    		"source_id": null,
 *    		"to_external_acct": true,
 *    		"by_reference": false
 *    	},
 *    	"state": "ACTIVE",
 *    	"tags": [
 *    	],
 *    	"text_tracks": [
 *    	],
 *    	"updated_at": "2017-09-06T13:01:03.817Z"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
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

// get sources

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/sources Get Video Sources
 * @apiName Get Video Sources
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets an array of sources (renditions) for a video
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`).
 *
 * @apiParamExample {String} Get Video Sources Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/3931368155001/sources
 *
 * @apiSuccess (200) {String} app_name address for RTMP stream
 * @apiSuccess (200) {String} asset_id system id for the rendition
 * @apiSuccess (200) {String} codec the video codec for the rendition
 * @apiSuccess (200) {String} container the video container for the rendition
 * @apiSuccess (200) {Number} duration duration in milliseconds
 * @apiSuccess (200) {Number} encoding_rate encoding rate in bps
 * @apiSuccess (200) {Number} height frame height in pixels
 * @apiSuccess (200) {Boolean} remote whether the source is a remote asset
 * @apiSuccess (200) {Number} size file size in bytes
 * @apiSuccess (200) {String} src URL for HTTP rendition
 * @apiSuccess (200) {String} steam_name the stream name on the CDN
 * @apiSuccess (200) {String} type the type for segmented streams
 * @apiSuccess (200) {String} uploaded_at date/time when the video was uploaded
 * @apiSuccess (200) {Number} width frame width in pixels
 *
 * @apiSuccessExample {Object[]} Dynamic Delivery Video Success Response
 *    HTTP/1.1 200 OK
 *    [
 *        {
 *            "src": "https://manifest.prod.boltdns.net/manifest/v1/hls/v4/clear/57838016001/ae81dd9b-99ba-4899-bc8b-9402cf242210/10s/master.m3u8?fastly_token=NTk2MzQ5NDJfZTg4MWE3NGVhMGI1ZWY5MjZjNGEyMGJkZDlmNTE0MjhmMDEyNDgwOGFiM2UxZjZlNjI5ZGZjNDE0YjQ5MmZmYQ%3D%3D",
 *            "ext_x_version": "4",
 *            "type": "application/x-mpegURL",
 *            "uploaded_at": "2017-04-27T18:07:58.185Z"
 *        },
 *        {
 *            "src": "https://manifest.prod.boltdns.net/manifest/v1/hls/v5/clear/57838016001/ae81dd9b-99ba-4899-bc8b-9402cf242210/10s/master.m3u8?fastly_token=NTk2MzQ5NDJfYjAxOGJiNGMxYzdlYWEzOGZjMjdmZDRiZTYwZDU5ZmE5YWU4NjhhNzFlMzc1YmMxMDcwOGYyMjk2NjAzMjRjNA%3D%3D",
 *            "ext_x_version": "5",
 *            "type": "application/x-mpegURL",
 *            "uploaded_at": "2017-04-27T18:07:58.185Z"
 *        },
 *        {
 *            "src": "https://manifest.prod.boltdns.net/manifest/v1/dash/live-baseurl/clear/57838016001/ae81dd9b-99ba-4899-bc8b-9402cf242210/2s/manifest.mpd?fastly_token=NTk2MzQ5NDJfY2QzYWU1ZjNlOWRhZDY1MjE4N2ZjZjgzNmUxMmY3ZDMzMDViZDExZTVmYTJjNWY2MGIzMDg3ZmM2NDU2MmU4Ng%3D%3D",
 *            "type": "application/dash+xml",
 *            "uploaded_at": "2017-04-27T18:07:58.185Z",
 *            "profiles": "urn:mpeg:dash:profile:isoff-live:2011"
 *        },
 *        {
 *            "remote": false,
 *            "src": "https://bcbolt446c5271-a.akamaihd.net/media/v1/pmp4/static/clear/57838016001/ae81dd9b-99ba-4899-bc8b-9402cf242210/high.mp4?akamai_token=exp=1499679042~acl=/media/v1/pmp4/static/clear/57838016001/ae81dd9b-99ba-4899-bc8b-9402cf242210/high.mp4*~hmac=059c3404b66179664e230b3392e0a742f761d4f51275a7f0f102ab7f2888abc2",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "encoding_rate": 4119000,
 *            "duration": 31487,
 *            "height": 1080,
 *            "width": 1920,
 *            "size": 16222238,
 *            "uploaded_at": "2017-04-27T18:07:58.185Z"
 *        },
 *        {
 *            "remote": false,
 *            "src": "https://bcbolt446c5271-a.akamaihd.net/media/v1/pmp4/static/clear/57838016001/ae81dd9b-99ba-4899-bc8b-9402cf242210/mid.mp4?akamai_token=exp=1499679042~acl=/media/v1/pmp4/static/clear/57838016001/ae81dd9b-99ba-4899-bc8b-9402cf242210/mid.mp4*~hmac=3d270d4c3db93f700a56353a76ffc3d6c3dfcbc486b761ad4b9257ca3c48f46e",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "encoding_rate": 576000,
 *            "duration": 31487,
 *            "height": 270,
 *            "width": 480,
 *            "size": 2278357,
 *            "uploaded_at": "2017-04-27T18:07:58.185Z"
 *        }
 *    ]
 *
 *
 * @apiSuccessExample {Object[]} Non Dynamic Delivery Response:
 *    HTTP/1.1 200 OK
 *    [
 *        {
 *            "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/e1/uds/rtmp/ondemand",
 *            "asset_id": "4541302443001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 983000,
 *            "height": 360,
 *            "remote": false,
 *            "size": 3887659,
 *            "stream_name": "mp4:57838016001/57838016001_4541302443001_4541288158001.mp4&1445288400000&3121d01e3ac4b1edb4f23509a627321b",
 *            "uploaded_at": "2015-10-08T02:03:43.621Z",
 *            "width": 640
 *        },
 *        {
 *            "asset_id": "4541302443001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 983000,
 *            "height": 360,
 *            "remote": false,
 *            "size": 3887659,
 *            "src": "http://brightcove.vo.llnwd.net/e1/uds/pd/57838016001/57838016001_4541302443001_4541288158001.mp4?pubId=57838016001&videoId=4541288158001",
 *            "uploaded_at": "2015-10-08T02:03:43.621Z",
 *            "width": 640
 *        },
 *        {
 *            "asset_id": "4541302443001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 983000,
 *            "height": 360,
 *            "remote": false,
 *            "size": 3887659,
 *            "src": "https://brightcove.hs.llnwd.net/e1/uds/pd/57838016001/57838016001_4541302443001_4541288158001.mp4?pubId=57838016001&videoId=4541288158001",
 *            "uploaded_at": "2015-10-08T02:03:43.621Z",
 *            "width": 640
 *        },
 *        {
 *            "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/e1/uds/rtmp/ondemand",
 *            "asset_id": "4541302445001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 510000,
 *            "height": 270,
 *            "remote": false,
 *            "size": 2023584,
 *            "stream_name": "mp4:57838016001/57838016001_4541302445001_4541288158001.mp4&1445288400000&3121d01e3ac4b1edb4f23509a627321b",
 *            "uploaded_at": "2015-10-08T02:03:44.173Z",
 *            "width": 480
 *        },
 *        {
 *            "asset_id": "4541302445001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 510000,
 *            "height": 270,
 *            "remote": false,
 *            "size": 2023584,
 *            "src": "http://brightcove.vo.llnwd.net/e1/uds/pd/57838016001/57838016001_4541302445001_4541288158001.mp4?pubId=57838016001&videoId=4541288158001",
 *            "uploaded_at": "2015-10-08T02:03:44.173Z",
 *            "width": 480
 *        },
 *        {
 *            "asset_id": "4541302445001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 510000,
 *            "height": 270,
 *            "remote": false,
 *            "size": 2023584,
 *            "src": "https://brightcove.hs.llnwd.net/e1/uds/pd/57838016001/57838016001_4541302445001_4541288158001.mp4?pubId=57838016001&videoId=4541288158001",
 *            "uploaded_at": "2015-10-08T02:03:44.173Z",
 *            "width": 480
 *        },
 *        {
 *            "app_name": "rtmp://brightcove.fcod.llnwd.net/a500/e1/uds/rtmp/ondemand",
 *            "asset_id": "4541302453001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 1802000,
 *            "height": 540,
 *            "remote": false,
 *            "size": 7107391,
 *            "stream_name": "mp4:57838016001/57838016001_4541302453001_4541288158001.mp4&1445288400000&3121d01e3ac4b1edb4f23509a627321b",
 *            "uploaded_at": "2015-10-08T02:03:48.358Z",
 *            "width": 960
 *        },
 *        {
 *            "asset_id": "4541302453001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 1802000,
 *            "height": 540,
 *            "remote": false,
 *            "size": 7107391,
 *            "src": "http://brightcove.vo.llnwd.net/e1/uds/pd/57838016001/57838016001_4541302453001_4541288158001.mp4?pubId=57838016001&videoId=4541288158001",
 *            "uploaded_at": "2015-10-08T02:03:48.358Z",
 *            "width": 960
 *        },
 *        {
 *            "asset_id": "4541302453001",
 *            "codec": "H264",
 *            "container": "MP4",
 *            "duration": 31487,
 *            "encoding_rate": 1802000,
 *            "height": 540,
 *            "remote": false,
 *            "size": 7107391,
 *            "src": "https://brightcove.hs.llnwd.net/e1/uds/pd/57838016001/57838016001_4541302453001_4541288158001.mp4?pubId=57838016001&videoId=4541288158001",
 *            "uploaded_at": "2015-10-08T02:03:48.358Z",
 *            "width": 960
 *        },
 *        {
 *            "codec": "H264",
 *            "container": "M2TS",
 *            "src": "http://c.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=4541288158001&pubId=57838016001",
 *            "type": "application/x-mpegURL"
 *        },
 *        {
 *            "codec": "H264",
 *            "container": "M2TS",
 *            "src": "https://secure.brightcove.com/services/mobile/streaming/index/master.m3u8?videoId=4541288158001&pubId=57838016001&secure=true",
 *            "type": "application/x-mpegURL"
 *        }
 *    ]
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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
 */

// get images

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/images Get Video Images
 * @apiName Get Video Images
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the images for a video
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`).
 *
 * @apiParamExample {String} Get Video Images Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/3931368155001/images
 *
 * @apiSuccess (200) {Object} images map of image maps
 * @apiSuccess (200) {Object} poster map of poster properties
 * @apiSuccess (200) {String} poster.asset_id asset id for the poster
 * @apiSuccess (200) {Object[]} poster.sources array of poster source maps
 * @apiSuccess (200) {String} poster.sources.src URL for a poster source image
 * @apiSuccess (200) {String} poster.src URL for the default poster source image
 * @apiSuccess (200) {Object} thumbnail map of thumbnail properties
 * @apiSuccess (200) {String} thumbnail.asset_id asset id for the thumbnail
 * @apiSuccess (200) {Object[]} thumbnail.sources array of thumbnail source maps
 * @apiSuccess (200) {String} thumbnail.sources.src URL for a thumbnail source image
 * @apiSuccess (200) {String} thumbnail.src URL for the default thumbnail source image
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "poster": {
 *            "asset_id": "4564811454001",
 *            "remote": false,
 *            "sources": [
 *                {
 *                    "height": 540,
 *                    "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201510/826/57838016001_4564811454001_3931368155001-vs.jpg?pubId=57838016001&videoId=3931368155001",
 *                    "width": 960
 *                },
 *                {
 *                    "height": 540,
 *                    "src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/57838016001/201510/826/57838016001_4564811454001_3931368155001-vs.jpg?pubId=57838016001&videoId=3931368155001",
 *                    "width": 960
 *                }
 *            ],
 *            "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201510/826/57838016001_4564811454001_3931368155001-vs.jpg?pubId=57838016001&videoId=3931368155001"
 *        },
 *        "thumbnail": {
 *            "asset_id": "4564811464001",
 *            "remote": false,
 *            "sources": [
 *                {
 *                    "height": 90,
 *                    "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201510/826/57838016001_4564811464001_3931368155001-th.jpg?pubId=57838016001&videoId=3931368155001",
 *                    "width": 160
 *                },
 *                {
 *                    "height": 90,
 *                    "src": "https://brightcove.hs.llnwd.net/v2/unsecured/media/57838016001/201510/826/57838016001_4564811464001_3931368155001-th.jpg?pubId=57838016001&videoId=3931368155001",
 *                    "width": 160
 *                }
 *            ],
 *            "src": "http://brightcove.vo.llnwd.net/v1/unsecured/media/57838016001/201510/826/57838016001_4564811464001_3931368155001-th.jpg?pubId=57838016001&videoId=3931368155001"
 *        }
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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
 */

// get audio tracks

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/audio_tracks Get Video Audio Tracks
 * @apiName Get Video Audio Tracks
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the audio tracks for a video **Dynamic Delivery only**
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`).
 *
 * @apiParamExample {String} Get Video Audio Tracks Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/3931368155001/audio_tracks
 *
 * @apiSuccess (200) {String} id ID for the audio track formed as `language_variant`
 * @apiSuccess (200) {String} language language code for the audio track
 * @apiSuccess (200) {String} variant the type of audio track
 * @apiSuccess (200) {Number} duration URL the duration of the audio track in milliseconds
 * @apiSuccess (200) {Number[]} encoding_rates array of encoding rates for the audio track renditions in KBPS
 *
 * @apiSuccessExample {Object[]} Success Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": "en_alternate",
 *        "language": "en",
 *        "variant": "alternate",
 *        "duration": 86100,
 *        "encoding_rates": [
 *          64000,
 *          96000,
 *          127000
 *        ]
 *      },
 *      {
 *        "id": "en_commentary",
 *        "language": "en",
 *        "variant": "commentary",
 *        "duration": 34203,
 *        "encoding_rates": [
 *          10000,
 *          13000,
 *          15000
 *        ]
 *      },
 *      {
 *        "id": "en_main",
 *        "language": "en",
 *        "variant": "main",
 *        "duration": 31488,
 *        "encoding_rates": [
 *          62000,
 *          94000,
 *          125000
 *        ]
 *      }
 *    ]
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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
 */
// get audio track

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/audio_tracks/audio_track_id Get Video Audio Track
 * @apiName Get Video Audio Track
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets one audio track for a video by its ID **Dynamic Delivery only**
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`)
 * @apiParam {String} audio_track_id the id for the audio track, formed as 'language_variant'
 *
 * @apiParamExample {String} Get Video Audio Track Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/3931368155001/audio_tracks/alternate_en
 *
 * @apiSuccess (200) {String} id ID for the audio track formed as 'language_variant'
 * @apiSuccess (200) {String} language language code for the audio track
 * @apiSuccess (200) {String} variant the type of audio track
 * @apiSuccess (200) {Number} duration URL the duration of the audio track in milliseconds
 * @apiSuccess (200) {Number[]} encoding_rates array of encoding rates for the audio track renditions in KBPS
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "en_alternate",
 *      "language": "en",
 *      "variant": "alternate",
 *      "duration": 86100,
 *      "encoding_rates": [
 *        64000,
 *        96000,
 *        127000
 *      ]
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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
 */


// update audio track

 /**
 * @api {patch} /accounts/:account_id/videos/:video_id/audio_tracks/audio_track_id Update Video Audio Track
 * @apiName Update Video Audio Track
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates audio track metadata for a video **Dynamic Delivery only**
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`)
 * @apiParam {String} audio_track_id the id for the audio track, formed as 'language_variant'
 * @apiParam (Request Body Fields) {String} [language] Language code for the audio track from the subtags in [http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (default can be set for the account by contacting Brightcove Support) **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {Boolean} [is_default] whether this is the default audio track for the video **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {String="main","alternate","commentary","dub","descriptive"} [variant] the type of audio track (default can be set for the account by contacting Brightcove Support) **Dynanic Delivery only**
 *
 * @apiParamExample {String} Update Video Audio Track Request Body Example:
 *    {
 *        "language": "es",
 *        "is_default": true
 *    }
 *
 * @apiSuccess (200) {String} id ID for the audio track formed as 'language_variant'
 * @apiSuccess (200) {String} language language code for the audio track
 * @apiSuccess (200) {String} variant the type of audio track
 * @apiSuccess (200) {Number} duration URL the duration of the audio track in milliseconds
 * @apiSuccess (200) {Number[]} encoding_rates array of encoding rates for the audio track renditions in KBPS
 *
 * @apiSuccessExample {Object} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "en_alternate",
 *      "language": "en",
 *      "variant": "alternate",
 *      "duration": 86100,
 *      "encoding_rates": [
 *        64000,
 *        96000,
 *        127000
 *      ]
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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
 */

// delete audio track

 /**
 * @api {delete} /accounts/:account_id/videos/:video_id/audio_tracks/audio_track_id Delete Video Audio Track
 * @apiName Delete Video Audio Track
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes one audio track for a video by its ID **Dynamic Delivery only**
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`)
 * @apiParam {String} audio_track_id the id for the audio track, formed as 'language_variant'
 * @apiParam (Request Body Fields) {String} [language] Language code for the audio track from the subtags in [http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (default can be set for the account by contacting Brightcove Support) **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {Boolean} [is_default] whether this is the default audio track for the video **Dynanic Delivery only**
 * @apiParam (Request Body Fields) {String="main","alternate","commentary","dub","descriptive"} [variant] the type of audio track (default can be set for the account by contacting Brightcove Support) **Dynanic Delivery only**
 *
 * @apiParamExample {String} Delete Video Audio Track Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/3931368155001/audio_tracks/alternate_en
 *
 *
 * @apiSuccessExample {null} Success Response:
 *    HTTP 202 ACCEPTED or HTTP 204 NO CONTENT
 *    // note that you may get 202 because the operation is asynchronous
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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
 */

// get digital master info

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/digital_master Get Digital Master Info
 * @apiName Get Digital Master Info
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the stored digital master for a video, if any
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`).
 *
 * @apiParamExample {String} Get Video Digital MasterExample:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/3931368155001/digital_master
 *
 * @apiSuccess (200) {String} account_id Video Cloud account id
 * @apiSuccess (200) {Boolean} audio_only whether this assest has an audio track only
 * @apiSuccess (200) {String} cdn_origin_id id on the origin CDN if any
 * @apiSuccess (200) {Boolean} complete whether processing is complete &mdash; __Note: when you create a new video, the complete property is automatically set to `false`. As soon as one rendition exists for the video, the complete property will be automatically set to `true`__
 * @apiSuccess (200) {String} controller_type video controller type
 * @apiSuccess (200) {String} current_filename the file name
 * @apiSuccess (200) {Object} drm DRM licensing information
 * @apiSuccess (200) {Number} encoding_rate encoding rate in bps
 * @apiSuccess (200) {Number} frame_height frame height in pixels
 * @apiSuccess (200) {Number} frame_width frame width in pixels
 * @apiSuccess (200) {Object} hds HDS information
 * @apiSuccess (200) {Object} hls HLS information
 * @apiSuccess (200) {String} id the video id
 * @apiSuccess (200) {String} name the video title
 * @apiSuccess (200) {String} preview_thumbnail_asset_id thumbnail asset id
 * @apiSuccess (200) {Boolean} progressive_download whether available via progressive download
 * @apiSuccess (200) {String} reference_id reference id
 * @apiSuccess (200) {String} remote_stream_name for remote stream types
 * @apiSuccess (200) {String} remote_url for HTTP types
 * @apiSuccess (200) {String} sharded_directory
 * @apiSuccess (200) {Number} size in bytes
 * @apiSuccess (200) {String} type asset type
 * @apiSuccess (200) {String} update_at date/time last modified
 * @apiSuccess (200) {String} uploaded_at date/time added
 * @apiSuccess (200) {Number} version
 * @apiSuccess (200) {String} video_codec the video codec
 * @apiSuccess (200) {String} video_container the video container
 * @apiSuccess (200) {Number} video_duration in milliseconds
 *
 * @apiSuccessExample {Object} Success Response video digital master (Dynamic Delivery):
 *    HTTP/1.1 200 OK
 *    {
 *        "id": "0e1ba58d-cc8d-438a-9db5-3bb3d79487c8",
 *        "size": 108263237,
 *        "height": 1080,
 *        "width": 1920,
 *        "duration": 49628,
 *        "encoding_rate": 17442000,
 *        "created_at": "2017-07-21T23:14:39.957Z",
 *        "updated_at": "2017-07-21T23:14:39.957Z"
 *    }
 *
 * @apiSuccessExample {Object} Success Response video digital master:
 *    HTTP/1.1 200 OK
 *    {
 *        "account_id": "57838016001",
 *        "audio_only": false,
 *        "cdn_origin_id": "",
 *        "complete": true,
 *        "controller_type": "DEFAULT",
 *        "current_filename": "57838016001_4554429917001_3931368155001.mp4",
 *        "drm": null,
 *        "encoding_rate": 25370000,
 *        "frame_height": 1080,
 *        "frame_width": 1920,
 *        "hds": null,
 *        "hls": null,
 *        "id": "4554429917001",
 *        "name": "greathornedowl.mp4",
 *        "preview_thumbnail_asset_id": "",
 *        "progressive_download": true,
 *        "reference_id": "",
 *        "remote_stream_name": "",
 *        "remote_url": "",
 *        "sharded_directory": "",
 *        "size": 130609265,
 *        "type": "DIGITAL_MASTER",
 *        "updated_at": "2015-10-13T08:15:09.055Z",
 *        "uploaded_at": "2015-10-13T08:15:02.151Z",
 *        "version": 1,
 *        "video_codec": "H264",
 *        "video_container": "MP4",
 *        "video_duration": 41174
 *    }
 *
 * @apiSuccessExample {String} Success Response no digital master
 *     HTTP/1.1 204 No Content
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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
 */

 // delete digital master

 /**
  * @api {delete} /accounts/:account_id/videos/:video_id/digital_master Delete Digital Master
  * @apiName Delete Digital Master
  * @apiGroup videoGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Deletes the archived digital master for a video. **Be sure to read [Digital Master Delete API](https://support.brightcove.com/digital-master-delete-api) before using this operation** to understand the implications.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} video_id Video Cloud video ID. You can also use `ref:reference_id`
  *
  *
  * @apiParamExample {String} Delete Digital Master Example:
  *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4077874616001/digital_master
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


// get playlist references

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/references Get Playlists for Video
 * @apiName Get Playlists for Video
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets an array of Manual (EXPLICIT) playlists that contain a video object
 * for the account
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`).
 *
 * @apiParamExample {String} Get Video References Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4492075574001/references
 *
 * @apiSuccess (200) {String[]} playlists array of EXPLICIT playlist ids that contain the video
 *
 * @apiSuccessExample {Object} Success Response:
 *     HTTP/1.1 200 OK
 *    {
 *        "playlists": [
 *            "4452341376001",
 *            "7894341376001"
 *        ]
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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

// remove video from playlists

 /**
 * @api {delete} /accounts/:account_id/videos/:video_id/references Remove Video from all Playlists
 * @apiName Remove Video from all Playlists
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Removes the video from all EXPLICIT playlists
 * for the account
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens)
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`).
 *
 * @apiParamExample {String} Get Video References Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4492075574001/references
 *
 * @apiSuccessExample {null} Success Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
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

 // create video

 /**
  * @api {post} /accounts/:account_id/videos Create Video
  * @apiName Create Video
  * @apiGroup videoGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Create a new video object in the account.
  * _Note: this does not ingest a video file - use the [Dynamic Ingest API](https://support.brightcove.com/node/17948) for ingestion_
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens)
  *
  * @apiParam {String} account_id Video Cloud account ID.
  *
  * @apiParam (Request Body Fields) {String{1..255}} name video title
  * @apiParam (Request Body Fields) {String{0..250}} [description] video short description
  * @apiParam (Request Body Fields) {String="AD_SUPPORTED","FREE"} [economics="AD_SUPPORTED"] whether the video supports ads (used by the Smart Player, but not by the Brightcove Player)
  * @apiParam (Request Body Fields) {Boolean} [drm_disabled] if DRM is enabled for the account, setting this field to `true` will prevent this video from being DRM-protected (this field is only available for accounts enabled for [Dynamic Delivery](https://support.brightcove.com/node/17949) and DRM)
  * @apiParam (Request Body Fields) {String{0..5000}} [long_description] video long description
  * @apiParam (Request Body Fields) {String{..150}} [reference_id] video reference-id (must be unique within the account)
  * @apiParam (Request Body Fields) {String="ACTIVE","INACTIVE"} [state=ACTIVE] state determines whether the video is playable or not
  * @apiParam (Request Body Fields) {String[]} [tags="[]"] array of tags - note that tags may __not__ contain commas
  * @apiParam (Request Body Fields) {Object} [custom_fields={}] map of fieldname-value pairs; values have a maximum length of 1024 single-byte characters. **Note: be sure to use the *internal* name for the field, not the display name**
  * @apiParam (Request Body Fields) {Object[]} [cue_points="[]"] array of cue point maps
  * @apiParam (Request Body Fields) {String} [cue_points.name] cue point name
  * @apiParam (Request Body Fields) {String="AD","CODE"} cue_points.type cue point type
  * @apiParam (Request Body Fields) {Number} cue_points.time time of the cue point in seconds; example: 10.527
  * @apiParam (Request Body Fields) {String{..512}} [cue_points.metadata=null] optional metadata string (512 single-byte characters maximum)
  * @apiParam (Request Body Fields) {Boolean} [cue_points.force_stop=false] whether video is force_stopped at the cue point
  * @apiParam (Request Body Fields) {Object} [geo={}] map of geo-filtering properties
  * @apiParam (Request Body Fields) {String[]} [geo.countries=null] array of [ISO 3166 list of 2- or 4-letter codes __in lower-case__](https://www.iso.org/obp/ui/#home) (search for "country codes")
  * @apiParam (Request Body Fields) {Boolean} [geo.exclude_countries=false] if true, country array is treated as a list of countries excluded from viewing
  * @apiParam (Request Body Fields) {Boolean} [geo.restricted=false] whether geo-restriction is enabled for this video
  * @apiParam (Request Body Fields) {Object} [schedule={}] map of scheduling properties
  * @apiParam (Request Body Fields) {String} [schedule.starts_at=null] start date-time of availability in [ISO-8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
  * @apiParam (Request Body Fields) {String} [schedule.ends_at=null] end date-time of availability in [ISO-8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
  *
  * @apiParamExample {Object} Create Video Example:
  *     {
  *         "name": "Moose Herd",
  *         "description": "Herd of moose grazing",
  *         "reference_id": "moose_2015_09_17",
  *         "tags": [
  *             "nature",
  *             "animals"
  *         ],
  *         "custom_fields": {
  *             "topic": "wildlife",
  *             "subtopic": "mammals"
  *         }
  *     }
  *
  * @apiSuccess (200) {String} id video id
  * @apiSuccess (200) {String} name video title
  * @apiSuccess (200) {Boolean} complete whether processing is complete &mdash; __Note: when you create a new video, the complete property is automatically set to `false`. As soon as one rendition exists for the video, the complete property will be automatically set to `true`__
  * @apiSuccess (200) {String} ad_keys string representing the ad key/value pairs assigned to the video. Key/value pairs are formatted as key=value and are separated by ampersands. For example: `"adKeys": "category=sports&live=true"`
  * @apiSuccess (200) {String} clip_source_video_id The ID of the source video that was clipped to produce this video or `null` if this video is not a clip of another video
  * @apiSuccess (200) {String} created_at when the video was created
  * @apiSuccess (200) {Object} custom_fields map of fieldname-value pairs
  * @apiSuccess (200) {Object} cue_points array of cue point maps
  * @apiSuccess (200) {String} cue_points.name cue point name
  * @apiSuccess (200) {String} cue_points.type cue point type
  * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
  * @apiSuccess (200) {String} cue_points.metadata optional metadata string (128 single-byte characters maximum)
  * @apiSuccess (200) {Boolean} cue_points.force_stop whether video is force_stopped at the cue point
  * @apiSuccess (200) {String} delivery_type video delivery type - `remote`, `static_origin`, `dynamic_origin`, `live_origin` or `unknown`
  * @apiSuccess (200) {String} description video short description
  * @apiSuccess (200) {Boolean} drm_disabled if `true`, the video is not DRM-packaged
  * @apiSuccess (200) {Number} duration video duration in milliseconds
  * @apiSuccess (200) {String} digital_master_id asset id of the digital master
  * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
  * @apiSuccess (200) {Object} geo map of geo-filtering properties
  * @apiSuccess (200) {String} geo.countries array of ISO 3166 list of 2-letter codes(https://www.iso.org/obp/ui/#home) (search for "country codes")
  * @apiSuccess (200) {Boolean} geo.exclude_countries if true, country array is treated as a list of countries excluded from viewing
  * @apiSuccess (200) {Boolean} geo.restricted whether geo-restriction is enabled for this video
  * @apiSuccess (200) {Boolean} has_digital_master whether video has an archived master than can be used for retranscoding
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
  * @apiSuccess (200) {Boolean} offline_enabled whether video is enabled for offline viewing
  * @apiSuccess (200) {String} original_filename the original file name for the uploaded video
  * @apiSuccess (200) {String} projection used for 360 videos
  * @apiSuccess (200) {String} published_at start date-time of first activation in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
  * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
  * @apiSuccess (200) {Object} schedule map of scheduling properties
  * @apiSuccess (200) {String} schedule.starts_at start date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
  * @apiSuccess (200) {String} schedule.ends_at end date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
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
  * @apiSuccess (200) {String} text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
  * @apiSuccess (200) {String} updated_at when the video was last modified
  *
  * @apiSuccessExample {Object} Success Response:
  *     HTTP/1.1 201 Created
  *    {
  *        "account_id": "57838016001",
  *        "complete": false,
  *        "created_at": "2015-09-18T15:59:23.756Z",
  *        "cue_points": [],
  *        "custom_fields": {},
  *        "description": "Herd of moose grazing",
  *        "digital_master_id": null,
  *        "duration": null,
  *        "economics": "AD_SUPPORTED",
  *        "folder_id": null,
  *        "geo": null,
  *        "id": "4494811891001",
  *        "images": {},
  *        "link": null,
  *        "long_description": null,
  *        "name": "Moose Herd",
  *        "reference_id": "moose_2015_09_17",
  *        "schedule": null,
  *        "sharing": null,
  *        "state": "ACTIVE",
  *        "tags": [
  *            "animals",
  *            "nature"
  *        ],
  *        "text_tracks": [],
  *        "updated_at": "2015-09-18T15:59:23.764Z"
  *    }
  *
  *
  * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
  * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
  * @apiError (Error 4xx) {Object[]} BAD_VALUE 403: Spelling error or other use of non-existent field
  * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: You attempted to create a video with a reference id that is already in use, or add a reference id to a video which is already used by another video
  * @apiError (Error 4xx) {Object[]} ILLEGAL_FIELD 422: Spelling error or other use of non-existent field
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
  */

// update video

/**
 * @api {patch} /accounts/:account_id/videos/:video_id Update Video
 * @apiName Update Video
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Update a video's metadata
 * _note that this API does not ingest any media files - use the [Dynamic Ingest API](https://support.brightcove.com/node/17948) for ingestion_. Also note that replacing WebVTT text tracks is a two-step operation - see [Add WebVTT Captions](https://support.brightcove.com/node/18013#replaceTracks) for details.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID.
 *
 * @apiParam (Request Body Fields) {String{1..255}} [name] video title
 * @apiParam (Request Body Fields) {String{..250}} [description] video short description
 * @apiParam (Request Body Fields) {String="AD_supported", "FREE"} [economics="AD_SUPPORTED"] video short description
 * @apiParam (Request Body Fields) {String{..1800}} [ad_keys=null] string representing the ad key/value pairs assigned to the video. Key/value pairs are formatted as key=value and are separated by ampersands.
 * @apiParam (Request Body Fields) {Boolean} [drm_disabled] if DRM is enabled for the account, setting this field to `true` will prevent this video from being DRM-protected (this field is only available for accounts enabled for [Dynamic Delivery](https://support.brightcove.com/node/17949) and DRM)
 * @apiParam (Request Body Fields) {String{..5000}} [long_description] video long description
 * @apiParam (Request Body Fields) {Boolean} [offline_enabled=false] whether video is enabled for offline viewing (DRM-packaged videos only)
 * @apiParam (Request Body Fields) {String="equirectangular"} [projection=null] Used for 360 video
 * @apiParam (Request Body Fields) {String{..150}} [reference_id] video reference-id (must be unique within the account)
 * @apiParam (Request Body Fields) {String="ACTIVE","INACTIVE"} [state=ACTIVE] state determines whether the video is playable or not
 * @apiParam (Request Body Fields) {String="AD_SUPPORTED","FREE"} [economics="AD_SUPPORTED"] whether the video supports ads (used by the Smart Player, but not by the Brightcove Player)
 * @apiParam (Request Body Fields) {String[]} [tags="[]"] array of tags - note that tags may __not__ contain commas
 * @apiParam (Request Body Fields) {Object} [custom_fields={}] map of fieldname-value pairs; values have a maximum length of 1024 single-byte characters **Note: be sure to use the *internal* name for the field, not the display name**
 * @apiParam (Request Body Fields) {Object[]} [cue_points="[]"] array of cue point maps
 * @apiParam (Request Body Fields) {String} [cue_points.name] cue point name
 * @apiParam (Request Body Fields) {String="AD","CODE"} cue_points.type cue point type
 * @apiParam (Request Body Fields) {Number} cue_points.time time of the cue point in seconds; example: 10.527
 * @apiParam (Request Body Fields) {String{..512}} [cue_points.metadata=null] optional metadata string (512 single-byte characters maximum)
 * @apiParam (Request Body Fields) {Boolean} [cue_points.force_stop=false] whether video is force_stopped at the cue point
 * @apiParam (Request Body Fields) {Object} [geo={}] map of geo-filtering properties
 * @apiParam (Request Body Fields) {String[]} [geo.countries=null] array of [ISO 3166 list of 2- or 4-letter codes __in lower-case__](https://www.iso.org/obp/ui/#home) (search for "country codes")
 * @apiParam (Request Body Fields) {Boolean} [geo.exclude_countries=false] if true, country array is treated as a list of countries excluded from viewing
 * @apiParam (Request Body Fields) {Boolean} [geo.restricted=false] whether geo-restriction is enabled for this video
 * @apiParam (Request Body Fields) {Object} [link={}] map of scheduling properties
 * @apiParam (Request Body Fields) {String{..255}} [link.text] text for the link
 * @apiParam (Request Body Fields) {Url{..250}} [link.url] URL for the link
 * @apiParam (Request Body Fields) {String} published_at ISO-8601 date-time string indicating when the video was published
 * @apiParam (Request Body Fields) {Object} [schedule={}] map of scheduling properties
 * @apiParam (Request Body Fields) {String} [schedule.starts_at=null] start date-time of availability in [ISO-8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiParam (Request Body Fields) {String} [schedule.ends_at=null] end date-time of availability in [ISO-8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiParam (Request Body Fields) {Object[]} [text_tracks="[]"] array of text track maps &mdash; **NOTE** text_tracks are **not** settable for ingested text_tracks, but **are** settable otherwise, and can be used to add text tracks to ingested or remote asset videos
 * @apiParam (Request Body Fields) {String} text_tracks.src="" URL for the .vtt file
 * @apiParam (Request Body Fields) {String="captions","chapters","subtitles","metadata"} [text_tracks.kind=""] kind of text track
 * @apiParam (Request Body Fields) {String} text_tracks.srclang="" 2-letter language code, such as "en" or "ko"
 * @apiParam (Request Body Fields) {String} [text_tracks.mime_type=""] mime-type for the track
 * @apiParam (Request Body Fields) {String} [text_tracks.label=""] label for the track
 * @apiParam (Request Body Fields) {Boolean} [text_tracks.default=false] whether this is the default track
 * @apiSuccess (200) {String} updated_at when the video was last modified
 *
 * @apiParamExample {Object} Update Video Example:
 *     {
 *         "name": "Moose Herd",
 *         "description": "Herd of moose grazing",
 *         "reference_id": "moose_2015_09_17",
 *         "tags": [
 *             "nature",
 *             "animals"
 *         ],
 *         "custom_fields": {
 *             "topic": "wildlife",
 *             "subtopic": "mammals"
 *         }
 *     }
 *
 * @apiSuccess (200) {String} id video id
 * @apiSuccess (200) {String} name video title
 * @apiSuccess (200) {Boolean} complete whether processing is complete &mdash; __Note: when you create a new video, the complete property is automatically set to `false`. As soon as one rendition exists for the video, the complete property will be automatically set to `true`__
 * @apiSuccess (200) {String} ad_keys string representing the ad key/value pairs assigned to the video. Key/value pairs are formatted as key=value and are separated by ampersands. For example: `"adKeys": "category=sports&live=true"`
 * @apiSuccess (200) {String} clip_source_video_id The ID of the source video that was clipped to produce this video or `null` if this video is not a clip of another video
 * @apiSuccess (200) {String} created_at when the video was created
 * @apiSuccess (200) {Object} custom_fields map of fieldname-value pairs
 * @apiSuccess (200) {Object} cue_points array of cue point maps
 * @apiSuccess (200) {String} cue_points.name cue point name
 * @apiSuccess (200) {String} cue_points.type cue point type
 * @apiSuccess (200) {Number} cue_points.time time of the cue point in seconds; example: 10.527
 * @apiSuccess (200) {String} cue_points.metadata optional metadata string (128 single-byte characters maximum)
 * @apiSuccess (200) {Boolean} cue_points.force_stop whether video is force_stopped at the cue point
 * @apiSuccess (200) {String} delivery_type video delivery type - `remote`, `static_origin`, `dynamic_origin`, `live_origin` or `unknown`
 * @apiSuccess (200) {String} description video short description
 * @apiSuccess (200) {Boolean} drm_disabled if `true`, the video is not DRM-packaged
 * @apiSuccess (200) {Number} duration video duration in milliseconds
 * @apiSuccess (200) {String} digital_master_id asset id of the digital master
 * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
 * @apiSuccess (200) {Object} geo map of geo-filtering properties
 * @apiSuccess (200) {String} geo.countries array of ISO 3166 list of 2-letter codes(https://www.iso.org/obp/ui/#home) (search for "country codes")
 * @apiSuccess (200) {Boolean} geo.exclude_countries if true, country array is treated as a list of countries excluded from viewing
 * @apiSuccess (200) {Boolean} geo.restricted whether geo-restriction is enabled for this video
 * @apiSuccess (200) {Boolean} has_digital_master whether video has an archived master than can be used for retranscoding
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
 * @apiSuccess (200) {Boolean} offline_enabled whether video is enabled for offline viewing
 * @apiSuccess (200) {String} original_filename the original file name for the uploaded video
 * @apiSuccess (200) {String} projection used for 360 videos
 * @apiSuccess (200) {String} published_at start date-time of first activation in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} reference_id video reference-id (must be unique within the account)
 * @apiSuccess (200) {Object} schedule map of scheduling properties
 * @apiSuccess (200) {String} schedule.starts_at start date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
 * @apiSuccess (200) {String} schedule.ends_at end date-time of availability in ISO-8601(http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) format
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
 * @apiSuccess (200) {String} text_tracks.in_band_metadata_track_dispatch_type If this field is present, it means that references for this text track are available in the associated video's manifest
 * @apiSuccess (200) {String} updated_at when the video was last modified
 *
 *
 * @apiSuccessExample {Object} Success Response:
 *     HTTP/1.1 201 Created
 *    {
 *        "account_id": "57838016001",
 *        "complete": false,
 *        "created_at": "2015-09-18T15:59:23.756Z",
 *        "cue_points": [],
 *        "custom_fields": {},
 *        "description": "Herd of moose grazing",
 *        "digital_master_id": null,
 *        "duration": null,
 *        "economics": "AD_SUPPORTED",
 *        "folder_id": null,
 *        "geo": null,
 *        "id": "4494811891001",
 *        "images": {},
 *        "link": null,
 *        "long_description": null,
 *        "name": "Moose Herd",
 *        "reference_id": "moose_2015_09_17",
 *        "schedule": null,
 *        "sharing": null,
 *        "state": "ACTIVE",
 *        "tags": [
 *            "animals",
 *            "nature"
 *        ],
 *        "text_tracks": [],
 *        "updated_at": "2015-09-18T15:59:23.764Z"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} AD_CONFIG_INACTIVE 400: Ad configuration specified in an SSAI request is inactive
 * @apiError (Error 4xx) {Object[]} AD_CONFIG_NOT_FOUND 400: Ad configuration specified in an SSAI request was not found
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} BAD_VALUE 403: Spelling error or other use of non-existent field
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 * @apiError (Error 4xx) {Object[]} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
 * @apiError (Error 4xx) {Object[]} REFERENCE_ID_IN_USE 409: You attempted to create a video with a reference id that is already in use, or add a reference id to a video which is already used by another video
 * @apiError (Error 4xx) {Object[]} ILLEGAL_FIELD 422: Spelling error or other use of non-existent field
 * @apiError (Error 4xx) {Object[]} VALIDATION_ERROR 422: the JSON data was not valid - error messages vary depending on the problem
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 5xx) {Object[]} UNKNOWN 500: an unknown internal error occurred - this might be a temporary system issue, but if the problem persists, it is likely an uncaught error in the request - contact Support
 * @apiError (Error 5xx) {Object[]} TIMEOUT 503: Server likely too busy - try again later
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

// delete video

 /**
 * @api {delete} /accounts/:account_id/videos/:video_id Delete Video
 * @apiName Delete Video
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a video
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`)
 *
 * @apiParamExample {String} Get Video References Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/4492075574001
 *
 * @apiSuccessExample {null} Success Response:
 *     HTTP/1.1 204 No Content **returned if video is deleted or not found**
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 4xx) {Object[]} REFERENCES_EXIST 409: The video is in one or more manual playlists
 * @apiError (Error 4xx) {Object[]} PRE_CONDITION_FAILED 412: usually this means the caller provided an ETag that didn't match the version of the video
 * @apiError (Error 5xx) {Object[]} INTERNAL_ERROR 500: Error in the backend
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
 */

// get status of ingest jobs

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/ingest_jobs Get Status of Ingest Jobs
 * @apiName Get Status of Ingest Jobs
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Get the status of all ingest jobs associated with a video (including the orginal ingestion, replacing and retranscoding the video). **NOTE: this operation only works for videos that were ingested using [Dynamic Delivery](https://support.brightcove.com/overview-dynamic-delivery) profiles.**
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`)
 *
 * @apiParamExample {String} Get Status of Ingest Jobs Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/5128433746001/ingest_jobs
 *
 * @apiSuccessExample {Object[]} Success Response:
 *     HTTP/1.1 200
 *    [
 *    	{
 *    		"id": "ac49b1db-e6e1-477f-a2c1-70b9cd3107cb",
 *    		"state": "finished",
 *    		"account_id": "57838016001",
 *    		"video_id": "5636411346001",
 *    		"error_code": null,
 *    		"error_message": null,
 *    		"updated_at": "2017-11-07T13:56:51.505Z",
 *    		"started_at": "2017-11-07T13:56:12.510Z",
 *    		"priority": "normal",
 *    		"submitted_at": "2017-11-07T13:56:12.435Z"
 *    	},
 *    	{
 *    		"id": "10605652-8b6f-4f22-b190-01bd1938677b",
 *    		"state": "processing",
 *    		"account_id": "57838016001",
 *    		"video_id": "5636411346001",
 *    		"error_code": null,
 *    		"error_message": null,
 *    		"updated_at": null,
 *    		"started_at": null,
 *    		"priority": "low",
 *    		"submitted_at": "2017-11-07T14:06:35.000Z"
 *    	}
 *    ]
 *
 * @apiSuccess (200) {string} id the ingest job id
 * @apiSuccess (200) {string="processing", "publishing", "finished",  "failed"} state the current state of the ingest job
 * @apiSuccess (200) {string} account_id the Video Cloud account id
 * @apiSuccess (200) {string} video_id the video id
 * @apiSuccess (200) {string} error_code the error code if the job failed
 * @apiSuccess (200) {string} error_message the error message if the job failed
 * @apiSuccess (200) {string} updated_at when the status was last updated
 * @apiSuccess (200) {string} started_at when processing started
 * @apiSuccess (200) {string} priority priority of the job (normal or low)
 * @apiSuccess (200) {string} submitted_at when the job was submitted
 *
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 5xx) {Object[]} INTERNAL_ERROR 500: Error in the backend
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
 */

// get status of ingest job

 /**
 * @api {get} /accounts/:account_id/videos/:video_id/ingest_jobs/:job_id Get Status of Ingest Job
 * @apiName Get Status of Ingest Job
 * @apiGroup videoGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Get the status of an ingest job associated with a video (including the orginal ingestion, replacing and retranscoding the video)
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} video_id Video Cloud video ID (or `ref:reference_id`)
 * @apiParam {String} job_id the job ID for the ingest job
 *
 * @apiParamExample {String} Get Status of Ingest Jobs Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/5128433746001/ingest_jobs/ac49b1db-e6e1-477f-a2c1-70b9cd3107cb
 *
 * @apiSuccessExample {Object} Success Response:
 *     HTTP/1.1 200
 *    {
 *    	"id": "ac49b1db-e6e1-477f-a2c1-70b9cd3107cb",
 *    	"state": "finished",
 *    	"account_id": "57838016001",
 *    	"video_id": "5636411346001",
 *    	"error_code": null,
 *    	"error_message": null,
 *    	"updated_at": "2017-11-07T13:56:51.505Z",
 *    	"started_at": "2017-11-07T13:56:12.510Z",
 *    	"priority": "normal",
 *    	"submitted_at": "2017-11-07T13:56:12.435Z"
 *    }
 *
 * @apiSuccess (200) {string} id the ingest job id
 * @apiSuccess (200) {string="processing", "publishing", "finished",  "failed"} state the current state of the ingest job
 * @apiSuccess (200) {string} account_id the Video Cloud account id
 * @apiSuccess (200) {string} video_id the video id
 * @apiSuccess (200) {string} error_code the error code if the job failed
 * @apiSuccess (200) {string} error_message the error message if the job failed
 * @apiSuccess (200) {string} updated_at when the status was last updated
 * @apiSuccess (200) {string} started_at when processing started
 * @apiSuccess (200) {string} priority priority of the job (normal or low)
 * @apiSuccess (200) {string} submitted_at when the job was submitted
 *
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
 * @apiError (Error 5xx) {Object[]} INTERNAL_ERROR 500: Error in the backend
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
 */

 // get custom fields

 /**
  * @api {get} /accounts/:account_id/video_fields Get Custom Fields
  * @apiName Get Custom Fields
  * @apiGroup videoGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Gets a list of custom fields for the account
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  *
  * @apiParamExample {String} Get Custom Fields Example:
  *     https://cms.api.brightcove.com/v1/accounts/57838016001/video_fields
  *
  * @apiSuccess (200) {Object[]} custom_fields array of custom field maps
  * @apiSuccess (200) {String} custom_fields.description description (instruction for user)
  * @apiSuccess (200) {String} custom_fields.display_name display name
  * @apiSuccess (200) {String[]} custom_fields.enum_values array of string values for select type fields
  * @apiSuccess (200) {String} custom_fields.id data name for the field (used to access it in searches, etc.)
  * @apiSuccess (200) {Boolean} custom_fields.required whether field must have a value before video can be active
  * @apiSuccess (200) {String} custom_fields.type custom field type (enum or string)
  * @apiSuccess (200) {String} max_custom_fields maximum number of custom fields for the account
  * @apiSuccess (200) {Object[]} standard_fields array of standard field maps
  * @apiSuccess (200) {String} standard_fields.description description (instruction for user)
  * @apiSuccess (200) {String} standard_fields.id data name for the field (used to access it in searches, etc.)
  * @apiSuccess (200) {Boolean} standard_fields.required whether field must have a value before video can be active
  *
  * @apiSuccessExample {Object} Success Response:
  *    HTTP/1.1 200 OK
  *    {
  *    "custom_fields": [
  *        {
  *            "description": "Add a topic",
  *            "display_name": "Subject",
  *            "enum_values": [
  *                "Reptiles",
  *                "Mammals",
  *                "Other",
  *                "wildlife",
  *                "Fish",
  *                "Birds",
  *                "Insects"
  *            ],
  *            "id": "subject",
  *            "required": false,
  *            "type": "enum"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Uploader UserID",
  *            "id": "uploader-userid",
  *            "required": false,
  *            "type": "string"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Rating",
  *            "id": "rating",
  *            "required": false,
  *            "type": "string"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Duration",
  *            "id": "duration",
  *            "required": false,
  *            "type": "string"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Associatedtopics",
  *            "id": "associated-topics",
  *            "required": false,
  *            "type": "string"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Custom Theme Path",
  *            "enum_values": [
  *                "http://files.brightcove.com/BCL_customLabelTheme2.css",
  *                "http://files.brightcove.com/BCL_customLabelTheme.css"
  *            ],
  *            "id": "customthemepath",
  *            "required": false,
  *            "type": "enum"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Text Color",
  *            "enum_values": [
  *                "#4C4D4F",
  *                "#CF0050",
  *                "#F4901E",
  *                "#619FA8"
  *            ],
  *            "id": "textcolor",
  *            "required": false,
  *            "type": "enum"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Captions File URL",
  *            "id": "dfxppath",
  *            "required": false,
  *            "type": "string"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Purpose",
  *            "enum_values": [
  *                "Training",
  *                "Demo",
  *                "Sample",
  *                "Solution"
  *            ],
  *            "id": "purpose",
  *            "required": false,
  *            "type": "enum"
  *        },
  *        {
  *            "description": null,
  *            "display_name": "Downloadable",
  *            "enum_values": [
  *                "yes",
  *                "no"
  *            ],
  *            "id": "downloadable",
  *            "required": false,
  *            "type": "enum"
  *        }
  *    ],
  *    "max_custom_fields": 10,
  *    "standard_fields": [
  *        {
  *            "description": null,
  *            "id": "description",
  *            "required": false
  *        },
  *        {
  *            "description": null,
  *            "id": "tags",
  *            "required": false
  *        }
  *    ]
  *
  *
  * @apiError (Error 4xx) {Object[]} REFERENCES_EXIST 400: You are attempting to delete a video that is included in at least one playlist
  * @apiError (Error 4xx) {Object[]} SHARED_VIDEO 400: Deletion of shared videos is not yet supported
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
  *
  */
