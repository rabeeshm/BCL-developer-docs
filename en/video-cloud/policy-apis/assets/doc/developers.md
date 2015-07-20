# Notes for developers

The security of nomic depends on being able to receive all relevant
policies for a resource. Most policies carry various ways of denying
access; if one of these fails to reach the policy evaluator, its
contraint will not be applied. The only place we provide an Allow
policy is in nomic-server's account requirements response (allow if
account matches) along with IP restrictions and the like. Since nomic
requires at least one matching Allow policy, we gain a bit of security
against a hypothetical bug that would cause the policies from
nomic-server to be ignored. Additionally, we deny the video response
if any policy could not be retrieved or computed.

## Client security

Two of the policy components are weak because they rely on cooperation
of the client: Domain restriction uses the Origin header to determine
the embedding website, and georestriction trusts the X-Forwarded-For
header to determine the user's real public IP address.

The weak client-cooperation security policies are subject to two types
of threat, both of which are impossible to fully protect against:

1. A technically savvy viewer trying to watch (or download) a video
   while bypassing restrictions (geo, domain), or
2. A developer building a website to allow non-savvy viewers to watch
   customer videos while bypassing restrictions.

We have attempted to optimize for scenario 2 with its larger
exposure. Georestriction and domain restriction would both require a
scenario 2 developer to proxy calls to Wedge Playback, which would
make them easier to block if discovered.

Scenario 1 on the other hand is a lost cause; a user may use browser
extensions to forge Origin headers to bypass domain restriction and
X-Forwarded-For to bypass georestriction.

## Policy sources

Note that only weak or trivial policies are carried on the key; strong
policies (TVE, IP) are derived from the account. Domain restriction is
carried on the key because it varies by player, and account ID is
baked into the key only to keep it from being used by other accounts.

There's another reason the policies that are permitted to be on a
policy key are limited: Many of the policies nomic deals in (such as
georestriction) are paid features. If we allowed customer to create
arbitrary policy keys, they would be able to use these features
without paying for them.
