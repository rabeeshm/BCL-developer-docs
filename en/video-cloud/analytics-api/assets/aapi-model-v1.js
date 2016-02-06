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
            fields: ["account.name", "bytes_delivered", "engagement_score", "play_rate", "video", "video_duration", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.reference_id", "video.name"],
            filter_values: ["video ids as a comma-delimited list or video.q=={video field}:{value}"]
        },
        {
            name: "player",
            fields: ["account.name", "bytes_delivered", "engagement_score", "play_rate", "player", "player_load", "player_name", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["player ids as a comma-delimited list"]
        },
        {
            name: "date",
            fields: ["active_media", "bytes_delivered", "daily_unique_viewers", "date", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["none"]
        },
        {
            name: "date_hour",
            fields: ["account.name", "active_media", "bytes_delivered", "daily_unique_viewers", "date_hour", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["none"]
        },
        {
            name: "destination_domain",
            fields: ["account.name", "destination_domain", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of domains - e.g. brightcove.com"]
        },
        {
            name: "destination_path",
            fields: ["account.name", "destination_path", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of paths - e.g. /en/video-cloud/docs/editing-settings-players-plug-ins-tab"]
        },
        {
            name: "country",
            fields: ["account.name", "country", "country_name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of ISO-3611-1 country codes - e.g.: KO,US"]
        },
        {
            name: "city",
            fields: ["account.name", "city", "dma", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of city names - e.g. Seattle,Boston"]
        },
        {
            name: "region",
            fields: ["account.name", "engagement_score", "play_rate", "player_load", "region", "region_name", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of the ISO-3611-2 region code - e.g. 'US-WA'"]
        },
        {
            name: "referrer_domain",
            fields: ["engagement_score", "play_rate", "player_load", "referrer_domain", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of domains - e.g. brightcove.net"]
        },
        {
            name: "source_type",
            fields: ["account.name", "engagement_score", "play_rate", "player_load", "source_type", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["direct", "referral", "organic_search", "paid_search", "secure_search"]
        },
        {
            name: "search_terms",
            fields: ["account.name", "engagement_score", "play_rate", "player_load", "search_terms", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["comma-delimited list of search terms - e.g. players,videos"]
        },
        {
            name: "device_type",
            fields: ["account.name", "device_type", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
            filter_values: ["mobile", "tablet", "tv", "desktop", "other"]
        },
        {
            name: "device_os",
            fields: ["account.name", "device_os", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
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
        account: {dimensions: ["account"], from: "2011-01-01", fields: []},
        account__video: {dimensions: ["account", "video"], from: "2011-01-01", fields: ["account.name", "engagement_score", "play_rate", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "video", "video_duration", "video_name", "video.reference_id"]},
        account__player: {dimensions: ["account", "player"], from: "2011-01-01", fields: ["account.name", "engagement_score", "play_rate", "player_load", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "player", "player_name"]},
        account__video__player: {dimensions: ["account", "video", "player"], from: "2011-01-01", fields: []},
        video__player: {dimensions: ["video", "player"], from: "2011-01-01", fields: ["account.name", "engagement_score", "play_rate", "video", "video_duration", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "player", "player_name"]},
        account__country: {dimensions: ["account", "country"], from: "2011-01-01", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_percent_viewed", "video_seconds_viewed", "video_view", "country", "country_name"]},
        account__region: {dimensions: ["account", "region"], from: "2011-01-01", fields: ["account", "account.name", "engagement_score", "play_rate", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "region", "region_name"]},
        account__city: {dimensions: ["account", "city"], from: "2011-01-01", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "city", "dma"]},
        account__country__region: {dimensions: ["account", "country", "region"], from: "2011-01-01", fields: []},
        account__country__city: {dimensions: ["account", "country", "city"], from: "2011-01-01", fields: []},
        account__region__city: {dimensions: ["account", "region", "city"], from: "2011-01-01", fields: []},
        account__country__region_city: {dimensions: ["account", "country", "region", "city"], from: "2011-01-01", fields: []},
        account__video__country: {dimensions: ["account", "video", "country"], from: "2011-01-01", fields: []},
        video__country: {dimensions: ["video", "country"], from: "2011-01-01", fields: []},        account__player__country: {dimensions: ["account", "player", "country"], from: "2011-01-01", fields: ["account.name", "engagement_score", "play_rate", "video", "video_duration", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "country", "country_name"]},
        account__device_os: {dimensions: ["account", "device_os"], from: "2011-01-01", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "device_os"]},
        account__device_type: {dimensions: ["account", "device_type"], from: "2011-01-01", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "device_type"]},
        account__device_os__device_type: {dimensions: ["account", "device_os", "device_type"], from: "2011-01-01", fields: []},
        account__video__device_os: {dimensions: ["account", "video", "device_os"], from: "2011-01-01", fields: []},
        account__video__device_type: {dimensions: ["account", "video", "device_type"], from: "2011-01-01", fields: []},
        video__device_os: {dimensions: ["video", "device_os"], from: "2011-01-01", fields: ["account.name", "engagement_score", "play_rate", "video", "video_duration", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.reference_id", "video.name", "device_os"]},
        video__device_type: {dimensions: ["video", "device_type"], from: "2011-01-01", fields: ["account.name", "engagement_score", "play_rate", "video", "video_duration", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.reference_id", "video.name", "device_type"]},
        account__video__device_os__device_type: {dimensions: ["account", "video", "device_os", "device_type"], from: "2011-01-01", fields: []},
        account__player__device_os: {dimensions: ["account", "player", "device_os"], from: "2011-01-01", fields: []},
        account__player__device_type: {dimensions: ["account", "player", "device_type"], from: "2011-01-01", fields: []},
        account__player__device_os__device_type: {dimensions: ["account", "player", "device_os", "device_type"], from: "2011-01-01", fields: []},
        account__referrer_domain: {dimensions: ["account", "referrer_domain"], from: "2012-10-01", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "referrer_domain"]},
        source_type: {dimensions: ["source_type"], from: "2012-10-01", fields: []},
        search_terms: {dimensions: ["search_terms"], from: "2012-10-01", fields: []},
        referrer_domain: {dimensions: ["referrer_domain"], from: "2012-10-01", fields: []},
        referrer_domain__source_type: {dimensions: ["referrer_domain", "source_type"], from: "2012-10-01", fields: []},
        referrer_domain__search_terms: {dimensions: ["referrer_domain", "search_terms"], from: "2012-10-01", fields: []},
        referrer_domain__source_type__search_terms: {dimensions: ["referrer_domain", "source_type", "search_terms"], from: "2012-10-01", fields: []},
        source_type__search_terms: {dimensions: ["source_type", "search_terms"], from: "2012-10-01", fields: []},
        account__source_type: {dimensions: ["account", "source_type"], from: "2012-10-01", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_percent_viewed", "video_seconds_viewed", "video_view", "source_type"]},
        account__search_terms: {dimensions: ["account", "search_terms"], from: "2012-10-01", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "search_terms"]},
        account__source_type__search_terms: {dimensions: ["account", "source_type", "search_terms"], from: "2012-10-01", fields: []},
        account__referrer_domain__source_type__search_terms: {dimensions: ["account", "referrer_domain", "source_type", "search_terms"], from: "2012-10-01", fields: []},
        video__referrer_domain: {dimensions: ["video", "referrer_domain"], from: "2012-10-01", fields: ["account.name", "engagement_score", "play_rate", "video", "video_duration", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.name", "referrer_domain"]},
        video__source_type: {dimensions: ["video", "source_type"], from: "2012-10-01", fields: ["account.name", "engagement_score", "play_rate", "video", "video_duration", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.name", "source_type"]},
        video__referrer_domain__source_type: {dimensions: ["video", "referrer_domain", "source_type"], from: "2012-10-01", fields: []},
        account__video__referrer_domain__source_type: {dimensions: ["account", "video", "referrer_domain", "source_type"], from: "2012-10-01", fields: []},
        player__referrer_domain: {dimensions: ["player", "referrer_domain"], from: "2012-10-01", fields: []},
        player__source_type: {dimensions: ["player", "source_type"], from: "2012-10-01", fields: []},
        player__referrer_domain__source_type: {dimensions: ["player", "referrer_domain", "source_type"], from: "2012-10-01", fields: []},
        account__player__referrer_domain__source_type: {dimensions: ["account", "player", "referrer_domain", "source_type"], from: "2012-10-01", fields: []},
        account__device_os__country: {dimensions: ["account", "device_os", "country"], from: "2015-10-19", fields: []},
        account__device_os__region: {dimensions: ["account", "device_os", "region"], from: "2015-10-19", fields: []},
        account__device_os__country__region: {dimensions: ["account", "device_os", "country", "region"], from: "2015-10-19", fields: []},
        account__device_type__country: {dimensions: ["account", "device_type", "country"], from: "2015-10-19", fields: []},
        account__device_type__region: {dimensions: ["account", "device_type", "region"], from: "2015-10-19", fields: []},
        account__device_type__country__region: {dimensions: ["account", "device_type", "country", "region"], from: "2015-10-19", fields: []},
        account__device_os__device_type__country: {dimensions: ["account", "device_os", "device_type", "country"], from: "2015-10-19", fields: []},
        account__device_os__device_type__region: {dimensions: ["account", "device_os", "device_type", "region"], from: "2015-10-19", fields: []},
        account__device_os__device_type__country__region: {dimensions: ["account", "device_os", "device_type", "country", "region"], from: "2015-10-19", fields: []},
        device_os__country: {dimensions: ["device_os", "country"], from: "2015-10-19", fields: []},
        device_os__region: {dimensions: ["device_os", "region"], from: "2015-10-19", fields: []},
        device_os__country__region: {dimensions: ["device_os", "country", "region"], from: "2015-10-19", fields: []},
        device_type__country: {dimensions: ["device_type", "country"], from: "2015-10-19", fields: []},
        device_type__region: {dimensions: ["device_type", "region"], from: "2015-10-19", fields: []},
        device_type__country__region: {dimensions: ["device_type", "country", "region"], from: "2015-10-19", fields: []},
        device_os__device_type__country: {dimensions: ["device_os", "device_type", "country"], from: "2015-10-19", fields: []},
        device_os__device_type__region: {dimensions: ["device_os", "device_type", "region"], from: "2015-10-19", fields: []},
        device_os__device_type__country__region: {dimensions: ["device_os", "device_type", "country", "region"], from: "2015-10-19", fields: []},
        account__destination_path: {dimensions: ["account", "destination_path"], from: "2014-03-03", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "destination_path"]},
        account__destination_domain: {dimensions: ["account", "destination_domain"], from: "2014-03-03", fields: ["account", "account.name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view", "destination_domain"]},
        account__destination_domain__destination_path: {dimensions: ["account", "destination_domain", "destination_path"], from: "2014-03-03", fields: []},
        player__destination_domain: {dimensions: ["player", "destination_domain"], from: "2014-03-03", fields: []},
        account__player__destination_domain: {dimensions: ["account", "player", "destination_domain"], from: "2014-03-03", fields: []},
        video__destination_domain: {dimensions: ["video", "destination_domain"], from: "2014-03-03", fields: ["account.name", "engagement_score", "play_rate", "video", "video_duration", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "destination_domain", "player_load"]},
        account__video__destination_domain: {dimensions: ["account", "video", "destination_domain"], from: "2014-03-03", fields: []}
    }
};
