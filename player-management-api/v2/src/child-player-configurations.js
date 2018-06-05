// Get an Embed Configuration

/**
 * @api {get} /accounts/:account_id/players/:player_id/players/:embed_id/:branch Get an Embed Configuration
 * @apiName Get an Embed Configuration
 * @apiGroup Embed Configurations
 * @apiVersion 1.0.0
 *
 * @apiDescription Get the configuration for an embed. You must specify the branch, either `master' or 'preview'.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam (Path) {String} account_id account ID
 * @apiParam (Path) {String} player_id player ID
 * @apiParam (Path) {String} embed_id embed ID
 * @apiParam (Path) {String} branch branch to retrieve, master (published) or preview
 *
 * @apiParam (Request Body Fields) {String} [comment] parameter which will be placed in the GitHub repo of the player
 *
 * @apiParamExample {string} curl Statement:
 *      curl \
 *       --header "Content-Type: application/json" \
 *       --user :email \
 *       --request GET \
 *       https://players.api.brightcove.com/v1/accounts/:account_id/players/:player_id/embeds/:embed_id/configuration/:branch
 *
 * @apiSuccess (200) {Object} configuration configuration object, refer to the **PLAYER CONFIGURATIONS > Get a Player Configuration** above for all player options.
 *
 * @apiSuccessExample {object} Success Response:
 *     {
 *       "configuration": {
 *         "video_cloud": {
 *           "video": "4443311217001"
 *         }
 *       },
 *       "name": "MySampleEmbedPlayer2"
 *     }
 * @apiError (400) {object}  BAD_REQUEST the syntax of the API call is likely incorrect
 * @apiError (401) {object}  INVALID_AUTHENTICATION check if the password was entered correctly, or that you have followed the OAuth instructions correctly
 * @apiError (404) {object}  NOT_FOUND check if the resource exists and the URL used in the API call is correct
 * @apiError (429) {object}  RATE_LIMIT_EXCEEDED too many requests per second
 * @apiError (500) {object}  INTERNAL_SERVER_ERROR there was an error trying to fulfill the request
 * @apiErrorExample {object} Bad Request Example
 *    HTTP/1.1 400 BAD_REQUEST
 *    {
 *    	"message": "JSON syntax error: Unexpected token }",
 *    	"error_code": "PLAYER_MANAGEMENT_ERROR"
 *    }
*/

// Update an Embed Configuration

/**
 * @api {patch} /accounts/:account_id/players/:player_id/players/:embed_id/configuration Update an Embed Configuration
 * @apiName Update an Embed Configuration
 * @apiGroup Embed Configurations
 * @apiVersion 1.0.0
 *
 * @apiDescription Update the configuration for an embed. Note that you will need to publish the altered embed for optimization and production use. You can also use a `PUT` HTTP method instead of the `PATCH` shown here. When using `PUT` it replaces all embed configuration information, so you must supply all embed configuration information when using `PUT`. In contrast, `PATCH` appends or modifies existing configuration information. Using `PUT` is such rare use case it is not detailed in this reference.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam (Path) {String} account_id account ID
 * @apiParam (Path) {String} player_id player ID
 * @apiParam (Path) {String} embed_id embed ID
 *
 * @apiParam (Request Body) {String} name player name
 * @apiParam (Request Body) {String} description player description
 * @apiParam (Request Body) {Object} configuration configuration object, refer to the **PLAYER CONFIGURATIONS > Update a Player Configuration** above for all player options.
 *
 * @apiParamExample {string} curl Statement:
 *     curl \
 *       --header "Content-Type: application/json" \
 *       --user :email \
 *       --request PATCH \
 *       --data '{
 *           "name": "New Patched Embed Name",
 *           "description": "New patched embed description",
 *           "configuration": {
 *             "video_cloud": {
 *               "video": "123456789"
 *             },
 *             "languages": [
 *               "de",
 *               "es"
 *             ]
 *           }
 *         }' \
 *       https://players.api.brightcove.com/v1/accounts/:account_id/players/:player_id/embeds/:embed_id/configuration
 *
 * @apiSuccess (200) {String} preview_url URL to preview embed
 * @apiSuccess (200) {String} preview_embed_code preview embed iframe tag
 *
 * @apiSuccessExample {object} Success Response:
 *     {
 *       "preview_url": "http://preview-players.brightcove.net/v1/accounts/1507807800001/players/6afea3cd-adfd-45ac-9e47-3242a7f46754/master/embeds/53c02fa5-6344-4c39-be04-b19cdcb69665/preview/index.html",
 *       "preview_embed_code": "<iframe src='//preview-players.brightcove.net/v1/accounts/1507807800001/players/6afea3cd-adfd-45ac-9e47-3242a7f46754/master/embeds/53c02fa5-6344-4c39-be04-b19cdcb69665/preview/index.html' allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>"
 *     }
 * @apiError (400) {object}  BAD_REQUEST the syntax of the API call is likely incorrect
 * @apiError (401) {object}  INVALID_AUTHENTICATION check if the password was entered correctly, or that you have followed the OAuth instructions correctly
 * @apiError (404) {object}  NOT_FOUND check if the resource exists and the URL used in the API call is correct
 * @apiError (429) {object}  RATE_LIMIT_EXCEEDED too many requests per second
 * @apiError (500) {object}  INTERNAL_SERVER_ERROR there was an error trying to fulfill the request
 * @apiErrorExample {object} Bad Request Example
 *    HTTP/1.1 400 BAD_REQUEST
 *    {
 *    	"message": "JSON syntax error: Unexpected token }",
 *    	"error_code": "PLAYER_MANAGEMENT_ERROR"
 *    }
*/


// View Merged configurations

/**
 * @api {get} /accounts/:account_id/players/:player_id/players/:embed_id/configuration Get Configuration Combinations
 * @apiName Get Configuration Combinations
 * @apiGroup Embed Configurations
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieve the configuration for a parent/child combination of master and preview branches. <strong>If you are using the second query parameter (and hence using the ampersand [&]), you MUST use quotes around the endpoint or the curl statement will fail at the ampersand.</strong> For example: `"https://players.api.brightcove.com/v1/accounts/$ACCOUNT_ID/players/$PLAYER_ID/embeds/$EMBED_ID/configuration/merged?playerBranch=preview&embedBranch=master"`. Using this endpoint provides a way to view what the resulting configuration would be when combining different combinations of parent and child (also called embed) versions of players. Using this endpoint does not change any configurations, it is only useful for seeing results of merging changes to configurations.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam (Path) {String} account_id account ID
 * @apiParam (Path) {String} player_id player ID
 * @apiParam (Path) {String} embed_id embed ID
 * @apiParam (Path) {String} playerBranch branch of the player to use, master or preview, for merged combination
 * @apiParam (Path) {String} embedBranch branch of the embed to use, master or preview, for merged combination
 *
 * @apiParamExample {string} curl Statement:
 *     curl \
 *       --header "Content-Type: application/json" \
 *       --user :email \
 *       --request GET \
 *       "https://players.api.brightcove.com/v1/accounts/:account_id/players/:player_id/embeds/:embedID/configuration/merged?playerBranch=master&embedBranch=preview"
 *
 * @apiSuccess (200) {Object} configuration configuration object, refer to the **PLAYER CONFIGURATIONS > Get a Player Configuration** above for all player options.
 *
 * @apiSuccessExample {object} Success Response:
 *     {
 *       "media": {
 *         "sources": [{
 *           "src": "http://solutions.brightcove.com/bcls/assets/videos/Tiger.mp4",
 *           "type": "video/mp4"
 *         }]
 *       },
 *       "video_cloud": {
 *         "policy_key": "BCpkADawqM2WNV-RrwVCqJKRQNuAmQbBm9xjFmUQxex81f_1xg40em1vNbmeMR-IUYpSFTgdrf0uxs4SU0SGUv6LdVQMtVvb9JMGq7_KVhaxGqx3x14DxCm0xQyHb9_zYKIhTLNZV5SmsVpy"
 *       },
 *       "player": {
 *         "template": {
 *           "name": "single-video-template",
 *           "version": "1.14.26"
 *         }
 *       },
 *       "configuration": {
 *         "video_cloud": {
 *           "video": "123456789"
 *         },
 *         "languages": ["de", "es"]
 *       },
 *       "name": "New Patched Embed Name",
 *       "description": "New patched embed description",
 *       "account_id": "1507807800001",
 *       "player_id": "6afea3cd-adfd-45ac-9e47-3242a7f46754",
 *       "embed_id": "53c02fa5-6344-4c39-be04-b19cdcb69665",
 *       "player_name": "MySamplePlayer"
 *     }
 * @apiError (400) {object}  BAD_REQUEST the syntax of the API call is likely incorrect
 * @apiError (401) {object}  INVALID_AUTHENTICATION check if the password was entered correctly, or that you have followed the OAuth instructions correctly
 * @apiError (404) {object}  NOT_FOUND check if the resource exists and the URL used in the API call is correct
 * @apiError (429) {object}  RATE_LIMIT_EXCEEDED too many requests per second
 * @apiError (500) {object}  INTERNAL_SERVER_ERROR there was an error trying to fulfill the request

 * @apiErrorExample {object} Bad Request Example
 *    HTTP/1.1 400 BAD_REQUEST
 *    {
 *    	"message": "JSON syntax error: Unexpected token }",
 *    	"error_code": "PLAYER_MANAGEMENT_ERROR"
 *    }
 */
