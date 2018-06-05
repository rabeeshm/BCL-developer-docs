// Create an Account

/**
  * @api {post} /v2/account Create an Account
  * @apiName Create an Account
  * @apiGroup Accounts
  * @apiVersion 2.0.0
  *
  * @apiDescription All that is required is an email address and an agreement to the terms of service. You can also send a password, but if you don't one will be generated. New accounts will be created under the Test (Free) plan.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  *
  * @apiParam (Request Body Fields) {String} email Email address of the account owner - must be unique
  * @apiParam (Request Body Fields) {String="1"} terms_of_service Indication that you agree to the terms of service
  * @apiParam (Request Body Fields) {String} [password] Password
  * @apiParam (Request Body Fields) {String} [password_confirmation] Password confirmation
  *
  * @apiParamExample {json} Create an Account Body Example:
  *    {
  *      "terms_of_service": "1",
  *      "email": "test@example.com",
  *      "password": "zencoderisnumber1",
  *      "password_confirmation":"zencoderisnumber1"
  *    }
  *
  *
  * @apiSuccess (200) {String} api_key The api key used to authenticate other API requests
  * @apiSuccess (200) {String} password The password submitted or an auto-generated one
  *
  * @apiSuccessExample {json} Create an Account
  *    {
  *      "api_key": "a123afdaf23fa231245fadcbbb",
  *      "password": "zencoderisnumber1"
  *    }
  *
  */


// Get Account Details

/**
  * @api {get} /v2/account Get Account Details
  * @apiName Get Account Details
  * @apiGroup Accounts
  * @apiVersion 2.0.0
  *
  * @apiDescription Account details may be retrieved by issuing an HTTP GET to https://app.zencoder.com/api/v2/account. Account states are Active, Stopped, Suspended, and Cancelled. Billing states are Active, Past Due, and Cancelled.
  *
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  *
  * @apiSuccess (200) {String} account_state Account states are `active`, `stopped`, `suspended`, and `cancelled`
  * @apiSuccess (200) {String} plan The current account plan
  * @apiSuccess (200) {String} billing_state Billing states are `active`, `past due`, and `cancelled`
  * @apiSuccess (200) {Number} minutes_used Minutes of encoded output used this month
  * @apiSuccess (200) {Number} minutes_included Minutes of encoded output included in your plan (per month)
  * @apiSuccess (200) {Boolean} integration_mode Whether the account is in integration (test) mode
  *
  * @apiSuccessExample {json} Get Account Details
  *    {
  *      "account_state": "active",
  *      "plan": "Growth",
  *      "minutes_used": 12549,
  *      "minutes_included": 25000,
  *      "billing_state": "active",
  *      "integration_mode":true
  *    }
  *
  */


// Turn On Integration Mode

/**
  * @api {put} /v2/account/integration Turn On Integration Mode
  * @apiName Turn On Integration Mode
  * @apiGroup Accounts
  * @apiVersion 2.0.0
  *
  * @apiDescription Integration mode can be turned on by issuing a PUT request to https://app.zencoder.com/api/v2/account/integration. A successful response will be indicated by a HTTP status of 204 No Content
  *
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  *
  *
  */

// Turn Off Integration Mode

/**
  * @api {put} /v2/account/live Turn Off Integration Mode
  * @apiName Turn Off Integration Mode
  * @apiGroup Accounts
  * @apiVersion 2.0.0
  *
  * @apiDescription Integration mode can be turned off by issuing a PUT request to https://app.zencoder.com/api/v2/account/live. A successful response will be indicated by a HTTP status of 204 No Content
  *
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  *
  *
  */
