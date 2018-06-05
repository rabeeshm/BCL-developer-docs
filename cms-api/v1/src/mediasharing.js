/**
 * @apiDefine mediasharingGroup Media Sharing
 * The media sharing operations allow you to create sharing relationships between a **Master** account and affiliates, and to share or un-share videos
 * For more information, see [Media Sharing with the CMS API](https://support.brightcove.com/media-sharing-cms-api)
 */

// List Channels

/**
 * @api {get} /accounts/:account_id/channels List Channels
 * @apiName List Channels
 * @apiGroup mediasharingGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a list of channels (currently there is only one `default` channel) - this is a **Master** account operation
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 *
 *
 * @apiParamExample {String} List Channels Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/channels
 *
 * @apiSuccess (200) {String} account_id master account id
 * @apiSuccess (200) {String} name channel name
 * @apiSuccess (200) {Boolean} enforce_custom_fields if true, will allow sharing only if the affiliate account has all custom fields that have values for the video to be shared
 * @apiSuccess (200) {Boolean} enforce_geo if true, and master account is enabled for geo-filtering, will allow sharing only if the affiliate account is also enabled for geo-filtering **Note: this field is currently ignored, but this restriction will be enabled later**
 * @apiSuccess (200) {String} account_name master account name
 * @apiSuccess (200) {DateTime} created_at when the channel was created
 * @apiSuccess (200) {DateTime} updated_at when the channel was last updated
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *    [
 *    	{
 *    		"account_id": "57838016001",
 *    		"name": "default",
 *    		"enforce_custom_fields": false,
 *    		"enforce_geo": false,
 *    		"account_name": "BrightcoveLearning",
 *    		"created_at": "2017-08-23T19:12:24.139Z",
 *    		"updated_at": "2017-08-23T19:12:24.139Z"
 *      }
 *    ]
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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

// Get Channel Details

/**
 * @api {get} /accounts/:account_id/channels/:channel_name Get Channel Details
 * @apiName Get Channel Details
 * @apiGroup mediasharingGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets settings for a sharing channel (currently there is only one `default` channel) - this is a **Master** account operation
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} channel_name The channel name.
 *
 *
 * @apiParamExample {String} Get Channel Details Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/channels/default
 *
 * @apiSuccess (200) {String} account_id master account id
 * @apiSuccess (200) {String} name channel name
 * @apiSuccess (200) {Boolean} enforce_custom_fields if true, will allow sharing only if the affiliate account has all custom fields that have values for the video to be shared
 * @apiSuccess (200) {Boolean} enforce_geo if true, and master account is enabled for geo-filtering, will allow sharing only if the affiliate account is also enabled for geo-filtering **Note: this field is currently ignored, but this restriction will be enabled later**
 * @apiSuccess (200) {String} account_name master account name
 * @apiSuccess (200) {DateTime} created_at when the channel was created
 * @apiSuccess (200) {DateTime} updated_at when the channel was last updated
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *    	{
 *    		"account_id": "57838016001",
 *    		"name": "default",
 *    		"enforce_custom_fields": false,
 *    		"enforce_geo": false,
 *    		"account_name": "BrightcoveLearning",
 *    		"created_at": "2017-08-23T19:12:24.139Z",
 *    		"updated_at": "2017-08-23T19:12:24.139Z"
 *      }
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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

// Update Channel

/**
 * @api {patch} /accounts/:account_id/channels/:channel_name Update Channel
 * @apiName Update Channel
 * @apiGroup mediasharingGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates settings for a sharing channel (currently there is only one `default` channel) - this is a **Master** account operation
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} channel_name The channel name.
 *
 * @apiParam (Request Body Fields) {Boolean} enforce_custom_fields=false Allow sharing only if affiliate account has all custom fields for which a value is set in the master account
 * @apiParam (Request Body Fields) {Boolean} enforce_geo=true Allow sharing only if affiliate account is enabled for geo-filtering (if the master account is enabled for geo-filtering)
 *
 *
 * @apiParamExample {JSON} Update Channel Example:
 *    {
 *    	"enforce_custom_fields" : true,
 *    	"enforce_geo" : true
 *    } *
 * @apiSuccess (200) {String} account_id master account id
 * @apiSuccess (200) {String} name channel name
 * @apiSuccess (200) {Boolean} enforce_custom_fields if true, will allow sharing only if the affiliate account has all custom fields that have values for the video to be shared
 * @apiSuccess (200) {Boolean} enforce_geo if true, and master account is enabled for geo-filtering, will allow sharing only if the affiliate account is also enabled for geo-filtering **Note: this field is currently ignored, but this restriction will be enabled later**
 * @apiSuccess (200) {String} account_name master account name
 * @apiSuccess (200) {DateTime} created_at when the channel was created
 * @apiSuccess (200) {DateTime} updated_at when the channel was last updated
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *    {
 *    	"account_id": "57838016001",
 *    	"name": "default",
 *    	"enforce_custom_fields": false,
 *    	"enforce_geo": false,
 *    	"account_name": "BrightcoveLearning",
 *    	"created_at": "2017-08-23T19:12:24.139Z",
 *    	"updated_at": "2017-08-23T19:12:24.139Z"
 *    }
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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


// List Channel Affiliates

/**
 * @api {get} /accounts/:account_id/channels/:channel_name/members List Channel Affiliates
 * @apiName List Channel Affiliates
 * @apiGroup mediasharingGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a list of affiliates for a channel - this is a **Master** account operation
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} channel_name The name of the channel - usually `default`.
 *
 *
 * @apiParamExample {String} List Channel Affiliates Example:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/channels/default/members
 *
 * @apiSuccess (200) {String} account_id affiliate account id
 * @apiSuccess (200) {String} account_name affiliate account name
 * @apiSuccess (200) {Boolean} approved whether the affiliate has approved the relationship
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *    [
 *    	{
 *    		"account_id": "1485884786001",
 *    		"approved": false,
 *    		"account_name": "Developer Training"
 *    	}
 *    ]
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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


// Add Affiliate

/**
 * @api {put} /accounts/:account_id/channels/:channel_name/members/:affiliate_account_id Add Affiliate
 * @apiName Add Affiliate
 * @apiGroup mediasharingGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Adds an affiliate to a channel - this is a **Master** account operation
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} channel_name The name of the channel - usually `default`.
 * @apiParam {String} affiliate_account_id The affiliate's account id.
 *
 * @apiParam (Request Body Fields) {String} account_id The affiliate's account id.
 *
 * @apiParamExample {String} Add Affiliates:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/channels/default/members/1752604059001
 *
 * @apiParamExample {String} Add Affiliates Request Body:
 *     {
 *         "account_id": "1752604059001"
 *     }
 *
 * @apiSuccess (200) {String} account_id affiliate account id
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *    	   "account_id": "1752604059001",
 *     }
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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


// Remove Affiliate

/**
 * @api {delete} /accounts/:account_id/channels/:channel_name/members/:affiliate_account_id Remove Affiliate
 * @apiName Remove Affiliate
 * @apiGroup mediasharingGroup
 * @apiVersion 1.0.0
 *
 * @apiDescription Removes an affiliate from a channel - this is a **Master** account operation
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} channel_name The name of the channel - usually `default`.
 * @apiParam {String} affiliate_account_id The affiliate's account id.
 *
 *
 * @apiParamExample {String} Add Affiliates:
 *     https://cms.api.brightcove.com/v1/accounts/57838016001/channels/default/members/1752604059001
 *
 *
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 NO_CONTENT
 *
 *
 * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
 * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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

 // List Contracts

 /**
  * @api {get} /accounts/:account_id/contracts List Contracts
  * @apiName List Contracts
  * @apiGroup mediasharingGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Gets a list of available sharing contracts - this is an **Affiliate** account operation
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  *
  *
  * @apiParamExample {String} List Contracts Example:
  *     https://cms.api.brightcove.com/v1/accounts/1752604059001/contracts
  *
  * @apiSuccess (200) {String} account_id affiliate account id
  * @apiSuccess (200) {Boolean} approved whether the contract is approved
  * @apiSuccess (200) {Boolean} auto_accept whether shared videos will be automatically accepted
  * @apiSuccess (200) {DateTime} approved_at when the contract was approved
  * @apiSuccess (200) {DateTime} created_at when the contract was created
  * @apiSuccess (200) {DateTime} updated_at when the contract was last updated
  * @apiSuccess (200) {Object} channel the channel this contract belongs to
  * @apiSuccess (200) {String} channel.account_id the id of the Master account
  * @apiSuccess (200) {String} channel.name the name of the channel
  *
  * @apiSuccessExample {json} Success Response:
  *     HTTP/1.1 200 OK
  *    [
  *        {
  *    	    	"account_id": "1485884786001",
  *    	    	"channel": {
  *    	    		"account_id": "57838016001",
  *    	    		"name": "default"
  *    	    	},
  *    	    	"approved": false,
  *    	    	"auto_accept": false,
  *    	    	"approved_at": null,
  *    	    	"updated_at": "2017-08-23T17:45:41.556Z",
  *    	    	"created_at": "2017-08-23T17:45:41.556Z"
  *        }
  *    ]
  *
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
  * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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

  // Get Contract

  /**
   * @api {get} /accounts/:account_id/contracts/:master_account_id Get Contract
   * @apiName Get Contract
   * @apiGroup mediasharingGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Gets a contract for a specific Master account - this is an **Affiliate** account operation
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} master_account_id Video Cloud account ID for the Master account.
   *
   *
   * @apiParamExample {String} List Contracts Example:
   *     https://cms.api.brightcove.com/v1/accounts/1752604059001/contracts/57838016001
   *
   * @apiSuccess (200) {String} account_id affiliate account id
   * @apiSuccess (200) {Boolean} approved whether the contract is approved
   * @apiSuccess (200) {Boolean} auto_accept whether shared videos will be automatically accepted
   * @apiSuccess (200) {DateTime} approved_at when the contract was approved
   * @apiSuccess (200) {DateTime} created_at when the contract was created
   * @apiSuccess (200) {DateTime} updated_at when the contract was last updated
   * @apiSuccess (200) {Object} channel the channel this contract belongs to
   * @apiSuccess (200) {String} channel.account_id the id of the Master account
   * @apiSuccess (200) {String} channel.name the name of the channel
   *
   * @apiSuccessExample {json} Success Response:
   *     HTTP/1.1 200 OK
   *    {
   *     	"account_id": "1485884786001",
   *     	"channel": {
   *     		"account_id": "57838016001",
   *     		"name": "default"
   *     	},
   *     	"approved": false,
   *     	"auto_accept": false,
   *     	"approved_at": null,
   *     	"updated_at": "2017-08-23T17:45:41.556Z",
   *     	"created_at": "2017-08-23T17:45:41.556Z"
   *    }
   *
   *
   * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
   * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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



 // Approve Contract

 /**
  * @api {patch} /accounts/:account_id/contracts/master_account_id Approve Contract
  * @apiName Approve Contract
  * @apiGroup mediasharingGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription Gets a list of available sharing contracts - this is an **Affiliate** account operation
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} account_id Video Cloud account ID.
  * @apiParam {String} master_account_id Video Cloud account ID.
  *
  * @apiParam (Request Body Fields) {Boolean} approved Setting approved to `true` approves the contract.
  * @apiParam (Request Body Fields) {Boolean} [auto_accept=false] Setting If `true`, shared videos will be automatically accepted; otherwise, they must be approved one by one.
  *
  * @apiParamExample {String} Approve Contract Example:
  *     https://cms.api.brightcove.com/v1/accounts/1752604059001/contracts/57838016001
  *
  * @apiParamExample {String} Approve Contract Request Body Example:
  *    {
  *      "approved": true,
  *      "auto_accept": true
  *    }
  *
  * @apiSuccess (200) {String} account_id affiliate account id
  * @apiSuccess (200) {Boolean} approved whether the contract is approved
  * @apiSuccess (200) {Boolean} auto_accept whether shared videos will be automatically accepted
  * @apiSuccess (200) {DateTime} approved_at when the contract was approved
  * @apiSuccess (200) {DateTime} created_at when the contract was created
  * @apiSuccess (200) {DateTime} updated_at when the contract was last updated
  * @apiSuccess (200) {Object} channel the channel this contract belongs to
  * @apiSuccess (200) {String} channel.account_id the id of the Master account
  * @apiSuccess (200) {String} channel.name the name of the channel
  *
  * @apiSuccessExample {json} Success Response:
  *     HTTP/1.1 200 OK
  *    {
  *    	"account_id": "1485884786001",
  *    	"channel": {
  *    		"account_id": "57838016001",
  *    		"name": "default"
  *    	},
  *        "approved": true,
  *    	   "auto_accept": true,
  *    	   "approved_at": "2017-08-27T12:27:21.582Z",
  *    	   "created_at": "2017-08-23T17:45:41.556Z",
  *    	   "updated_at": "2017-08-27T12:27:21.582Z"
  *    }
  *
  *
  * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
  * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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


  // List Shares

  /**
   * @api {get} /accounts/:account_id/videos/:video_id/shares List Shares
   * @apiName List Shares
   * @apiGroup mediasharingGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Lists the existing shares for an account - this is a **Master** account operation - do this before sharing to insure that you are not re-sharing to an affiliate, which would overwrite any affiliate metadata changes
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID.
   *
   *
   * @apiParamExample {String} List Shares Example:
   *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/5553744346001/shares
   *
   * @apiSuccess (200) {String} video_id the video id
   * @apiSuccess (200) {String} affiliate_id the id of the affiliate account the video is shared to
   * @apiSuccess (200) {String} affiliate_video_id the id of the shared video in the affiliate account
   * @apiSuccess (200) {String} statue the status of the sharing - either `PROCESSING`, `COMPLETE`, or `FAILED`
   * @apiSuccess (200) {DateTime} shared_at when the video was shared
   * @apiSuccess (200) {DateTime} updated_at the video was last updated in the affiliate account
   *
   * @apiSuccessExample {json} Success Response:
   *     HTTP/1.1 200 OK
   *    [
   *    	{
   *    		"video_id": "5553744346001",
   *    		"affiliate_id": "1752604059001",
   *    		"affiliate_video_id": "5553754248001",
   *    		"status": "COMPLETE",
   *    		"shared_at": "2017-08-27T14:35:01.890Z",
   *    		"updated_at": "2017-08-27T14:35:25.630Z"
   *    	},
   *    	{
   *    		"video_id": "5553744346001",
   *    		"affiliate_id": "1485884786001",
   *    		"affiliate_video_id": "5553758415001",
   *    		"status": "COMPLETE",
   *    		"shared_at": "2017-08-27T14:34:34.919Z",
   *    		"updated_at": "2017-08-27T14:35:25.212Z"
   *    	}
   *    ]
   *
   *
   * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
   * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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



  // Share Video

  /**
   * @api {post} /accounts/:account_id/videos/:video_id/shares Share Video
   * @apiName Share Video
   * @apiGroup mediasharingGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Shares a video to one or more affiliates - this is an **Master** account operation - if the video has already been shared to an affiliate, this operation will re-share it and overwrite any affiliate metadata changes
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID.
   *
   * @apiParam (Request Body Fields) {String} id affiliate account id to share to
   *
   *
   * @apiParamExample {String} Share Video Example:
   *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/5553744346001/shares
   *
   * @apiParamExample {String} Share Video Request Example:
   *     [
   *        {"id": 1752604059001},
   *        {"id": 1485884786001}
   *     ]
   *
   * @apiSuccess (200) {String} video_id the video id
   * @apiSuccess (200) {String} affiliate_id the id of the affiliate account the video is shared to
   * @apiSuccess (200) {String} affiliate_video_id the id of the shared video in the affiliate account
   * @apiSuccess (200) {String} statue the status of the sharing - either `PROCESSING`, `COMPLETE`, or `FAILED`
   * @apiSuccess (200) {DateTime} shared_at when the video was shared
   * @apiSuccess (200) {DateTime} updated_at the video was last updated in the affiliate account
   *
   * @apiSuccessExample {json} Success Response:
   *     HTTP/1.1 200 OK
   *    [
   *    	{
   *    		"video_id": "5538139814001",
   *    		"affiliate_id": "1485884786001",
   *    		"affiliate_video_id": "5557763316001",
   *    		"status": "PROCESSING",
   *    		"shared_at": "2017-08-31T18:50:13.369Z",
   *    		"updated_at": "2017-08-31T18:50:13.369Z"
   *    	},
   *    	{
   *    		"video_id": "5538139814001",
   *    		"affiliate_id": "1752604059001",
   *    		"affiliate_video_id": "5557767716001",
   *    		"status": "COMPLETE",
   *    		"shared_at": "2017-08-30T14:49:16.652Z",
   *    		"updated_at": "2017-08-30T14:49:47.469Z"
   *    	}
   *    ]
   *
   *
   * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
   * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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


  // Unshare Video

  /**
   * @api {delete} /accounts/:account_id/videos/:video_id/shares/:affiliate_account_id Unshare Video
   * @apiName Unshare Video
   * @apiGroup mediasharingGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Unshares a video with a specific affiliate - this is an **Master** account operation - do this before sharing to insure that you are not re-sharing to an affiliate, which would overwrite any affiliate metadata changes
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} account_id Video Cloud account ID.
   * @apiParam {String} video_id Video Cloud video ID.
   * @apiParam {String} affiliate_account_id affiliate account id to remove the shared video from.
   *
   *
   * @apiParamExample {String} Share Video Example:
   *     https://cms.api.brightcove.com/v1/accounts/57838016001/videos/5553744346001/shares/1485884786001
   *
   *
   *
   * @apiSuccessExample {json} Success Response:
   *     HTTP/1.1 200 OK
   *     202 ACCEPTED (indicates that the request is accepted but may not be executed immediately)
   *
   * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: Resource not found
   * @apiError (Error 4xx) {json} NOT_AVAILABLE 403: The resource you are requesting is  unavailable - this may be a temporary condition while some kind of processing of the video is in progress, but if the message persists, contact Support
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

   // Accept Share

   /**
    * @api {patch} /accounts/:account_id/videos/:video_id Accept Share
    * @apiName Accept Share
    * @apiGroup mediasharingGroup
    * @apiVersion 1.0.0
    *
    * @apiDescription Accept a shared video (only relevant if `auto_accept` is set to `false`). This is an **Affiliate** account operation.
    *
    * @apiHeader {String} Content-Type Content-Type: application/json
    * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
    *
    * @apiParam {String} account_id Video Cloud account ID.
    * @apiParam {String} video_id Video Cloud video ID.
    *
    * @apiParam (Request Body Fields) {String="ACTIVE","INACTIVE"} state determines whether the video is accepted (`ACTIVE`) or rejected (`INACTIVE`)
    *
    * @apiSuccess (200) {String} updated_at when the video was last modified
    *
    * @apiParamExample {json} Update Video Example:
    *     {
    *         "state": "ACTIVE"
    *     }
    *
    * @apiSuccess (200) {String} id video id
    * @apiSuccess (200) {String} name video title
    * @apiSuccess (200) {Boolean} complete whether processing is complete &mdash; __Note: when you create a new video, the complete property is automatically set to `false`. As soon as one rendition exists for the video, the complete property will be automatically set to `true`__
    * @apiSuccess (200) {String} ad_keys string representing the ad key/value pairs assigned to the video. Key/value pairs are formatted as key=value and are separated by ampersands. For example: `"adKeys": "category=sports&live=true"`
    * @apiSuccess (200) {String} clip_source_video_id The ID of the source video that was clipped to produce this video or `null` if this video is not a clip of another video
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
    * @apiSuccess (200) {String} economics whether video is AD_SUPPORTED
    * @apiSuccess (200) {Object} geo map of geo-filtering properties
    * @apiSuccess (200) {String} geo.countries=null array of ISO 3166 list of 2-letter codes(https://www.iso.org/obp/ui/#home) (search for "country codes")
    * @apiSuccess (200) {Boolean} geo.exclude_countries=false if true, country array is treated as a list of countries excluded from viewing
    * @apiSuccess (200) {Boolean} geo.restricted=false whether geo-restriction is enabled for this video
    * @apiSuccess (200) {Boolean} has_digital_master=false whether video has an archived master than can be used for retranscoding
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
    * @apiSuccessExample {json} Success Response:
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
    * @apiError (Error 4xx) {json} AD_CONFIG_INACTIVE 400: Ad configuration specified in an SSAI request is inactive
    * @apiError (Error 4xx) {json} AD_CONFIG_NOT_FOUND 400: Ad configuration specified in an SSAI request was not found
    * @apiError (Error 4xx) {json} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
    * @apiError (Error 4xx) {json} BAD_VALUE 403: Spelling error or other use of non-existent field
    * @apiError (Error 4xx) {json} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
    * @apiError (Error 4xx) {json} METHOD_NOT_ALLOWED 405: The HTTP method specified is not allowed for this endpoint
    * @apiError (Error 4xx) {json} REFERENCE_ID_IN_USE 409: You attempted to create a video with a reference id that is already in use, or add a reference id to a video which is already used by another video
    * @apiError (Error 4xx) {json} ILLEGAL_FIELD 422: Spelling error or other use of non-existent field
    * @apiError (Error 4xx) {json} VALIDATION_ERROR 422: the JSON data was not valid - error messages vary depending on the problem
    * @apiError (Error 4xx) {json} TOO_MANY_REQUESTS 429: You are submitting too many simultaneous requests or too many requests per second
    * @apiError (Error 5xx) {json} UNKNOWN 500: an unknown internal error occurred - this might be a temporary system issue, but if the problem persists, it is likely an uncaught error in the request - contact Support
    * @apiError (Error 5xx) {json} TIMEOUT 503: Server likely too busy - try again later
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
