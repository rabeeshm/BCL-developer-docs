var aapi_model = {
    baseURL: 'https://analytics.api.brightcove.com/v1',
    endpointGroups: [{
        name: 'report',
        endpoints: [{
            name: 'Report',
            path: '/data',
            methods: ['GET']
        }]
    }, {
        name: 'engagement',
        endpoints: [{
            name: 'Account engagement',
            path: '/accounts/{account_id}',
            methods: ['GET']
        }, {
            name: 'Player engagement',
            path: '/accounts/{account_id}/players/{player_id}',
            methods: ['GET']
        }, {
            name: 'Video engagement',
            path: '/accounts/{account_id}/videos/{video_id}',
            methods: ['GET']
        }]
    }],
    dimensions: [{
        name: 'account',
        fields: ['account', 'account.name', 'active_media', 'bytes_delivered', 'daily_unique_viewers', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['a single account id']
    }, {
        name: 'city',
        fields: ['city', 'dma', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['comma-delimited list of city names - e.g. Seattle,Boston']
    }, {
        name: 'country',
        fields: ['country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['comma-delimited list of ISO-3611-1 country codes - e.g.: KO,US']
    }, {
        name: 'date',
        fields: ['active_media', 'bytes_delivered', 'daily_unique_viewers', 'date', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['none']
    }, {
        name: 'date_hour',
        fields: ['active_media', 'bytes_delivered', 'daily_unique_viewers', 'date_hour', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['none']
    }, {
        name: 'destination_domain',
        fields: ['destination_domain', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['comma-delimited list of domains - e.g. brightcove.com']
    }, {
        name: 'destination_path',
        fields: ['destination_path', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['comma-delimited list of paths - e.g. /en/video-cloud/docs/editing-settings-players-plug-ins-tab']
    }, {
        name: 'device_os',
        fields: ['device_os', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['android', 'bada', 'ios', 'rim', 'symbian', 'web_os', 'windows', 'os_x', 'mac', 'linux', 'other'],
    }, {
        name: 'device_type',
        fields: ['device_type', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['mobile', 'tablet', 'tv', 'desktop', 'other']
    }, {
        name: 'player',
        fields: ['bytes_delivered', 'engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['player ids as a comma-delimited list']
    }, {
        name: 'referrer_domain',
        fields: ['engagement_score', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['comma-delimited list of domains - e.g. brightcove.net']
    }, {
        name: 'region',
        fields: ['engagement_score', 'play_rate', 'player_load', 'region', 'region_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['comma-delimited list of the ISO-3611-2 region code - e.g. "US-WA"']
    }, {
        name: 'search_terms',
        fields: ['engagement_score', 'play_rate', 'player_load', 'search_terms', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['URI-encoded, comma-delimited list of search terms - e.g. players,videos']
    }, {
        name: 'source_type',
        fields: ['engagement_score', 'play_rate', 'player_load', 'source_type', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
        filter_values: ['direct', 'referral', 'organic_search', 'paid_search', 'secure_search']
    }, {
        name: 'video',
        fields: ['bytes_delivered', 'engagement_score', 'play_rate', 'video', 'video_duration', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.reference_id', 'video.name'],
        filter_values: ['video ids as a comma-delimited list or video.q=={video field}:{value}']
    }],
    filters: ['video', 'video.q', 'player', 'destination_domain', 'destination_path', 'country', 'city', 'region', 'referrer_domain', 'source_type', 'search_terms', 'device_type', 'device_os'],
    params: [{
        name: 'account',
        required: true,
        description: 'The accounts you want to report on',
        values: 'one or more account ids as a comma-delimited list',
        default: 'none'
    }, {
        name: 'dimensions',
        required: true,
        description: 'The dimension(s) to report on',
        values: 'one or more dimensions as a comma-delimited list (some combinations are not valid)',
        default: 'none'
    }, {
        name: 'where',
        required: false,
        description: 'Used to specify filters for reports',
        values: '{dimension}=={value} - one or more as a semi-colon-delimited list',
        default: 'none'
    }, {
        name: 'limit',
        required: false,
        description: 'Number of items to return',
        values: 'positive integer',
        default: 10
    }, {
        name: 'offset',
        required: false,
        description: 'Number of items to skip',
        values: 'positive integer',
        default: 0
    }, {
        name: 'sort',
        required: false,
        description: 'Field to sort items on',
        values: 'a valid field for the request',
        default: 'video_view'
    }, {
        name: 'fields',
        required: false,
        description: 'Fields to return',
        values: 'varies according to the dimension you are reporting on',
        default: 'video_view'
    }, {
        name: 'reconciled',
        required: false,
        description: 'If included, will limit results to either historical or realtime data',
        values: 'true | false',
        default: 'none'
    }, {
        name: 'from',
        required: false,
        description: 'The beginning of the date range for the request',
        values: 'an ISO 8601 date (MM-DD-YYYY) or epoch time in milliseconds',
        default: '30 days prior to now'
    }, {
        name: 'to',
        required: false,
        description: 'The end of the date range for the request',
        values: 'an ISO 8601 date (MM-DD-YYYY) or epoch time in milliseconds',
        default: 'now'
    }],
    combinations: {
        account: {
            dimensions: ['account'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'active_media', 'bytes_delivered', 'daily_unique_viewers', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['a single account id'],
            incompatible_dimensions: ['date', 'date_hour']
        },
        city: {
            dimensions: ['city'],
            from: '2011-01-01',
            fields: ['city', 'dma', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of city names - e.g. Seattle,Boston'],
            incompatible_dimensions: ['date', 'date_hour']
        },
        country: {
            dimensions: ['country'],
            from: '2011-01-01',
            fields: ['country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of ISO-3611-1 country codes - e.g.: KO,US'],
            incompatible_dimensions: ['date', 'date_hour']
        },
        date: {
            dimensions: ['date'],
            from: '2011-01-01',
            fields: ['active_media', 'bytes_delivered', 'daily_unique_viewers', 'date', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['none'],
            incompatible_dimensions: ['account', 'city', 'country', 'destination_domain', 'destination_path', 'device_os', 'device_type', 'player', 'referrer_domain', 'region', 'search_terms', 'source_type', 'video']
        },
        date_hour: {
            dimensions: ['date_hour'],
            from: '2011-01-01',
            fields: ['active_media', 'bytes_delivered', 'daily_unique_viewers', 'date_hour', 'drm_bytes_packaged', 'engagement_score', 'licenses_served', 'live_seconds_streamed', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['none'],
            incompatible_dimensions: ['account', 'city', 'country', 'destination_domain', 'destination_path', 'device_os', 'device_type', 'player', 'referrer_domain', 'region', 'search_terms', 'source_type', 'video']
        },
        destination_domain: {
            dimensions: ['destination_domain'],
            from: '2011-01-01',
            fields: ['destination_domain', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of domains - e.g. brightcove.com'],
            incompatible_dimensions: ['city', 'country','date', 'date_hour', 'device_os', 'device_type', 'referrer_domain', 'region', 'search_terms', 'source_type']
        },
        destination_path: {
            dimensions: ['destination_path'],
            from: '2011-01-01',
            fields: ['destination_path', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of paths - e.g. /en/video-cloud/docs/editing-settings-players-plug-ins-tab'],
            incompatible_dimensions: ['city', 'country', 'date', 'date_hour', 'device_os', 'device_type', 'player', 'referrer_domain', 'region', 'search_terms', 'source_type', 'video']
        },
        device_os: {
            dimensions: ['device_os'],
            from: '2011-01-01',
            fields: ['device_os', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['android', 'bada', 'ios', 'rim', 'symbian', 'web_os', 'windows', 'os_x', 'mac', 'linux', 'other'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_domain', 'destination_path', 'referrer_domain', 'search_terms', 'source_type']
        },
        device_type: {
            dimensions: ['device_type'],
            from: '2011-01-01',
            fields: ['device_type', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['mobile', 'tablet', 'tv', 'desktop', 'other'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_domain', 'destination_path', 'referrer_domain', 'search_terms', 'source_type']
        },
        player: {
            dimensions: ['player'],
            from: '2011-01-01',
            fields: ['bytes_delivered', 'engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['player ids as a comma-delimited list'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_path', 'region', 'search_terms']
        },
        referrer_domain: {
            dimensions: ['referrer_domain'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            incompatible_dimensions: ['city', 'country', 'date', 'date_hour', 'device_os', 'device_type', 'region']
        },
        region: {
            dimensions: ['region'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'region', 'region_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['comma-delimited list of the ISO-3611-2 region code - e.g. "US-WA"'],
            incompatible_dimensions: ['date', 'date_hour', 'destination_path', 'player', 'referrer_domain', 'search_terms']
        },
        source_type: {
            dimensions: ['source_type'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'source_type', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['direct', 'referral', 'organic_search', 'paid_search', 'secure_search'],
            incompatible_dimensions: ['date', 'date_hour', 'destination_domain', 'destination_path', 'device_os', 'device_type']
        },
        search_terms: {
            dimensions: ['search_terms'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'search_terms', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view'],
            filter_values: ['URI-encoded, comma-delimited list of search terms - e.g. players,videos'],
            incompatible_dimensions: ['date', 'date_hour', 'destination_domain', 'destination_path', 'device_os', 'device_type', 'video']

        },
        video: {
            dimensions: ['video'],
            from: '2011-01-01',
            fields: ['bytes_delivered', 'engagement_score', 'play_rate', 'video', 'video_duration', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.reference_id', 'video.name'],
            filter_values: ['video ids as a comma-delimited list or video.q=={video field}:{value}'],
            incompatible_dimensions: ['city', 'date', 'date_hour', 'destination_path', 'region', 'search_terms']
        },
        account__video: {
            dimensions: ['account', 'video'],
            from: '2011-01-01',
            fields: ['account.name', 'engagement_score', 'play_rate', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video', 'video_duration', 'video_name', 'video.reference_id']
        },
        account__player: {
            dimensions: ['account', 'player'],
            from: '2011-01-01',
            fields: ['account.name', 'engagement_score', 'play_rate', 'player_load', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name']
        },
        account__player__video: {
            dimensions: ['account', 'video', 'player'],
            from: '2011-01-01',
            fields: ['account', 'play_rate', 'video_engagement_1', 'video_engagement_100', 'video_engagement_25', 'video_engagement_50', 'video_engagement_75', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name', 'video', 'video_duration', 'video_name']
        },
        player__video: {
            dimensions: ['video', 'player'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name']
        },
        account__country: {
            dimensions: ['account', 'country'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name']
        },
        account__region: {
            dimensions: ['account', 'region'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'region', 'region_name']
        },
        account__city: {
            dimensions: ['account', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma']
        },
        account__country__region: {
            dimensions: ['account', 'country', 'region'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'region', 'region_name']
        },
        country__region: {
            dimensions: ['account', 'country', 'region'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'region', 'region_name']
        },
        account__city__country: {
            dimensions: ['account', 'country', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'region', 'region_name']
        },
        account__city__region: {
            dimensions: ['account', 'region', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'region', 'region_name']
        },
        city__country: {
            dimensions: ['city', 'country'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'country', 'country_name']
        },
        city__region: {
            dimensions: ['region', 'city'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'region', 'region_name']
        },
        account__city__country__region: {
            dimensions: ['account', 'country', 'region', 'city'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'city', 'dma', 'country', 'country_name', 'region', 'region_name']
        },
        account__country__video: {
            dimensions: ['account', 'video', 'country'],
            from: '2011-01-01',
            fields: ['account', 'engagement_score', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'video', 'video_duration', 'video_name']
        },
        country__video: {
            dimensions: ['video', 'country'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name']
        },
        account__country__player: {
            dimensions: ['account', 'player', 'country'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'player', 'player_name']
        },
        country__player: {
            dimensions: ['player', 'country'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name']
        },
        account__device_os: {
            dimensions: ['account', 'device_os'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os']
        },
        account__device_type: {
            dimensions: ['account', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type']
        },
        account__device_os__device_type: {
            dimensions: ['account', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type']
        },
        device_os__device_type: {
            dimensions: ['account', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type']
        },
        account__device_os__video: {
            dimensions: ['account', 'video', 'device_os'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'video', 'video_duration', 'video_name']
        },
        account__device_type__video: {
            dimensions: ['account', 'video', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'video', 'video_duration', 'video_name']
        },
        device_os__video: {
            dimensions: ['video', 'device_os'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.reference_id', 'video.name', 'device_os']
        },
        device_type__video: {
            dimensions: ['video', 'device_type'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.reference_id', 'video.name', 'device_type']
        },
        account__device_os__device_type__video: {
            dimensions: ['account', 'video', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'video', 'video_duration', 'video_name']
        },
        account__device_os__player: {
            dimensions: ['account', 'player', 'device_os'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'player', 'player_name']
        },
        device_os__player: {
            dimensions: ['player', 'device_os'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os']
        },
        account__device_type__player: {
            dimensions: ['account', 'player', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'player', 'player_name']
        },
        device_type__player: {
            dimensions: ['player', 'device_type'],
            from: '2011-01-01',
            fields: ['engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type']
        },
        account__device_os__device_type__player: {
            dimensions: ['account', 'player', 'device_os', 'device_type'],
            from: '2011-01-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'player', 'player_name']
        },
        account__referrer_domain: {
            dimensions: ['account', 'referrer_domain'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain']
        },
        referrer_domain__source_type: {
            dimensions: ['referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        account__referrer_domain__source_type: {
            dimensions: ['account','referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name','engagement_score', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        referrer_domain__search_terms: {
            dimensions: ['referrer_domain', 'search_terms'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms']
        },
        account__referrer_domain__search_terms: {
            dimensions: ['account','referrer_domain', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name','engagement_score', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms']
        },
        referrer_domain__search_terms__source_type: {
            dimensions: ['referrer_domain', 'source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms', 'source_type']
        },
        search_terms__source_type: {
            dimensions: ['source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player_load', 'search_terms', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        account__source_type: {
            dimensions: ['account', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        account__search_terms: {
            dimensions: ['account', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms']
        },
        account__search_terms__source_type: {
            dimensions: ['account', 'source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'engagement_score', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'search_terms', 'source_type']
        },
        account__referrer_domain__search_terms__source_type: {
            dimensions: ['account', 'referrer_domain', 'source_type', 'search_terms'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain', 'search_terms', 'source_type']
        },
        referrer_domain__video: {
            dimensions: ['video', 'referrer_domain'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.name', 'referrer_domain']
        },
        source_type__video: {
            dimensions: ['video', 'source_type'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'video', 'video_duration', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'video.name', 'source_type']
        },
        referrer_domain__source_type__video: {
            dimensions: ['video', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'referrer_domain', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type', 'video', 'video_duration', 'video_name']
        },
        account__referrer_domain__source_type__video: {
            dimensions: ['account', 'video', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain', 'source_type', 'video', 'video_duration', 'video_name']
        },
        player__referrer_domain: {
            dimensions: ['player', 'referrer_domain'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain']
        },
        player__source_type: {
            dimensions: ['player', 'source_type'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'source_type']
        },
        player__referrer_domain__source_type: {
            dimensions: ['player', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'referrer_domain', 'source_type']
        },
        account__player__referrer_domain__source_type: {
            dimensions: ['account', 'player', 'referrer_domain', 'source_type'],
            from: '2012-10-01',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'player', 'player_name', 'referrer_domain', 'source_type']
        },
        account__country__device_os: {
            dimensions: ['account', 'device_os', 'country'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os']
        },
        account__device_os__region: {
            dimensions: ['account', 'device_os', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'region', 'region_name']
        },
        account__country__device_os__region: {
            dimensions: ['account', 'device_os', 'country', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os', 'region', 'region_name']
        },
        account__country__device_type: {
            dimensions: ['account', 'device_type', 'country'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_type']
        },
        account__device_type__region: {
            dimensions: ['account', 'device_type', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'region', 'region_name']
        },
        account__country__device_type__region: {
            dimensions: ['account', 'device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_type', 'region', 'region_name']
        },
        account__country__device_os__device_type: {
            dimensions: ['account', 'device_os', 'device_type', 'country'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os', 'device_type']
        },
        account__device_os__device_type__region: {
            dimensions: ['account', 'device_os', 'device_type', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'region', 'region_name']
        },
        account__country__device_os__device_type__region: {
            dimensions: ['account', 'device_os', 'device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'country', 'country_name', 'device_os', 'device_type', 'region', 'region_name']
        },
        country__device_os: {
            dimensions: ['device_os', 'country'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os']
        },
        device_os__region: {
            dimensions: ['device_os', 'region'],
            from: '2015-10-19',
            fields: ['account.name', 'device_os', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'region', 'region_name']
        },
        country__device_os__region: {
            dimensions: ['device_os', 'country', 'region'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'region', 'region_name']
        },
        country__device_type: {
            dimensions: ['device_type', 'country'],
            from: '2015-10-19',
            fields: ['account.name', 'country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type']
        },
        device_type__region: {
            dimensions: ['device_type', 'region'],
            from: '2015-10-19',
            fields: ['device_type', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'region', 'region_name']
        },
        country__device_type__region: {
            dimensions: ['device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'region', 'region_name']
        },
        country__device_os__device_type: {
            dimensions: ['device_os', 'device_type', 'country'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type']
        },
        device_os__device_type__region: {
            dimensions: ['device_os', 'device_type', 'region'],
            from: '2015-10-19',
            fields: ['device_os', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_type', 'region', 'region_name']
        },
        country__device_os__device_type__region: {
            dimensions: ['device_os', 'device_type', 'country', 'region'],
            from: '2015-10-19',
            fields: ['country', 'country_name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'device_os', 'device_type', 'region', 'region_name']
        },
        account__destination_path: {
            dimensions: ['account', 'destination_path'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_path']
        },
        account__destination_domain: {
            dimensions: ['account', 'destination_domain'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain']
        },
        account__destination_domain__destination_path: {
            dimensions: ['account', 'destination_domain', 'destination_path'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'destination_path']
        },
        destination_domain__destination_path: {
            dimensions: ['account', 'destination_domain', 'destination_path'],
            from: '2014-03-03',
            fields: ['engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'destination_path']
        },
        destination_domain__player: {
            dimensions: ['player', 'destination_domain'],
            from: '2014-03-03',
            fields: ['bytes_delivered', 'engagement_score', 'play_rate', 'player', 'player_load', 'player_name', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain']
        },
        account__destination_domain__player: {
            dimensions: ['account', 'player', 'destination_domain'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'player_load', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'player', 'player_name']
        },
        destination_domain__video: {
            dimensions: ['video', 'destination_domain'],
            from: '2014-03-03',
            fields: ['engagement_score', 'play_rate', 'video', 'video_duration', 'video_impression', 'video_name', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain',]
        },
        account__destination_domain__video: {
            dimensions: ['account', 'video', 'destination_domain'],
            from: '2014-03-03',
            fields: ['account', 'account.name', 'engagement_score', 'play_rate', 'video_impression', 'video_percent_viewed', 'video_seconds_viewed', 'video_view', 'destination_domain', 'video', 'video_duration', 'video_name']
        }
    }
};
