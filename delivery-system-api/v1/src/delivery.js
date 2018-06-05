/**
* @apiDefine RepositoriesGroup Repositories
* Repository operations allow you to manage git repositories associated with Brightcove Players. See [Deliuery System API Overview](https://support.brightcove.com/overview-delivery-system-api) for more information.
*/

// get repositories

/**
 * @api {get} /accounts/:accountId/repos Get All Repositories
 * @apiName Get All Repositories
 * @apiGroup Repositories
 * @apiVersion 1.0.0
 *
 * @apiDescription This will list the details for all repositories in an account.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} accountId Video Cloud account ID.
 *
 * @apiParamExample {cURL} Get Repos apiParamExample
 *    curl --request GET \
 *      --url https://repos.api.brightcove.com/v1/accounts/1752604059001/repos \
 *      --header 'authorization: Bearer YOUR_ACCESS_TOKEN'
 *
 * @apiSuccess (200) {String[]} items array of items
 * @apiSuccess (200) {String} items.name repo name
 * @apiSuccess (200) {String} items.public_url URL for the public player
 * @apiSuccess (200) {String} items.repo_url URL for the repository
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200
 *    {
 *      "items": [
 *        {
 *          "name": "009bc3a8-bb3f-4f94-ae9c-8e9161dc0072_af909574-1b95-4167-8f5a-81939725e843",
 *          "public_url": "http://players.brightcove.net/1507807800001/009bc3a8-bb3f-4f94-ae9c8e9161dc0072_af909574-1b95-4167-8f5a-81939725e843",
 *          "repo_url": "https://repos.api.brightcove.com/v1/accounts/1507807800001/repos/009bc3a8-bb3f-4f94-ae9c-8e9161dc0072_af909574-1b95-4167-8f5a-81939725e843"
 *        },
 *        {
 *          "name": "009bc3a8-bb3f-4f94-ae9c-8e9161dc0072_default",
 *          "public_url": "http://players.brightcove.net/1507807800001/009bc3a8-bb3f-4f94-ae9c-8e9161dc0072_default",
 *          "repo_url": "https://repos.api.brightcove.com/v1/accounts/1507807800001/repos/009bc3a8-bb3f-4f94-ae9c-8e9161dc0072_default"
 *        }
 *      ],
 *        "item_count": 2
 *    }
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 */

// get Repository

/**
 * @api {get} /accounts/:accountId/repos/:repoName Get Repository
 * @apiName Get Repository
 * @apiGroup Repositories
 * @apiVersion 1.0.0
 *
 * @apiDescription This will retrieve the details for a Repositories.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} accountId Video Cloud account ID.
 * @apiParam {String} repoName The name of the repo for which to list details.
 *
 * @apiParamExample {cURL} Get Repos apiParamExample
 *    curl --request GET \
 *      --url https://repos.api.brightcove.com/v1/accounts/1752604059001/repos/myRepo \
 *      --header 'authorization: Bearer YOUR_ACCESS_TOKEN'
 *
 * @apiSuccess (200) {String} name repo name
 * @apiSuccess (200) {String} public_url URL for the public player
 * @apiSuccess (200) {String} repo_url URL for the repository
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200
 *    {
 *      "name": "firstRepo",
 *      "public_url": "http://players.brightcove.net/1507807800001/firstRepo",
 *      "repo_url": "https://repos.api.brightcove.com/v1/accounts/1507807800001/repos/firstRepo"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 */

// create Repositories

/**
 * @api {put} /accounts/:accountId/repos/:repoName Create Repository
 * @apiName Create Repository
 * @apiGroup Repositories
 * @apiVersion 1.0.0
 *
 * @apiDescription This will create a Repositories, if it does not exist. A response of 200 means the repository already existed. A response of 201 means repository was successfully created.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} accountId Video Cloud account ID.
 * @apiParam {String} repoName The name of the repo for which to list details.
 *
 *
 * @apiParamExample {cURL} Get Repos apiParamExample
 *    curl --request PUT \
 *      --url https://repos.api.brightcove.com/v1/accounts/1752604059001/repos/myRepo \
 *      --header 'authorization: Bearer YOUR_ACCESS_TOKEN'
 *
 * @apiSuccess (200) {String} name repo name
 * @apiSuccess (200) {String} public_url URL for the public player
 * @apiSuccess (200) {String} repo_url URL for the repository
 *
 * @apiSuccessExample {json} Success Response 200:
 *     HTTP/1.1 200
 *    {
 *      "name": "existingRepo",
 *      "public_url": "http://players.brightcove.net/1507807800001/existingRepo",
 *      "repo_url": "https://repos.api.brightcove.com/v1/accounts/1507807800001/repos/existingRepo"
 *    }
 *
 *
 * @apiSuccessExample {json} Success Response 201:
 *     HTTP/1.1 201
 *    {
 *      "name": "newRepo",
 *      "public_url": "http://players.brightcove.net/1507807800001/newRepo",
 *      "repo_url": "https://repos.api.brightcove.com/v1/accounts/1507807800001/repos/newRepo"
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 */

// delete Repositories

/**
 * @api {delete} /accounts/:accountId/repos/:repoName Delete Repository
 * @apiName Delete Repository
 * @apiGroup Repositories
 * @apiVersion 1.0.0
 *
 * @apiDescription This will delete a Repositories.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} accountId Video Cloud account ID.
 * @apiParam {String} repoName The name of the repo for which to list details.
 *
 *
 * @apiParamExample {cURL} Get Repos apiParamExample
 *    curl --request DELETE \
 *      --url https://repos.api.brightcove.com/v1/accounts/1752604059001/repos/myRepo \
 *      --header 'authorization: Bearer YOUR_ACCESS_TOKEN'
 *
 * @apiSuccess (200) {String} name repo name
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200
 *    {
 *      Successfully deleted repo MyRepoName.
 *    }
 *
 * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
 * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
 */

 /**
  * @apiDefine FilesGroup Manipulating Files
  * There is nothing in the Manipulating Files calls to the API to display the contents of a file, but you can do so in these two ways: 1) Browse the `public_url` that is part of the response in the file add/update; 2) Use cURL to the file: `curl http://players.brightcove.net/:accountId/repos/:repoName/files/:filename`
  */

 // add or update file

 /**
  * @api {put} /accounts/:accountId/repos/:repoName/files/:filename Add/Update File
  * @apiName Add/Update File
  * @apiGroup FilesGroup
  * @apiVersion 1.0.0
  *
  * @apiDescription This will add or update a file. The wanted file name is at the end of the endpoint. The <code>form contents</code> can be a file name, including relative path, or any string. If the file has a <code>.json</code> extension, it will be checked for valid JSON format.
  *
  * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
  *
  * @apiParam {String} accountId Video Cloud account ID.
  * @apiParam {String} repoName The name of the repo for which to list details.
  * @apiParam {String} filename The name of the file in the repo, it can be different than the name of locally read file.
  *
  * @apiParam (Form Contents Value - Note: The value can be a file or a JSON string; If using a file it must be proceeded with the @ sign) {String} sourceFilename Name of the file in the local folder, or a JSON string.
  *
  * @apiParamExample {curl} curl Statement:
  *    curl \
  *      --user :email \
  *      --form contents=@sourceFilename \
  *      --request PUT \
  *      https://repos.api.brightcove.com/v1/accounts/:accountId/repos/:repoName/files/:fileName
  *
  * @apiSuccess (200) {String} name Destination filename
  * @apiSuccess (200) {String} public_url URL to use for referencing the file (contrasted to the repo URL)
  *
  * @apiSuccessExample {json} Success Response:
  *     HTTP/1.1 200
  *     {
  *       "name": "newname.txt",
  *       "public_url": "http://players.brightcove.net/1507807800001/testRepo1/newname.txt"
  *     }
  * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
  * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
  */

  // delete a file

  /**
   * @api {delete} /accounts/:accountId/repos/:repoName/files/:filename Delete File
   * @apiName Delete File
   * @apiGroup FilesGroup
   * @apiVersion 1.0.0
   *
   * @apiDescription Deletes a file in a repo.
   *
   * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
   *
   * @apiParam {String} accountId Video Cloud account ID.
   * @apiParam {String} repoName The name of the repo for which to list details.
   * @apiParam {String} filename The name of the file in the repo to delete.
   *
   * @apiParamExample {curl} curl Statement:
   *    curl \
   *      --user :email \
   *      --request DELETE \
   *      https://repos.api.brightcove.com/v1/accounts/:accountId/repos/:repoName/files/:filename
   *
   * @apiSuccessExample {json} Success Response:
   *     HTTP/1.1 200
   *     {
   *       message: "The call was successful."
   *     }
   * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
   * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
   */

   // list all files

   /**
    * @api {get} /accounts/:accountId/repos/:repoName/files List Files
    * @apiName List Files
    * @apiGroup FilesGroup
    * @apiVersion 1.0.0
    *
    * @apiDescription Lists all the files in a repo.
    *
    * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
    *
    * @apiParam {String} accountId Video Cloud account ID.
    * @apiParam {String} repoName The name of the repo for which to list details.
    *
    * @apiParamExample {curl} curl Statement:
    *    curl \
    *      --user :email \
    *      --request GET \
    *      https://repos.api.brightcove.com/v1/accounts/:accountId/repos/:repoName/files/
    *
    * @apiSuccessExample {json} Success Response:
    *     HTTP/1.1 200
    *      {
    *        "items": [{
    *          "name": "newname.txt",
    *          "public_url": "http://players.brightcove.net/1507807800001/testRepo1/newname.txt"
    *        }, {
    *          "name": "test.txt",
    *          "public_url": "http://players.brightcove.net/1507807800001/testRepo1/test.txt"
    *        }],
    *        "item_count": 2
    *      }
    * @apiError (Error 4xx) {Object[]} UNAUTHORIZED 401: Authentication failed; check to make sure your client credentials were correct for the access token
    * @apiError (Error 4xx) {Object[]} RESOURCE_NOT_FOUND 404: The api couldn't find the resource you requested
    */
