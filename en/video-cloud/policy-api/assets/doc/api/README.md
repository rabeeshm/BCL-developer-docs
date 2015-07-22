# Nomic API

This documentation currently covers API version 1, `v1`.

## Service endpoints

nomic-server exposes two distinct API endpoints corresponding to two groups of API clients:

* The *public API* is routed through Wedge, and authorized by Cathy tokens.
  Customers use the public API to create policies and apply them to their resources.
* The *private API* is routed through an internal ELB **(eventually via Hystrix)**, and access
  to it is controlled by EC2 security mechanisms.  Wedge calls the private API to retrieve
  policies corresponding to specific resources.  The private API also serves health checks and
  monitoring.

## Public API documentation

- [Policy API](policy.md) - create, manipulate, and retrieve policy objects
- [Video policy key API](video-policy-key.md) - create, manipulate, and retrieve video policy
  keys referring to policies

## Private API documentation

- [Resource API](resource.md) - query the policy corresponding to a resource
- [Internal API](internal.md) - health checks and other private endpoints

## Language documentation

- [Policy format](policy-format.md) - policy language used in keys and API calls
