#  Videos API

*   [List](Catalog-API-v1alpha3-Videos#list-videos)
*   [Count](Catalog-API-v1alpha3-Videos#count-videos)
*   [Search](Catalog-API-v1alpha3-Videos#search-videos)
*   [Get by id](Catalog-API-v1alpha3-Videos#get-a-single-video)
*   [Get by reference id](Catalog-API-v1alpha3-Videos#get-a-single-video-by-reference-id)

This resource requires authorization for `video-cloud/video/read`

Note, video urls are returned in a separate document. See [Video Sources](Catalog-API-v1alpha3-Video-Sources)

## List videos
List an account’s videos:

        GET /v1alpha3/accounts/:accountId/videos

### Parameters
**limit**

*Optional* int limits the number of videos returned. Must be between 1 and 100. Defaults to 20.

**offset**

*Optional* int skips a number of videos. Must be a positive number. Defaults to 0.

**sort**

*Optional* string specifies the field to sort by. Start with ‘-‘ to sort descending. No default value.

### Response
```
[
{
    "id": "123",
    "description": "This is my video",
    "keywords": [
        "gossip",
        "columbia/music with a twist",
        "alternative"
    ],
    "name": "My video",
    "reference_id": "myfirstvideo",
    "state": "ACTIVE",
    "sources_url": "https://catalog.api.brightcove.com/v1alpha3/accounts/123/videos/123/sources",
    "images": {
      "poster": {
        "id": "456",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video.jpg?pubId=123"
      },
      "thumbnail": {
        "id": "789",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video-thumb.jpg?pubId=123"
      },
    },
    "updated_at": "2009-07-31T20:25:50.744+0000"
}
]
```

## Count videos
Gets the count of videos for the account:

        GET /v1alpha3/accounts/:accountId/videos/count

### Parameters
_None_

### Response
```
{
    "count": "123"
}
```

## Search videos
Search for account’s videos that match the given search string:

        GET /v1alpha3/accounts/:accountId/videos?q=foo

### Parameters

**q**

*Optional* The query string. See below for the supported syntax.

**limit**

*Optional* int limits the number of videos returned. Must be between 1 and 100. Defaults to 20.

**offset**

*Optional* int skips a number of videos. Must be a positive number. Defaults to 0.

**sort**

*Optional* string specifies the field to sort by. Start with ‘-‘ to sort descending. If a value for `q` is provided, then the default sort is by “score” (relevance of the search results to the original query). If no value for `q` is provided, then the default sort is by `updated_at` descending.

### Search syntax
The query string you provide should be a url encoded list of terms separated by a space (+ after encoding).

#### basic search
If you provide a value with no qualifers:
```
q=foo
```
This will execute a text search against the following fields: `name`, `description`, `long_description`, `keywords`, `reference_id`, and all custom fields.

#### limit search to a specific property
You can search against values for a specific field:
```
q=name:foo
```
This will search for videos with the term 'foo' in the `name` field of the video. The supported fields are:

| field        | legal values                       |
|--------------|------------------------------------|
| name         | strings or quoted strings          |
| text         | strings or quoted strings (name, description, long_description)         |
| keywords     | strings or quoted strings          |
| reference_id | string or quoted string            |
| state        | ACTIVE, INACTIVE, DELETED, PENDING |
| updated_at   | date range                         |
| created_at   | date range                         |
| published_at | date range                         |
| complete     | true or false                      |

The fields that take a string result in a text search against that field.

#### required and prohibited terms

You can mark a term as required (returned videos MUST match) or prohibited (returned videos must NOT match). This is controlled with a `+` or `-` sign immediately preceding the term.

| example | urlencoded | meaning |
|---------|------------|---------|
| +foo    | %2Bfoo     | videos must include the term 'foo' in the name, description, or long_description |
| -foo    | %2D        | videos must NOT include the term 'foo' in the name, description, or long_description |
| +name:foo    | %2Bfoo     | videos must include the term 'foo' in the name |
| -name:foo    | %2D        | videos must NOT include the term 'foo' in the name |

By default, search terms are optional but will affect the score.

#### Quoted search terms
By default, a search term could match similar words. If you want to do an exact match, or match multiple words, just wrap the term in quotes:
```
"foo"
"foo bar"
```

This also works when searching against a specific field:
```
name:"foo"
name:"foo bar"
```

#### Custom fields
You may search on your custom fields similarly. Custom fields are treated as strings:

    my_field:foo
    my_field:"foo"

#### Date ranges
If the field you are searching on is a date, then you can specify a range of dates to search for:
```
updated_at:2012-08-01T00:00:00Z..2012-10-08T00:00:00Z
```

This will search for all videos with an `updated_at` value between Aug 1, 2012 and October 8, 2012.

We support a few formats for specifying the date:

| format              | meaning                     |
|---------------------|-----------------------------|
|2012-08-01T00:00:00Z | This represents a time in UTC. |
|2012-08-01 | This represents a midnight on a day in UTC. The example is equivalent to 2012-08-01T00:00:00Z |
|-1d                  | The current time minus 1 day. (see below)|
|+1d                  | The current time plus 1 day. (see below)|

##### Relative dates
For relative dates we support a direction (+ or -) followed by a number, followed by a duration. Legal durations are: minutes, hours, days

For example:
* -1day
* -2days
* +4hours
* -60minutes
* -1d
* -2d
* +4h
* -60m

##### Open ended ranges
If you want to match all dates until a given time, or match all dates since a given time, leave off one end of the range. For example:

###### Search for all videos modified in the last 2 days

    q=updated_at:-2days..

###### Search for all videos modified before August 11, 2013:

    q=updated_at:..2013-08-11T00:00:00Z

### Putting it all together

        GET /v1alpha3/accounts/59121/videos?q=%2Bname:gossip+%2Bupdated_at:2010-08-01T00:00:00Z..2010-10-08T00:00:00Z&sort=updated_at

```
[
{
    "id": "123",
    "description": "This is my video",
    "keywords": [
        "gossip",
        "columbia/music with a twist",
        "alternative"
    ],
    "name": "My video",
    "reference_id": "myfirstvideo",
    "state": "ACTIVE",
    "sources_url": "https://catalog.api.brightcove.com/v1alpha3/accounts/59121/videos/123/sources",
    "images": {
      "poster": {
        "id": "456",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video.jpg?pubId=123"
      },
      "thumbnail": {
        "id": "789",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video-thumb.jpg?pubId=123"
      },
    },
    "updated_at": "2009-07-31T20:25:50.744+0000"
}
]
```

## Get a single video
If you know the id of the video you can access it directly:
        GET /v1alpha3/accounts/:accountId/videos/:videoId

### Response
```
{
    "id": "123",
    "description": "This is my video",
    "keywords": [
        "gossip",
        "columbia/music with a twist",
        "alternative"
    ],
    "reference_id": "myfirstvideo",
    "state": "ACTIVE",
    "sources_url": "https://catalog.api.brightcove.com/v1alpha3/accounts/123/videos/123/sources",
    "images": {
      "poster": {
        "id": "456",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video.jpg?pubId=123"
      },
      "thumbnail": {
        "id": "789",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video-thumb.jpg?pubId=123"
      },
    },
    "updated_at": "2009-07-31T20:25:50.744+0000"
}
```

## Get a single video by reference id
        GET /v1alpha3/accounts/:accountId/videos/ref:videoId
### Response
```
{
    "id": "123",
    "description": "This is my video",
    "keywords": [
        "gossip",
        "columbia/music with a twist",
        "alternative"
    ],
    "name": "My video",
    "reference_id": "myfirstvideo",
    "state": "ACTIVE",
    "sources_url": "https://catalog.api.brightcove.com/v1alpha3/accounts/123/videos/123/sources",
    "images": {
      "poster": {
        "id": "456",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video.jpg?pubId=123"
      },
      "thumbnail": {
        "id": "789",
        "src": "http://brightcove.vo.llnwd.net/e1/pd/123/123_456_my-video-thumb.jpg?pubId=123"
      },
    },
    "updated_at": "2009-07-31T20:25:50.744+0000"
}
```