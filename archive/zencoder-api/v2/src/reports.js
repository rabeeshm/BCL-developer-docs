// Get Usage for VOD

/**
  * @api {get} /v2/reports/vod Get Usage for VOD
  * @apiName Get Usage for VOD
  * @apiGroup Reports
  * @apiVersion 2.0.0
  *
  * @apiDescription This report returns a breakdown of video on demand (videos not using live-streaming) minute usage by day and grouping. It will contain two top-level keys: total and statistics. total will contain the sum of all statistics returned in the report. statistics will contain an entry for each day and grouping. If you don't use the report grouping feature of the API the report will contain only one entry per day. These statistics are collected about once per hour, but there is only one record per day (per grouping). By default this report excludes the current day from the response because it's only partially complete. It's important to note that our service operates in the UTC time zone (including billing periods). All dates and times reported will be in UTC.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Params) {String} [from] Start date in the format YYYY-MM-DD (default: 30 days ago)
  * @apiParam (URL Params) {String} [to] End date in the format YYYY-MM-DD (default: 30 days ago
  * @apiParam (URL Params) {String} [grouping] A grouping name set in the [Create a Job](#api-Jobs-Create_a_Job) operation
  *
  * @apiParamExample {String} Get Usage for VOD Example:
  *    https://app.zencoder.com/api/v2/reports/vod?from=2017-01-01&to=2017-01-31&grouping=myGroup
  *
  *
  * @apiSuccess (200) {Object} total Summary object
  * @apiSuccess (200) {Number} total.encoded_minutes The total encoding minutes
  * @apiSuccess (200) {Number} total.billable_minutes The encoding minutes that were billable
  * @apiSuccess (200) {Object[]} statistics reports by grouping
  * @apiSuccess (200) {String} statistics.grouping the grouping - `null` is for all ungrouped activity
  * @apiSuccess (200) {String} statistics.collected_on The date of the report
  * @apiSuccess (200) {Number} statistics.encoded_minutes The encoding minutes for this group
  * @apiSuccess (200) {Number} statistics.billable_minutes The billable encoding minutes for this group
  *
  * @apiSuccessExample {json} Get Usage for VOD
  *    {
  *      "total": {
  *        "encoded_minutes": 6,
  *        "billable_minutes": 8
  *      },
  *      "statistics": [
  *        {
  *          "grouping": "myGroup",
  *          "collected_on": "2017-03-10",
  *          "encoded_minutes": 4,
  *          "billable_minutes": 5
  *        }, {
  *          "grouping": null,
  *          "collected_on": "2017-03-10",
  *          "encoded_minutes": 2,
  *          "billable_minutes": 3
  *        }
  *      ]
  *    }
  *
  */



// Get Usage for Live

/**
  * @api {get} /v2/reports/live Get Usage for Live
  * @apiName Get Usage for Live
  * @apiGroup Reports
  * @apiVersion 2.0.0
  *
  * @apiDescription This report returns a breakdown of live-streaming hour usage by day and grouping. It will contain two top-level keys: total and statistics. total will contain the sum of all statistics returned in the report. statistics will contain an entry for each day and grouping. If you don't use the report grouping feature of the API the report will contain only one entry per day. These statistics are collected about once per hour, but there is only one record per day (per grouping). By default this report excludes the current day from the response because it's only partially complete. It's important to note that our service operates in the UTC time zone (including billing periods). All dates and times reported will be in UTC.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Params) {String} [from] Start date in the format YYYY-MM-DD (default: 30 days ago)
  * @apiParam (URL Params) {String} [to] End date in the format YYYY-MM-DD (default: 30 days ago
  * @apiParam (URL Params) {String} [grouping] A grouping name set in the [Create a Job](#api-Jobs-Create_a_Job) operation
  *
  * @apiParamExample {String} Get Usage for Live Example:
  *    https://app.zencoder.com/api/v2/reports/live?from=2017-01-01&to=2017-01-31&grouping=myGroup
  *
  *
  * @apiSuccess (200) {Object} total Summary object
  * @apiSuccess (200) {Number} total.stream_hours The total streaming hours
  * @apiSuccess (200) {Number} total.billable_stream_hours The streaming hours that were billable
  * @apiSuccess (200) {Number} total.encoded_hours The total encoded hours
  * @apiSuccess (200) {Number} total.billable_encoded_hours The encoded hours that were billable
  * @apiSuccess (200) {Object[]} statistics reports by grouping
  * @apiSuccess (200) {String} statistics.grouping the grouping - `null` is for all ungrouped activity
  * @apiSuccess (200) {String} statistics.collected_on The date of the report
  * @apiSuccess (200) {Number} statistics.stream_hours The total streaming hours
  * @apiSuccess (200) {Number} statistics.billable_stream_hours The streaming hours that were billable
  * @apiSuccess (200) {Number} statistics.encoded_hours The total encoded hours
  * @apiSuccess (200) {Number} statistics.billable_encoded_hours The encoded hours that were billable
  *
  * @apiSuccessExample {json} Get Usage for Live
  *    {
  *      "total": {
  *        "stream_hours": 5,
  *        "billable_stream_hours": 6,
  *        "encoded_hours": 5,
  *        "billable_encoded_hours": 6,
  *        "total_hours": 10,
  *        "total_billable_hours": 12
  *      },
  *      "statistics": [
  *        {
  *          "grouping": "myGroup",
  *          "collected_on": "2017-03-10",
  *          "stream_hours": 3,
  *          "billable_stream_hours": 4,
  *          "encoded_hours": 3,
  *          "billable_encoded_hours": 4,
  *          "total_hours": 6,
  *          "total_billable_hours": 8
  *        }, {
  *          "grouping": null,
  *          "collected_on": "2017-03-10",
  *          "stream_hours": 2,
  *          "billable_stream_hours": 2,
  *          "encoded_hours": 2,
  *          "billable_encoded_hours": 2,
  *          "total_hours": 4,
  *          "total_billable_hours": 4
  *        }
  *      ]
  *    }
  *
  */



// Get Usage for VOD & Live

/**
  * @api {get} /v2/reports/all Get Usage for VOD & Live
  * @apiName Get Usage for VOD & Live
  * @apiGroup Reports
  * @apiVersion 2.0.0
  *
  * @apiDescription This report returns a breakdown of VOD and live-streaming usage by day and grouping. It will contain two top-level keys: total and statistics. total will contain the sum of all statistics returned in the report. statistics will contain an entry for each day and grouping, broken out by Live and VOD. If you don't use the report grouping feature of the API the report will contain only one entry per day. These statistics are collected about once per hour, but there is only one record per day (per grouping). By default this report excludes the current day from the response because it's only partially complete. It's important to note that our service operates in the UTC time zone (including billing periods). All dates and times reported will be in UTC.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Params) {String} [from] Start date in the format YYYY-MM-DD (default: 30 days ago)
  * @apiParam (URL Params) {String} [to] End date in the format YYYY-MM-DD (default: 30 days ago
  * @apiParam (URL Params) {String} [grouping] A grouping name set in the [Create a Job](#api-Jobs-Create_a_Job) operation
  *
  * @apiParamExample {String} Get Usage for VOD & Live Example:
  *    https://app.zencoder.com/api/v2/reports/all?from=2017-01-01&to=2017-01-31&grouping=myGroup
  *
  *
  * @apiSuccess (200) {Object} total Summary object
  * @apiSuccess (200) {Object} total.live Summary object for live usage
  * @apiSuccess (200) {Number} total.live.stream_hours The total streaming hours
  * @apiSuccess (200) {Number} total.live.billable_stream_hours The streaming hours that were billable
  * @apiSuccess (200) {Number} total.live.encoded_hours The total encoded hours
  * @apiSuccess (200) {Number} total.live.billable_encoded_hours The encoded hours that were billable
  * @apiSuccess (200) {Number} total.live.total_hours The total encoded and stream hours
  * @apiSuccess (200) {Number} total.live.total_billable_hours The encoded and stream hours that were billable
  * @apiSuccess (200) {Object} total.vod Summary object for VOD usage
  * @apiSuccess (200) {Number} total.vod.encoded_minutes The total encoding minutes
  * @apiSuccess (200) {Number} total.vod.billable_minutes The encoding minutes that were billable
  * @apiSuccess (200) {Object[]} statistics reports by grouping
  * @apiSuccess (200) {Object[]} statistics.live reports by grouping for live usage
  * @apiSuccess (200) {String} statistics.live.grouping the grouping - `null` is for all ungrouped activity
  * @apiSuccess (200) {String} statistics.live.collected_on The date of the report
  * @apiSuccess (200) {Number} statistics.live.stream_hours The total streaming hours
  * @apiSuccess (200) {Number} statistics.live.billable_stream_hours The streaming hours that were billable
  * @apiSuccess (200) {Number} statistics.live.encoded_hours The total encoded hours
  * @apiSuccess (200) {Number} statistics.live.billable_encoded_hours The encoded hours that were billable
  * @apiSuccess (200) {Object[]} statistics.vod reports by grouping for VOD usage
  * @apiSuccess (200) {String} statistics.vod.grouping the grouping - `null` is for all ungrouped activity
  * @apiSuccess (200) {String} statistics.vod.collected_on The date of the report
  * @apiSuccess (200) {Number} statistics.vod.encoded_minutes The encoding minutes for this group
  * @apiSuccess (200) {Number} statistics.vod.billable_minutes The billable encoding minutes for this group
  *
  * @apiSuccessExample {json} Get Usage for VOD & Live
  *    {
  *      "total": {
  *        "live": {
  *          "stream_hours": 5,
  *          "billable_stream_hours": 6,
  *          "encoded_hours": 5,
  *          "billable_encoded_hours": 6,
  *          "total_hours": 10,
  *          "total_billable_hours": 12
  *        },
  *        "vod": {
  *          "encoded_minutes": 6,
  *          "billable_minutes": 8
  *        }
  *      },
  *      "statistics": {
  *        "live": [
  *          {
  *            "grouping": "zencoder",
  *            "collected_on": "2011-08-10",
  *            "stream_hours": 3,
  *            "billable_stream_hours": 4,
  *            "encoded_hours": 3,
  *            "billable_encoded_hours": 4
  *            "total_hours": 6,
  *            "total_billable_hours": 8
  *          }, {
  *            "grouping": null,
  *            "collected_on": "2011-08-10",
  *            "stream_hours": 2,
  *            "billable_stream_hours": 2,
  *            "encoded_hours": 2,
  *            "billable_encoded_hours": 2
  *            "total_hours": 4,
  *            "total_billable_hours": 4
  *          }
  *        ],
  *        "vod": [
  *          {
  *            "grouping": "zencoder",
  *            "collected_on": "2011-08-10",
  *            "encoded_minutes": 4,
  *            "billable_minutes": 5
  *          }, {
  *            "grouping": null,
  *            "collected_on": "2011-08-10",
  *            "encoded_minutes": 2,
  *            "billable_minutes": 3
  *          }
  *        ]
  *      }
  *    }
  *
  */


  // Get Get Minutes Used

  /**
    * @api {get} /v2/reports/minutes Get Get Minutes Used
    * @apiName Get Get Minutes Used
    * @apiGroup Reports
    * @apiVersion 2.0.0
    *
    * @apiDescription In API version 2 /vod and /minutes return the same data. View the [/vod documentation](#api-Reports-Get_Usage_for_VOD) for more information on the available options and response fields.
    *
    */
