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
                fields: ["account", "account.name", "bytes_delivered", "engagement_score", "play_rate", "video", "video_duration", "video_engagement_1", "video_engagement_100", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_impression", "video_name", "video_percent_viewed", "video_seconds_viewed", "video_view", "video.reference_id", "video.name",],
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
            account_player: {dimensions: ["account", "player"], fields: [], from: '2011-01-01'},
            account_video: {dimensions: ["account", "video"], fields: [], from: '2011-01-01'},
            account_player_video: {dimensions: ["account", "player", "video"], fields: [], from: '2011-01-01'},
            player_video: {dimensions: ["player", "video"], fields: [], from: '2011-01-01'},
            account_traffic_sources: {dimensions: ["account", "referrer_domain", "source_type", "search_terms"], fields: [], from: '2012-01-01'},
            traffic_sources: {dimensions: ["referrer_domain", "source_type", "search_terms"], fields: [], from: '2012-01-01'},
            account_devices: {dimensions: ["account", "device_type", "device_os"], fields: [], from: '2011-01-01'},
            devices: {dimensions: ["device_type", "device_os"], fields: [], from: '2011-01-01'},
            account_player_devices: {dimensions: ["account", "player", "device_type", "device_os"], fields: [], from: '2011-01-01'},
            player_devices: {dimensions: ["player", "device_type", "device_os"], fields: [], from: '2011-01-01'},
            account_video_devices: {dimensions: ["account", "video", "device_type", "device_os"], fields: [], from: '2011-01-01'},
            video_devices: {dimensions: ["video", "device_type", "device_os"], fields: [], from: '2011-01-01'},
            account_geo: {dimensions: ["account", "country", "region", "city"], fields: [], from: '2011-01-01'},
            geo: {dimensions: [ "country", "region", "city"], fields: [], from: '2011-01-01'},
            account_player_country: {dimensions: ["account", "player", "country"], fields: [], from: '2011-01-01'},
            player_country: {dimensions: ["player", "country"], fields: [], from: '2011-01-01'},
            account_video_country: {dimensions: ["account", "video", "country"], fields: [], from: '2011-01-01'},
            video_country: {dimensions: ["video", "country"], fields: [], from: '2011-01-01'},
            account_destination: {dimensions: ["account", "destination_domain", "destination_path"], fields: []},
            destination: {dimensions: ["destination_domain", "destination_path"], fields: []},
            account_destination_domain: {dimensions: ["account", "destination_domain"], fields: []},
            account_destination_path: {dimensions: ["account", "destination_path"], fields: []},
            account_player_destination_domain: {dimensions: ["account", "player", "destination_domain"], fields: []},
            player_destination_domain: {dimensions: ["player", "destination_domain"], fields: []},
            account_video_destination_domain: {dimensions: ["account", "video", "destination_domain"], fields: []},
            video_destination_domain: {dimensions: ["video", "destination_domain"], fields: []}
        }
    };
