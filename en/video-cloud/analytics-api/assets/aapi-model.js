var aapi_model = {
    baseURL: "https://analytics.api.brightcove.com/v1",
    endpointGroups: [
        {
            name: "report",
            endpoints: [
                {
                    name: "Report",
                    path: "/data",
                    methods: ["GET"]
                }
            ]
        },
        {
            name: "engagement",
            endpoints: [
                {
                    name: "Account engagement",
                    path: "/accounts/{account_id}",
                    methods: ["GET"]
                },
                {
                    name: "Player engagement",
                    path: "/accounts/{account_id}/players/{player_id}",
                    methods: ["GET"]
                },
                {
                    name: "Video engagement",
                    path: "/accounts/{account_id}/videos/{video_id}",
                    methods: ["GET"]
                }
            ]
        }
    ],
    dimensions: [
        {
            name: "account",
            fields: ["account", "account.name", "active_media", "bytes_delivered", "daily_unique_viewers", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["a single account id"]
        },
        {
            name: "video",
            fields: ["account", "account.name", "bytes_delivered", "engagement_score", "play_rate", "video", "video_duration", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.reference_id", "video.name"],
            filter_values: ["video ids as a comma-delimited list or video.q=={video field}:{value}"]
        },
        {
            name: "player",
            fields: ["account", "account.name", "bytes_delivered", "engagement_score", "play_rate", "player", "player_load", "player_name", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["player ids as a comma-delimited list"]
        },
        {
            name: "date",
            fields: ["active_media", "bytes_delivered", "daily_unique_viewers", "date", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["none"]
        },
        {
            name: "date_hour",
            fields: ["account", "account.name", "active_media", "bytes_delivered", "daily_unique_viewers", "date_hour", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["none"]
        },
        {
            name: "destination_domain",
            fields: ["account", "account.name", "destination_domain", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of domains - e.g. brightcove.com"]
        },
        {
            name: "destination_path",
            fields: ["account", "account.name", "destination_path", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of paths - e.g. /en/video-cloud/docs/editing-settings-players-plug-ins-tab"]
        },
        {
            name: "country",
            fields: ["account", "account.name", "country", "country_name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of ISO-3611-1 country codes - e.g.: KO,US"]
        },
        {
            name: "city",
            fields: ["account", "account.name", "city", "dma", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of city names - e.g. Seattle,Boston"]
        },
        {
            name: "region",
            fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "region", "region_name", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of the ISO-3611-2 region code - e.g. 'US-WA'"]
        },
        {
            name: "referrer_domain",
            fields: ["account", "engagement_score", "play_rate", "player_load", "referrer_domain", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of domains - e.g. brightcove.net"]
        },
        {
            name: "source_type",
            fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "source_type", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["direct", "referral", "organic_search", "paid_search", "secure_search"]
        },
        {
            name: "search_terms",
            fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "search_terms", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of search terms - e.g. players,videos"]
        },
        {
            name: "device_type",
            fields: ["account", "account.name", "device_type", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["mobile", "tablet", "tv", "desktop", "other"]
        },
        {
            name: "device_os",
            fields: ["account", "account.name", "device_os", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["android", "bada", "ios", "rim", "symbian", "web_os", "windows", "os_x", "mac", "linux", "other"]
        }
    ],
    filters: ["video", "video.q", "player", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
    params: [
        {
            name: "account",
            required: true,
            description: "The accounts you want to report on",
            values: "one or more account ids as a comma-delimited list",
            default: "none"
        },
        {
            name: "dimensions",
            required: true,
            description: "The dimension(s) to report on",
            values: "one or more dimensions as a comma-delimited list (some combinations are not valid)",
            default: "none"
        },
        {
            name: "where",
            required: false,
            description: "Used to specify filters for reports",
            values: "{dimension}=={value} - one or more as a semi-colon-delimited list",
            default: "none"
        },
        {
            name: "limit",
            required: false,
            description: "Number of items to return",
            values: "positive integer",
            default: 10
        },
        {
            name: "offset",
            required: false,
            description: "Number of items to skip",
            values: "positive integer",
            default: 0
        },
        {
            name: "sort",
            required: false,
            description: "Field to sort items on",
            values: "a valid field for the request",
            default: "video_view"
        },
        {
            name: "fields",
            required: false,
            description: "Fields to return",
            values: "varies according to the dimension you are reporting on",
            default: "video_view"
        },
        {
            name: "reconciled",
            required: false,
            description: "If included, will limit results to either historical or realtime data",
            values: "true | false",
            default: "none"
        },
        {
            name: "from",
            required: false,
            description: "The beginning of the date range for the request",
            values: "an ISO 8601 date (MM-DD-YYYY) or epoch time in milliseconds",
            default: "30 days prior to now"
        },
        {
            name: "to",
            required: false,
            description: "The end of the date range for the request",
            values: "an ISO 8601 date (MM-DD-YYYY) or epoch time in milliseconds",
            default: "now"
        }
    ],
    combinations: {
        account: {dimensions: ["account"], from: "2011-01-01"},
        account__video: {dimensions: ["account", "video"], from: "2011-01-01"},
        account__player: {dimensions: ["account", "player"], from: "2011-01-01"},
        account__video__player: {dimensions: ["account", "video", "player"], from: "2011-01-01"},
        account__country: {dimensions: ["account", "country"], from: "2011-01-01"},
        account__region: {dimensions: ["account", "region"], from: "2011-01-01"},
        account__city: {dimensions: ["account", "city"], from: "2011-01-01"},
        account__country__region: {dimensions: ["account", "country", "region"], from: "2011-01-01"},
        account__country__city: {dimensions: ["account", "country", "city"], from: "2011-01-01"},
        account__region__city: {dimensions: ["account", "region", "city"], from: "2011-01-01"},
        account__country__region_city: {dimensions: ["account", "country", "region", "city"], from: "2011-01-01"},
        account__video__country: {dimensions: ["account", "video", "country"], from: "2011-01-01"},
        account__video__region: {dimensions: ["account", "video", "region"], from: "2011-01-01"},
        account__video__country_region: {dimensions: ["account", "video", "country", "region"], from: "2011-01-01"},
        account__player__country: {dimensions: ["account", "player", "country"], from: "2011-01-01"},
        account__player__region: {dimensions: ["account", "player", "region"], from: "2011-01-01"},
        account__player__country_region: {dimensions: ["account", "player", "country", "region"], from: "2011-01-01"},
        account__device_os: {dimensions: ["account", "device_os"], from: "2011-01-01"},
        account__device_type: {dimensions: ["account", "device_type"], from: "2011-01-01"},
        account__device_os__device_type: {dimensions: ["account", "device_os", "device_type"], from: "2011-01-01"},
        account__video__device_os: {dimensions: ["account", "video", "device_os"], from: "2011-01-01"},
        account__video__device_type: {dimensions: ["account", "video", "device_type"], from: "2011-01-01"},
        account__video__device_os__device_type: {dimensions: ["account", "video", "device_os", "device_type"], from: "2011-01-01"},
        account__player__device_os: {dimensions: ["account", "player", "device_os"], from: "2011-01-01"},
        account__player__device_type: {dimensions: ["account", "player", "device_type"], from: "2011-01-01"},
        account__player__device_os__device_type: {dimensions: ["account", "player", "device_os", "device_type"], from: "2011-01-01"},
        account__video__player__device_os: {dimensions: ["account", "video", "player", "device_os"], from: "2011-01-01"},
        account__video__player__device_type: {dimensions: ["account", "video", "player", "device_type"], from: "2011-01-01"},
        account__video__player__device_os__device_type: {dimensions: ["account", "video", "player", "device_os", "device_type"], from: "2011-01-01"},
        account__referrer_domain: {dimensions: ["account", "referrer_domain"], from: "2012-10-01"},
        source_type: {dimensions: ["source_type"], from: "2012-10-01"},
        search_terms: {dimensions: ["search_terms"], from: "2012-10-01"},
        referrer_domain: {dimensions: ["referrer_domain"], from: "2012-10-01"},
        referrer_domain__source_type: {dimensions: ["referrer_domain", "source_type"], from: "2012-10-01"},
        referrer_domain__search_terms: {dimensions: ["referrer_domain", "search_terms"], from: "2012-10-01"},
        referrer_domain__source_type__search_terms: {dimensions: ["referrer_domain", "source_type", "search_terms"], from: "2012-10-01"},
        source_type__search_terms: {dimensions: ["source_type", "search_terms"], from: "2012-10-01"},
        account__source_type: {dimensions: ["account", "source_type"], from: "2012-10-01"},
        account__search_terms: {dimensions: ["account", "search_terms"], from: "2012-10-01"},
        account__source_type__search_terms: {dimensions: ["account", "source_type", "search_terms"], from: "2012-10-01"},
        account__referrer_domain__source_type__search_terms: {dimensions: ["account", "referrer_domain", "source_type", "search_terms"], from: "2012-10-01"},
        video__referrer_domain: {dimensions: ["video", "referrer_domain"], from: "2012-10-01"},
        video__source_type: {dimensions: ["video", "source_type"], from: "2012-10-01"},
        video__search_terms: {dimensions: ["video", "search_terms"], from: "2012-10-01"},
        video__video__source_type__search_terms: {dimensions: ["video", "source_type", "search_terms"], from: "2012-10-01"},
        video__referrer_domain__source_type: {dimensions: ["video", "referrer_domain", "source_type"], from: "2012-10-01"},
        account__video__referrer_domain__source_type: {dimensions: ["account", "video", "referrer_domain", "source_type"], from: "2012-10-01"},
        player__referrer_domain: {dimensions: ["player", "referrer_domain"], from: "2012-10-01"},
        player__source_type: {dimensions: ["player", "source_type"], from: "2012-10-01"},
        player__search_terms: {dimensions: ["player", "search_terms"], from: "2012-10-01"},
        player__source_type__search_terms: {dimensions: ["player", "source_type", "search_terms"], from: "2012-10-01"},
        player__referrer_domain__source_type: {dimensions: ["player", "referrer_domain", "source_type"], from: "2012-10-01"},
        account__player__referrer_domain__source_type: {dimensions: ["account", "player", "referrer_domain", "source_type"], from: "2012-10-01"},
        account__destination_path: {dimensions: ["account", "destination_path"], from: "2014-03-03"},
        account__destination_domain: {dimensions: ["account", "destination_domain"], from: "2014-03-03"},
        account__destination_domain__destination_path: {dimensions: ["account", "destination_domain", "destination_path"], from: "2014-03-03"},
        player__destination_domain: {dimensions: ["player", "destination_domain"], from: "2014-03-03"},
        account__player__destination_domain: {dimensions: ["account", "player", "destination_domain"], from: "2014-03-03"},
        video__destination_domain: {dimensions: ["video", "destination_domain"], from: "2014-03-03"},
        account__video__destination_domain: {dimensions: ["account", "video", "destination_domain"], from: "2014-03-03"}
    }
};

/*
        account__device_os__country: {dimensions: ["account", "device_os", "country"], from: "2015-10-01"},
        account__device_os__region: {dimensions: ["account", "device_os", "region"], from: "2015-10-01"},
        account__device_os__country__region: {dimensions: ["account", "device_os", "country", "region"], from: "2015-10-01"},
        account__device_type__country: {dimensions: ["account", "device_type", "country"], from: "2015-10-01"},
        account__device_type__region: {dimensions: ["account", "device_type", "region"], from: "2015-10-01"},
        account__device_type__country__region: {dimensions: ["account", "device_type", "country", "region"], from: "2015-10-01"},
        account__device_os__device_type__country: {dimensions: ["account", "device_os", "device_type", "country"], from: "2015-10-01"},
        account__device_os__device_type__region: {dimensions: ["account", "device_os", "device_type", "region"], from: "2015-10-01"},
        account__device_os__device_type__country__region: {dimensions: ["account", "device_os", "device_type", "country", "region"], from: "2015-10-01"},
*/

