# Policy format

There are two policy formats used to create keys, the format described here which handles
all supported policies and the shorter key-data format that is use to encode the video policy
keys and only supports features that can be encoded in policy keys. It is described
in [the video policy key doc](video-policy-key.md).

The key-data format is all that is needs to be documented for creating currently supported
policy keys.

## Examples

Here is a policy that always denies access:

```json
{ "pattern": { "always-match": [] },
  "effect":  "deny" }
```

Here is a policy that allows access if the requested resource has video ID 6 under account ID
8523.  (Note that "video-id" policies are not yet supported.)

```json
{ "pattern":
  { "and":
    [ { "=": ["[request.params.account-id]", "8523"] },
      { "=": ["[request.params.video-id]", "6"] } ] },
  "effect": "allow" }
```

Using the shorter key-data format, this is:
```
{"account-id": "8523", "video-id": "6"}
```

## Grammar

The grammar of policies is as follows:

```
<policy>             ::= { "pattern": <pattern>, "effect": <effect> }
<effect>             ::= "allow" | "deny" | <partial-deny>
<partial-deny>       ::= { "partial-deny": [ <pd-scope-word>* ] }
<pd-scope-word>      ::= a string naming an attribute group to be restricted by partial deny

<pattern>            ::= <primitive-pattern> | <composite-pattern>

<primitive-pattern>  ::= { <predicate-name>: [ <predicate-arg>* ] }
<predicate-name>     ::= a string naming a primitive policy predicate (see below)
<predicate-arg>      ::= <value-arg> | <context-arg>
<value-arg>          ::= an arbitrary JSON value as a literal argument to a predicate
<context-arg>        ::= "[<context-path>]"
<context-path>       ::= <context-identifier> | <context-path>.<context-identifier>
<context-identifier> ::= /[a-z\-]+/

<composite-pattern>  ::= { <pattern-combiner>: [ <pattern>* ] }
<pattern-combiner>   ::= "and" | "or"
```

## Primitive predicates

Currently implemented primitive policy predicates are:

* `"always-match"` ignores all its arguments and always matches.
* `"never-match"` ignores all its arguments and never matches.
* `"="` matches if its arguments all have equal values.
* `"!="` matches if its arguments do not all have equal values.
* `contains?` matches if its first argument belongs to the list given as the second argument.
* `not-contains?` matches if its first argument does not belong to the list given as the second
argument.
* `adobe-tve-valid` and `!adobe-tve-valid` are used to implement Adobe TVE authentication.
* `ipv4-ranges-contain?` and `!ipv4-ranges-contain?` answer whether the first argument does
or does not belong to the set of IPv4 address ranges described by the second argument.

The following keywords are reserved and not allowed to be primitive policy predicate names:
`and`, `or`, `not`, `constant`.

## Predicate arguments

Arguments to policy predicates are either literal values, which are represented as themselves
in JSON format, or references to values in the policy evaluation context.  This context is a
nested hash, and references are represented in the format `"[key1.key2.key3]"`, where
`[key1, key2, key3]` is a nested sequence of hash keys.  The available keys will be defined
over time in a separate document.
