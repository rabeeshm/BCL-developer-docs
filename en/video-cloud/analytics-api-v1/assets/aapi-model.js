var aapi_model = {
        baseURL: "https://analytics.api.brightcove.com/v1",
        dimensions: ["account", "video", "player", "date", "date_hour", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
        filters: ["video", "player", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
        params: [
            {
                name: "dimensions",
                required: true,
                description: "the dimension(s) to report on",
                values: "one or more dimensions as a comma-delimited list (some combinations are not valid)",
                default: "none"
            },
            {
                name: "where",
                required: false,
                description: "used to specify filters for reports",
                values: "{dimension}=={value}",
                default: "none"
            },
            {
                name: "limit",
                required: false,
                description: "number of items to return",
                values: "positive integer",
                default: 10
            },
            {
                name: "offset",
                required: false,
                description: "number of items to skip",
                values: "positive integer",
                default: 0
            },
            {
                name: "sort",
                required: false,
                description: "field to sort items on",
                values: "a valid field for the request",
                default: "video_view"
            },
            {
                name: "fields",
                required: false,
                description: "fields to return",
                values: "varies according to the dimension you are reporting on",
                default: "video_view"
            },
            {
                name: "from",
                required: false,
                description: "the beginning of the date range for the request",
                values: "an ISO 8601 date (MM-DD-YYYY) or epoch time in milliseconds",
                default: "30 days prior to now"
            },
            {
                name: "to",
                required: false,
                description: "the end of the date range for the request",
                values: "an ISO 8601 date (MM-DD-YYYY) or epoch time in milliseconds",
                default: "now"
            }
        ],
        account: {
            fields: ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "live_seconds_viewed", "video_view"]
        },
        date: {
            fields: ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"]
        },
        date_hour: {
            fields: ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"]
        },
        video: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "video", "video_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "bytes_delivered", "content_delivered"]
        },
        player: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player", "player_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100"]
        },
        country: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "country", "country_name"]
        },
        city: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "city"]
        },
        region: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "region"]
        },
        destination_domain: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "destination_domain"]
        },
        destination_path: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "destination_path"]
        },
        referrer_domain: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "referrer_domain"]
        },
        source_type: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "source_type"]
        },
        search_terms: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "search_terms"]
        },
        device_type: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "device_type"]
        },
        device_os: {
            fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "device_os"]
        },
        combinations: {
            account_player: {dimensions: ["account", "player"], fields: []},
            account_video: {dimensions: ["account", "video"], fields: []},
            account_player_video: {dimensions: ["account", "player", "video"], fields: []},
            account_traffic_sources: {dimensions: ["account", "referrer_domain", "source_type", "search_terms"], fields: []},
            account_player_traffic_sources: {dimensions: ["account", "player", "referrer_domain", "source_type", "search_terms"], fields: []},
            account_video_traffic_sources: {dimensions: ["account", "video", "referrer_domain", "source_type", "search_terms"], fields: []},
            account_devices: {dimensions: ["account", "device_type", "device_os"], fields: []},
            account_player_devices: {dimensions: ["account", "player", "device_type", "device_os"], fields: []},
            account_video_devices: {dimensions: ["account", "video", "device_type", "device_os"], fields: []},
            account_geo: {dimensions: ["account", "country", "region", "city"], fields: []},
            account_player_geo: {dimensions: ["account", "player", "country", "region", "city"], fields: []},
            account_video_geo: {dimensions: ["account", "video", "country", "region", "city"], fields: []},
            account_destination: {dimensions: ["account", "destination_domain", "destination_path"], fields: []},
            account_player_destination: {dimensions: ["account", "player", "destination_domain", "destination_path"], fields: []},
            account_video_destination: {dimensions: ["account", "video", "destination_domain", "destination_path"], fields: []}
        }
    };
