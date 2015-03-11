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
                fields: ["account", "active_media", "bytes_delivered", "daily_unique_viewers", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["a single account id"]
            },
            {
                name: "video",
                fields: ["account", "bytes_delivered", "engagement_score", "play_rate", "video", "video_duration", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.reference_id", "video.tags"],
                filter_values: ["video ids as a comma-delimited list or video.q=={video field}:{value}"]
            },
            {
                name: "player",
                fields: ["account", "bytes_delivered", "engagement_score", "play_rate", "player", "player_load", "player_name", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["player ids as a comma-delimited list"]
            },
            {
                name: "date",
                fields: ["active_media", "bytes_delivered", "daily_unique_viewers", "date", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["none"]
            },
            {
                name: "date_hour",
                fields: ["account", "active_media", "bytes_delivered", "daily_unique_viewers", "date_hour", "drm_bytes_packaged", "engagement_score", "licenses_served", "live_seconds_streamed", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["none"]
            },
            {
                name: "destination_domain",
                fields: ["account", "destination_domain", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["comma-delimited list of domains - e.g. brightcove.com"]
            },
            {
                name: "destination_path",
                fields: ["account", "destination_path", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["comma-delimited list of paths - e.g. /en/video-cloud/docs/editing-settings-players-plug-ins-tab"]
            },
            {
                name: "country",
                fields: ["account", "country", "country_name", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["comma-delimited list of ISO-3611-1 country codes - e.g.: KO,US"]
            },
            {
                name: "city",
                fields: ["account", "city", "dma", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["comma-delimited list of city names - e.g. Seattle,Boston"]
            },
            {
                name: "region",
                fields: ["account", "engagement_score", "play_rate", "player_load", "region", "region_name", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["comma-delimited list of the ISO-3611-2 region code - e.g. 'US-WA'"]
            },
            {
                name: "referrer_domain",
                fields: ["account", "engagement_score", "play_rate", "player_load", "referrer_domain", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["comma-delimited list of domains - e.g. brightcove.net"]
            },
            {
                name: "source_type",
                fields: ["account", "engagement_score", "play_rate", "player_load", "source_type", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["direct", "referral", "organic_search", "paid_search", "secure_search"]
            },
            {
                name: "search_terms",
                fields: ["account", "engagement_score", "play_rate", "player_load", "search_terms", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["comma-delimited list of search terms - e.g. players,videos"]
            },
            {
                name: "device_type",
                fields: ["account", "device_type", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
                filter_values: ["mobile", "tablet", "tv", "desktop", "other"]
            },
            {
                name: "device_os",
                fields: ["account", "device_os", "engagement_score", "play_rate", "player_load", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"],
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
            account_devices: {dimensions: ["account", "device_type", "device_os"], fields: []},
            account_player_devices: {dimensions: ["account", "player", "device_type", "device_os"], fields: []},
            account_video_devices: {dimensions: ["account", "video", "device_type", "device_os"], fields: []},
            account_geo: {dimensions: ["account", "country", "region", "city"], fields: []},
            account_destination: {dimensions: ["account", "destination_domain", "destination_path"], fields: []},
            account_destination_domain: {dimensions: ["account", "destination_domain"], fields: []},
            account_destination_path: {dimensions: ["account", "destination_path"], fields: []},
            account_player_destination_domain: {dimensions: ["account", "player", "destination_domain"], fields: []},
            account_video_destination_domain: {dimensions: ["account", "video", "destination_domain"], fields: []}
        }
    };
