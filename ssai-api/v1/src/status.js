// Get Status of Video

/**
 * @api {get} /accounts/:account_id/social-status/video/:video_id Get Status of Video
 * @apiName Get Status of Video
 * @apiGroup Status
 * @apiVersion 1.0.0
 *
 * @apiDescription Get the current status of the requested video on every destination to which Social has ever attempted to distribute it, ordered by date, most recent first.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} video_id Video ID
 *
 * @apiParam (URL Parameters) {DateTime} [before] Only videos last modified at or before the specified timestamp will be returned - ISO 8601 Timestamp
 * @apiParam (URL Parameters) {DateTime} [since] Only videos last modified at or since the specified timestamp will be returned - ISO 8601 Timestamp
 * @apiParam (URL Parameters) {String} [pageKey] The key for the next page of data to return.  If left empty the API returns the first page of data
 * @apiParam (URL Parameters) {Number{1-100}} [pageSize=100] The number of entries to return in this page of data
 * @apiParam (URL Parameters) {String="YOUTUBE","TWITTER","FACEBOOK"} [platform] TThe social platform to return data for; if left blank will return data for all social platforms
 *
 * @apiParamExample {http} Get Status of Video Examples:
 *    https://social.api.brightcove.com/v1/accounts/57838016001/social-status/video/1234
 *
 * @apiSuccess (200) {Number} video_id The video id
 * @apiSuccess (200) {DateTime} time The time at which Social last attempted to modify the video on the remote social platform
 * @apiSuccess (200) {String} remote_url The URL of the video on the remote social platform.  May not exist.  (e.g.,  If the last action was `DELETE`, or an `UPLOAD` with result `ERROR`.)
 * @apiSuccess (200) {String} destination_id The Social ID of the destination to which this remote_url points (UUID)
 * @apiSuccess (200) {String} action The last action Social attempted to take for this video with respect to this destination (`UPLOAD`, `UPDATE`, or `DELETE`)
 * @apiSuccess (200) {String} result The result of the last action Social attempted (`SUCCESS` or 'ERROR')
 * @apiSuccess (200) {String} error The error that Social encountered while trying to complete this action.  Will only exist if the 'result' was `ERROR`
 * @apiSuccess (200) {String} distribution_method Whether this video was distributed automatically via an Autosync, or manually via Single Video Publish (svp)
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 *    [
 *      {
 *        "video_id": 1234,
 *        "time": "2017-04-01T12:12:12",
 *        "remote_url": "http://facebook/page/foo",
 *        "destination_id": "123-abc"
 *        "action": "UPLOAD",
 *        "result": "SUCCESS",
 *        "distribution_method": "autosync"
 *      }, ...
 *    ]
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Insufficient permissions to access this API method
 * @apiError (Error 4xx) {json} UNPROCESSIBLE ENTITY 422: Invalid query parameters.
 * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
 *
 * @apiErrorExample {json} 401 Error Response
 *     HTTP/1.1 401 Not Found
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED"
 *         }
 *     ]
 *
 *
 */

// Get Status of Videos for Destination

/**
 * @api {get} /accounts/:account_id/social-status/destination/:destination_id Get Status of Videos for Destination
 * @apiName Get Status of Videos for Destination
 * @apiGroup Status
 * @apiVersion 1.0.0
 *
 * @apiDescription Get the current status of every video which Social ever attempted to distribute to the given destination.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} destination_id The Social ID of the destination
 *
 * @apiParam (URL Parameters) {DateTime} [before] Only videos last modified at or before the specified timestamp will be returned - ISO 8601 Timestamp
 * @apiParam (URL Parameters) {DateTime} [since] Only videos last modified at or since the specified timestamp will be returned - ISO 8601 Timestamp
 * @apiParam (URL Parameters) {String} [pageKey] The key for the next page of data to return.  If left empty the API returns the first page of data
 * @apiParam (URL Parameters) {Number{1-100}} [pageSize=100] The number of entries to return in this page of data
 *
 * @apiParamExample {http} Get Status of Videos for Destination Example:
 *    https://social.api.brightcove.com/v1/accounts/57838016001/social-status/destination/123-abc
 *
 * @apiSuccess (200) {Number} video_id The video id
 * @apiSuccess (200) {DateTime} time The time at which Social last attempted to modify the video on the remote social platform
 * @apiSuccess (200) {String} remote_url The URL of the video on the remote social platform.  May not exist.  (e.g.,  If the last action was `DELETE`, or an `UPLOAD` with result `ERROR`.)
 * @apiSuccess (200) {String} destination_id The Social ID of the destination to which this remote_url points (UUID)
 * @apiSuccess (200) {String} action The last action Social attempted to take for this video with respect to this destination (`UPLOAD`, `UPDATE`, or `DELETE`)
 * @apiSuccess (200) {String} result The result of the last action Social attempted (`SUCCESS` or 'ERROR')
 * @apiSuccess (200) {String} error The error that Social encountered while trying to complete this action.  Will only exist if the 'result' was `ERROR`
 * @apiSuccess (200) {String} distribution_method Whether this video was distributed automatically via an Autosync, or manually via Single Video Publish (svp)
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 *    [
 *      {
 *        "video_id": 1234,
 *        "time": "2017-04-01T12:12:12",
 *        "remote_url": "http://facebook/page/foo",
 *        "destination_id": "123-abc"
 *        "action": "UPLOAD",
 *        "result": "SUCCESS",
 *        "distribution_method": "autosync"
 *      }, ...
 *    ]
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Insufficient permissions to access this API method
 * @apiError (Error 4xx) {json} UNPROCESSIBLE ENTITY 422: Invalid query parameters.
 * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
 *
 * @apiErrorExample {json} 401 Error Response
 *     HTTP/1.1 401 Not Found
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED"
 *         }
 *     ]
 *
 *
 */

// Get Status of Video for Destination

/**
 * @api {get} /accounts/:account_id/social-status/destination/:destination_id/video/:video_id Get Status of Video for Destination
 * @apiName Get Status of Video for Destination
 * @apiGroup Status
 * @apiVersion 1.0.0
 *
 * @apiDescription Get the current status of one video with respect to one destination.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID
 * @apiParam {String} destination_id The Social ID of the destination
 * @apiParam {String} video_id Video ID
 *
 *
 * @apiParamExample {http} Get Status of Video Examples:
 *    https://social.api.brightcove.com/v1/accounts/57838016001/social-status/destination/123-abc/video/1234
 *
 * @apiSuccess (200) {Number} video_id The video id
 * @apiSuccess (200) {DateTime} time The time at which Social last attempted to modify the video on the remote social platform
 * @apiSuccess (200) {String} remote_url The URL of the video on the remote social platform.  May not exist.  (e.g.,  If the last action was `DELETE`, or an `UPLOAD` with result `ERROR`.)
 * @apiSuccess (200) {String} destination_id The Social ID of the destination to which this remote_url points (UUID)
 * @apiSuccess (200) {String} action The last action Social attempted to take for this video with respect to this destination (`UPLOAD`, `UPDATE`, or `DELETE`)
 * @apiSuccess (200) {String} result The result of the last action Social attempted (`SUCCESS` or 'ERROR')
 * @apiSuccess (200) {String} error The error that Social encountered while trying to complete this action.  Will only exist if the 'result' was `ERROR`
 * @apiSuccess (200) {String} distribution_method Whether this video was distributed automatically via an Autosync, or manually via Single Video Publish (svp)
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 *    [
 *      {
 *        "video_id": 1234,
 *        "time": "2017-04-01T12:12:12",
 *        "remote_url": "http://facebook/page/foo",
 *        "destination_id": "123-abc"
 *        "action": "UPLOAD",
 *        "result": "SUCCESS",
 *        "distribution_method": "autosync"
 *      }, ...
 *    ]
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Insufficient permissions to access this API method
 * @apiError (Error 4xx) {json} UNPROCESSIBLE ENTITY 422: Invalid query parameters.
 * @apiError (Error 5xx) {json} TIMEOUT 500: Server likely too busy; try again later.
 *
 * @apiErrorExample {json} 401 Error Response
 *     HTTP/1.1 401 Not Found
 *     [
 *         {
 *             "error_code": "UNAUTHORIZED"
 *         }
 *     ]
 *
 *
 */
