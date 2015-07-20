# Policy API

The policy API is a public API used by BC developers and customer users to create and
manipulate policy objects.  There is no access control when called directly via nomic-server,
but the Wedge filters impose a requirement for a Cathy token for some calls.

Only a subset of the full policy format can be encoded as a [Video policy key](video-policy-key.md).

## API

See [the policy format doc](policy-format.md) for a description of the
JSON-encoded policy language.

### policy_keys

The Nomic policy key api will encrypt and decrypt policy keys to be used with the Playback
api. This api returns (or takes) the encrypted key-string, it does not record the key
nor return an id to be used later.  (See the Server README.md for examples of usage.)

* `POST /v1/accounts/:account-id/policy_keys` accepts a JSON policy
  request body and returns an encrypted policy key.
    * If required attributes are missing or invalid, return 400 Bad Request and an error-code and message.
    * If successful, return (200 Success) and the policy key-string and original policy
      The "key-string" value is what needs to be passed in with the Playback api requests.
    {"key-string":"BCpkABEr ... WhOo",
     "policy":[{"pattern":{"=":["[request.params.account-id]","8523"]},"effect":"allow"}]}

* `GET /v1/accounts/:account-id/policy_keys/<key-string>` accepts an
  encrypted player policy key and returns (200 OK) and the decrypted
  policy value.
    * If cannot decrypt the policy key or it is illegal, return 404 Not Found and a message such as.
      [{"error_code":"INVALID_POLICY_KEY","message":"The policy key string supplied is not valid."}]


### policies api

**NOTE: This section of the API is not yet implemented.**

**TODO: Document restrictions on which policy features may be used in
this API and how we check for entitlements to use them.**

The plan is to support more complex policies that would be stored on the Nomic
server and referenced by its api with an id. For the first major release this is not supported.
Currently the Playback api supports policies that can be encoded in a Nomic policy
key or that can be constructed by account or video meta-data by the Playback api.

The API root path is `/v1/accounts/:account-id/policies`, where `:account-id` is a BC account
ID which scopes access to policy objects.  (Eventually we may choose to control access to policy
objects using security principals other than BC accounts, and we may then provide URLs of other
structure.)

Under this root path:

* **not yet**
  `GET /v1/accounts/:account-id/policies` returns (200 OK) an array containing all policies
  accessible through this account, in no particular order.
* **not yet**
  `GET /v1/accounts/:account-id/policies/:id-or-refid` returns (200 OK) the policy with
  id *or* refid given by `:id-or-refid`.
    * If no policy by that id or refid is found, return 404 Not Found.
* **not yet**
  `POST /v1/accounts/:account-id/policies` creates a new policy.
    * If required attributes are missing or invalid, return 400 Bad Request.
    * If successful, return (201 Created) the newly created policy in the `"result"` member.
      It will be assigned a randomly chosen UUID **id**.
* **not yet**
  `PUT /v1/accounts/:account-id/policies/:id-or-refid` or `PATCH /:id-or-refid` modify an existing policy.
    * If no policy by that id or refid is found, return 404 Not Found.
    * If a refid that identifies more than one policy is given, return 400 Bad Request.
    * If the modified entity is not valid, return 400 Bad Request.
    * Otherwise return (200 OK) the modified policy in the `"result"` member.
* **not yet**
  `DELETE /v1/accounts/:account-id/policies/:id-or-refid` deletes a policy.
    * If no policy by that refid is found, return 404 Not Found.
    * If a refid that identifies more than one policy is given, return 400 Bad Request.
    * Otherwise return (200 OK) `{"status":"success"}`.
