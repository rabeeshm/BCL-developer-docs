// create profile

/**
 * @api {post} /accounts/:account_id/profiles Create Ingest Profile
 * @apiName Create Ingest Profile
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiDescription Create a custom ingest profile for the account. Note that you can also do this through [Video Cloud Studio](https://studio.brightcove.com/products/videocloud/admin/ingestprofiles)
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/getting-access-tokens))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 *
 * @apiParam (Request Body Fields) {String} name profile name (must be unique within the account)
 * @apiParam (Request Body Fields) {Integer} account_id Video Cloud account ID.
 * @apiParam (Request Body Fields) {String} [description] description of the profile
 * @apiParam (Request Body Fields) {Object} [digital_master] specification for archiving a master
 * @apiParam (Request Body Fields) {String="passthrough", "none"} [digital_master.rendition=none] rendition to use as master - either `passthrough` (the source optimized for online delivery) or `none` if you do not want to archive a master
 * @apiParam (Request Body Fields) {Boolean} [digital_master.distribute=false] whether to make the master playable as a rendition by pushing it to the CDN(s)
 * @apiParam (Request Body Fields) {Object} dynamic_origin specification for renditions and images - **Dynamic Delivery and CAE profiles only**
 * @apiParam (Request Body Fields) {Array} dynamic_origin.renditions names of audio and video renditions to include (**audio only for CAE profiles**) - see [Standard Ingest Profiles - renditions](https://support.brightcove.com/standard-ingest-profiles-dynamic-delivery-and-context-aware-encoding#Renditions) for available renditions you can choose from
 * @apiParam (Request Body Fields) {Array} dynamic_origin.temporary_renditions names of video renditions for [Fast Publish](https://support.brightcove.com/cae-fast-publish) (**only for CAE profiles**) - see [Standard Ingest Profiles - renditions](https://support.brightcove.com/standard-ingest-profiles-dynamic-delivery-and-context-aware-encoding#Renditions) for available renditions you can choose from
 * @apiParam (Request Body Fields) {Object[]} [dynamic_origin.images] array of image specifications for poster and thumbnail (if omitted, no images will be captured during ingestion)
 * @apiParam (Request Body Fields) {String="poster","thumbnail"} [dynamic_origin.images.label] the kind of image this will be
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.images.height] the height of the image in pixels
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.images.width] the width of the image in pixels
 *
 * @apiParam (Request Body Fields) {Object} dynamic_origin.dynamic_profile_options Defines rendition options **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} dynamic_origin.dynamic_profile_options.min_renditions Minimum number of renditions to create **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} dynamic_origin.dynamic_profile_options.max_renditions Maximum number of renditions to create **for CAE profiles only**
 * @apiParam (Request Body Fields) {Object} [dynamic_origin.dynamic_profile_options.min_resolution] Defines the minimum resolution for **for CAE profiles only** renditions
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.dynamic_profile_options.min_resolution.height] Minimum height for renditions **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.dynamic_profile_options.min_resolution.width] Minimum width for renditions **for CAE profiles only**
 *
 * @apiParam (Request Body Fields) {Object} [dynamic_origin.dynamic_profile_options.max_resolution] Defines the maximum resolution for renditions **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.dynamic_profile_options.max_resolution.height=source-height] Maximum height for renditions **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.dynamic_profile_options.max_resolution.width=source-width] Maximum width for renditions **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.dynamic_profile_options.max_bitrate] Maximum bitrate for renditions in kbps **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.dynamic_profile_options.max_first_rendition_bitrate] Maximum bitrate for lowest bitrate rendition in kbps **for CAE profiles only**
 * @apiParam (Request Body Fields) {Integer} [dynamic_origin.dynamic_profile_options.max_frame_rate=30] Maximum framerate for renditions in fps **for CAE profiles only**
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.keyframe_rate=0.5] The number of keyframes per second for renditions (So a value of 0.5 would result in one keyframe every two seconds; a value of 3 would result in three keyframes per second) **for CAE profiles only**
 * @apiParam (Request Body Fields) {Boolean} [dynamic_origin.dynamic_profile_options.select_baseline_profile_configuration=false] At least one rendition used in the profile will be baseline profile **for CAE profiles only**
 *
 * @apiParam (Request Body Fields) {Object[]} renditions array of rendition maps **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String="preserve","stretch","crop","pad"} [renditions.aspect_mode="preserve"] how to handle mismatch between source and rendition aspect ratio **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} renditions.audio_bitrate audio bitrate in kbps **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Number=1,2} [renditions.audio_channels] number of audio channels **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.audio_codec audio codec, e.g. `aac` **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String="aac-lc", "he-aac", "he-aac-v2"} renditions.max_aac_profile max aaic profile - `aac-lc` is the recommended value **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.constant_bitrate=false] whether to use constant bitrate for encoding **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.crf] 1-51, not used by default. **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.decoder_bitrate_cap] In kbps, the max bitrate fed to the decoder **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} [renditions.encryption_method] encryption_method to use, e.g. `aes-128` **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.encryption_key_rotation_period=10] use a different key for each set of segments, rotating to a new key after this many segments **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.fixed_keyframe_interval] Forces a keyframe every X frames, but still allows additional keyframes &mdash; **NOTE** overrides `keyframe_interval` **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Number} [renditions.forced_keyframe_rate] Force the keyframe rate, h264 only, ignored if forced_keyframe_interval is used **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.format video format, e.g. `mp4`, `ts` (for HLS), flv, `m4f` for video, `png` or `jpg` for images **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.frame_rate="(same as source)"] frame rate in frames per second **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.h264_bframes=0] number of bframes for h.264 **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Number} [renditions.h264_level] h.264 profile level **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String="baseline","main","high"} [renditions.h264_profile="baseline"] h.264 profile **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.h264_reference_frames=3] number of h.264 reference frames to use **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.hls_optimized_ts] Time segments optimized for HLS **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.keyframe_interval] Maximum number of frames between keyframes (default is 250, and overrides keyframe_rate) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.keyframe_rate] Maximum number of keyframes per second **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String="poster","thumbnail"} [renditions.label] Image type for image renditions; __required__ for image renditions **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.live_stream=false] Whether this will be for live streaming video **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Number{300-1800}} [renditions.live_sliding_window_duration=300] Duration of stream to keep available for LiveDVR delivery (in seconds) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.max_video_bitrate] Maximum video bitrate (h.264 only) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.max_frame_rate] Limits the frame rate rather than sets it, use as an alternative to frame rate **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String="video","audio","image"} [renditions.media_type="video"] the media type of the rendition **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.one_pass=false] force one-pass encoding **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} [renditions.reference_id] A reference id for the rendition that is unique within the account - required for DRM packaging **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Number} [renditions.segment_seconds=10] number of seconds of content to include in segments (the default for HLS is `10`; for DASH: `2`) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Object} [renditions.skip] A set of conditions for skippiung creation of this rendition [see Conditional Output](https://support.brightcove.com/node/18040) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.skip.min_audio_bitrate] the minimum audio bitrate that the source must have (kbps) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.skip.max_audio_bitrate] the maximum audio bitrate that the source must have (kbps) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.skip.min_video_bitrate] the minimum video bitrate that the source must have (kbps) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} [renditions.skip.max_video_bitrate] the maximum video bitrate that the source must have (kbps) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.skip.require_audio] if true the source must include an audio track **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.skip.require_video] if true the source must include a video track **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} [renditions.skip.min_size] the source must be at least this resolution - string of the form "widthxheight" (e.g. "400x225") **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} [renditions.skip.max_size] the source must be at most this resolution - string of the form "widthxheight" (e.g. "1920x1080") **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.skip_video] Set to `true` to skip video encoding for audio-only renditions **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer{1-5}} [renditions.speed=3] a target transcoding speed. Slower transcoding allows for more advanced file compression, while faster transcoding is possible by skipping some advanced compression features **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} [renditions.streaming_delivery_format] Sets the format/protocol for an output that will be delivered using a specific streaming configuration, including necessary manifests, directory **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} [renditions.streaming_delivery_profile="live"] Sets the profile of the streaming delivery format, ensuring options are selected for compatibility with the profile **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} [renditions.type] transmuxing type for HLS; typical value is `segmented` **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Boolean} [renditions.upscale] whether to upsize the frames if the source frame size is smaller than the target **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} renditions.video_bitrate target video bitrate in kbps **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.video_codec target video codec **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} renditions.height target frame height in pixels **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Integer} renditions.width target frame width in pixels **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Object[]} renditions.watermarks array of watermark maps **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.watermarks.url URL for the watermark image **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.watermarks.width width in pixels or percent of frame width; e.g. `20` or `10%` - decimal values like `10.5%` are __not__ permitted **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.watermarks.height height in pixels or percent of frame width; e.g. `20` or `10%` - decimal values like `10.5%` are __not__ permitted **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.watermarks.x distance from left edge to center of image as pixels or precent of frame width; e.g. `20` or `10%` (use negative values like `-10` to position the watermark relative to the right edge) - decimal values like `10.5%` are __not__ permitted **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} renditions.watermarks.y distance from top edge to center if image as pixels or percent of frame height; e.g. `20` or `10%` (use negative values like `-10` to position the watermark relative to the bottom edge) - decimal values like `10.5%` are __not__ permitted **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Object[]} packages array of package maps for DRM (see [Content Security]( https://support.brightcove.com/node/18038)) **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String[]} packages.drm for MPEG-DASH, array of DRM types to apply, e.g. `["widevine", "playready"]` **Legacy Ingest only**
 * @apiParam (Request Body Fields) {String} packages.package_type for MPEG-DASH, the package type is `dash`; for other formats, the package type is the DRM type, e.g. `widevine` **Legacy Ingest only**
 * @apiParam (Request Body Fields) {Array} packages.renditions for MPEG-DASH, the renditions will be set to the `reference_id` for a single rendition; for other formats, `renditions` is set equal to an array of rendition `reference_id`'s **Legacy Ingest only**
 *
 *
 * @apiParamExample {object} Create Profile Example - Dynamic Delivery:
 *    {
 *      "name": "basic_dynamic_delivery_profile",
 *      "display_name": "Basic Dynamic Delivery Profile",
 *      "description": "Deliver a range of renditions for a variety of platforms on mobile and desktop.",
 *      "account_id": null,
 *      "digital_master": {
 *        "rendition": "passthrough",
 *        "distribute": false
 *      },
 *      "renditions": [],
 *      "packages": [],
 *      "dynamic_origin": {
 *        "renditions": [
 *          "default/audio64",
 *          "default/audio96",
 *          "default/audio128",
 *          "default/video700",
 *          "default/video2000",
 *          "default/video1700",
 *          "default/video450",
 *          "default/video900"
 *        ],
 *        "images": [
 *          {
 *            "label": "thumbnail",
 *            "height": 90,
 *            "width": 160
 *          },
 *          {
 *            "label": "poster",
 *            "height": 720,
 *            "width": 1280
 *          }
 *        ]
 *      }
 *    }
 *
 *
 * @apiSuccess (200) {String} id profile id
 * @apiSuccess (200) {String} name profile name
 * @apiSuccess (200) {Integer} date_created when the profile was created (epoch time in milliseconds)
 * @apiSuccess (200) {Integer} date_last_modified when the profile was last modified (epoch time in milliseconds)
 * @apiSuccess (200) {Number} account_id Video Cloud account ID.
 * @apiSuccess (200) {String} description description of the profile
 * @apiSuccess (200) {Object} digital_master directions for archiving masters
 * @apiSuccess (200) {String} digital_master.rendition rendition that will be used as master (`passthrough` = source optimized for online delivery)
 * @apiSuccess (200) {Boolean} digital_master.distribute whether source is available for playback as a rendition
 * @apiSuccess (200) {Object} dynamic_origin specification for Dynamic Delivery Options
 * @apiSuccess (200) {Array} dynamic_origin.renditions audio and video renditions to be created
 * @apiSuccess (200) {Object[]} dynamic_origin.images specification for poster and thumbnail images
 * @apiSuccess (200) {String} dynamic_origin.images.label the image type
 * @apiSuccess (200) {Integer} dynamic_origin.images.height the image height
 * @apiSuccess (200) {Integer} dynamic_origin.images.width the image width
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options defines rendition options for CAE profiles
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min_renditions minimum number of renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_renditions maximum number of renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.min-resolution defines the minimum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.width defines the minimum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.height defines the minimum height for renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.max-resolution defines the maximum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.width defines the maximum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.height defines the maximum height for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_bitrate maximum bitrate for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_first_rendition_bitrate maximum bitrate for the lowest bitrate rendition
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_frame_rate maximum framerate for the renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.keyframe_rate keyframes per second for the renditions
 * @apiSuccess (200) {Boolean} dynamic_origin.dynamic_profile_options.select_baseline_profile_configuration whether at least one rendition used in the profile will be baseline profile
 * @apiSuccess (200) {Object[]} renditions array of rendition maps
 * @apiSuccess (200) {String} renditions.aspect_mode how to handle mismatch between source and rendition aspect ratio
 * @apiSuccess (200) {Integer} renditions.audio_bitrate audio bitrate in kbps
 * @apiSuccess (200) {Integer} renditions.audio_channels number of audio channels
 * @apiSuccess (200) {String} renditions.id the rendition id
 * @apiSuccess (200) {String} renditions.audio_codec audio codec, e.g. `aac`
 * @apiSuccess (200) {Boolean} renditions.constant_bitrate whether to use constant bitrate for encoding &mdash; this field is not relevant for h.264 video and will be ignored
 * @apiSuccess (200) {Integer} renditions.crf 1-51, not used by default.
 * @apiSuccess (200) {Integer} renditions.decoder_bitrate_cap In kbps, the max bitrate fed to the decoder
 * @apiSuccess (200) {String} renditions.encryption_method encryption_method to use, e.g. `aes-128`
 * @apiSuccess (200) {Integer} renditions.encryption_key_rotation_period use a different key for each set of segments, rotating to a new key after this many segments
 * @apiSuccess (200) {Integer} renditions.fixed_keyframe_interval Forces a keyframe every X frames, but still allows additional keyframes
 * @apiSuccess (200) {Integer} renditions.forced_keyframe_rate Force the keyframe rate, h264 only, ignored if forced_keyframe_interval is used
 * @apiSuccess (200) {String} renditions.format video format, e.g. `mp4`, `ts` (for HLS), flv, `m4f` for video, `png` or `jpg` for images
 * @apiSuccess (200) {Integer} renditions.frame_rate frame rate in frames per second
 * @apiSuccess (200) {Integer} renditions.h264_bframes number of bframes for h.264
 * @apiSuccess (200) {Integer} renditions.h264_level h.264 profile level
 * @apiSuccess (200) {String} renditions.h264_profile h.264 profile
 * @apiSuccess (200) {Integer} renditions.h264_reference_frames number of h.264 reference frames to use
 * @apiSuccess (200) {Boolean} renditions.hls_optimized_ts Time segments optimized for HLS
 * @apiSuccess (200) {Integer} renditions.keyframe_interval Maximum number of frames between keyframes (default is 250, and overrides keyframe_rate)
 * @apiSuccess (200) {Integer} renditions.keyframe_rate Maximum number of keyframes per second
 * @apiSuccess (200) {String} renditions.label Image type for image renditions; __required__ for image renditions
 * @apiSuccess (200) {Boolean} renditions.live_stream Whether this will be for live streaming video
 * @apiSuccess (200) {Integer} renditions.live_sliding_window_duration Duration of stream to keep available for LiveDVR delivery (in seconds)
 * @apiSuccess (200) {Integer} renditions.max_video_bitrate Maximum video bitrate (h.264 only)
 * @apiSuccess (200) {Integer} renditions.max_frame_rate Limits the frame rate rather than sets it, use as an alternative to frame rate
 * @apiSuccess (200) {String} renditions.media_type the media type of the rendition
 * @apiSuccess (200) {Boolean} renditions.one_pass force one-pass encoding
 * @apiSuccess (200) {String} renditions.package_format Creates a zip or tar file containing all the media files of an output, and uploads this single package rather than all the individual files
 * @apiSuccess (200) {String} renditions.reference_id A reference id for the rendition that is unique within the account - required for DRM packaging
 * @apiSuccess (200) {Object} renditions.skip A set of conditions for skippiung creation of this rendition [see Conditional Output](https://support.brightcove.com/node/18040)
 * @apiSuccess (200) {Integer} renditions.skip.min_audio_bitrate the minimum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_audio_bitrate the maximum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.min_video_bitrate the minimum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_video_bitrate the maximum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Boolean} renditions.skip.require_audio if true the source must include an audio track
 * @apiSuccess (200) {Boolean} renditions.skip.require_video if true the source must include a video track
 * @apiSuccess (200) {String} renditions.skip.min_size the source must be at least this resolution - string of the form "widthxheight" (e.g. "400x225")
 * @apiSuccess (200) {String} renditions.skip.max_size the source must be at most this resolution - string of the form "widthxheight" (e.g. "1920x1080")
 * @apiSuccess (200) {Boolean} renditions.skip_video Set to `true` to skip video encoding for audio-only renditions
 * @apiSuccess (200) {Integer} renditions.speed a target transcoding speed. Slower transcoding allows for more advanced file compression, while faster transcoding is possible by skipping some advanced compression features
 * @apiSuccess (200) {String} renditions.streaming_delivery_format Sets the format/protocol for an output that will be delivered using a specific streaming configuration, including necessary manifests, directory
 * @apiSuccess (200) {String} renditions.streaming_delivery_profile Sets the profile of the streaming delivery format, ensuring options are selected for compatibility with the profile
 * @apiSuccess (200) {String} renditions.type transmuxing type for HLS; typical value is `segmented`
 * @apiSuccess (200) {Boolean} renditions.upscale whether to upsize the frames if the source frame size is smaller than the target
 * @apiSuccess (200) {Integer} renditions.video_bitrate target video bitrate in kbps
 * @apiSuccess (200) {String} renditions.video_codec target video codec
 * @apiSuccess (200) {Integer} renditions.height target frame height in pixels
 * @apiSuccess (200) {Integer} renditions.width target frame width in pixels
 * @apiSuccess (200) {Object[]} renditions.watermarks array of watermark maps
 * @apiSuccess (200) {String} renditions.watermarks.url URL for the watermark image
 * @apiSuccess (200) {String} renditions.watermarks.width width in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.height height in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.x distance from left edge to center of image as pixels or precent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.y distance from top edge to center if image as pixels or percent of frame height; e.g. `20` or `10%`
 * @apiSuccess (200) {Object[]} packages array of package maps for DRM (see [Content Security](https://support.brightcove.com/node/18038))
 * @apiSuccess (200) {String[]} packages.drm for MPEG-DASH, array of DRM types to apply, e.g. `["widevine", "playready"]`
 * @apiSuccess (200) {String} packages.package_type for MPEG-DASH, the package type is `dash`; for other formats, the package type is the DRM type, e.g. `widevine`
 * @apiSuccess (200) {Array} packages.renditions for MPEG-DASH, the renditions will be set to the `reference_id` for a single rendition; for other formats, `renditions` is set equal to an array of rendition `reference_id`'s
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 201 Created
 *    {
 *        "account_id": 57838016001,
 *        "brightcove_standard": false,
 *        "date_created": 1443700501852,
 *        "date_last_modified": 1443700501852,
 *        "description": "This will produce 1 HLS rendition and 2 image renditions.",
 *        "digital_master": {
 *            "distribute": true,
 *            "rendition": "passthrough"
 *        },
 *        "id": "560d1f15e4b05e8c5d7fa5c4",
 *        "name": "Protected",
 *        "packages": [],
 *        "renditions": [
 *            {
 *                "audio_bitrate": 96,
 *                "audio_codec": "aac",
 *                "format": "ts",
 *                "h264_profile": "main",
 *                "height": 720,
 *                "id": "560d1f15e4b05e8c5d7fa5c1",
 *                "keyframe_rate": 0.5,
 *                "max_frame_rate": 30.0,
 *                "media_type": "video",
 *                "reference_id": "ts1",
 *                "type": "segmented",
 *                "video_codec": "h264",
 *                "width": 1280
 *            },
 *            {
 *                "format": "png",
 *                "height": 540,
 *                "id": "560d1f15e4b05e8c5d7fa5c2",
 *                "label": "poster",
 *                "media_type": "image",
 *                "width": 960
 *            },
 *            {
 *                "format": "png",
 *                "height": 90,
 *                "id": "560d1f15e4b05e8c5d7fa5c3",
 *                "label": "thumbnail",
 *                "media_type": "image",
 *                "width": 160
 *            }
 *        ],
 *        "version": 1443700501853
 *    }
 *
 * @apiError (Error 4xx) {string} BAD_REQUEST 400: Invalid JSON &mdash; message varies according to the problem
 * @apiError (Error 4xx) {string} BAD_REQUEST 400: Reference id is already in use - &mdash; message varies according to the problem
 * @apiError (Error 4xx) {string} CONFLICT 409: Could not create profile with this name and id (profile name or id already exists)
 * @apiError (Error 4xx) {array} UNPROCESSABLE_ENTITY 422: required field missing &mdash; message varies according to the issue
 * @apiError (Error 4xx) {array} NOT_AUTHORIZED 401: Credentials are required to access this resource.
 * @apiError (Error 4xx) {string} NOT_FOUND 404:  Resource not found
 *
 * @apiErrorExample {string} 400 Invalid JSON
 *     HTTP/1.1 400 BAD_REQUEST
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 400 Unrecognized token 'true': was expecting 'null', 'true', 'false' or NaN</title> </head>
*    <body><h2>HTTP ERROR 400</h2>
*    <p>Problem accessing /v1/accounts/57838016001/profiles. Reason: <pre> Unrecognized token 'true': was expecting 'null', 'true', 'false' or NaN</pre></p>
*     </body> </html>
 * @apiErrorExample {string} 400 BAD_REQUEST
 *     HTTP/1.1 400 DUPLICATE REFERENCE_ID
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 400 rendition list contains duplicate reference ID: ts1 (through reference chain: com.brightcove.profiles.common.model.Profile["renditions"])</title> </head>
*    <body><h2>HTTP ERROR 400</h2>
*    <p>Problem accessing /v1/accounts/57838016001/profiles. Reason: <pre> rendition list contains duplicate reference ID: ts1 (through reference chain: com.brightcove.profiles.common.model.Profile["renditions"])</pre></p>
*     </body> </html>
 * @apiErrorExample {string} 422 UNPROCESSABLE_ENTITY
 *     HTTP/1.1 422 UNPROCESSABLE_ENTITY
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 422 Unprocessable_Entity</title> </head>
*    <body><h2>HTTP ERROR 422</h2> <p>Problem accessing /v1/accounts/57838016001/profiles. Reason: <pre> Unprocessable_Entity</pre></p>
*    <h2>The request entity had the following errors:</h2>
*    <ul><li>renditions[0].format may not be null (was null)</li></ul> </body> </html>
 * @apiErrorExample {array} 409 CONFLICT
 *     HTTP/1.1 409 CONFLICT
 *    [
 *        {
 *            "code": "CONFLICT",
 *            "message": "Could not create profile with this name and id"
 *        }
 *    ]
 * @apiErrorExample {array} 401 NOT_AUTHORIZED
 *     HTTP/1.1 401 NOT_AUTHORIZED
 *     [
 *         {
 *            "error_code": "NOT_AUTHORIZED",
 *            "message": "Credentials are required to access this resource."
 *         }
 *     ]
 * @apiErrorExample {string} 404 Error Response
 *    HTTP/1.1 404 NOT_FOUND
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 404 NOT_FOUND</title> </head>
*    <body><h2>HTTP ERROR 404</h2> <p>Problem accessing /v1/accounts/57838016001/profiles/527d210ae4b0. Reason: <pre> NOT_FOUND</pre></p>
*     </body> </html>
 *
 *
 */

// get profiles

/**
 * @api {get} /accounts/:account_id/profiles Get All Ingest Profiles
 * @apiName Get All Ingest Profiles
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiDescription Get an array of all the profiles valid for the account
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/node/17925))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 *
 *
 * @apiParamExample {String} Get Profiles Example:
 *    https://ingestion.api.brightcove.com/v1/accounts/57838016001/profiles
 *
 * @apiSuccess (200) {String} id profile id
 * @apiSuccess (200) {String} name profile name
 * @apiSuccess (200) {Integer} date_created when the profile was created (epoch time in milliseconds)
 * @apiSuccess (200) {Integer} date_last_modified when the profile was last modified (epoch time in milliseconds)
 * @apiSuccess (200) {Number} account_id Video Cloud account ID.
 * @apiSuccess (200) {String} description description of the profile
 * @apiSuccess (200) {Object} digital_master directions for archiving masters
 * @apiSuccess (200) {String} digital_master.rendition rendition that will be used as master (`passthrough` = source optimized for online delivery)
 * @apiSuccess (200) {Boolean} digital_master.distribute whether source is available for playback as a rendition
 * @apiSuccess (200) {Object} dynamic_origin specification for Dynamic Delivery Options
 * @apiSuccess (200) {Array} dynamic_origin.renditions audio and video renditions to be created
 * @apiSuccess (200) {Object[]} dynamic_origin.images specification for poster and thumbnail images
 * @apiSuccess (200) {String} dynamic_origin.images.label the image type
 * @apiSuccess (200) {Integer} dynamic_origin.images.height the image height
 * @apiSuccess (200) {Integer} dynamic_origin.images.width the image width
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options defines rendition options for CAE profiles
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min_renditions minimum number of renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_renditions maximum number of renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.min-resolution defines the minimum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.width defines the minimum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.height defines the minimum height for renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.max-resolution defines the maximum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.width defines the maximum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.height defines the maximum height for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_bitrate maximum bitrate for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_first_rendition_bitrate maximum bitrate for the lowest bitrate rendition
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_frame_rate maximum framerate for the renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.keyframe_rate keyframes per second for the renditions
 * @apiSuccess (200) {Boolean} dynamic_origin.dynamic_profile_options.select_baseline_profile_configuration whether at least one rendition used in the profile will be baseline profile
 * @apiSuccess (200) {Object[]} renditions array of rendition maps
 * @apiSuccess (200) {String} renditions.aspect_mode how to handle mismatch between source and rendition aspect ratio
 * @apiSuccess (200) {Integer} renditions.audio_bitrate audio bitrate in kbps
 * @apiSuccess (200) {Integer} renditions.audio_channels number of audio channels
 * @apiSuccess (200) {String} renditions.id the rendition id
 * @apiSuccess (200) {String} renditions.audio_codec audio codec, e.g. `aac`
 * @apiSuccess (200) {Boolean} renditions.constant_bitrate whether to use constant bitrate for encoding &mdash; this field is not relevant for h.264 video and will be ignored
 * @apiSuccess (200) {Integer} renditions.crf 1-51, not used by default.
 * @apiSuccess (200) {Integer} renditions.decoder_bitrate_cap In kbps, the max bitrate fed to the decoder
 * @apiSuccess (200) {String} renditions.encryption_method encryption_method to use, e.g. `aes-128`
 * @apiSuccess (200) {Integer} renditions.encryption_key_rotation_period use a different key for each set of segments, rotating to a new key after this many segments
 * @apiSuccess (200) {Integer} renditions.fixed_keyframe_interval Forces a keyframe every X frames, but still allows additional keyframes
 * @apiSuccess (200) {Integer} renditions.forced_keyframe_rate Force the keyframe rate, h264 only, ignored if forced_keyframe_interval is used
 * @apiSuccess (200) {String} renditions.format video format, e.g. `mp4`, `ts` (for HLS), flv, `m4f` for video, `png` or `jpg` for images
 * @apiSuccess (200) {Integer} renditions.frame_rate frame rate in frames per second
 * @apiSuccess (200) {Integer} renditions.h264_bframes number of bframes for h.264
 * @apiSuccess (200) {Integer} renditions.h264_level h.264 profile level
 * @apiSuccess (200) {String} renditions.h264_profile h.264 profile
 * @apiSuccess (200) {Integer} renditions.h264_reference_frames number of h.264 reference frames to use
 * @apiSuccess (200) {Boolean} renditions.hls_optimized_ts Time segments optimized for HLS
 * @apiSuccess (200) {Integer} renditions.keyframe_interval Maximum number of frames between keyframes (default is 250, and overrides keyframe_rate)
 * @apiSuccess (200) {Integer} renditions.keyframe_rate Maximum number of keyframes per second
 * @apiSuccess (200) {String} renditions.label Image type for image renditions; __required__ for image renditions
 * @apiSuccess (200) {Boolean} renditions.live_stream Whether this will be for live streaming video
 * @apiSuccess (200) {Integer} renditions.live_sliding_window_duration Duration of stream to keep available for LiveDVR delivery (in seconds)
 * @apiSuccess (200) {Integer} renditions.max_video_bitrate Maximum video bitrate (h.264 only)
 * @apiSuccess (200) {Integer} renditions.max_frame_rate Limits the frame rate rather than sets it, use as an alternative to frame rate
 * @apiSuccess (200) {String} renditions.media_type the media type of the rendition
 * @apiSuccess (200) {Boolean} renditions.one_pass force one-pass encoding
 * @apiSuccess (200) {String} renditions.package_format Creates a zip or tar file containing all the media files of an output, and uploads this single package rather than all the individual files
 * @apiSuccess (200) {String} renditions.reference_id A reference id for the rendition that is unique within the account - required for DRM packaging
 * @apiSuccess (200) {Object} renditions.skip A set of conditions for skippiung creation of this rendition [see Conditional Output](https://support.brightcove.com/node/18040)
 * @apiSuccess (200) {Integer} renditions.skip.min_audio_bitrate the minimum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_audio_bitrate the maximum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.min_video_bitrate the minimum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_video_bitrate the maximum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Boolean} renditions.skip.require_audio if true the source must include an audio track
 * @apiSuccess (200) {Boolean} renditions.skip.require_video if true the source must include a video track
 * @apiSuccess (200) {String} renditions.skip.min_size the source must be at least this resolution - string of the form "widthxheight" (e.g. "400x225")
 * @apiSuccess (200) {String} renditions.skip.max_size the source must be at most this resolution - string of the form "widthxheight" (e.g. "1920x1080")
 * @apiSuccess (200) {Boolean} renditions.skip_video Set to `true` to skip video encoding for audio-only renditions
 * @apiSuccess (200) {Integer} renditions.speed a target transcoding speed. Slower transcoding allows for more advanced file compression, while faster transcoding is possible by skipping some advanced compression features
 * @apiSuccess (200) {String} renditions.streaming_delivery_format Sets the format/protocol for an output that will be delivered using a specific streaming configuration, including necessary manifests, directory
 * @apiSuccess (200) {String} renditions.streaming_delivery_profile Sets the profile of the streaming delivery format, ensuring options are selected for compatibility with the profile
 * @apiSuccess (200) {String} renditions.type transmuxing type for HLS; typical value is `segmented`
 * @apiSuccess (200) {Boolean} renditions.upscale whether to upsize the frames if the source frame size is smaller than the target
 * @apiSuccess (200) {Integer} renditions.video_bitrate target video bitrate in kbps
 * @apiSuccess (200) {String} renditions.video_codec target video codec
 * @apiSuccess (200) {Integer} renditions.height target frame height in pixels
 * @apiSuccess (200) {Integer} renditions.width target frame width in pixels
 * @apiSuccess (200) {Object[]} renditions.watermarks array of watermark maps
 * @apiSuccess (200) {String} renditions.watermarks.url URL for the watermark image
 * @apiSuccess (200) {String} renditions.watermarks.width width in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.height height in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.x distance from left edge to center of image as pixels or precent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.y distance from top edge to center if image as pixels or percent of frame height; e.g. `20` or `10%`
 * @apiSuccess (200) {Object[]} packages array of package maps for DRM (see [Content Security](https://support.brightcove.com/node/18038))
 * @apiSuccess (200) {String[]} packages.drm for MPEG-DASH, array of DRM types to apply, e.g. `["widevine", "playready"]`
 * @apiSuccess (200) {String} packages.package_type for MPEG-DASH, the package type is `dash`; for other formats, the package type is the DRM type, e.g. `widevine`
 * @apiSuccess (200) {Array} packages.renditions for MPEG-DASH, the renditions will be set to the `reference_id` for a single rendition; for other formats, `renditions` is set equal to an array of rendition `reference_id`'s
 *
 * @apiSuccessExample {array} Success Response:
 *    HTTP/1.1 200 OK
 *    [
 *        {
 *            "id": "510fd4e6e4b0c9164cbe9b60",
 *            "version": 1423840467728,
 *            "name": "single-rendition",
 *            "account_id": -1,
 *            "brightcove_standard": false,
 *            "date_created": 1359992038155,
 *            "date_last_modified": 1423840467726,
 *            "renditions": [
 *              {
 *                "media_type": "video",
 *                "id": "54de14d3e4b0f66e5c937eb3",
 *                "format": "mp4",
 *                "audio_codec": "aac",
 *                "audio_bitrate": 128,
 *                "video_codec": "h264",
 *                "speed": 3,
 *                "video_bitrate": 600,
 *                "keyframe_rate": 0.5,
 *                "max_frame_rate": 30,
 *                "width": 480,
 *                "height": 360,
 *                "h264_profile": "baseline"
 *              },
 *              {
 *                "media_type": "image",
 *                "id": "54d02903e4b0c948249cb2a7",
 *                "format": "png",
 *                "label": "poster",
 *                "width": 480,
 *                "height": 360
 *              },
 *              {
 *                "media_type": "image",
 *                "id": "54d02903e4b0c948249cb2a8",
 *                "format": "png",
 *                "label": "thumbnail",
 *                "width": 160,
 *                "height": 90
 *              }
 *            ],
 *            "packages": []
 *          }
 *    ]
 *
 * @apiError (Error 4xx) {array} NOT_AUTHORIZED 401: Credentials are required to access this resource.
 * @apiError (Error 4xx) {array} PROFILE_ERROR 409: profile rendition count exceeds configured rendition limit
 * @apiError (Error 4xx) {string} NOT_FOUND 404: <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/> <title>Error 404 NOT_FOUND</title> </head> <body><h2>HTTP ERROR 404</h2> <p>Problem accessing /v1/accounts/578380001/profiles. Reason: <pre> NOT_FOUND</pre></p> </body> </html>
 *
 * @apiErrorExample {array} 401 Error Response
 *     HTTP/1.1 401 NOT_AUTHORIZED
 *     [
 *         {
 *            "error_code": "NOT_AUTHORIZED",
 *            "message": "Credentials are required to access this resource."
 *         }
 *     ]
 * @apiErrorExample {string} 404 Error Response
 *    HTTP/1.1 404 NOT_FOUND
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 404 NOT_FOUND</title> </head>
*    <body><h2>HTTP ERROR 404</h2> <p>Problem accessing /v1/accounts/57838016001/profiles/527d210ae4b0. Reason: <pre> NOT_FOUND</pre></p>
*     </body> </html>
 *
 */

// get profile by id

/**
 * @api {get} /accounts/:account_id/profiles/:profile_id Get Ingest Profile by ID
 * @apiName Get_Ingest_Profile_by_ID
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiDescription Get a single profile map by its ID
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/node/17925))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} profile_id Video Cloud account ID.
 *
 *
 * @apiParamExample {String} Get Profiles Example:
 *    https://ingestion.api.brightcove.com/v1/accounts/57838016001/profiles/527d210ae4b0024db7acb05c
 *
 * @apiSuccess (200) {String} id profile id
 * @apiSuccess (200) {String} name profile name
 * @apiSuccess (200) {Integer} date_created when the profile was created (epoch time in milliseconds)
 * @apiSuccess (200) {Integer} date_last_modified when the profile was last modified (epoch time in milliseconds)
 * @apiSuccess (200) {Number} account_id Video Cloud account ID.
 * @apiSuccess (200) {String} description description of the profile
 * @apiSuccess (200) {Object} digital_master directions for archiving masters
 * @apiSuccess (200) {String} digital_master.rendition rendition that will be used as master (`passthrough` = source optimized for online delivery)
 * @apiSuccess (200) {Boolean} digital_master.distribute whether source is available for playback as a rendition
 * @apiSuccess (200) {Object} dynamic_origin specification for Dynamic Delivery Options
 * @apiSuccess (200) {Array} dynamic_origin.renditions audio and video renditions to be created
 * @apiSuccess (200) {Object[]} dynamic_origin.images specification for poster and thumbnail images
 * @apiSuccess (200) {String} dynamic_origin.images.label the image type
 * @apiSuccess (200) {Integer} dynamic_origin.images.height the image height
 * @apiSuccess (200) {Integer} dynamic_origin.images.width the image width
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options defines rendition options for CAE profiles
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min_renditions minimum number of renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_renditions maximum number of renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.min-resolution defines the minimum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.width defines the minimum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.height defines the minimum height for renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.max-resolution defines the maximum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.width defines the maximum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.height defines the maximum height for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_bitrate maximum bitrate for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_first_rendition_bitrate maximum bitrate for the lowest bitrate rendition
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_frame_rate maximum framerate for the renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.keyframe_rate keyframes per second for the renditions
 * @apiSuccess (200) {Boolean} dynamic_origin.dynamic_profile_options.select_baseline_profile_configuration whether at least one rendition used in the profile will be baseline profile
 * @apiSuccess (200) {Object[]} renditions array of rendition maps
 * @apiSuccess (200) {String} renditions.aspect_mode how to handle mismatch between source and rendition aspect ratio
 * @apiSuccess (200) {Integer} renditions.audio_bitrate audio bitrate in kbps
 * @apiSuccess (200) {Integer} renditions.audio_channels number of audio channels
 * @apiSuccess (200) {String} renditions.id the rendition id
 * @apiSuccess (200) {String} renditions.audio_codec audio codec, e.g. `aac`
 * @apiSuccess (200) {Boolean} renditions.constant_bitrate whether to use constant bitrate for encoding &mdash; this field is not relevant for h.264 video and will be ignored
 * @apiSuccess (200) {Integer} renditions.crf 1-51, not used by default.
 * @apiSuccess (200) {Integer} renditions.decoder_bitrate_cap In kbps, the max bitrate fed to the decoder
 * @apiSuccess (200) {String} renditions.encryption_method encryption_method to use, e.g. `aes-128`
 * @apiSuccess (200) {Integer} renditions.encryption_key_rotation_period use a different key for each set of segments, rotating to a new key after this many segments
 * @apiSuccess (200) {Integer} renditions.fixed_keyframe_interval Forces a keyframe every X frames, but still allows additional keyframes
 * @apiSuccess (200) {Integer} renditions.forced_keyframe_rate Force the keyframe rate, h264 only, ignored if forced_keyframe_interval is used
 * @apiSuccess (200) {String} renditions.format video format, e.g. `mp4`, `ts` (for HLS), flv, `m4f` for video, `png` or `jpg` for images
 * @apiSuccess (200) {Integer} renditions.frame_rate frame rate in frames per second
 * @apiSuccess (200) {Integer} renditions.h264_bframes number of bframes for h.264
 * @apiSuccess (200) {Integer} renditions.h264_level h.264 profile level
 * @apiSuccess (200) {String} renditions.h264_profile h.264 profile
 * @apiSuccess (200) {Integer} renditions.h264_reference_frames number of h.264 reference frames to use
 * @apiSuccess (200) {Boolean} renditions.hls_optimized_ts Time segments optimized for HLS
 * @apiSuccess (200) {Integer} renditions.keyframe_interval Maximum number of frames between keyframes (default is 250, and overrides keyframe_rate)
 * @apiSuccess (200) {Integer} renditions.keyframe_rate Maximum number of keyframes per second
 * @apiSuccess (200) {String} renditions.label Image type for image renditions; __required__ for image renditions
 * @apiSuccess (200) {Boolean} renditions.live_stream Whether this will be for live streaming video
 * @apiSuccess (200) {Integer} renditions.live_sliding_window_duration Duration of stream to keep available for LiveDVR delivery (in seconds)
 * @apiSuccess (200) {Integer} renditions.max_video_bitrate Maximum video bitrate (h.264 only)
 * @apiSuccess (200) {Integer} renditions.max_frame_rate Limits the frame rate rather than sets it, use as an alternative to frame rate
 * @apiSuccess (200) {String} renditions.media_type the media type of the rendition
 * @apiSuccess (200) {Boolean} renditions.one_pass force one-pass encoding
 * @apiSuccess (200) {String} renditions.package_format Creates a zip or tar file containing all the media files of an output, and uploads this single package rather than all the individual files
 * @apiSuccess (200) {String} renditions.reference_id A reference id for the rendition that is unique within the account - required for DRM packaging
 * @apiSuccess (200) {Object} renditions.skip A set of conditions for skippiung creation of this rendition [see Conditional Output](https://support.brightcove.com/node/18040)
 * @apiSuccess (200) {Integer} renditions.skip.min_audio_bitrate the minimum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_audio_bitrate the maximum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.min_video_bitrate the minimum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_video_bitrate the maximum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Boolean} renditions.skip.require_audio if true the source must include an audio track
 * @apiSuccess (200) {Boolean} renditions.skip.require_video if true the source must include a video track
 * @apiSuccess (200) {String} renditions.skip.min_size the source must be at least this resolution - string of the form "widthxheight" (e.g. "400x225")
 * @apiSuccess (200) {String} renditions.skip.max_size the source must be at most this resolution - string of the form "widthxheight" (e.g. "1920x1080")
 * @apiSuccess (200) {Boolean} renditions.skip_video Set to `true` to skip video encoding for audio-only renditions
 * @apiSuccess (200) {Integer} renditions.speed a target transcoding speed. Slower transcoding allows for more advanced file compression, while faster transcoding is possible by skipping some advanced compression features
 * @apiSuccess (200) {String} renditions.streaming_delivery_format Sets the format/protocol for an output that will be delivered using a specific streaming configuration, including necessary manifests, directory
 * @apiSuccess (200) {String} renditions.streaming_delivery_profile Sets the profile of the streaming delivery format, ensuring options are selected for compatibility with the profile
 * @apiSuccess (200) {String} renditions.type transmuxing type for HLS; typical value is `segmented`
 * @apiSuccess (200) {Boolean} renditions.upscale whether to upsize the frames if the source frame size is smaller than the target
 * @apiSuccess (200) {Integer} renditions.video_bitrate target video bitrate in kbps
 * @apiSuccess (200) {String} renditions.video_codec target video codec
 * @apiSuccess (200) {Integer} renditions.height target frame height in pixels
 * @apiSuccess (200) {Integer} renditions.width target frame width in pixels
 * @apiSuccess (200) {Object[]} renditions.watermarks array of watermark maps
 * @apiSuccess (200) {String} renditions.watermarks.url URL for the watermark image
 * @apiSuccess (200) {String} renditions.watermarks.width width in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.height height in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.x distance from left edge to center of image as pixels or precent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.y distance from top edge to center if image as pixels or percent of frame height; e.g. `20` or `10%`
 * @apiSuccess (200) {Object[]} packages array of package maps for DRM (see [Content Security](https://support.brightcove.com/node/18038))
 * @apiSuccess (200) {String[]} packages.drm for MPEG-DASH, array of DRM types to apply, e.g. `["widevine", "playready"]`
 * @apiSuccess (200) {String} packages.package_type for MPEG-DASH, the package type is `dash`; for other formats, the package type is the DRM type, e.g. `widevine`
 * @apiSuccess (200) {Mixed} packages.renditions for MPEG-DASH, the renditions will be set to the `reference_id` for a single rendition; for other formats, `renditions` is set equal to an array of rendition `reference_id`'s
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "510fd4e6e4b0c9164cbe9b60",
 *      "version": 1423840467728,
 *      "name": "single-rendition",
 *      "account_id": -1,
 *      "brightcove_standard": false,
 *      "date_created": 1359992038155,
 *      "date_last_modified": 1423840467726,
 *      "renditions": [
 *        {
 *          "media_type": "video",
 *          "id": "54de14d3e4b0f66e5c937eb3",
 *          "format": "mp4",
 *          "audio_codec": "aac",
 *          "audio_bitrate": 128,
 *          "video_codec": "h264",
 *          "speed": 3,
 *          "video_bitrate": 600,
 *          "keyframe_rate": 0.5,
 *          "max_frame_rate": 30,
 *          "width": 480,
 *          "height": 360,
 *          "h264_profile": "baseline"
 *        },
 *        {
 *          "media_type": "image",
 *          "id": "54d02903e4b0c948249cb2a7",
 *          "format": "png",
 *          "label": "poster",
 *          "width": 480,
 *          "height": 360
 *        },
 *        {
 *          "media_type": "image",
 *          "id": "54d02903e4b0c948249cb2a8",
 *          "format": "png",
 *          "label": "thumbnail",
 *          "width": 160,
 *          "height": 90
 *        }
 *      ],
 *      "packages": []
 *    }
 *
 * @apiError (Error 4xx) {json} NOT_AUTHORIZED 401: Credentials are required to access this resource.
 * @apiError (Error 4xx) {string} NOT_FOUND 404: <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/> <title>Error 404 NOT_FOUND</title> </head> <body><h2>HTTP ERROR 404</h2> <p>Problem accessing /v1/accounts/578380001/profiles. Reason: <pre> NOT_FOUND</pre></p> </body> </html>
 *
 * @apiErrorExample {json} 401 Error Response
 *     HTTP/1.1 401 NOT_AUTHORIZED
 *     [
 *         {
 *            "error_code": "NOT_AUTHORIZED",
 *            "message": "Credentials are required to access this resource."
 *         }
 *     ]
 * @apiErrorExample {string} 404 Error Response
 *    HTTP/1.1 404 NOT_FOUND
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 404 NOT_FOUND</title> </head>
*    <body><h2>HTTP ERROR 404</h2> <p>Problem accessing /v1/accounts/57838016001/profiles/527d210ae4b0. Reason: <pre> NOT_FOUND</pre></p>
*     </body> </html>
 *
 *
 */

// update profile

/**
 * @api {put} /accounts/:account_id/profiles/:profile_id Update Ingest Profile
 * @apiName Update Ingest Profile
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiDescription Update an existing ingest profile - the existing profile will be deactivated, and replaced by the one specified in the request body
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/node/17925))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} profile_id the profile ID.
 *
 * @apiParam (Request Body Fields) {String} name profile name (must be unique within the account)
 * @apiParam (Request Body Fields) {Number} account_id Video Cloud account ID.
 * @apiParam (Request Body Fields) {String} [description] description of the profile
 * @apiParam (Request Body Fields) {Object} [digital_master] specification for archiving a master
 * @apiParam (Request Body Fields) {String} [digital_master.rendition=none] rendition to use as master - either `passthrough` (the source optimized for online delivery) or `none` if you do not want to archive a master
 * @apiParam (Request Body Fields) {Boolean} [digital_master.distribute=false] whether to make the master playable as a rendition by pushing it to the CDN(s)
 * @apiParam (Request Body Fields) {Object} dynamic_origin specification for renditions and images
 * @apiParam (Request Body Fields) {Array} dynamic_origin.renditions names of audio and video renditions to include - see [Standard Ingest Profiles - renditions](https://support.brightcove.com/standard-ingest-profiles-dynamic-delivery-and-context-aware-encoding#Renditions) for available renditions you can choose from
 * @apiParam (Request Body Fields) {Object[]} [dynamic_origin.images] array of image specifications for poster and thumbnail (if omitted, no images will be captured during ingestion)
 * @apiParam (Request Body Fields) {String="poster","thumbnail"} [dynamic_origin.images.label] the kind of image this will be
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.images.height] the height of the image in pixels
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.images.width] the width of the image in pixels
 *
 * @apiParam (Request Body Fields) {String} name profile name (must be unique within the account)
 * @apiParam (Request Body Fields) {Number} account_id Video Cloud account ID.
 * @apiParam (Request Body Fields) {String} [description] description of the profile
 * @apiParam (Request Body Fields) {Object} [digital_master] specification for archiving a master
 * @apiParam (Request Body Fields) {String} [digital_master.rendition=none] rendition to use as master - either `passthrough` (the source optimized for online delivery) or `none` if you do not want to archive a master
 * @apiParam (Request Body Fields) {Object} dynamic_origin specification for renditions and images
 * @apiParam (Request Body Fields) {Array} dynamic_origin.renditions names of **audio-only** renditions to include - see [Standard Ingest Profiles - renditions](https://support.brightcove.com/standard-ingest-profiles-dynamic-delivery-and-context-aware-encoding#Renditions) for available renditions you can choose from
 * @apiParam (Request Body Fields) {Object[]} [dynamic_origin.images] array of image specifications for poster and thumbnail (if omitted, no images will be captured during ingestion)
 * @apiParam (Request Body Fields) {String="poster","thumbnail"} [dynamic_origin.images.label] the kind of image this will be
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.images.height] the height of the image in pixels
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.images.width] the width of the image in pixels
 * @apiParam (Request Body Fields) {Object} dynamic_origin.dynamic_profile_options Defines rendition options for CAE profiles
 * @apiParam (Request Body Fields) {Integer} dynamic_origin.dynamic_profile_options.min_renditions Minimum number of renditions to create
 * @apiParam (Request Body Fields) {Integer} dynamic_origin.dynamic_profile_options.max_renditions Maximum number of renditions to create
 * @apiParam (Request Body Fields) {Object} [dynamic_origin.dynamic_profile_options.min_resolution] Defines the minimum resolution for renditions
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.min_resolution.height] Minimum height for renditions
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.min_resolution.width] Minimum width for renditions
 *
 * @apiParam (Request Body Fields) {Object} [dynamic_origin.dynamic_profile_options.max_resolution] Defines the maximum resolution for renditions
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.max_resolution.height=source-height] Maximum height for renditions
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.max_resolution.width=source-width] Maximum width for renditions
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.max_bitrate] Maximum bitrate for renditions in kbps
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.max_first_rendition_bitrate] Maximum bitrate for lowest bitrate rendition in kbps
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.max_frame_rate=30] Maximum framerate for renditions in fps
 * @apiParam (Request Body Fields) {Number} [dynamic_origin.dynamic_profile_options.keyframe_rate=0.5] The number of keyframes per second for renditions (So a value of 0.5 would result in one keyframe every two seconds; a value of 3 would result in three keyframes per second)
 * @apiParam (Request Body Fields) {Boolean} [dynamic_origin.dynamic_profile_options.select_baseline_profile_configuration=false] At least one rendition used in the profile will be baseline profile
 *
 * @apiParam (Request Body Fields) {String} name profile name (must be unique within the account)
 * @apiParam (Request Body Fields) {Number} account_id Video Cloud account ID.
 * @apiParam (Request Body Fields) {String} [description] description of the profile
 * @apiParam (Request Body Fields) {Object} [digital_master] specification for archiving a master
 * @apiParam (Request Body Fields) {String} [digital_master.rendition=none] rendition to use as master - either `passthrough` (the source optimized for online delivery), a reference id for a rendition specified in the `renditions`, or `none` if you do not want to archive a master
 * @apiParam (Request Body Fields) {Boolean} [digital_master.distribute=false] whether to make the master playable as a rendition by pushing it to the CDN(s)
 * @apiParam (Request Body Fields) {Object[]} renditions array of rendition maps
 * @apiParam (Request Body Fields) {String="preserve","stretch","crop","pad"} [renditions.aspect_mode="preserve"] how to handle mismatch between source and rendition aspect ratio
 * @apiParam (Request Body Fields) {Integer} renditions.audio_bitrate audio bitrate in kbps
 * @apiParam (Request Body Fields) {Number=1,2} [renditions.audio_channels] number of audio channels
 * @apiParam (Request Body Fields) {String} renditions.audio_codec audio codec, e.g. `aac`
 * @apiParam (Request Body Fields) {String="aac-lc", "he-aac", "he-aac-v2"} renditions.max_aac_profile max aaic profile - `aac-lc` is the recommended value
 * @apiParam (Request Body Fields) {Boolean} [renditions.constant_bitrate=false] whether to use constant bitrate for encoding
 * @apiParam (Request Body Fields) {Number} [renditions.crf] 1-51, not used by default.
 * @apiParam (Request Body Fields) {Integer} [renditions.decoder_bitrate_cap] In kbps, the max bitrate fed to the decoder
 * @apiParam (Request Body Fields) {String} [renditions.encryption_method] encryption_method to use, e.g. `aes-128`
 * @apiParam (Request Body Fields) {Number} [renditions.encryption_key_rotation_period=10] use a different key for each set of segments, rotating to a new key after this many segments
 * @apiParam (Request Body Fields) {Number} [renditions.fixed_keyframe_interval] Forces a keyframe every X frames, but still allows additional keyframes &mdash; **NOTE** overrides `keyframe_interval`
 * @apiParam (Request Body Fields) {Number} [renditions.forced_keyframe_rate] Force the keyframe rate, h264 only, ignored if forced_keyframe_interval is used
 * @apiParam (Request Body Fields) {String} renditions.format video format, e.g. `mp4`, `ts` (for HLS), flv, `m4f` for video, `png` or `jpg` for images
 * @apiParam (Request Body Fields) {Number} [renditions.frame_rate="(same as source)"] frame rate in frames per second
 * @apiParam (Request Body Fields) {Number} [renditions.h264_bframes=0] number of bframes for h.264
 * @apiParam (Request Body Fields) {Number} [renditions.h264_level="(calculated)"] h.264 profile level
 * @apiParam (Request Body Fields) {String="baseline","main","high"} [renditions.h264_profile="baseline"] h.264 profile
 * @apiParam (Request Body Fields) {Number} [renditions.h264_reference_frames=3] number of h.264 reference frames to use
 * @apiParam (Request Body Fields) {Boolean} [renditions.hls_optimized_ts] Time segments optimized for HLS
 * @apiParam (Request Body Fields) {Number} [renditions.keyframe_interval] Maximum number of frames between keyframes (default is 250, and overrides keyframe_rate)
 * @apiParam (Request Body Fields) {Number} [renditions.keyframe_rate] Maximum number of keyframes per second
 * @apiParam (Request Body Fields) {String="poster","thumbnail"} [renditions.label] Image type for image renditions; __required__ for image renditions
 * @apiParam (Request Body Fields) {Boolean} [renditions.live_stream] Whether this will be for live streaming video
 * @apiParam (Request Body Fields) {Number{300-1800}} [renditions.live_sliding_window_duration=300] Duration of stream to keep available for LiveDVR delivery (in seconds)
 * @apiParam (Request Body Fields) {Number} [renditions.max_video_bitrate] Maximum video bitrate (h.264 only)
 * @apiParam (Request Body Fields) {Number} [renditions.max_frame_rate] Limits the frame rate rather than sets it, use as an alternative to frame rate
 * @apiParam (Request Body Fields) {String="video","audio","image"} [renditions.media_type="video"] the media type of the rendition
 * @apiParam (Request Body Fields) {Boolean} [renditions.one_pass=false] force one-pass encoding
 * @apiParam (Request Body Fields) {String} [renditions.reference_id] A reference id for the rendition that is unique within the account - required for DRM packaging
 * @apiParam (Request Body Fields) {Number} [renditions.segment_seconds=10] number of seconds of content to include in segments (the default for HLS is `10`; for DASH: `2`)
 * @apiParam (Request Body Fields) {Object} [renditions.skip] A set of conditions for skippiung creation of this rendition [see Conditional Output](https://support.brightcove.com/node/18040)
 * @apiParam (Request Body Fields) {Number} [renditions.skip.min_audio_bitrate] the minimum audio bitrate that the source must have (kbps)
 * @apiParam (Request Body Fields) {Number} [renditions.skip.max_audio_bitrate] the maximum audio bitrate that the source must have (kbps)
 * @apiParam (Request Body Fields) {Number} [renditions.skip.min_video_bitrate] the minimum video bitrate that the source must have (kbps)
 * @apiParam (Request Body Fields) {Number} [renditions.skip.max_video_bitrate] the maximum video bitrate that the source must have (kbps)
 * @apiParam (Request Body Fields) {Boolean} [renditions.skip.require_audio] if true the source must include an audio track
 * @apiParam (Request Body Fields) {Boolean} [renditions.skip.require_video] if true the source must include a video track
 * @apiParam (Request Body Fields) {String} [renditions.skip.min_size] the source must be at least this resolution - string of the form "widthxheight" (e.g. "400x225")
 * @apiParam (Request Body Fields) {String} [renditions.skip.max_size] the source must be at most this resolution - string of the form "widthxheight" (e.g. "1920x1080")
 * @apiParam (Request Body Fields) {Boolean} [renditions.skip_video] Set to `true` to skip video encoding for audio-only renditions
 * @apiParam (Request Body Fields) {Number=1-5} [renditions.speed=3] a target transcoding speed. Slower transcoding allows for more advanced file compression, while faster transcoding is possible by skipping some advanced compression features
 * @apiParam (Request Body Fields) {String} [renditions.streaming_delivery_format] Sets the format/protocol for an output that will be delivered using a specific streaming configuration, including necessary manifests, directory
 * @apiParam (Request Body Fields) {String} [renditions.streaming_delivery_profile="live"] Sets the profile of the streaming delivery format, ensuring options are selected for compatibility with the profile
 * @apiParam (Request Body Fields) {String} [renditions.type] transmuxing type for HLS; typical value is `segmented`
 * @apiParam (Request Body Fields) {Boolean} [renditions.upscale] whether to upsize the frames if the source frame size is smaller than the target
 * @apiParam (Request Body Fields) {Integer} renditions.video_bitrate target video bitrate in kbps
 * @apiParam (Request Body Fields) {String} renditions.video_codec target video codec
 * @apiParam (Request Body Fields) {Integer} renditions.height target frame height in pixels
 * @apiParam (Request Body Fields) {Integer} renditions.width target frame width in pixels
 * @apiParam (Request Body Fields) {Object[]} renditions.watermarks array of watermark maps
 * @apiParam (Request Body Fields) {String} renditions.watermarks.url URL for the watermark image
 * @apiParam (Request Body Fields) {String} renditions.watermarks.width width in pixels or percent of frame width; e.g. `20` or `10%` - decimal values like `10.5%` are __not__ permitted
 * @apiParam (Request Body Fields) {String} renditions.watermarks.height height in pixels or percent of frame width; e.g. `20` or `10%` - decimal values like `10.5%` are __not__ permitted
 * @apiParam (Request Body Fields) {String} renditions.watermarks.x distance from left edge to center of image as pixels or precent of frame width; e.g. `20` or `10%` (use negative values like `-10` to position the watermark relative to the right edge) - decimal values like `10.5%` are __not__ permitted
 * @apiParam (Request Body Fields) {String} renditions.watermarks.y distance from top edge to center if image as pixels or percent of frame height; e.g. `20` or `10%` (use negative values like `-10` to position the watermark relative to the bottom edge) - decimal values like `10.5%` are __not__ permitted
 * @apiParam (Request Body Fields) {Object[]} packages array of package maps for DRM (see [Content Security]( https://support.brightcove.com/node/18038))
 * @apiParam (Request Body Fields) {String[]} packages.drm for MPEG-DASH, array of DRM types to apply, e.g. `["widevine", "playready"]`
 * @apiParam (Request Body Fields) {String} packages.package_type for MPEG-DASH, the package type is `dash`; for other formats, the package type is the DRM type, e.g. `widevine`
 * @apiParam (Request Body Fields) {Mixed} packages.renditions for MPEG-DASH, the renditions will be set to the `reference_id` for a single rendition; for other formats, `renditions` is set equal to an array of rendition `reference_id`'s
 *
 *
 * @apiParamExample {json} Update Profile Example:
 *    {
 *      "account_id": "57838016001",
 *      "name": "Protected",
 *      "description": "This will produce 1 HLS rendition and 2 image renditions.",
 *      "renditions": [
 *        {
 *          "media_type": "video",
 *          "reference_id": "ts1",
 *          "format": "ts",
 *          "type": "segmented",
 *          "audio_codec": "aac",
 *          "audio_bitrate": 96,
 *          "video_codec": "h264",
 *          "keyframe_rate": 0.5,
 *          "max_frame_rate": 30,
 *          "width": 1280,
 *          "height": 720,
 *          "h264_profile": "main"
 *        },
 *        {
 *          "media_type": "image",
 *          "format": "png",
 *          "label": "poster",
 *          "width": 960,
 *          "height": 540
 *        },
 *        {
 *          "media_type": "image",
 *          "format": "png",
 *          "label": "thumbnail",
 *          "width": 160,
 *          "height": 90
 *        }
 *      ],
 *      "digital_master": {
 *            "rendition": "passthrough",
 *            "distribute": true
 *        },
 *      "packages": []
 *    }
 *
 * @apiSuccess (200) {String} id profile id
 * @apiSuccess (200) {String} name profile name
 * @apiSuccess (200) {Integer} date_created when the profile was created (epoch time in milliseconds)
 * @apiSuccess (200) {Integer} date_last_modified when the profile was last modified (epoch time in milliseconds)
 * @apiSuccess (200) {Number} account_id Video Cloud account ID.
 * @apiSuccess (200) {String} description description of the profile
 * @apiSuccess (200) {Object} digital_master directions for archiving masters
 * @apiSuccess (200) {String} digital_master.rendition rendition that will be used as master (`passthrough` = source optimized for online delivery)
 * @apiSuccess (200) {Boolean} digital_master.distribute whether source is available for playback as a rendition
 * @apiSuccess (200) {Object} dynamic_origin specification for Dynamic Delivery Options
 * @apiSuccess (200) {Array} dynamic_origin.renditions audio and video renditions to be created
 * @apiSuccess (200) {Object[]} dynamic_origin.images specification for poster and thumbnail images
 * @apiSuccess (200) {String} dynamic_origin.images.label the image type
 * @apiSuccess (200) {Integer} dynamic_origin.images.height the image height
 * @apiSuccess (200) {Integer} dynamic_origin.images.width the image width
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options defines rendition options for CAE profiles
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min_renditions minimum number of renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_renditions maximum number of renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.min-resolution defines the minimum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.width defines the minimum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.min-resolution.height defines the minimum height for renditions
 * @apiSuccess (200) {Object} dynamic_origin.dynamic_profile_options.max-resolution defines the maximum resolution for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.width defines the maximum width for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max-resolution.height defines the maximum height for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_bitrate maximum bitrate for renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_first_rendition_bitrate maximum bitrate for the lowest bitrate rendition
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.max_frame_rate maximum framerate for the renditions
 * @apiSuccess (200) {Integer} dynamic_origin.dynamic_profile_options.keyframe_rate keyframes per second for the renditions
 * @apiSuccess (200) {Boolean} dynamic_origin.dynamic_profile_options.select_baseline_profile_configuration whether at least one rendition used in the profile will be baseline profile
 * @apiSuccess (200) {Object[]} renditions array of rendition maps
 * @apiSuccess (200) {String} renditions.aspect_mode how to handle mismatch between source and rendition aspect ratio
 * @apiSuccess (200) {Integer} renditions.audio_bitrate audio bitrate in kbps
 * @apiSuccess (200) {Integer} renditions.audio_channels number of audio channels
 * @apiSuccess (200) {String} renditions.id the rendition id
 * @apiSuccess (200) {String} renditions.audio_codec audio codec, e.g. `aac`
 * @apiSuccess (200) {Boolean} renditions.constant_bitrate whether to use constant bitrate for encoding &mdash; this field is not relevant for h.264 video and will be ignored
 * @apiSuccess (200) {Integer} renditions.crf 1-51, not used by default.
 * @apiSuccess (200) {Integer} renditions.decoder_bitrate_cap In kbps, the max bitrate fed to the decoder
 * @apiSuccess (200) {String} renditions.encryption_method encryption_method to use, e.g. `aes-128`
 * @apiSuccess (200) {Integer} renditions.encryption_key_rotation_period use a different key for each set of segments, rotating to a new key after this many segments
 * @apiSuccess (200) {Integer} renditions.fixed_keyframe_interval Forces a keyframe every X frames, but still allows additional keyframes
 * @apiSuccess (200) {Integer} renditions.forced_keyframe_rate Force the keyframe rate, h264 only, ignored if forced_keyframe_interval is used
 * @apiSuccess (200) {String} renditions.format video format, e.g. `mp4`, `ts` (for HLS), flv, `m4f` for video, `png` or `jpg` for images
 * @apiSuccess (200) {Integer} renditions.frame_rate frame rate in frames per second
 * @apiSuccess (200) {Integer} renditions.h264_bframes number of bframes for h.264
 * @apiSuccess (200) {Integer} renditions.h264_level h.264 profile level
 * @apiSuccess (200) {String} renditions.h264_profile h.264 profile
 * @apiSuccess (200) {Integer} renditions.h264_reference_frames number of h.264 reference frames to use
 * @apiSuccess (200) {Boolean} renditions.hls_optimized_ts Time segments optimized for HLS
 * @apiSuccess (200) {Integer} renditions.keyframe_interval Maximum number of frames between keyframes (default is 250, and overrides keyframe_rate)
 * @apiSuccess (200) {Integer} renditions.keyframe_rate Maximum number of keyframes per second
 * @apiSuccess (200) {String} renditions.label Image type for image renditions; __required__ for image renditions
 * @apiSuccess (200) {Boolean} renditions.live_stream Whether this will be for live streaming video
 * @apiSuccess (200) {Integer} renditions.live_sliding_window_duration Duration of stream to keep available for LiveDVR delivery (in seconds)
 * @apiSuccess (200) {Integer} renditions.max_video_bitrate Maximum video bitrate (h.264 only)
 * @apiSuccess (200) {Integer} renditions.max_frame_rate Limits the frame rate rather than sets it, use as an alternative to frame rate
 * @apiSuccess (200) {String} renditions.media_type the media type of the rendition
 * @apiSuccess (200) {Boolean} renditions.one_pass force one-pass encoding
 * @apiSuccess (200) {String} renditions.package_format Creates a zip or tar file containing all the media files of an output, and uploads this single package rather than all the individual files
 * @apiSuccess (200) {String} renditions.reference_id A reference id for the rendition that is unique within the account - required for DRM packaging
 * @apiSuccess (200) {Object} renditions.skip A set of conditions for skippiung creation of this rendition [see Conditional Output](https://support.brightcove.com/node/18040)
 * @apiSuccess (200) {Integer} renditions.skip.min_audio_bitrate the minimum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_audio_bitrate the maximum audio bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.min_video_bitrate the minimum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Integer} renditions.skip.max_video_bitrate the maximum video bitrate that the source must have (kbps)
 * @apiSuccess (200) {Boolean} renditions.skip.require_audio if true the source must include an audio track
 * @apiSuccess (200) {Boolean} renditions.skip.require_video if true the source must include a video track
 * @apiSuccess (200) {String} renditions.skip.min_size the source must be at least this resolution - string of the form "widthxheight" (e.g. "400x225")
 * @apiSuccess (200) {String} renditions.skip.max_size the source must be at most this resolution - string of the form "widthxheight" (e.g. "1920x1080")
 * @apiSuccess (200) {Boolean} renditions.skip_video Set to `true` to skip video encoding for audio-only renditions
 * @apiSuccess (200) {Integer} renditions.speed a target transcoding speed. Slower transcoding allows for more advanced file compression, while faster transcoding is possible by skipping some advanced compression features
 * @apiSuccess (200) {String} renditions.streaming_delivery_format Sets the format/protocol for an output that will be delivered using a specific streaming configuration, including necessary manifests, directory
 * @apiSuccess (200) {String} renditions.streaming_delivery_profile Sets the profile of the streaming delivery format, ensuring options are selected for compatibility with the profile
 * @apiSuccess (200) {String} renditions.type transmuxing type for HLS; typical value is `segmented`
 * @apiSuccess (200) {Boolean} renditions.upscale whether to upsize the frames if the source frame size is smaller than the target
 * @apiSuccess (200) {Integer} renditions.video_bitrate target video bitrate in kbps
 * @apiSuccess (200) {String} renditions.video_codec target video codec
 * @apiSuccess (200) {Integer} renditions.height target frame height in pixels
 * @apiSuccess (200) {Integer} renditions.width target frame width in pixels
 * @apiSuccess (200) {Object[]} renditions.watermarks array of watermark maps
 * @apiSuccess (200) {String} renditions.watermarks.url URL for the watermark image
 * @apiSuccess (200) {String} renditions.watermarks.width width in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.height height in pixels or percent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.x distance from left edge to center of image as pixels or precent of frame width; e.g. `20` or `10%`
 * @apiSuccess (200) {String} renditions.watermarks.y distance from top edge to center if image as pixels or percent of frame height; e.g. `20` or `10%`
 * @apiSuccess (200) {Object[]} packages array of package maps for DRM (see [Content Security](https://support.brightcove.com/node/18038))
 * @apiSuccess (200) {String[]} packages.drm for MPEG-DASH, array of DRM types to apply, e.g. `["widevine", "playready"]`
 * @apiSuccess (200) {String} packages.package_type for MPEG-DASH, the package type is `dash`; for other formats, the package type is the DRM type, e.g. `widevine`
 * @apiSuccess (200) {Mixed} packages.renditions for MPEG-DASH, the renditions will be set to the `reference_id` for a single rendition; for other formats, `renditions` is set equal to an array of rendition `reference_id`'s
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 201 Created
 *    {
 *        "account_id": 57838016001,
 *        "brightcove_standard": false,
 *        "date_created": 1443700501852,
 *        "date_last_modified": 1443700501852,
 *        "description": "This will produce 1 HLS rendition and 2 image renditions.",
 *        "digital_master": {
 *            "distribute": true,
 *            "rendition": "passthrough"
 *        },
 *        "id": "560d1f15e4b05e8c5d7fa5c4",
 *        "name": "Protected",
 *        "packages": [],
 *        "renditions": [
 *            {
 *                "audio_bitrate": 96,
 *                "audio_codec": "aac",
 *                "format": "ts",
 *                "h264_profile": "main",
 *                "height": 720,
 *                "id": "560d1f15e4b05e8c5d7fa5c1",
 *                "keyframe_rate": 0.5,
 *                "max_frame_rate": 30.0,
 *                "media_type": "video",
 *                "reference_id": "ts1",
 *                "type": "segmented",
 *                "video_codec": "h264",
 *                "width": 1280
 *            },
 *            {
 *                "format": "png",
 *                "height": 540,
 *                "id": "560d1f15e4b05e8c5d7fa5c2",
 *                "label": "poster",
 *                "media_type": "image",
 *                "width": 960
 *            },
 *            {
 *                "format": "png",
 *                "height": 90,
 *                "id": "560d1f15e4b05e8c5d7fa5c3",
 *                "label": "thumbnail",
 *                "media_type": "image",
 *                "width": 160
 *            }
 *        ],
 *        "version": 1443700501853
 *    }
 *
 * @apiError (Error 4xx) {string} BAD_REQUEST 400: Invalid JSON &mdash; message varies according to the problem
 * @apiError (Error 4xx) {string} BAD_REQUEST 400: Reference id is already in use - &mdash; message varies according to the problem
 * @apiError (Error 4xx) {string} CONFLICT 409: Could not create profile with this name and id (profile name or id already exists)
 * @apiError (Error 4xx) {json} UNPROCESSABLE_ENTITY 422: required field missing &mdash; message varies according to the issue
 * @apiError (Error 4xx) {json} NOT_AUTHORIZED 401: Credentials are required to access this resource.
 * @apiError (Error 4xx) {string} NOT_FOUND 404:  Resource not found
 *
 * @apiErrorExample {string} 400 Invalid JSON
 *     HTTP/1.1 400 BAD_REQUEST
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 400 Unrecognized token 'true': was expecting 'null', 'true', 'false' or NaN</title> </head>
*    <body><h2>HTTP ERROR 400</h2>
*    <p>Problem accessing /v1/accounts/57838016001/profiles. Reason: <pre> Unrecognized token 'true': was expecting 'null', 'true', 'false' or NaN</pre></p>
*     </body> </html>
 * @apiErrorExample {string} 400 BAD_REQUEST
 *     HTTP/1.1 400 Duplicate reference_id
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 400 rendition list contains duplicate reference ID: ts1 (through reference chain: com.brightcove.profiles.common.model.Profile["renditions"])</title> </head>
*    <body><h2>HTTP ERROR 400</h2>
*    <p>Problem accessing /v1/accounts/57838016001/profiles. Reason: <pre> rendition list contains duplicate reference ID: ts1 (through reference chain: com.brightcove.profiles.common.model.Profile["renditions"])</pre></p>
*     </body> </html>
 * @apiErrorExample {string} 400 BAD_REQUEST
 *     HTTP/1.1 409 CONFLICT
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 422 Unprocessable_Entity</title> </head>
*    <body><h2>HTTP ERROR 422</h2> <p>Problem accessing /v1/accounts/57838016001/profiles. Reason: <pre> Unprocessable_Entity</pre></p>
*    <h2>The request entity had the following errors:</h2>
*    <ul><li>renditions[0].format may not be null (was null)</li></ul> </body> </html>
 * @apiErrorExample {json} 422 CONFLICT
 *     HTTP/1.1 422 Missing Required Field
 *    [
 *        {
 *            "code": "CONFLICT",
 *            "message": "Could not create profile with this name and id"
 *        }
 *    ]
 * @apiErrorExample {json} 401 NOT_AUTHORIZED
 *     HTTP/1.1 401 NOT_AUTHORIZED
 *     [
 *         {
 *            "error_code": "NOT_AUTHORIZED",
 *            "message": "Credentials are required to access this resource."
 *         }
 *     ]
 * @apiErrorExample {string} 404 Error Response
 *    HTTP/1.1 404 NOT_FOUND
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 404 NOT_FOUND</title> </head>
*    <body><h2>HTTP ERROR 404</h2> <p>Problem accessing /v1/accounts/57838016001/profiles/527d210ae4b0. Reason: <pre> NOT_FOUND</pre></p>
*     </body> </html>
 *
 *
 */

// delete profile

/**
 * @api {delete} /accounts/:account_id/profiles/:profile_id Delete Ingest Profile
 * @apiName Delete Ingest Profile
 * @apiGroup Profile
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete an ingest profile
 *
 * @apiHeader {String} Content-Type Content-Type: application/json
 * @apiHeader {String} Authorization Authorization: Bearer access_token (see [Getting Access Tokens](https://support.brightcove.com/node/17925))
 *
 * @apiParam {String} account_id Video Cloud account ID.
 * @apiParam {String} profile_id Video Cloud account ID.
 *
 *
 * @apiParamExample {String} Get Profiles Example:
 *    https://ingestion.api.brightcove.com/v1/accounts/57838016001/profiles/527d210ae4b0024db7acb05c
 *
 *
 * @apiSuccessExample {json} Success Response:
 *    HTTP/1.1 204 NO CONTENT
 *    {
 *      "id": "510fd4e6e4b0c9164cbe9b60",
 *      "version": 1423840467728,
 *      "name": "single-rendition",
 *      "account_id": -1,
 *      "brightcove_standard": false,
 *      "date_created": 1359992038155,
 *      "date_last_modified": 1423840467726,
 *      "renditions": [
 *        {
 *          "media_type": "video",
 *          "id": "54de14d3e4b0f66e5c937eb3",
 *          "format": "mp4",
 *          "audio_codec": "aac",
 *          "audio_bitrate": 128,
 *          "video_codec": "h264",
 *          "speed": 3,
 *          "video_bitrate": 600,
 *          "keyframe_rate": 0.5,
 *          "max_frame_rate": 30,
 *          "width": 480,
 *          "height": 360,
 *          "h264_profile": "baseline"
 *        },
 *        {
 *          "media_type": "image",
 *          "id": "54d02903e4b0c948249cb2a7",
 *          "format": "png",
 *          "label": "poster",
 *          "width": 480,
 *          "height": 360
 *        },
 *        {
 *          "media_type": "image",
 *          "id": "54d02903e4b0c948249cb2a8",
 *          "format": "png",
 *          "label": "thumbnail",
 *          "width": 160,
 *          "height": 90
 *        }
 *      ],
 *      "packages": []
 *    }
 *
 * @apiError (Error 4xx) {json} NOT_AUTHORIZED 401: Credentials are required to access this resource.
 * @apiError (Error 4xx) {string} NOT_FOUND 404:  Resource not found
 *
 * @apiErrorExample {json} 409 Error Response
 *     HTTP/1.1 401 NOT_AUTHORIZED
 *     [
 *         {
 *            "error_code": "NOT_AUTHORIZED",
 *            "message": "Credentials are required to access this resource."
 *         }
 *     ]
 *
 * @apiErrorExample {string} 404 Error Response
 *    HTTP/1.1 404 NOT_FOUND
 *    <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
*    <title>Error 404 NOT_FOUND</title> </head>
*    <body><h2>HTTP ERROR 404</h2> <p>Problem accessing /v1/accounts/57838016001/profiles/527d210ae4b0. Reason: <pre> NOT_FOUND</pre></p>
*     </body> </html>

 *
 *
 */
