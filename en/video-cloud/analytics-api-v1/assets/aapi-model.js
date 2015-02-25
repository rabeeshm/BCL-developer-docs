var aapi_model = {
    dimensions: ["account", "video", "player", "date", "date_hour", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
    filters: ["video", "player", "day", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
    account: {},
    date: {},
    date_hour: {},
    video: {},
    player: {},
    country: {},
    city: {},
    region: {},
    destination_domain: {},
    destination_path: {},
    referrer_domain: {},
    source_type: {},
    search_terms: {},
    device_type: {},
    device_os: {},
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

// dimension fields arrays
aapi_model.account.fields = ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "live_seconds_viewed", "video_view"];
aapi_model.date.fields = ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"];
aapi_model.date_hour.fields = ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"];
aapi_model.video.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "video", "video_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "bytes_delivered", "content_delivered"];
aapi_model.player.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player", "player_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100"];
aapi_model.country.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "country", "country_name"];
aapi_model.city.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "city"];
aapi_model.region.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "region"];
aapi_model.destination_domain.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "destination_domain"];
aapi_model.destination_path.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "destination_path"];
aapi_model.referrer_domain.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "referrer_domain"];
aapi_model.source_type.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "source_type"];
aapi_model.search_terms.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "search_terms"];
aapi_model.device_type.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "device_type"];
aapi_model.device_os.fields = ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed", "player_load", "device_os"];

// generate
