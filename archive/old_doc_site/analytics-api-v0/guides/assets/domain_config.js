if (typeof module === 'object' && typeof define !== 'function') {
    var define = function (deps, factory) {
        module.exports = factory();
    };
}
define([], function() {
  function Utils(context) {
    this.context = context || {};
  }
  Utils.prototype.eachProperty = function(f) {
    for(var p in this.context) {
      if(this.context.hasOwnProperty(p) && !Utils.prototype.hasOwnProperty(p)) {
        f(p,this.context[p]);
      }
    }
  }
  Utils.prototype.mapProperties = function(f) {
    var result = [];
    this.eachProperty(function(name, value) {
      result.push(f(name,value))
    })
    return result;
  }
  Utils.prototype.to_a = function() {
    if(this.context.length !== undefined) {
      if(this.context instanceof String || typeof(this.context) == "string") {
        return [String(this.context)]
      } else {
        return Array.prototype.slice.call(this.context,0);
      }
    }
    return [this.context];
  }

  Array.prototype.flatten = function() {
    var result = [];
    this.forEach(function(el) {
      new Utils(el).to_a().forEach(function(ch) {
        result.push(ch);
      });
    });
    return result;
  }

  Array.prototype.unique = function() {
    var result = [];
    this.forEach(function(item) {
      if(-1 == result.indexOf(item)) {
        result.push(item)
      }
    })
    return result;
  }
  Array.prototype.contains = function() {
    var missed = 0;
    var flatArgs = new Utils(arguments).to_a().flatten()
    var _this = this;
    return flatArgs.every(function(arg){
      var index = _this.indexOf(arg);
      return _this.indexOf(arg) != -1;
    })
  }
  Array.prototype.remove = function() {
    var flatArgs = new Utils(arguments).to_a().flatten();
    var _this = this;
    flatArgs.forEach(function(arg){
      var index = _this.indexOf(arg);
      if(index != -1) {
        _this.splice(index,1);
      }
    })
    return _this;
  }



  function DomainConfig(config, externalMetadata) {
    var _this = this;
    this.config = config;
    this.externalMetadata = externalMetadata;

    function findMetrics(resourceName, resource) {
      var m = [];
      new Utils(config.events).eachProperty(function(eventName, event) {
        var include = -1 != (event.resources || []).indexOf(resourceName);
        if(include) {
          if(event.type == 'timeline') {
            [1,25,50,75,100].forEach(function(ile){
              m.push(eventName + "_" + ile);
            })
          } else {
            m.push(eventName);
          }
        }
        new Utils(event.rollupFields).eachProperty(function(rfName, field) {
          var resources = field.resources || event.resources || [];
          if(-1 != resources.indexOf(resourceName)) {
            m.push(rfName);
          }
        });
      });
      new Utils(config.derivedEvents).eachProperty(function(derivedName, derived) {
        if(m.contains(derived)) {
          m.push(derivedName)
        }
      })
      return m;
    }

    this.resources = new Utils(config.resources).mapProperties(function(resourceName, resource) {
      return {
        name:resourceName,
        dimensions:resource.dimensions,
        metrics:findMetrics(resourceName, resource)
      }
    });

    var metadata = {};
    new Utils(config.events).eachProperty(function(eventName, event) {
      new Utils(event.metadata).eachProperty(function(metaName, metaFields) {
        metadata[metaName] = metaFields;
      });
    });
    this.metadata = metadata

    this.dimensions = this.resources.map(function(r){return r.dimensions}).flatten().unique();

    this.metadataIndex = {};
    new Utils(this.metadata).eachProperty(function(dimField,metaFields) {
      metaFields.forEach(function(metaField) {
        _this.metadataIndex[metaField] = dimField;
      })
    })
    new Utils(this.externalMetadata).eachProperty(function(dimField, metaFields){
      // add external metadata to metadata model
      var m = _this.metadata[dimField] || [];
      _this.metadata[dimField] = m.concat(metaFields);
      // add external metadata to metadata index
      metaFields.forEach(function(metaField) {
        _this.metadataIndex[metaField] = dimField;
      })
    });
    this.dimensions.forEach(function(dimension){_this.metadataIndex[dimension]=dimension;});
  }

  DomainConfig.prototype.getDimensions = function() {
    var _this = this;
    return new Utils(arguments).to_a().flatten().map(function(field) {
      return _this.metadataIndex[field];
    }).unique();
  }

  DomainConfig.prototype.getMetadata = function() {
    var _this = this;
    return new Utils(arguments).to_a().flatten().map(function(dimension) {
      return _this.metadata[dimension] || []
    }).flatten();
  }

  DomainConfig.prototype.getContext = function() {
    var dims = this.getDimensions.apply(this,arguments);
    console.log(dims)
    var r = this.resources.filter(function(resource){
      var contains = resource.dimensions.contains(dims);
      return contains;
    });
    var selected = r.reduce(function(c,r){
      return r.dimensions.length >= c.dimensions.length ? c : r;
    })
    var d = r.map(function(r){return r.dimensions}).flatten().unique();
    var meta = new Utils(this.metadata).mapProperties(function(metaName,metaFields) {
      return selected.dimensions.contains(metaName) ? metaFields : [];
    }).flatten();
    return {resource:selected, metadata:meta, dimensions:d, metrics:selected.metrics}
  }

  DomainConfig.videocloud = {
      "migrationDate": "1357891200000",
      "domain": "videocloud",
      "eventLoggingEnabled": false,
      "indexedFields": ["player", "video", "country", "region", "city"],
      "skipAuthorization": false,
      "alltime": false,
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
      },
      "events": {
          "chimera_report": {
              "rollupFields": {
                  "active_media": {
                      "resources": [
                          "account"
                      ],
                      "type": "gauge"
                  },
                  "bytes_stored": {
                      "type": "gauge"
                  },
                  "bytes_player": {
                      "type": "aggregator"
                  }
              },
              "slot": {
                  "DAYS": 1
              },
              "type": "aggregator",
              "valid_log_sources": ["chimera_report"]
          },
          "content_delivered": {
              "metadata": {
                  "log_source_bucket": ["log_source_bucket_name"]
              },
              "rollupFields": {
                  "bytes_delivered": {
                      "resources": [
                          "brightcove",
                          "account",
                          "account_video",
                          "account_player",
                          "account_log_source"
                      ],
                      "type": "aggregator"
                  }
              },
              "slot": {
                  "DAYS": 1
              },
              "type": "aggregator",
              "valid_log_sources": ["akamai", "jstream", "limelight"]
          },
          "drm_license_served": {
              "rollupFields": {
                  "licenses_served": {
                      "resources": [
                          "brightcove",
                          "account",
                          "account_drm_type"
                      ],
                      "type:": "counter"
                  }
              },
              "slot": {
                  "DAYS": 1
              },
              "type": "counter",
              "valid_log_sources": ["drm_source"]
          },
          "drm_package_complete": {
              "rollupFields": {
                  "drm_bytes_packaged": {
                      "resources": [
                          "brightcove",
                          "account",
                          "account_drm_type"
                      ],
                      "type:": "aggregator"
                  }
              },
              "slot": {
                  "DAYS": 1
              },
              "type": "aggregator",
              "valid_log_sources": ["drm_source"]
          },
          "live_module": {
              "rollupFields": {
                  "live_seconds_streamed": {
                      "resources": [
                          "brightcove",
                          "account",
                          "account_live_package_type"
                      ],
                      "type:": "aggregator"
                  }
              },
              "slot": {
                  "DAYS": 1
              },
              "type": "aggregator",
              "valid_log_sources": ["live"]
          },
          "player_load": {
              "metadata": {
                  "player":  ["player_name"],
                  "country": ["country_name"],
                  "region":  ["region_name"],
                  "city":    ["dma"]
              },
              "resources": [
                  "brightcove",
                  "account",
                  "account_traffic_sources",
                  "account_devices",
                  "account_player",
                  "account_player_traffic_sources",
                  "account_player_devices",
                  "account_geo",
                  "account_player_geo",
                  "account_destination",
                  "account_player_destination"
              ],
              "slot": {
                  "HOURS": 1
              },
              "type": "counter",
              "valid_log_sources": ["collector", "goku"],
              "realtime": true
          },
          "video_engagement": {
              "resource": "video",
              "metadata": {
                  "video": ["video_duration"]
              },
              "resources": [
                  "account",
                  "account_player",
                  "account_video",
                  "account_player_video"
              ],
              "top_n_field": "video_seconds_viewed",
              "rollupFields": {
                  "video_seconds_viewed": {
                      "resources": [
                          "brightcove",
                          "account",
                          "account_player",
                          "account_video",
                          "account_player_video",
                          "account_traffic_sources",
                          "account_player_traffic_sources",
                          "account_video_traffic_sources",
                          "account_devices",
                          "account_player_devices",
                          "account_video_devices",
                          "account_geo",
                          "account_player_geo",
                          "account_video_geo",
                          "account_destination",
                          "account_video_destination",
                          "account_player_destination"
                      ],
                      "type": "aggregator",
                      "realtime": true
                  },
                  "video_percent_viewed": {
                      "resources": [
                          "brightcove",
                          "account",
                          "account_player",
                          "account_video",
                          "account_player_video",
                          "account_traffic_sources",
                          "account_player_traffic_sources",
                          "account_video_traffic_sources",
                          "account_devices",
                          "account_player_devices",
                          "account_video_devices",
                          "account_geo",
                          "account_player_geo",
                          "account_video_geo",
                          "account_destination",
                          "account_video_destination",
                          "account_player_destination"
                      ],
                      "type": "aggregator",
                      "realtime": true
                  }
              },
              "slot": {
                  "HOURS": 1
              },
              "type": "timeline",
              "valid_log_sources": ["collector"],
              "realtime": true
          },
          "video_impression": {
              "metadata": {
                  "player":  ["player_name"],
                  "video":   ["video_name"],
                  "country": ["country_name"],
                  "region":  ["region_name"],
                  "city":    ["dma"]
              },
              "resources": [
                  "brightcove",
                  "account",
                  "account_player",
                  "account_video",
                  "account_player_video",
                  "account_traffic_sources",
                  "account_player_traffic_sources",
                  "account_video_traffic_sources",
                  "account_devices",
                  "account_player_devices",
                  "account_video_devices",
                  "account_geo",
                  "account_player_geo",
                  "account_video_geo",
                  "account_destination",
                  "account_video_destination",
                  "account_player_destination"

              ],
              "slot": {
                  "HOURS": 1
              },
              "type": "counter",
              "valid_log_sources": ["collector", "goku"],
              "realtime": true
          },
          "video_view": {
              "metadata": {
                  "player":  ["player_name"],
                  "video":   ["video_name"],
                  "country": ["country_name"],
                  "region":  ["region_name"],
                  "city":    ["dma"]
              },
              "resources": [
                  "brightcove",
                  "account",
                  "account_player",
                  "account_traffic_sources",
                  "account_player_traffic_sources",
                  "account_video_traffic_sources",
                  "account_video",
                  "account_player_video",
                  "account_devices",
                  "account_geo",
                  "account_player_devices",
                  "account_player_geo",
                  "account_video_devices",
                  "account_video_geo",
                  "account_destination",
                  "account_video_destination",
                  "account_player_destination",
                  "feature",
                  "account_feature"
              ],
              "rollupFields": {
                  "daily_unique_viewers": {
                      "resources": [
                          "account"
                      ],
                      "type": "unique"
                  }
              },
              "slot": {
                  "HOURS": 1
              },
              "type": "counter",
              "valid_log_sources": ["collector", "goku"],
              "realtime": true
          },
          "data_load": {
              "type": "counter",
              "valid_log_sources": ["collector", "goku"],
              "realtime": true
          },
          "media_connect_error": {
              "type": "counter",
              "valid_log_sources": ["collector", "goku"],
              "realtime": true
          },
          "video_start": {
              "type": "counter",
              "valid_log_sources": ["goku"]
          },
          "bogus_event": {
              "type": "counter",
              "valid_log_sources": ["collector"],
              "realtime": true
          },
          "bogus_batch_event": {
              "type": "batch",
              "valid_log_sources": ["collector"],
              "realtime": true
          },
          "_test_cdn_log_line": {
              "type": "aggregator",
              "valid_log_sources": ["collector"],
              "realtime": true
          }
      },
      "summaries": [
          {
              "key": ["account"],
              "slot": {
                  "DAYS": 1
              },
              "dimensions": ["video"]
          }
      ],
      "abbreviations": {
          "account": "a",
          "day": "d",
          "video_impression": "i",
          "video_view": "v",
          "video_seconds_viewed": "s",
          "video_percent_viewed": "p",
          "video_engagement_1":   "0",
          "video_engagement_25":  "2",
          "video_engagement_50":  "5",
          "video_engagement_75":  "7",
          "video_engagement_100": "1"
      },
      "derivedEvents": {
          "play_rate": ["video_view", "video_impression"],
          "engagement_score": ["video_percent_viewed", "video_view"]
      },
      "numeric_fields": ["video_duration"]
  };
  return DomainConfig;
})