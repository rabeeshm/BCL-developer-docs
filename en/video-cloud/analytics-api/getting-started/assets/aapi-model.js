var aapi_model =  {
        dimensions : ["account", "video", "player", "day", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
        filters : ["video", "player", "day", "destination_domain", "destination_path", "country", "city", "region", "referrer_domain", "source_type", "search_terms", "device_type", "device_os"],
        baseFields : {items : ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed"]},
        accountFields : {items : ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "live_seconds_viewed", "video_view"]},
        videoFields : {items : this.baseFields.items.concat(["video", "video_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "bytes_delivered", "content_delivered"])},
        playerFields : {items : this.baseFields.items.concat(["player", "player_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100"])},
        dayFields : {items : ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"]},
        countryFields : {items : this.baseFields.items.concat(["country", "country_name"])},
        cityFields : {items : this.baseFields.items.concat(["city"])},
        regionFields : {items : this.baseFields.items.concat(["region"])},
        destination_domainFields : {items : this.baseFields.items.concat(["destination_domain"])},
        destination_pathFields : {items : this.baseFields.items.concat(["destination_path"])},
        referrer_domainFields : {items : this.baseFields.items.concat(["player_load", "referrer_domain"])},
        source_typeFields : {items : this.baseFields.items.concat(["player_load", "source_type"])},
        search_termsFields : {items : this.baseFields.items.concat(["player_load", "search_terms"])},
        device_typeFields : {items : this.baseFields.items.concat(["player_load", "device_type"])},
        device_osFields : {items : this.baseFields.items.concat(["player_load", "device_os"])},
        dimensionCombinations : {
            account_player : {
                dimensions : ["account", "player"],
                shard_fields : ["account", "player"],
                top_n_key_fields : ["account"]
            },
            account_video : {
                dimensions : ["account", "video"],
                shard_fields : ["account", "video"],
                top_n_key_fields : ["account"]
            },
            account_player_video : {
                dimensions : ["account", "player", "video"],
                shard_fields : ["account", "player", "video"],
                top_n_key_fields : ["account"]
            },
            account_traffic_sources : {
                dimensions : ["account", "referrer_domain", "source_type", "search_terms"],
                shard_fields : ["account"],
                add_uk_fields : "true",
                top_n_key_fields : ["account"]
            },
            account_player_traffic_sources : {
                dimensions : ["account", "player", "referrer_domain", "source_type", "search_terms"],
                shard_fields : ["account", "player"],
                add_uk_fields : "true",
                top_n_key_fields : ["account", "player"]
            },
            account_video_traffic_sources : {
                dimensions : ["account", "video", "referrer_domain", "source_type", "search_terms"],
                shard_fields : ["account", "video"],
                add_uk_fields : "true",
                top_n_key_fields : ["account", "video"]
            },
            account_devices : {
                dimensions : ["account", "device_type", "device_os"],
                shard_fields : ["account", "device_type", "device_os"],
                top_n_key_fields : ["account"]
            },
            account_player_devices : {
                dimensions : ["account", "player", "device_type", "device_os"],
                shard_fields : ["account", "player", "device_type", "device_os"],
                top_n_key_fields : ["account", "player"]
            },
            account_video_devices : {
                dimensions : ["account", "video", "device_type", "device_os"],
                shard_fields : ["account", "video", "device_type", "device_os"],
                top_n_key_fields : ["account", "video"]
            },
            account_geo : {
                dimensions : ["account", "country", "region", "city"],
                shard_fields : ["account", "country", "region", "city"],
                top_n_key_fields : ["account"]
            },
            account_player_geo : {
                dimensions : ["account", "player", "country", "region", "city"],
                shard_fields : ["account", "player", "country", "region", "city"],
                top_n_key_fields : ["account", "player"]
            },
            account_video_geo : {
                dimensions : ["account", "video", "country", "region", "city"],
                shard_fields : ["account", "video", "country", "region", "city"],
                top_n_key_fields : ["account", "video"]
            },
            account_destination : {
                dimensions : ["account", "destination_domain", "destination_path"],
                shard_fields : ["account", "destination_domain", "destination_path"],
                top_n_key_fields : ["account"]
            },
            account_player_destination : {
                dimensions : ["account", "player", "destination_domain", "destination_path"],
                shard_fields : ["account", "player", "destination_domain", "destination_path"],
                top_n_key_fields : ["account", "player"]
            },
            account_video_destination : {
                dimensions : ["account", "video", "destination_domain", "destination_path"],
                shard_fields : ["account", "video", "destination_domain", "destination_path"],
                top_n_key_fields : ["account", "video"]
            }
        }
    };