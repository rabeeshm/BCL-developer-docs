# Resource API

The resource API is a private API used by Wedge to retrieve the policy
object controlling access to a given resource.  It has no access
control mechanism; security is enforced by EC2 network access control
and the fact that the API is only routed internally to the VPC.  This
API is **not yet implemented** so all routes return a 404 and is not
yet routed in API version 1, `/v1`.

The API root path is `/v0/policies`. Under this root path:

* `GET /:id-or-refid` returns (200 OK) the policy with id *or* refid
  given by `:id-or-refid`.
    * If no policy by that id or refid is found, return 404 Not Found.
      (Since this is **not yet implemented** that's always.)
* `GET /for/*` returns (200 OK) everything nomic-server knows about a
  policy governing the resource named by the resource URL path in the
  `*` component of the URL (everything following `/for/`).
    * If no information about such a resource exists, return 404 Not Found.
      (Since this is **not yet implemented** that's always.)
