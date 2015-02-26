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
                fields: ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "live_seconds_viewed", "video_view"],
                filter_values: ["account ids as a comma-delimited list"]
            },
            {
                name: "video",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "video", "video_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "bytes_delivered", "content_delivered"],
                filter_values: ["video ids as a comma-delimited list"]
            },
            {
                name: "player",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player", "player_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100"],
                filter_values: ["player ids as a comma-delimited list"]
            },
            {
                name: "date",
                fields: ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["none"]
            },
            {
                name: "date_hour",
                fields: ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["none"]
            },
            {
                name: "destination_domain",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "destination_domain"],
                filter_values: ["comma-delimited list of domains - e.g. brightcove.com"]
            },
            {
                name: "destination_path",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "destination_path"],
                filter_values: ["comma-delimited list of paths - e.g. /en/video-cloud/docs/editing-settings-players-plug-ins-tab"]
            },
            {
                name: "country",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "country", "country_name"],
                filter_values: ["comma-delimited list of ISO-3611-1 country codes - e.g.: KO,US"]
            },
            {
                name: "city",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "city"],
                filter_values: ["comma-delimited list of city names - e.g. Seattle,Boston"]
            },
            {
                name: "region",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "region"],
                filter_values: ["comma-delimited list of the ISO-3611-2 region code - e.g. 'US-WA'"]
            },
            {
                name: "referrer_domain",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "referrer_domain"],
                filter_values: ["comma-delimited list of domains - e.g. brightcove.net"]
            },
            {
                name: "source_type",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "source_type"],
                filter_values: ["direct", "referral", "organic_search", "paid_search", "secure_search"]
            },
            {
                name: "search_terms",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "search_terms"],
                filter_values: ["comma-delimited list of search terms - e.g. players,videos"]
            },
            {
                name: "device_type",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "device_type"],
                filter_values: ["mobile", "tablet", "tv", "desktop", "other"]
            },
            {
                name: "device_os",
                fields: ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "device_os"],
                filter_values: ["android", "bada", "ios", "rim", "symbian", "web_os", "windows", "os_x", "mac", "linux", "other"]
            }
        ],
        filters: ["video", "player", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
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
