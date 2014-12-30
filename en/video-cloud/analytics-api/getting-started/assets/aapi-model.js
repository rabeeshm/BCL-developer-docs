"resources": {
        "brightcove": {
            "historical_db_suffix": "hs",
            "collection_name":"",
            "dimensions": [],
            "shard_fields": []
        },
        "account": {
            "historical_db_suffix": "account_hs",
            "collection_name":"account",
            "dimensions": ["account"],
            "shard_fields": ["account"]
        },
        "account_player": {
            "historical_db_suffix": "player_hs",
            "collection_name":"account_player",
            "dimensions": ["account","player"],
            "shard_fields": ["account","player"],
            "top_n_key_fields": ["account"]

        },
        "account_video": {
            "historical_db_suffix": "video_hs",
            "collection_name":"account_video",
            "dimensions": ["account","video"],
            "shard_fields": ["account","video"],
            "top_n_key_fields": ["account"]

        },
        "account_player_video": {
            "historical_db_suffix": "player_video_hs",
            "collection_name":"account_player_video",
            "dimensions": ["account","player","video"],
            "shard_fields": ["account","player","video"],
            "top_n_key_fields": ["account"]

        },
        "account_traffic_sources": {
            "database_name_suffix": "ts2_account",
            "historical_db_suffix": "ts_account_hs",
            "collection_name":"account_traffic_sources",
            "dimensions": ["account", "referrer_domain", "source_type", "search_terms"],
            "shard_fields": ["account"],
            "add_uk_fields": "true",
            "top_n_key_fields": ["account"]

        },
        "account_player_traffic_sources": {
            "database_name_suffix": "ts2_player",
            "historical_db_suffix": "ts_player_hs",
            "collection_name":"account_player_traffic_sources",
            "dimensions": ["account", "player", "referrer_domain", "source_type", "search_terms"],
            "shard_fields": ["account","player"],
            "add_uk_fields": "true",
            "top_n_key_fields": ["account", "player"]

        },
        "account_video_traffic_sources": {
            "database_name_suffix": "ts2_video",
            "historical_db_suffix": "ts_video_hs",
            "collection_name":"account_video_traffic_sources",
            "dimensions": ["account", "video", "referrer_domain", "source_type", "search_terms"],
            "shard_fields": ["account", "video"],
            "add_uk_fields": "true",
            "top_n_key_fields": ["account", "video"]

        },
        "account_devices": {
            "database_name_suffix": "device_account",
            "historical_db_suffix": "device_account_hs",
            "collection_name":"account_devices",
            "dimensions": ["account", "device_type", "device_os"],
            "shard_fields": ["account", "device_type", "device_os"],
            "top_n_key_fields": ["account"]

        },
        "account_player_devices": {
            "database_name_suffix": "device_player",
            "historical_db_suffix": "device_player_hs",
            "collection_name":"account_player_devices",
            "dimensions": ["account", "player", "device_type", "device_os"],
            "shard_fields": ["account", "player", "device_type", "device_os"],
            "top_n_key_fields": ["account", "player"]

        },
        "account_video_devices": {
            "database_name_suffix": "device_video",
            "historical_db_suffix": "device_video_hs",
            "collection_name":"account_video_devices",
            "dimensions": ["account", "video", "device_type", "device_os"],
            "shard_fields": ["account", "video", "device_type", "device_os"],
            "top_n_key_fields": ["account", "video"]

        },
        "account_geo": {
            "database_name_suffix": "geo2",
            "historical_db_suffix": "geo_hs",
            "collection_name":"account_geo",
            "dimensions": ["account", "country", "region", "city"],
            "shard_fields": ["account", "country", "region", "city"],
            "top_n_key_fields": ["account"]

        },
        "account_player_geo": {
            "database_name_suffix": "geo2_player",
            "historical_db_suffix": "geo_player_hs",
            "collection_name":"account_player_geo",
            "dimensions": ["account", "player", "country", "region", "city"],
            "shard_fields": ["account", "player", "country", "region", "city"],
            "top_n_key_fields": ["account", "player"]

        },
        "account_video_geo": {
            "database_name_suffix": "geo2_video",
            "historical_db_suffix": "geo_video_hs",
            "collection_name":"account_video_geo",
            "dimensions": ["account", "video", "country", "region", "city"],
            "shard_fields": ["account", "video", "country", "region", "city"],
            "top_n_key_fields": ["account", "video"]

        },
        "account_destination": {
            "database_name_suffix": "destination",
            "historical_db_suffix": "destination_hs",
            "collection_name":"account_destination",
            "dimensions": ["account", "destination_domain", "destination_path"],
            "shard_fields": ["account", "destination_domain", "destination_path"],
            "top_n_key_fields": ["account"]

        },
        "account_player_destination": {
            "database_name_suffix": "destination_player",
            "historical_db_suffix": "destination_player_hs",
            "collection_name":"account_player_destination",
            "dimensions": ["account", "player", "destination_domain", "destination_path"],
            "shard_fields": ["account", "player", "destination_domain", "destination_path"],
            "top_n_key_fields": ["account", "player"]

        },
        "account_video_destination": {
            "database_name_suffix": "destination_video",
            "historical_db_suffix": "destination_video_hs",
            "collection_name":"account_video_destination",
            "dimensions": ["account", "video", "destination_domain", "destination_path"],
            "shard_fields": ["account", "video", "destination_domain", "destination_path"],
            "top_n_key_fields": ["account", "video"]

        },
        "feature": {
            "historical_db_suffix": "feature_hs",
            "collection_name":"feature",
            "dimensions": ["feature"],
            "shard_fields": ["feature"]
        },
        "account_feature": {
            "historical_db_suffix": "account_feature_hs",
            "collection_name":"account_feature",
            "dimensions": ["account","feature"],
            "shard_fields": ["account","feature"]
        },
        "account_log_source": {
            "historical_db_suffix": "account_log_source_hs",
            "collection_name": "account_log_source",
            "dimensions": ["account", "log_source_type", "log_source_bucket"],
            "shard_fields": ["account", "log_source_type", "log_source_bucket"]
        },
        "account_drm_type": {
            "historical_db_suffix": "account_drm_type_hs",
            "collection_name": "account_drm_type",
            "dimensions": ["account", "drm_type"],
            "shard_fields": ["account", "drm_type"]
        },
        "account_live_package_type": {
            "historical_db_suffix": "account_live_package_type_hs",
            "collection_name": "account_live_package_type",
            "dimensions": ["account", "live_package_type"],
            "shard_fields": ["account", "live_package_type"]
        }
    }