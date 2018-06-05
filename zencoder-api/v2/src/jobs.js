// Create a Job

/**
 * @api {post} /v2/jobs Create a Job
 * @apiName Create a Job
 * @apiGroup Jobs
 * @apiVersion 2.0.0
 *
 * @apiDescription Encoding jobs are created by sending an HTTP POST request to https://app.zencoder.com/api/v2/jobs. The post body must include two things: the URL of a video to process and your API key. It may also include output settings for the job, including an output destination, notification settings, and transcoding settings.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json or application/xml
 * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
 *
 * @apiParam (Request Body Fields) {String} [api_key] API key for your Zencoder account (must be included here if not passed as a header, which is the recommended way) - get your API key from (https://app.zencoder.com/api)
 * @apiParam (Request Body Fields) {String} input A valid URL to a media file (HTTP/HTTPS, FTP/FTPS, SFTP, Azure, GCS, CF or S3), with or without authentication
 * @apiParam (Request Body Fields) {Boolean} [live_stream=false] Create a Live streaming job
 * @apiParam (Request Body Fields) {string="us", "europe", "asia", "sa", "australia", "us-virginia", "us-oregon", "us-n-california", "eu-dublin", "asia-singapore", "asia-tokyo", "sa-saopaulo", "australia-sydney", "us-central-gce", "eu-west-gce",  "asia-east-gce"} [region="us"] The AWS region or Google Compute Engine instance (beta) where Zencoder should process the job
 * @apiParam (Request Body Fields) {Boolean} [test=false] Enable test mode ("Integration Mode") for a job
 * @apiParam (Request Body Fields) {Boolean} [private=false] Enable privacy mode for a job
 * @apiParam (Request Body Fields) {Number} [download_connections=5] Utilize multiple, simultaneous connections for download acceleration (in some circumstances)
 * @apiParam (Request Body Fields) {String} [pass_through] Optional information to store alongside this job
 * @apiParam (Request Body Fields) {Boolean} [mock=false] Send a mocked job request
 * @apiParam (Request Body Fields) {String} [grouping] A report grouping for this job
 * @apiParam (Request Body Fields) {String} [aspera_transfer_policy="fair"] How to allocate available bandwidth for Aspera file transfers
 * @apiParam (Request Body Fields) {Number} [transfer_minimum_rate=1000] A targeted rate in Kbps for data transfer minimums
 * @apiParam (Request Body Fields) {Number} [transfer_maximum_rate=250000] A targeted rate in Kbps for data transfer maximums
 * @apiParam (Request Body Fields) {String} [credentials] References saved credentials by a nickname
 * @apiParam (Request Body Fields) {String[]} [notifications] An array of notification strings (valid email addresses or URLs), or hashes of url and format
 * @apiParam (Request Body Fields) {String} [notifications.url] A valid HTTP or HTTPS URL to notify, optionally including HTTP Auth credentials
 * @apiParam (Request Body Fields) {String="json", "xml"} [notifications.format] A format and content type for notifications
 * @apiParam (Request Body Fields) {Object} [notifications.headers] By default, HTTP notifications are sent with an HTTP Content-Type, along with a User-Agent; if your application requires additional headers, they can be specified here
 * @apiParam (Request Body Fields) {String="first_segment_uploaded", "seamless_playback"} [notifications.event] Live outputs have additional notification events corresponding to the progress of the file
 * @apiParam (Request Body Fields) {Object[]} [outputs] Array of output specifications
 * @apiParam (Request Body Fields) {String="standard", "segmented", "playlist", "transfer-only"} [outputs.type="standard"] The type of file to output
 * @apiParam (Request Body Fields) {String} [outputs.label] An optional label for this output - should be unique for the job
 * @apiParam (Request Body Fields) {String} [outputs.url] A S3, Cloud Files, GCS, FTP, FTPS, SFTP, Aspera, Azure, HTTP, or RTMP URL where Zencoder will put the transcoded file
 * @apiParam (Request Body Fields) {String} [outputs.secondary_url] A S3, Cloud Files, GCS, FTP, FTPS, SFTP, Aspera, Azure, HTTP, or RTMP URL where Zencoder will put the transcoded file
 * @apiParam (Request Body Fields) {String} [outputs.base_url] A base S3, Cloud Files, GCS, FTP, FTPS, SFTP, Azure, or Aspera directory URL where Zencoder put the transcoded file, without a filename
 * @apiParam (Request Body Fields) {String} [outputs.filename] The filename of a finished file
 * @apiParam (Request Body Fields) {String} [outputs.package_filename] The filename of a packaged output
 * @apiParam (Request Body Fields) {String="zip", "tar"} [outputs.package_format] Zip/packaging format to use for the output file(s)
 * @apiParam (Request Body Fields) {String="mobile/advanced", "mobile/baseline", "mobile/legacy", "v1/mobile/advanced", "v1/mobile/baseline", "v1/mobile/legacy", "v2/mobile/advanced", "v2/mobile/baseline", "v2/mobile/legacy"} [outputs.device_profile] A device profile to use for mobile device compatibility
 * @apiParam (Request Body Fields) {Boolean} [outputs.strict=false] Enable strict mode
 * @apiParam (Request Body Fields) {Object} [outputs.master_display] Hash of HDR10 output settings
 * @apiParam (Request Body Fields) {Object} [outputs.master_display.red] Hash of red color volumes for HDR10 output settings
 * @apiParam (Request Body Fields) {Number{0.0001-0.7400}} [outputs.master_display.red.x] Color volume x setting for red (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Number{0.0001-0.8400}} [outputs.master_display.red.y] Color volume y setting for red (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Object} [outputs.master_display.green] Hash of green color volumes for HDR10 output settings
 * @apiParam (Request Body Fields) {Number{0.0001-0.7400}} [outputs.master_display.green.x] Color volume x setting for green (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Number{0.0001-0.8400}} [outputs.master_display.green.y] Color volume y setting for green (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Object} [outputs.master_display.blue] Hash of blue color volumes for HDR10 output settings
 * @apiParam (Request Body Fields) {Number{0.0001-0.7400}} [outputs.master_display.blue.x] Color volume x setting for blue (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Number{0.0001-0.8400}} [outputs.master_display.blue.y] Color volume y setting for blue (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Object} [outputs.master_display.white_point] Hash of white point color volumes for HDR10 output settings
 * @apiParam (Request Body Fields) {Number{0.0001-0.7400}} [outputs.master_display.white_point.x] Color volume x setting for white point (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Number{0.0001-0.8400}} [outputs.master_display.white_point.y] Color volume y setting for white point (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Object} [outputs.master_display.luminance Hash of luminance settings for HDR10 output settings
 * @apiParam (Request Body Fields) {Number{0.0001-5.0}} [outputs.master_display.luminance.min] Minimum luminance in nits or candelas per square meter (cd/m2) (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Number{5.0-10000.0}} [outputs.master_display.luminance.max] Maximum luminance in nits or candelas per square meter (cd/m2) (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Number{0-10000}} [outputs.max_content_light_level] Maximum light level for the content as a whole nits or candelas per square meter (cd/m2) - integer values (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Number{5.0-10000.0}} [outputs.max_frame_average_light_level] Maximum average light level for content frames nits or candelas per square meter (cd/m2) - integer values. Although values up to 10000 are allowed, values in the 100-200 range will generally produce the best results (for HDR10 outputs)
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip_video=false] Do not output a video track
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip_audio=false] Do not output a audio track
 * @apiParam (Request Body Fields) {String} [outputs.source] References a label on another job and uses the video created by that output for processing instead of the input file
 * @apiParam (Request Body Fields) {String} [outputs.credentials] References saved credentials by a nickname
 * @apiParam (Request Body Fields) {Boolean} [outputs.generate_md5_checksum=false] Generate an MD5 checksum of the output file
 * @apiParam (Request Body Fields) {Number} [outputs.parallel_upload_limit] The maximum number of simultaneous uploads to attempt - defaults: `30` for S3, `10` for other destinations
 * @apiParam (Request Body Fields) {Object} [outputs.drm] Object containing DRM options
 * @apiParam (Request Body Fields) {String="cenc","playready"} [drm.method] The Digital Rights Management (DRM) method used to protect content
 * @apiParam (Request Body Fields) {String="buydrm"} [drm.provider] The Digital Rights Management (DRM) provider used. **Only required for PlayReady**
 * @apiParam (Request Body Fields) {String} [outputs.drm.user_key] The user key from the DRM provider - 32 hexadecimal characters (with optional dashes)
 * @apiParam (Request Body Fields) {String} [outputs.drm.server_key] The server key from the DRM provider - 32 hexadecimal characters (with optional dashes)
 * @apiParam (Request Body Fields) {String} [outputs.drm.content_id] Unique identifier for the content - 32 hexadecimal characters (with optional dashes)
 * @apiParam (Request Body Fields) {Object} [outputs.headers] HTTP headers to send with your file when we upload it - this feature is currently supported when using S3, GCS and Cloud Files
 * @apiParam (Request Body Fields) {Boolean} [outputs.rtmp_keep_alive=false] Send empty script packets in an RTMP output when no data is being recieved
 * @apiParam (Request Body Fields) {String} [outputs.format] The output format to use - defaults determined by the output filename and then video or audio codec; otherwise: `mp4` (for standard outputs); `ts` (for segmented outputs)
 * @apiParam (Request Body Fields) {String} [outputs.video_bit_depth] The number of bits per color channel to use - valid values are `8`, `10`, and `12` - Normally you wouldn't set this and instead would specify the video_codec_profile which would provide the bit depth
 * @apiParam (Request Body Fields) {String} [outputs.video_codec] The video codec to use - defaults determined by the format, profile, or audio_codec; `h264` if none are provided
 * @apiParam (Request Body Fields) {String} [outputs.video_codec_profile] Sets the encoding profile used by the video codec; defaults: H.264: `baseline`, HEVC: `main`, VP9: `0` - see (https://support.brightcove.com/encoding-settings-video#bc-ipnav-1) for more details
 * @apiParam (Request Body Fields) {String} [outputs.audio_codec] The audio codec to use - defaults determined by the format, profile, or video_codec; `aac` if none are provided
 * @apiParam (Request Body Fields) {String} [outputs.size] The resolution of the output video (WxH, in pixels)
 * @apiParam (Request Body Fields) {Number} [outputs.width] The maximum width of the output video (in pixels)
 * @apiParam (Request Body Fields) {Number} [outputs.height] The maximum height of the output video (in pixels)
 * @apiParam (Request Body Fields) {Boolean} [outputs.upscale=false] Upscale the output if the input is smaller than the target output resolution
 * @apiParam (Request Body Fields) {String="preserve", "stretch", "crop", "pad"} [outputs.aspect_mode="preserve"] What to do when aspect ratio of input file does not match the target width/height aspect ratio
 * @apiParam (Request Body Fields) {String} [outputs.sample_aspect_ratio] The sample (pixel) aspect ratio to be used for the output video. The size, width, height, and aspect_mode mode options all refer to the encoded pixel dimensions, not the display dimensions - sets the aspect ratio to use for sample/pixels of the output video, specified as `"8:9"`, `"32:27"`, or any other ratio of two positive integers, each between 1 and 65535
 * @apiParam (Request Body Fields) {Number{1-5}} [outputs.quality=3] Autoselect the best video bitrate to to match a target visual quality
 * @apiParam (Request Body Fields) {Number} [outputs.video_bitrate] A target video bitrate in kbps - not necessary if you select a quality setting, unless you want to target a specific bitrate
 * @apiParam (Request Body Fields) {Number{1-5}} [outputs.audio_quality=3] Autoselect the best audio bitrate to to match a target sound quality
 * @apiParam (Request Body Fields) {Number} [outputs.audio_bitrate] A target audio bitrate in kbps - not necessary if you select a audio_quality setting, unless you want to target a specific bitrate
 * @apiParam (Request Body Fields) {Number} [outputs.max_video_bitrate] A maximum average bitrate
 * @apiParam (Request Body Fields) {Number{1-5}} [outputs.speed=3] A target transcoding speed - slower encoding generally allows for more advanced compression
 * @apiParam (Request Body Fields) {Number} [outputs.decoder_bitrate_cap] Max bitrate fed to decoder buffer - typically used for video intended for streaming, or for targeting specific devices (e.g. Blu-Ray)
 * @apiParam (Request Body Fields) {Number} [outputs.decoder_buffer_size] Size of the decoder buffer, used in conjunction with bitrate_cap
 * @apiParam (Request Body Fields) {Boolean} [outputs.one_pass=false] Force one-pass encoding
 * @apiParam (Request Body Fields) {Boolean} [outputs.audio_constant_bitrate=false] Enable constant bitrate mode for audio if possible
 * @apiParam (Request Body Fields) {Number} [outputs.frame_rate] The frame rate to use - defaults to original (input) frame rate
 * @apiParam (Request Body Fields) {Number} [outputs.max_frame_rate] The maximum frame rate to use
 * @apiParam (Request Body Fields) {Number} [outputs.decimate] Reduce the input frame rate by a divisor
 * @apiParam (Request Body Fields) {Number} [outputs.keyframe_interval=250] The maximum number of frames between each keyframe
 * @apiParam (Request Body Fields) {Number} [outputs.keyframe_rate] The number of keyframes per second
 * @apiParam (Request Body Fields) {Boolean} [outputs.fixed_keyframe_interval=false] Enable fixed keyframe interval mode (VP6, VP8, VP9 and H.264 only)
 * @apiParam (Request Body Fields) {Number} [outputs.forced_keyframe_interval] Force keyframes at the specified interval (H.264 only)
 * @apiParam (Request Body Fields) {Number} [outputs.forced_keyframe_rate] Specify the number of keyframes per-second, taking frame rate into account (H.264 only)
 * @apiParam (Request Body Fields) {Boolean} [outputs.generate_frame_index=false] Generate a video frame index file
 * @apiParam (Request Body Fields) {String} [outputs.frame_index_filename] Override the default filename for the frame index when `generate_frame_index` is enabled
 * @apiParam (Request Body Fields) {Number{0-16}} [outputs.video_reference_frames=3] A number of reference frames to use (H.264, HEVC) - you can also use the string `auto`
 * @apiParam (Request Body Fields) {String="H.264", "HEVC", "VP9"} [outputs.video_codec_profile] The video codec profile to use - defaults: H.264: `baseline`, HEVC: `main`, VP9: `0`
 * @apiParam (Request Body Fields) {String} [outputs.video_codec_level] The video codec level to use (H.264, HEVC) - the default is automatically calculated using a level chart based on the output video
 * @apiParam (Request Body Fields) {Number{0-16}} [outputs.video_bframes=0] The maximum number of consecutive B-frames (H.264, HEVC)
 * @apiParam (Request Body Fields) {String="preserve", "discard"} [outputs.color_metadata="preserve"] Preserve or discard color metadata information from the input in the output video
 * @apiParam (Request Body Fields) {Number} [outputs.audio_sample_rate] The audio sample rate, in Hz
 * @apiParam (Request Body Fields) {Number{1-2}} [outputs.audio_channels] The number of audio channels - defaults to `1` if the source is mono, otherwise `2`
 * @apiParam (Request Body Fields) {Number=16,24,32} [outputs.audio_bit_depth] The number of bits per sample
 * @apiParam (Request Body Fields) {String} [outputs.audio_language] Describes the language of the audio track
 * @apiParam (Request Body Fields) {Object} [outputs.input_audio_channels] Sets the input audio tracks-to-channels layout
 * @apiParam (Request Body Fields) {Object} [outputs.output_audio_channels] Sets the output audio tracks-to-channels layout
 * @apiParam (Request Body Fields) {Object[]} [outputs.thumbnails] Defines a set of thumbnails to be captured for each output
 * @apiParam (Request Body Fields) {String} [outputs.thumbnails.label] A label to identify each set of thumbnail groups
 * @apiParam (Request Body Fields) {String="png", "jpg"} [outputs.thumbnails.format="png"] The format of the thumbnail image
 * @apiParam (Request Body Fields) {String="png","jpg"} [outputs.thumbnails.format="png"] Format for the thumbnails
 * @apiParam (Request Body Fields) {Number} [outputs.thumbnails.number] A number of thumbnails, evenly-spaced
 * @apiParam (Request Body Fields) {Boolean} [outputs.thumbnails.start_at_first_frame=false] Start generating the thumbnails starting at the first frame
 * @apiParam (Request Body Fields) {Number} [outputs.thumbnails.interval] Take thumbnails at an even interval, in seconds
 * @apiParam (Request Body Fields) {Number} [outputs.thumbnails.interval_in_frames] Take thumbnails at an even interval, in frames
 * @apiParam (Request Body Fields) {Number[]} [outputs.thumbnails.times] An array of times, in seconds, at which to grab a thumbnail
 * @apiParam (Request Body Fields) {String="preserve", "stretch", "crop", "pad"} [outputs.thumbnails.aspect_mode="preserve"] How to handle a thumbnail width/height that differs from the aspect ratio of the input file
 * @apiParam (Request Body Fields) {String} [outputs.thumbnails.size] Thumbnail resolution as WxH
 * @apiParam (Request Body Fields) {Number} [outputs.thumbnails.width] The maximum width of the thumbnail (in pixels)
 * @apiParam (Request Body Fields) {Number} [outputs.thumbnails.height] The maximum height of the thumbnail (in pixels)
 * @apiParam (Request Body Fields) {String} [outputs.thumbnails.base_url] A base S3, Cloud Files, GCS, FTP, FTPS, or SFTP directory URL where Zencoder will place the thumbnails, without a filename
 * @apiParam (Request Body Fields) {String} [outputs.thumbnails.prefix] Prefix for thumbnail filenames
 * @apiParam (Request Body Fields) {String} [outputs.thumbnails.filename] Interpolated thumbnail filename
 * @apiParam (Request Body Fields) {Boolean} [outputs.thumbnails.public=false] Make the output publicly readable on S3
 * @apiParam (Request Body Fields) {Object[]} [outputs.thumbnails.access_control] Fine-grained access control rules for files sent to S3
 * @apiParam (Request Body Fields) {String="READ", "READ_ACP", "WRITE_ACP", "FULL_CONTROL"} [outputs.thumbnails.access_control.permission] A string or array of strings containing: `READ`, `READ_ACP`, `WRITE_ACP`, or `FULL_CONTROL`
 * @apiParam (Request Body Fields) {String} [outputs.thumbnails.access_control.grantee] A valid S3 grantee (email, ID, or URI)
 * @apiParam (Request Body Fields) {Boolean} [outputs.thumbnails.rrs=false] Amazon S3's Reduced Redundancy Storage
 * @apiParam (Request Body Fields) {Object} [outputs.thumbnails.headers] HTTP headers to send with your file when we upload it - this feature is currently supported when using S3, GCS and Cloud Files
 * @apiParam (Request Body Fields) {String} [outputs.thumbnails.credentials] References saved credentials by a nickname
 * @apiParam (Request Body Fields) {Number} [outputs.thumbnails.parallel_upload_limit] The maximum number of simultaneous uploads to attempt - defaults: `30` for S3, `10` for other destinations
 * @apiParam (Request Body Fields) {Object[]} [outputs.watermarks] Add one or more watermarks to an output video
 * @apiParam (Request Body Fields) {String} [outputs.watermarks.url] The URL of a remote image file to use as a watermark
 * @apiParam (Request Body Fields) {Number} [outputs.watermarks.x=-10] Where to place a watermark, on the x axis
 * @apiParam (Request Body Fields) {Number} [outputs.watermarks.y=-10] Where to place a watermark, on the y axis
 * @apiParam (Request Body Fields) {Mixed} [outputs.watermarks.width] The scaled width of a watermark - number of pixels (`100`)) or percentage of video width (`"10%"`)
 * @apiParam (Request Body Fields) {Mixed} [outputs.watermarks.height] The scaled height of a watermark - number of pixels (`10`)) or percentage of video width (`"5%"`)
 * @apiParam (Request Body Fields) {String="content", "frame"} [outputs.watermarks.origin] Which part of the output to base the watermark position on - this only affects jobs where aspect_mode is `pad`
 * @apiParam (Request Body Fields) {Number{0.0-1.0}} [outputs.watermarks.opacity] Make the watermark transparent
 * @apiParam (Request Body Fields) {String} [outputs.captions_url] URL to an SCC, DFXP, or SAMI caption file to include in the output
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip_captions=false] Don't add or pass through captions to the output file
 * @apiParam (Request Body Fields) {Boolean} [outputs.live_stream=false] Create a live_stream job or output that is ready for playback within seconds
 * @apiParam (Request Body Fields) {Number} [outputs.reconnect_time=30] The time, in seconds, to wait for a stream to reconnect
 * @apiParam (Request Body Fields) {Number} [outputs.event_length] The minimum time, in seconds, to keep a live stream available
 * @apiParam (Request Body Fields) {Number} [outputs.live_sliding_window_duration=7200] The time, in seconds, to keep in the HLS playlist
 * @apiParam (Request Body Fields) {Boolean} [outputs.redundant_transcode=false] Create a backup job that processes secondary outputs in a redundant transcoding region
 * @apiParam (Request Body Fields) {Number=0, 90, 180, 270} [outputs.rotate] Rotate a video by number of degrees given; by default Zencoder examines the video and determines the amount of rotation needed
 * @apiParam (Request Body Fields) {String="on", "off", "detect"} [outputs.deinterlace="detect"] Deinterlace input video
 * @apiParam (Request Body Fields) {Boolean} [outputs.sharpen=false] Apply a sharpen filter
 * @apiParam (Request Body Fields) {String="weak", "medium", "strong", "strongest"} [outputs.denoise] Apply a denoise filter
 * @apiParam (Request Body Fields) {Boolean} [outputs.autolevel=false] Apply a color auto-level filter
 * @apiParam (Request Body Fields) {Boolean} [outputs.deblock=false] Apply deblock filter
 * @apiParam (Request Body Fields) {Number{-60-60}} [outputs.audio_gain] Apply a gain amount to the audio, in dB
 * @apiParam (Request Body Fields) {Boolean} [outputs.audio_normalize=false] Normalize audio to 0dB
 * @apiParam (Request Body Fields) {Boolean} [outputs.audio_pre_normalize=false] Normalize the audio before applying expansion or compression effects
 * @apiParam (Request Body Fields) {Boolean} [outputs.audio_post_normalize=false] Normalize the audio after applying expansion or compression effects
 * @apiParam (Request Body Fields) {Number{-10-10}} [outputs.audio_bass] Increase or decrease the amount of bass in the audio
 * @apiParam (Request Body Fields) {Number{-10-10}} [outputs.audio_treble] Increase or decrease the amount of treble in the audio
 * @apiParam (Request Body Fields) {Number{5-24000}} [outputs.audio_highpass] Apply a high-pass filter to the audio (in Hz)
 * @apiParam (Request Body Fields) {Number{5-24000}} [outputs.audio_lowpass] Apply a low-pass filter to the audio (in Hz)
 * @apiParam (Request Body Fields) {Number{1.0-30.0}} [outputs.audio_compression_ratio] Compress the dynamic range of the audio
 * @apiParam (Request Body Fields) {Number{-120-0}} [outputs.audio_compression_threshold=-20] Compress the dynamic range of the audio
 * @apiParam (Request Body Fields) {Number{1.0-30.0}} [outputs.audio_expansion_ratio] Expand the dynamic range of the audio
 * @apiParam (Request Body Fields) {Number{-120-0}} [outputs.audio_expansion_threshold=-35] Expand the dynamic range of the audio
 * @apiParam (Request Body Fields) {Number{1.0-30.0}} [outputs.audio_fade] Apply fade-in and fade-out effects to the audio
 * @apiParam (Request Body Fields) {Number{1.0-30.0}} [outputs.audio_fade_in] Apply a fade-in effect to the audio
 * @apiParam (Request Body Fields) {Number{1.0-30.0}} [outputs.audio_fade_out] Apply a fade-out effect to the audio
 * @apiParam (Request Body Fields) {Number{-60-60}} [outputs.audio_loudness_level] Adjust the loudness level of the audio. This is measured in LUFS and specified in dB. This is useful to set the output loudness level to conform to a standard (-23dB for EBU R.128)
 * @apiParam (Request Body Fields) {Boolean} [outputs.audio_karaoke_mode=false] Apply a karaoke effect to the audio
 * @apiParam (Request Body Fields) {Mixed} [outputs.start_clip] Encode only a portion of the input file by setting a custom start time - may be entered as a string in HH:MM:SS.S format or as a number in seconds
 * @apiParam (Request Body Fields) {Mixed} [outputs.clip_length] Encode only a portion of the input file by setting a custom clip length - may be entered as a string in HH:MM:SS.S format or as a number in seconds
 * @apiParam (Request Body Fields) {Boolean} [outputs.public=false] Make the output publicly readable on S3
 * @apiParam (Request Body Fields) {Boolean} [outputs.rrs=false] Amazon S3's Reduced Redundancy Storage
 * @apiParam (Request Body Fields) {Object[]} [outputs.access_control] Fine-grained access control rules for files sent to S3
 * @apiParam (Request Body Fields) {String="READ", "READ_ACP", "WRITE_ACP", "FULL_CONTROL"} [outputs.access_control.permission] A string or array of strings containing: `READ`, `READ_ACP`, `WRITE_ACP`, or `FULL_CONTROL`
 * @apiParam (Request Body Fields) {String} [outputs.access_control.grantee] A valid S3 grantee (email, ID, or URI)
 * @apiParam (Request Body Fields) {String[]} [outputs.notifications] An array of notification strings (valid email addresses or URLs), or hashes of url and format
 * @apiParam (Request Body Fields) {String} [outputs.notifications.url] A valid HTTP or HTTPS URL to notify, optionally including HTTP Auth credentials
 * @apiParam (Request Body Fields) {String="json", "xml"} [outputs.notifications.format] A format and content type for notifications
 * @apiParam (Request Body Fields) {Object} [outputs.notifications.headers] By default, HTTP notifications are sent with an HTTP Content-Type, along with a User-Agent; if your application requires additional headers, they can be specified here
 * @apiParam (Request Body Fields) {String="first_segment_uploaded", "seamless_playback"} [outputs.notifications.event] Live outputs have additional notification events corresponding to the progress of the file
 * @apiParam (Request Body Fields) {Object} [outputs.skip] A set of conditions for skipping creation of an output
 * @apiParam (Request Body Fields) {String} [outputs.skip.min_size] Skip output if the source dimensions are smaller than the given dimensions (`"WxH"`)
 * @apiParam (Request Body Fields) {String} [outputs.skip.max_size] Skip output if the source dimensions are larger than the given dimensions (`"WxH"`)
 * @apiParam (Request Body Fields) {Number} [outputs.skip.min_duration] Skip output if the source duration is shorter than the given duration, in seconds
 * @apiParam (Request Body Fields) {Number} [outputs.skip.max_duration] Skip output if the source duration is longer than the given duration, in seconds
 * @apiParam (Request Body Fields) {Number} [outputs.skip.min_audio_bitrate] Skip output if the source audio bitrate is less than the specified bitrate (in kbps)
 * @apiParam (Request Body Fields) {Number} [outputs.skip.max_audio_bitrate] Skip output if the source audio bitrate is greater than the specified bitrate (in kbps)
 * @apiParam (Request Body Fields) {Number} [outputs.skip.min_video_bitrate] Skip output if the source video bitrate is less than the specified bitrate (in kbps)
 * @apiParam (Request Body Fields) {Number} [outputs.skip.max_video_bitrate] Skip output if the source video bitrate is greater than the specified bitrate (in kbps)
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip.require_audio=false] Skip output if the source file does not include an audio track
 * @apiParam (Request Body Fields) {Boolean} [outputs.skip.require_video=false] Skip output if the source file does not include an video track
 * @apiParam (Request Body Fields) {String="dash"} [outputs.streaming_delivery_format] Sets the format/protocol configuration for a streamable output
 * @apiParam (Request Body Fields) {String="live", "hbbtv_1.5", "on_demand"} [outputs.streaming_delivery_profile="live"] Sets the specific profile of a streaming delivery format
 * @apiParam (Request Body Fields) {String="dash", "mpd", "hls", "m3u", "m3u8", "ism", "mss", "highwinds"} [outputs.playlist_format] Sets the format for a playlist output
 * @apiParam (Request Body Fields) {Number{1.0-3600.0}} [outputs.segment_seconds=10] Sets the maximum duration of each segment in a segmented output - values less than 2.0 are only allowed when byte_range_segmenting is enabled
 * @apiParam (Request Body Fields) {Object} [outputs.alternate_audio] Provides a set of alternate audio streams for HLS playlists
 * @apiParam (Request Body Fields) {Object[]} [outputs.alternate_audio.alternate_audio_group] Each alternate audio group is an array of audio objects, and a name of your choosing
 * @apiParam (Request Body Fields) {String} [outputs.alternate_audio.alternate_audio_group.source] A label for the audio source
 * @apiParam (Request Body Fields) {String} [outputs.alternate_audio.alternate_audio_group.path] An optional path to the M3U8 playlist for this audio rendition; if the path is not set, this alternate audio stream describes the the audio contained in the source stream
 * @apiParam (Request Body Fields) {String} outputs.alternate_audio.alternate_audio_group.language The ISO 639 code for the language of the audio track, like "en", "es", or "zh"
 * @apiParam (Request Body Fields) {Object[]} [outputs.streams] Array of hashes containing playlist stream info
 * @apiParam (Request Body Fields) {String} [outputs.streams.path] Specifies the path to a stream manifest file
 * @apiParam (Request Body Fields) {String} o[utputs.streams.source] Specifies the source media for a playlist stream manifest file
 * @apiParam (Request Body Fields) {Number} [outputs.streams.bandwidth] Specifies the bandwidth of a playlist stream in kbps
 * @apiParam (Request Body Fields) {String} [outputs.streams.resolution] Specifies the resolution of a playlist stream (WxH)
 * @apiParam (Request Body Fields) {String} [outputs.streams.codecs] Specifies the codecs used in a playlist stream - codecs in HTML5 format, such as: `mp4a.40.2`
 * @apiParam (Request Body Fields) {String} [outputs.streams.audio] String containing the name of the audio GROUP-ID to use. This value must have been defined as an alternate_audio grouping
 * @apiParam (Request Body Fields) {String} [outputs.streams.segment_image_url] An image to display on audio-only segments
 * @apiParam (Request Body Fields) {Boolean} [outputs.streams.segment_video_snapshots=false] When segmenting a video file into audio-only segments, take snapshots of the video as thumbnails for each segment
 * @apiParam (Request Body Fields) {Number{2-5}} [outputs.streams.max_hls_protocol_version] The maximum HLS protocol to use - default values: `3` for Live outputs, `5` for sample AES encryption; otherwise, `2`
 * @apiParam (Request Body Fields) {Number{2-5}} [outputs.streams.hls_protocol_version] HLS protocol to use - default value: automatic according to max_hls_protocol_version setting
 * @apiParam (Request Body Fields) {Boolean} [outputs.streams.hls_optimized_ts=true] Optimize TS segment files for HTTP Live Streaming on iOS
 * @apiParam (Request Body Fields) {String="hls", "mss", "dash"} [outputs.streams.prepare_for_segmenting] Include captions and keyframe timing for segmenting
 * @apiParam (Request Body Fields) {String} [outputs.streams.smil_base_url] Add &lt;meta base="smil_base_url_value"/&gt; to the &lt;head&gt; section of an SMIL playlist
 * @apiParam (Request Body Fields) {Boolean} [outputs.streams.byte_range_segmenting=false] Configures HLS segmenting to produce a single output file rather than one file per segment
 * @apiParam (Request Body Fields) {Boolean} [outputs.streams.generate_keyframe_manifest=false] Generates an HLS keyframe (I-frame) manifest which is required for fast-forward and reverse playback
 * @apiParam (Request Body Fields) {String} [outputs.streams.keyframe_manifest_filename="iframe_index.m3u8"] Override the default filename for the HLS keyframe manifest
 * @apiParam (Request Body Fields) {Boolean} [outputs.streams.allow_skipped_sources=false] Ignore sources that are conditional outputs which have been skipped
 * @apiParam (Request Body Fields) {String="none", "aes-128-cbc", "aes-128-ctr", "aes-256-cbc", "aes-256-ctr"} [outputs.encryption_method] Set the encryption method to use for encrypting
 * @apiParam (Request Body Fields) {String} [outputs.encryption_key] Set a single encryption key to use rather than having Zencoder generate one - string must be a hexadecimal string of 16 octets (32 chars long, optional "0x" prefix)
 * @apiParam (Request Body Fields) {String} [outputs.encryption_key_url] Set a URL to a single encryption key to use rather than having Zencoder generate one
 * @apiParam (Request Body Fields) {Number} [outputs.encryption_key_rotation_period] Rotate to a new encryption key after a number of segments
 * @apiParam (Request Body Fields) {String} [outputs.encryption_key_url_prefix] Prepend key URLs with the passed string
 * @apiParam (Request Body Fields) {String} [outputs.encryption_iv] Set an initialization vector to use when encrypting - a hexadecimal string of 16 octets (32 chars long, optional "0x" prefix)
 * @apiParam (Request Body Fields) {String} [outputs.encryption_password] Sets a password to use for generating an initialization vector
 * @apiParam (Request Body Fields) {String="none", "aes-128-cbc", "aes-128-ctr", "aes-256-cbc", "aes-256-ctr"} [outputs.decryption_method] Set the decryption algorithm to use - defaults to `aes-128-cbc` (if `decryption_key` or `decryption_key_url` are set)
 * @apiParam (Request Body Fields) {String} [outputs.decryption_key] Set the decryption key to use - a hexadecimal string of 16 octets (32 chars long, optional "0x" prefix)
 * @apiParam (Request Body Fields) {String} [outputs.decryption_key_url] The URL of a decryption key file to use
 * @apiParam (Request Body Fields) {String} [outputs.decryption_password] The password used in combination with the key to decrypt the input file
 * @apiParam (Request Body Fields) {Number{0-16}} [outputs.h264_reference_frames=3] A number of reference frames to use in H.264 video
 * @apiParam (Request Body Fields) {String="baseline", "main", "high"} [outputs.h264_profile="baseline"] The H.264 profile to use
 * @apiParam (Request Body Fields) {String} [outputs.h264_level] The H.264 level to use - default is automatically calculated using H.264 level chart based on the output video
 * @apiParam (Request Body Fields) {Number{0-16}} [outputs.h264_bframes=0] The maximum number of consecutive B-frames
 * @apiParam (Request Body Fields) {String="film", "animation", "grain", "psnr", "ssim", "fastdecode", "zerolatency"} [outputs.tuning] Tune the output video for a specific content type
 * @apiParam (Request Body Fields) {Number{1-51}} [outputs.crf] Bitrate control setting
 * @apiParam (Request Body Fields) {Object[]} [outputs.cue_points] Add event or navigation cue points to a FLV video
 * @apiParam (Request Body Fields) {String="navigation", "event"} [outputs.cue_points.type] A cue point type
 * @apiParam (Request Body Fields) {Number} [outputs.cue_points.time] A cue point time, in seconds
 * @apiParam (Request Body Fields) {String} [outputs.cue_points.name] A cue point name
 * @apiParam (Request Body Fields) {Object} [outputs.cue_points.data] Cue point data (key/value pairs)
 * @apiParam (Request Body Fields) {Number{0-100}} [outputs.vp6_temporal_down_watermark=20] VP6 temporal down watermark percentage
 * @apiParam (Request Body Fields) {Boolean} [outputs.vp6_temporal_resampling] Enable or disable VP6 temporal resampling - default: `true` when encoding with a low number of bits per pixel; otherwise, `false`
 * @apiParam (Request Body Fields) {Number{0-100}} [outputs.vp6_undershoot_pct=90] Target a slightly lower datarate
 * @apiParam (Request Body Fields) {String="vp6e", "vp6s"} [outputs.vp6_profile="vp6e"] VP6 profile: vp6s or vp6e
 * @apiParam (Request Body Fields) {String="good", "best"} [outputs.vp6_compression_mode="good"] VP6 compression mode
 * @apiParam (Request Body Fields) {Number{0-100}} [outputs.vp6_2pass_min_section=40] For two-pass VBR encoding, the lowest datarate that the encoder will allow
 * @apiParam (Request Body Fields) {Number} [outputs.vp6_2pass_max_section=400] For two-pass VBR encoding, the highest datarate that the encoder will allow
 * @apiParam (Request Body Fields) {Number} [outputs.vp6_stream_prebuffer=6] Seconds of preload that are necessary before starting playback
 * @apiParam (Request Body Fields) {Number} [outputs.vp6_stream_max_buffer] Maximum decoder buffer size
 * @apiParam (Request Body Fields) {String="adaptive", "blur", "drop"} [outputs.vp6_deinterlace_mode="adaptive"] Deinterlace mode for VP6
 * @apiParam (Request Body Fields) {Number{0-1.0}} [outputs.vp6_denoise_level=0] Denoise level for VP6
 * @apiParam (Request Body Fields) {Boolean} [outputs.alpha_transparency=false] Enable alpha transparency; currently, only supported by VP6
 * @apiParam (Request Body Fields) {Boolean} [outputs.constant_bitrate=false] Use constant bitrate (CBR) encoding
 * @apiParam (Request Body Fields) {Boolean} [outputs.hint=false] Enable hinting of MP4 files for RTP/RTSP
 * @apiParam (Request Body Fields) {Number{100-5000}} [outputs.mtu_size=1450] Set MTU size for MP4 hinting
 * @apiParam (Request Body Fields) {String="aac-lc", "he-aac", "he-aac-v2"} [outputs.max_aac_profile="he-aac"] What is the most advanced (compressed) AAC profile to allow?
 * @apiParam (Request Body Fields) {String="aac-lc", "he-aac", "he-aac-v2"} [outputs.force_aac_profile] Force the use of a particular AAC profile, rather than letting Zencoder choose the best profile for the bitrate
 * @apiParam (Request Body Fields) {String="avci_50", "avci_100"} [outputs.video_codec_preset] Video encoding preset to allow compatibility with specific industry standards
 * @apiParam (Request Body Fields) {String="ts_dvb", "ts_cablelabs", "ts_broadcast", "as11_hd"} [outputs.format_preset] Format preset to allow compatibility with specific industry standards
 * @apiParam (Request Body Fields) {Number{1-1000000}} [outputs.ts_muxrate] The maximum rate in kbps that the transport stream can be muxed; used with the ts format only
 * @apiParam (Request Body Fields) {Number{1-8191}} [outputs.ts_pmt_pid] Override the packet id of the Program Map Table
 * @apiParam (Request Body Fields) {Number{1-8191}} [outputs.ts_video_pid] Override the packet id of video data
 * @apiParam (Request Body Fields) {Number{1-8191}} [outputs.ts_audio_pid] Override the packet id of audio data
 * @apiParam (Request Body Fields) {Number{1-8191}} [outputs.ts_pcr_pid] Override the packet id of the Program Clock Reference
 * @apiParam (Request Body Fields) {Boolean} [outputs.ts_cbr=false] Create CBR output by stuffing packets at the transport stream layer
 * @apiParam (Request Body Fields) {Boolean} [outputs.lossless_video=false] Enables lossless video encoding if supported by the video codec
 * @apiParam (Request Body Fields) {String} [outputs.aspera_transfer_policy="fair"] How to allocate available bandwidth for Aspera file transfers
 * @apiParam (Request Body Fields) {Number} [outputs.transfer_minimum_rate=1000] A targeted rate in Kbps for data transfer minimums
 * @apiParam (Request Body Fields) {Number} [outputs.transfer_maximum_rate=250000] A targeted rate in Kbps for data transfer maximums
 * @apiParam (Request Body Fields) {Boolean} [outputs.copy_video=false] Copy the video track of the input file
 * @apiParam (Request Body Fields) {Boolean} [outputs.copy_audio=false] Copy the audio track of the input file
 *
 * @apiParamExample {json} Standard VOD Example:
 *    {
 *      "input": "s3://zencodertesting/test.mov",
 *      "outputs": [
 *        {
 *          "label": "mp4 high",
 *          "url":"s3://learning-services-media.brightcove.com/output-file-name.mp4",
 *          "h264_profile": "high"
 *        },
 *        {
 *          "url":"s3://learning-services-media.brightcove.com/output-file-name.webm",
 *          "label": "webm",
 *          "format": "webm"
 *        },
 *        {
 *          "url": "s3://learning-services-media.brightcove.com/output-file-name.ogg",
 *          "label": "ogg",
 *          "format": "ogg"
 *        },
 *        {
 *          "url": "s3://learning-services-media.brightcove.com/output-file-name-mobile.mp4",
 *          "label": "mp4 low",
 *          "size": "640x480"
 *        }
 *      ]
 *    }
 *
 * @apiParamExample {json} Standard Live Example:
 *    {
 *      "live_stream": true,
 *      "outputs": [
 *        {
 *          "label": "hls_300",
 *          "size": "480x270",
 *          "video_bitrate": 300,
 *          "url": "s3://learning-services-media.brightcove.com/awesomeness_300.m3u8",
 *          "credentials": "s3",
 *          "type": "segmented",
 *          "live_stream": true,
 *          "headers": {
 *            "x-amz-acl": "public-read"
 *          }
 *        },
 *        {
 *          "label": "hls_600",
 *          "size": "640x360",
 *          "video_bitrate": 600,
 *          "url": "s3://learning-services-media.brightcove.com/awesomeness_600.m3u8",
 *          "credentials": "s3",
 *          "type": "segmented",
 *          "live_stream": true,
 *          "headers": {
 *            "x-amz-acl": "public-read"
 *          }
 *        },
 *        {
 *          "label": "hls_1200",
 *          "size": "1280x720",
 *          "video_bitrate": 1200,
 *          "url": "s3://learning-services-media.brightcove.com/awesomeness_1200.m3u8",
 *          "credentials": "s3",
 *          "type": "segmented",
 *          "live_stream": true,
 *          "headers": {
 *            "x-amz-acl": "public-read"
 *          }
 *        },
 *        {
 *          "url": "s3://learning-services-media.brightcove.com/master.m3u8",
 *          "credentials": "s3",
 *          "type": "playlist",
 *          "streams": [
 *            {
 *              "bandwidth": 300,
 *              "path": "awesomeness_300.m3u8"
 *            },
 *            {
 *              "bandwidth": 600,
 *              "path": "awesomeness_600.m3u8"
 *            },
 *            {
 *              "bandwidth": 1200,
 *              "path": "awesomeness_1200.m3u8"
 *            }
 *          ],
 *          "headers": {
 *            "x-amz-acl": "public-read"
 *          }
 *        }
 *      ]
 *    }
 *
 *
 *
 * @apiSuccess (200) {String} id Id for the job.
 * @apiSuccess (200) {Object[]} outputs Details on each output rendition of the Live job.
 * @apiSuccess (200) {String} outputs.id The unique id for the rendition.
 * @apiSuccess (200) {String} outputs.url Media HLS manifest for the specified rendition (non-SSAI).
 * @apiSuccess (200) {String} outputs.label Media HLS manifest with a configurable DVR window. Default 100 seconds (non-SSAI).
 *
 * @apiSuccessExample {json} Success Response Create a Job:
 *    HTTP/1.1 201
 *    Content-Type: application/json; charset=utf-8
 *    X-Zencoder-Rate-Remaining: 999
 *
 *    {
 *      "id": 365524597,
 *      "outputs": [
 *        {
 *          "id": 1294836780,
 *          "label": "mp4 high",
 *          "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name.mp4"
 *        },
 *        {
 *          "id": 1294836781,
 *          "label": "webm",
 *          "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name.webm"
 *        },
 *        {
 *          "id": 1294836782,
 *          "label": "ogg",
 *          "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name.ogg"
 *        },
 *        {
 *          "id": 1294836783,
 *          "label": "mp4 low",
 *          "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name-mobile.mp4"
 *        }
 *      ]
 *    }
 *
 *
 *
 *
 */

// Resubmit a Job

/**
 * @api {put} /v2/jobs/:jobId/resubmit Resubmit a Job
 * @apiName Resubmit a Job
 * @apiGroup Jobs
 * @apiVersion 2.0.0
 *
 * @apiDescription If a job has failed processing with a transient error that may be solved by attempting processing again (such as a network timeout, or if you fix permissions on your server that had caused a download permission error) you may request that it be attempted again. You may resubmit a job for processing by sending a PUT request to https://app.zencoder.com/api/v2/jobs/1234/resubmit?api_key=93h630j1dsyshjef620qlkavnmzui3. Only jobs that are not in the “finished” state may be resubmitted. If resubmission succeeds you will receive a 204 No Content response. If you attempt to resubmit a “finished” job you will receive a 409 Conflict response. Resubmit requests are limited to prevent runaway scripts from repeatedly resubmitting a failing job. If you attempt to resubmit a job more times than the limit amount, you will receive a 403 Forbidden response. The limit is currently 5 attempts, but may change without warning.
 *
 * @apiHeader {String} Content-Type Content-Type: application/json or application/xml
 * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
 *
 * @apiParam (URL Parameters) {String} jobId The job id you want details for.
 *
 *
 *
 */

// List Jobs

 /**
  * @api {get} /v2/jobs List Jobs
  * @apiName List Jobs
  * @apiGroup Jobs
  * @apiVersion 2.0.0
  *
  * @apiDescription A list of jobs can be obtained by sending an HTTP GET request to https://app.zencoder.com/api/v2/jobs?api_key=93h630j1dsyshjef620qlkavnmzui3 (replace the api_key with your own). It will return an array of jobs similar to the example below. The list of thumbnails will be empty until the job is completed. By default, the results are paginated with 50 jobs per page and sorted by ID in descending order. You can pass two parameters to control the paging: page and per_page. per_page has a limit of 50. Note that historical jobs data is kept by Zencoder for 60 days - if you need to keep jobs data for longer periods, you need to retrieve it within 60 days and save it in your own data storage.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  *
  *
  * @apiSuccess (200) {Object} job Object containing the job details
  * @apiSuccess (200) {DateTimeString} job.created_at ISO 8601 date-time string representing when the job was created
  * @apiSuccess (200) {DateTimeString} job.finished_at ISO 8601 date-time string representing when the live stream was stopped
  * @apiSuccess (200) {String} job.id The live job id
  * @apiSuccess (200) {Boolean} job.privacy Privacy mode for job
  * @apiSuccess (200) {String} job.state The current state of the job
  * @apiSuccess (200) {DateTimeString} job.submitted_at ISO 8601 date-time string representing when the job was submitted
  * @apiSuccess (200) {Boolean} job.test Whether job was run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.updated_at ISO 8601 date-time string representing when the job was last modified
  * @apiSuccess (200) {String} job.region The Amazon AWS region to use for encoding the job
  * @apiSuccess (200) {Number} job.reconnect_time The time, in seconds, that the system will wait for a stream to reconnect to the encoder
  * @apiSuccess (200) {Number} job.event_length The time, in seconds, that the system will keep the live stream available
  * @apiSuccess (200) {Number} job.live_sliding_window_duration The time, in seconds, kept in the live DVR manifest
  * @apiSuccess (200) {Boolean} job.live_stream Indicates whether this is a live stream or VOD
  * @apiSuccess (200) {Object} job.input_media_file Object containing properties for the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_bitrate_in_kbps Audio bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.audio_codec Audio codec of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_sample_rate Audio sample rate of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} job.input_media_file.channels The number of audio channels
  * @apiSuccess (200) {DateTimeString} job.input_media_file.created_at ISO 8601 date-time string representing when the input file was created
  * @apiSuccess (200) {Number} job.input_media_file.duration_in_ms duration_in_ms.
  * @apiSuccess (200) {String} job.input_media_file.error_class Type of error thrown
  * @apiSuccess (200) {String} job.input_media_file.error_message Error message thrown
  * @apiSuccess (200) {Number} job.input_media_file.file_size_bytes File size
  * @apiSuccess (200) {DateTimeString} job.input_media_file.finished_at ISO 8601 date-time string representing when the input file was finished
  * @apiSuccess (200) {String} job.input_media_file.format Format of the input file
  * @apiSuccess (200) {Number} job.input_media_file.frame_rate Frame rate of the input file
  * @apiSuccess (200) {Number} job.input_media_file.height Frame height of the input file
  * @apiSuccess (200) {String} job.input_media_file.id System id of the input file
  * @apiSuccess (200) {String} job.input_media_file.md5_checksum Checksum for the input file
  * @apiSuccess (200) {Boolean} job.input_media_file.privacy Privacy mode
  * @apiSuccess (200) {String} job.input_media_file.state Current state of input file processing
  * @apiSuccess (200) {Boolean} job.input_media_file.test Whether run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.input_media_file.updated_at ISO 8601 date-time string representing when the input file was last modified
  * @apiSuccess (200) {Number} job.input_media_file.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.video_codec Video codec of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.width Frame width of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.total_bitrate_in_kbps Total bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.url URL for the input media file
  * @apiSuccess (200) {Object} job.stream Object containing properties for the live stream
  * @apiSuccess (200) {DateTimeString} job.stream.created_at ISO 8601 date-time string representing when the stream was created
  * @apiSuccess (200) {Number} job.stream.duration ISO Duration of the stream in seconds
  * @apiSuccess (200) {DateTimeString} job.stream.finished_at ISO 8601 date-time string representing when the stream was finished
  * @apiSuccess (200) {Number} job.stream.height Frame height of the stream
  * @apiSuccess (200) {String} job.stream.id System id of the stream
  * @apiSuccess (200) {String} job.stream.name Name of the stream
  * @apiSuccess (200) {String} job.stream.protocol Protocol of the stream
  * @apiSuccess (200) {Boolean} job.stream.test Whether run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.stream.updated_at ISO 8601 date-time string representing when the stream was last modified
  * @apiSuccess (200) {Number} job.stream.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (200) {String} job.stream.video_codec Video codec of the input media file
  * @apiSuccess (200) {Number} job.stream.width Frame width of the stream
  * @apiSuccess (200) {Number} job.stream.total_bitrate_in_kbps Total bitrate of the stream
  * @apiSuccess (200) {String} job.stream.region AWS region list specified for the account
  * @apiSuccess (200) {String} job.stream.url URL for the stream
  * @apiSuccess (200) {Object} job.stream.location Object representing the location of the stream
  * @apiSuccess (200) {Object} job.stream.location.source Object representing the location source of the stream
  * @apiSuccess (200) {Object} job.stream.location.source.latitude Latitude of source file
  * @apiSuccess (200) {Object} job.stream.location.source.longitude Longitude of source file
  * @apiSuccess (200) {Object} job.stream.location.source.location Location of source file
  * @apiSuccess (200) {Object} job.stream.destination Object representing the destination of the stream
  * @apiSuccess (200) {Object} job.stream.destination.source Object representing the destination source of the stream
  * @apiSuccess (200) {Object} job.stream.destination.source.latitude Latitude of destination file
  * @apiSuccess (200) {Object} job.stream.destination.source.longitude Longitude of destination file
  * @apiSuccess (200) {Object} job.stream.destination.source.location Location of destination file
  * @apiSuccess (200) {Object[]} job.output_media_files Array of objects containing properties for the output media files
  * @apiSuccess (200) {Number} job.output_media_files.audio_bitrate_in_kbps Audio bitrate of the output media file
  * @apiSuccess (200) {String} job.output_media_files.audio_codec Audio codec of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.audio_sample_rate Audio sample rate of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} job.output_media_files.channels The number of audio channels
  * @apiSuccess (200) {DateTimeString} job.output_media_files.created_at ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (200) {Number} job.output_media_files.duration_in_ms ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (200) {String} job.output_media_files.error_class Type of error thrown
  * @apiSuccess (200) {String} job.output_media_files.error_message Error message thrown
  * @apiSuccess (200) {Number} job.output_media_files.file_size_bytes File size
  * @apiSuccess (200) {DateTimeString} job.output_media_files.finished_at ISO 8601 date-time string representing when the output file was finished
  * @apiSuccess (200) {String} job.output_media_files.format Format of the output file
  * @apiSuccess (200) {Number} job.output_media_files.fragment_duration_in_ms `TODO`
  * @apiSuccess (200) {Number} job.output_media_files.frame_rate Frame rate of the output file
  * @apiSuccess (200) {Number} job.output_media_files.height Frame height of the output file
  * @apiSuccess (200) {String} job.output_media_files.id System id of the output file
  * @apiSuccess (200) {String} job.output_media_files.md5_checksum Checksum for the output file
  * @apiSuccess (200) {Boolean} job.output_media_files.privacy Privacy mode
  * @apiSuccess (200) {String} job.output_media_files.rfc_6381_audio_codec Audio codec for industry compatibility
  * @apiSuccess (200) {String} job.output_media_files.rfc_6381_video_codec Video codec for industry compatibility
  * @apiSuccess (200) {String} job.output_media_files.state Current state of output file processing
  * @apiSuccess (200) {Boolean} job.output_media_files.test Whether in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.output_media_files.updated_at ISO 8601 date-time string representing when the output file was last modified
  * @apiSuccess (200) {Number} job.output_media_files.video_bitrate_in_kbps Video bitrate of the output media file
  * @apiSuccess (200) {String} job.output_media_files.video_codec Video codec of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.width Frame width of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.total_bitrate_in_kbps Total bitrate of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (200) {Boolean} job.output_media_files.keyframe_interval_follow_source Whether keyframe rate for the output matches the source
  * @apiSuccess (200) {Number} job.output_media_files.live_stream Whether the output is a live stream
  * @apiSuccess (200) {Boolean} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (200) {String} job.output_media_files.playback_url URL for the output file
  * @apiSuccess (200) {String} job.output_media_files.playback_url_dvr Live DVR url for live stream output
  * @apiSuccess (200) {String} job.output_media_files.playback_url_vod  URL for VOD output
  * @apiSuccess (200) {String} job.output_media_files.playlist_type Playlist type for playlist output
  * @apiSuccess (200) {String} job.output_media_files.type Will be `playlist` for playlist output
  * @apiSuccess (200) {String} job.output_media_files.filename File name for the playlist manifest
  * @apiSuccess (200) {String} job.output_media_files.dvr_filename File name for the DVR playlist manifest
  *
  * @apiSuccessExample {json} Success Response List Jobs:
  *    HTTP/1.1 200
  *    Content-Type: application/json; charset=utf-8
  *    X-Zencoder-Rate-Remaining: 59
*
  *    [
  *      {
  *        "job": {
  *          "created_at": "2017-04-20T16:08:02Z",
  *          "finished_at": "2017-04-20T16:09:38Z",
  *          "id": 365524597,
  *          "pass_through": null,
  *          "privacy": false,
  *          "state": "finished",
  *          "submitted_at": "2017-04-20T16:08:02Z",
  *          "test": false,
  *          "updated_at": "2017-04-20T16:17:15Z",
  *          "input_media_file": {
  *            "audio_bitrate_in_kbps": 50,
  *            "audio_codec": "aac",
  *            "audio_sample_rate": 44100,
  *            "audio_tracks": null,
  *            "channels": "2",
  *            "created_at": "2017-04-20T16:08:02Z",
  *            "duration_in_ms": 5067,
  *            "error_class": null,
  *            "error_message": null,
  *            "file_size_bytes": 922620,
  *            "finished_at": "2017-04-20T16:09:25Z",
  *            "format": "mpeg4",
  *            "frame_rate": 30,
  *            "height": 720,
  *            "id": 365495537,
  *            "md5_checksum": null,
  *            "privacy": false,
  *            "state": "finished",
  *            "test": false,
  *            "updated_at": "2017-04-20T16:09:25Z",
  *            "video_bitrate_in_kbps": 1402,
  *            "video_codec": "h264",
  *            "width": 1280,
  *            "total_bitrate_in_kbps": 1452,
  *            "url": "s3://zencodertesting/test.mov"
  *          },
  *          "output_media_files": [
  *            {
  *              "audio_bitrate_in_kbps": 90,
  *              "audio_codec": "aac",
  *              "audio_sample_rate": 44100,
  *              "channels": "2",
  *              "created_at": "2017-04-20T16:08:02Z",
  *              "duration_in_ms": 5130,
  *              "error_class": null,
  *              "error_message": null,
  *              "file_size_bytes": 372613,
  *              "finished_at": "2017-04-20T16:09:32Z",
  *              "format": "mpeg4",
  *              "fragment_duration_in_ms": null,
  *              "frame_rate": 30,
  *              "height": 360,
  *              "id": 1294836783,
  *              "md5_checksum": null,
  *              "privacy": false,
  *              "rfc_6381_audio_codec": "mp4a.40.2",
  *              "rfc_6381_video_codec": "avc1.42001e",
  *              "state": "finished",
  *              "test": false,
  *              "updated_at": "2017-04-20T16:09:38Z",
  *              "video_bitrate_in_kbps": 492,
  *              "video_codec": "h264",
  *              "width": 640,
  *              "label": "mp4 low",
  *              "total_bitrate_in_kbps": 582,
  *              "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name-mobile.mp4"
  *            },
  *            {
  *              "audio_bitrate_in_kbps": 90,
  *              "audio_codec": "aac",
  *              "audio_sample_rate": 44100,
  *              "channels": "2",
  *              "created_at": "2017-04-20T16:08:02Z",
  *              "duration_in_ms": 5130,
  *              "error_class": null,
  *              "error_message": null,
  *              "file_size_bytes": 868974,
  *              "finished_at": "2017-04-20T16:09:32Z",
  *              "format": "mpeg4",
  *              "fragment_duration_in_ms": null,
  *              "frame_rate": 30,
  *              "height": 720,
  *              "id": 1294836780,
  *              "md5_checksum": null,
  *              "privacy": false,
  *              "rfc_6381_audio_codec": "mp4a.40.2",
  *              "rfc_6381_video_codec": "avc1.64001f",
  *              "state": "finished",
  *              "test": false,
  *              "updated_at": "2017-04-20T16:09:38Z",
  *              "video_bitrate_in_kbps": 1276,
  *              "video_codec": "h264",
  *              "width": 1280,
  *              "label": "mp4 high",
  *              "total_bitrate_in_kbps": 1366,
  *              "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name.mp4"
  *            },
  *            {
  *              "audio_bitrate_in_kbps": 112,
  *              "audio_codec": "vorbis",
  *              "audio_sample_rate": 44100,
  *              "channels": "2",
  *              "created_at": "2017-04-20T16:08:02Z",
  *              "duration_in_ms": 5069,
  *              "error_class": null,
  *              "error_message": null,
  *              "file_size_bytes": 653064,
  *              "finished_at": "2017-04-20T16:09:34Z",
  *              "format": "webm",
  *              "fragment_duration_in_ms": null,
  *              "frame_rate": 30,
  *              "height": 720,
  *              "id": 1294836781,
  *              "md5_checksum": null,
  *              "privacy": false,
  *              "rfc_6381_audio_codec": "vorbis",
  *              "rfc_6381_video_codec": "vp8",
  *              "state": "finished",
  *              "test": false,
  *              "updated_at": "2017-04-20T16:09:38Z",
  *              "video_bitrate_in_kbps": 869,
  *              "video_codec": "vp8",
  *              "width": 1280,
  *              "label": "webm",
  *              "total_bitrate_in_kbps": 981,
  *              "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name.webm"
  *            },
  *            {
  *              "audio_bitrate_in_kbps": 91,
  *              "audio_codec": "vorbis",
  *              "audio_sample_rate": 44100,
  *              "channels": "2",
  *              "created_at": "2017-04-20T16:08:02Z",
  *              "duration_in_ms": 5066,
  *              "error_class": null,
  *              "error_message": null,
  *              "file_size_bytes": 1116385,
  *              "finished_at": "2017-04-20T16:09:38Z",
  *              "format": "ogg",
  *              "fragment_duration_in_ms": null,
  *              "frame_rate": 30,
  *              "height": 720,
  *              "id": 1294836782,
  *              "md5_checksum": null,
  *              "privacy": false,
  *              "rfc_6381_audio_codec": "vorbis",
  *              "rfc_6381_video_codec": null,
  *              "state": "finished",
  *              "test": false,
  *              "updated_at": "2017-04-20T16:09:38Z",
  *              "video_bitrate_in_kbps": 1660,
  *              "video_codec": "theora",
  *              "width": 1280,
  *              "label": "ogg",
  *              "total_bitrate_in_kbps": 1751,
  *              "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/output-file-name.ogg"
  *            }
  *          ],
  *          "thumbnails": []
  *        }
  *      }
  *    ]
  *
  */

// Get Live Job Details

 /**
  * @api {get} /v1/jobs/:jobId Get Job Details
  * @apiName Get Job Details
  * @apiGroup Jobs
  * @apiVersion 2.0.0
  *
  * @apiDescription Get Job Details. Job details are available for two months after the job is submitted.
  *
  * @apiHeader {String} Content-Type Content-Type: application/json
  * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
  *
  * @apiParam (URL Parameters) {String} jobId The job id you want details for.
  *
  *
  * @apiSuccess (200) {Object} job Object containing the job details
  * @apiSuccess (200) {DateTimeString} job.created_at ISO 8601 date-time string representing when the job was created
  * @apiSuccess (200) {DateTimeString} job.finished_at ISO 8601 date-time string representing when the live stream was stopped
  * @apiSuccess (200) {String} job.id The live job id
  * @apiSuccess (200) {Boolean} job.privacy Privacy mode for job
  * @apiSuccess (200) {String} job.state The current state of the job
  * @apiSuccess (200) {DateTimeString} job.submitted_at ISO 8601 date-time string representing when the job was submitted
  * @apiSuccess (200) {Boolean} job.test Whether job was run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.updated_at ISO 8601 date-time string representing when the job was last modified
  * @apiSuccess (200) {String} job.region The Amazon AWS region to use for encoding the job
  * @apiSuccess (200) {Number} job.reconnect_time The time, in seconds, that the system will wait for a stream to reconnect to the encoder
  * @apiSuccess (200) {Number} job.event_length The time, in seconds, that the system will keep the live stream available
  * @apiSuccess (200) {Number} job.live_sliding_window_duration The time, in seconds, kept in the live DVR manifest
  * @apiSuccess (200) {Boolean} job.live_stream Indicates whether this is a live stream or VOD
  * @apiSuccess (200) {Object} job.input_media_file Object containing properties for the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_bitrate_in_kbps Audio bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.audio_codec Audio codec of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_sample_rate Audio sample rate of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} job.input_media_file.channels The number of audio channels
  * @apiSuccess (200) {DateTimeString} job.input_media_file.created_at ISO 8601 date-time string representing when the input file was created
  * @apiSuccess (200) {Number} job.input_media_file.duration_in_ms duration_in_ms.
  * @apiSuccess (200) {String} job.input_media_file.error_class Type of error thrown
  * @apiSuccess (200) {String} job.input_media_file.error_message Error message thrown
  * @apiSuccess (200) {Number} job.input_media_file.file_size_bytes File size
  * @apiSuccess (200) {DateTimeString} job.input_media_file.finished_at ISO 8601 date-time string representing when the input file was finished
  * @apiSuccess (200) {String} job.input_media_file.format Format of the input file
  * @apiSuccess (200) {Number} job.input_media_file.frame_rate Frame rate of the input file
  * @apiSuccess (200) {Number} job.input_media_file.height Frame height of the input file
  * @apiSuccess (200) {String} job.input_media_file.id System id of the input file
  * @apiSuccess (200) {String} job.input_media_file.md5_checksum Checksum for the input file
  * @apiSuccess (200) {Boolean} job.input_media_file.privacy Privacy mode
  * @apiSuccess (200) {String} job.input_media_file.state Current state of input file processing
  * @apiSuccess (200) {Boolean} job.input_media_file.test Whether run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.input_media_file.updated_at ISO 8601 date-time string representing when the input file was last modified
  * @apiSuccess (200) {Number} job.input_media_file.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.video_codec Video codec of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.width Frame width of the input media file
  * @apiSuccess (200) {Number} job.input_media_file.total_bitrate_in_kbps Total bitrate of the input media file
  * @apiSuccess (200) {String} job.input_media_file.url URL for the input media file
  * @apiSuccess (200) {Object} job.stream Object containing properties for the live stream
  * @apiSuccess (200) {DateTimeString} job.stream.created_at ISO 8601 date-time string representing when the stream was created
  * @apiSuccess (200) {Number} job.stream.duration ISO Duration of the stream in seconds
  * @apiSuccess (200) {DateTimeString} job.stream.finished_at ISO 8601 date-time string representing when the stream was finished
  * @apiSuccess (200) {Number} job.stream.height Frame height of the stream
  * @apiSuccess (200) {String} job.stream.id System id of the stream
  * @apiSuccess (200) {String} job.stream.name Name of the stream
  * @apiSuccess (200) {String} job.stream.protocol Protocol of the stream
  * @apiSuccess (200) {Boolean} job.stream.test Whether run in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.stream.updated_at ISO 8601 date-time string representing when the stream was last modified
  * @apiSuccess (200) {Number} job.stream.video_bitrate_in_kbps Video bitrate of the input media file
  * @apiSuccess (200) {String} job.stream.video_codec Video codec of the input media file
  * @apiSuccess (200) {Number} job.stream.width Frame width of the stream
  * @apiSuccess (200) {Number} job.stream.total_bitrate_in_kbps Total bitrate of the stream
  * @apiSuccess (200) {String} job.stream.region AWS region list specified for the account
  * @apiSuccess (200) {String} job.stream.url URL for the stream
  * @apiSuccess (200) {Object} job.stream.location Object representing the location of the stream
  * @apiSuccess (200) {Object} job.stream.location.source Object representing the location source of the stream
  * @apiSuccess (200) {Object} job.stream.location.source.latitude Latitude of source file
  * @apiSuccess (200) {Object} job.stream.location.source.longitude Longitude of source file
  * @apiSuccess (200) {Object} job.stream.location.source.location Location of source file
  * @apiSuccess (200) {Object} job.stream.destination Object representing the destination of the stream
  * @apiSuccess (200) {Object} job.stream.destination.source Object representing the destination source of the stream
  * @apiSuccess (200) {Object} job.stream.destination.source.latitude Latitude of destination file
  * @apiSuccess (200) {Object} job.stream.destination.source.longitude Longitude of destination file
  * @apiSuccess (200) {Object} job.stream.destination.source.location Location of destination file
  * @apiSuccess (200) {Object[]} job.output_media_files Array of objects containing properties for the output media files
  * @apiSuccess (200) {Number} job.output_media_files.audio_bitrate_in_kbps Audio bitrate of the output media file
  * @apiSuccess (200) {String} job.output_media_files.audio_codec Audio codec of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.audio_sample_rate Audio sample rate of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.audio_tracks The number of audio tracks
  * @apiSuccess (200) {Number} job.output_media_files.channels The number of audio channels
  * @apiSuccess (200) {DateTimeString} job.output_media_files.created_at ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (200) {Number} job.output_media_files.duration_in_ms ISO 8601 date-time string representing when the output file was created
  * @apiSuccess (200) {String} job.output_media_files.error_class Type of error thrown
  * @apiSuccess (200) {String} job.output_media_files.error_message Error message thrown
  * @apiSuccess (200) {Number} job.output_media_files.file_size_bytes File size
  * @apiSuccess (200) {DateTimeString} job.output_media_files.finished_at ISO 8601 date-time string representing when the output file was finished
  * @apiSuccess (200) {String} job.output_media_files.format Format of the output file
  * @apiSuccess (200) {Number} job.output_media_files.fragment_duration_in_ms `TODO`
  * @apiSuccess (200) {Number} job.output_media_files.frame_rate Frame rate of the output file
  * @apiSuccess (200) {Number} job.output_media_files.height Frame height of the output file
  * @apiSuccess (200) {String} job.output_media_files.id System id of the output file
  * @apiSuccess (200) {String} job.output_media_files.md5_checksum Checksum for the output file
  * @apiSuccess (200) {Boolean} job.output_media_files.privacy Privacy mode
  * @apiSuccess (200) {String} job.output_media_files.rfc_6381_audio_codec Audio codec for industry compatibility
  * @apiSuccess (200) {String} job.output_media_files.rfc_6381_video_codec Video codec for industry compatibility
  * @apiSuccess (200) {String} job.output_media_files.state Current state of output file processing
  * @apiSuccess (200) {Boolean} job.output_media_files.test Whether in test (integration) mode
  * @apiSuccess (200) {DateTimeString} job.output_media_files.updated_at ISO 8601 date-time string representing when the output file was last modified
  * @apiSuccess (200) {Number} job.output_media_files.video_bitrate_in_kbps Video bitrate of the output media file
  * @apiSuccess (200) {String} job.output_media_files.video_codec Video codec of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.width Frame width of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.total_bitrate_in_kbps Total bitrate of the output media file
  * @apiSuccess (200) {Number} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (200) {Boolean} job.output_media_files.keyframe_interval_follow_source Whether keyframe rate for the output matches the source
  * @apiSuccess (200) {Number} job.output_media_files.live_stream Whether the output is a live stream
  * @apiSuccess (200) {Boolean} job.output_media_files.keyframe_interval Keyframe interval for the output media file
  * @apiSuccess (200) {String} job.output_media_files.playback_url URL for the output file
  * @apiSuccess (200) {String} job.output_media_files.playback_url_dvr Live DVR url for live stream output
  * @apiSuccess (200) {String} job.output_media_files.playback_url_vod  URL for VOD output
  * @apiSuccess (200) {String} job.output_media_files.playlist_type Playlist type for playlist output
  * @apiSuccess (200) {String} job.output_media_files.type Will be `playlist` for playlist output
  * @apiSuccess (200) {String} job.output_media_files.filename File name for the playlist manifest
  * @apiSuccess (200) {String} job.output_media_files.dvr_filename File name for the DVR playlist manifest
  *
  * @apiSuccessExample {json} Success Response Get Job Details:
  *    HTTP/1.1 200
  *    Content-Type: application/json; charset=utf-8
  *    X-Zencoder-Rate-Remaining: 59
  *    {
  *      "job": {
  *        "created_at": "2017-04-20T18:12:49Z",
  *        "finished_at": null,
  *        "id": 365577652,
  *        "pass_through": null,
  *        "privacy": false,
  *        "state": "waiting",
  *        "submitted_at": "2017-04-20T18:12:49Z",
  *        "test": false,
  *        "updated_at": "2017-04-20T18:12:49Z",
  *        "input_media_file": {
  *          "audio_bitrate_in_kbps": null,
  *          "audio_codec": null,
  *          "audio_sample_rate": null,
  *          "audio_tracks": null,
  *          "channels": null,
  *          "created_at": "2017-04-20T18:12:49Z",
  *          "duration_in_ms": null,
  *          "error_class": null,
  *          "error_message": null,
  *          "file_size_bytes": null,
  *          "finished_at": null,
  *          "format": null,
  *          "frame_rate": null,
  *          "height": null,
  *          "id": 365548592,
  *          "md5_checksum": null,
  *          "privacy": false,
  *          "state": "pending",
  *          "test": false,
  *          "updated_at": "2017-04-20T18:12:49Z",
  *          "video_bitrate_in_kbps": null,
  *          "video_codec": null,
  *          "width": null,
  *          "total_bitrate_in_kbps": null,
  *          "url": "rtmp://live36.us-va.zencoder.io:1935/live/aa56369464a55ff7cd6236070e49e0f4"
  *        },
  *        "output_media_files": [
  *          {
  *            "audio_bitrate_in_kbps": null,
  *            "audio_codec": null,
  *            "audio_sample_rate": null,
  *            "channels": null,
  *            "created_at": "2017-04-20T18:12:49Z",
  *            "duration_in_ms": null,
  *            "error_class": null,
  *            "error_message": null,
  *            "file_size_bytes": null,
  *            "finished_at": null,
  *            "format": null,
  *            "fragment_duration_in_ms": null,
  *            "frame_rate": null,
  *            "height": null,
  *            "id": 1295040695,
  *            "md5_checksum": null,
  *            "privacy": false,
  *            "rfc_6381_audio_codec": null,
  *            "rfc_6381_video_codec": null,
  *            "state": "waiting",
  *            "test": false,
  *            "updated_at": "2017-04-20T18:12:49Z",
  *            "video_bitrate_in_kbps": null,
  *            "video_codec": null,
  *            "width": null,
  *            "label": null,
  *            "total_bitrate_in_kbps": null,
  *            "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/master.m3u8"
  *          },
  *          {
  *            "audio_bitrate_in_kbps": null,
  *            "audio_codec": null,
  *            "audio_sample_rate": null,
  *            "channels": null,
  *            "created_at": "2017-04-20T18:12:49Z",
  *            "duration_in_ms": null,
  *            "error_class": null,
  *            "error_message": null,
  *            "file_size_bytes": null,
  *            "finished_at": null,
  *            "format": null,
  *            "fragment_duration_in_ms": null,
  *            "frame_rate": null,
  *            "height": null,
  *            "id": 1295040693,
  *            "md5_checksum": null,
  *            "privacy": false,
  *            "rfc_6381_audio_codec": null,
  *            "rfc_6381_video_codec": null,
  *            "state": "waiting",
  *            "test": false,
  *            "updated_at": "2017-04-20T18:12:49Z",
  *            "video_bitrate_in_kbps": null,
  *            "video_codec": null,
  *            "width": null,
  *            "label": "hls_1200",
  *            "total_bitrate_in_kbps": null,
  *            "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/awesomeness_1200.m3u8"
  *          },
  *          {
  *            "audio_bitrate_in_kbps": null,
  *            "audio_codec": null,
  *            "audio_sample_rate": null,
  *            "channels": null,
  *            "created_at": "2017-04-20T18:12:49Z",
  *            "duration_in_ms": null,
  *            "error_class": null,
  *            "error_message": null,
  *            "file_size_bytes": null,
  *            "finished_at": null,
  *            "format": null,
  *            "fragment_duration_in_ms": null,
  *            "frame_rate": null,
  *            "height": null,
  *            "id": 1295040690,
  *            "md5_checksum": null,
  *            "privacy": false,
  *            "rfc_6381_audio_codec": null,
  *            "rfc_6381_video_codec": null,
  *            "state": "waiting",
  *            "test": false,
  *            "updated_at": "2017-04-20T18:12:49Z",
  *            "video_bitrate_in_kbps": null,
  *            "video_codec": null,
  *            "width": null,
  *            "label": "hls_600",
  *            "total_bitrate_in_kbps": null,
  *            "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/awesomeness_600.m3u8"
  *          },
  *          {
  *            "audio_bitrate_in_kbps": null,
  *            "audio_codec": null,
  *            "audio_sample_rate": null,
  *            "channels": null,
  *            "created_at": "2017-04-20T18:12:49Z",
  *            "duration_in_ms": null,
  *            "error_class": null,
  *            "error_message": null,
  *            "file_size_bytes": null,
  *            "finished_at": null,
  *            "format": null,
  *            "fragment_duration_in_ms": null,
  *            "frame_rate": null,
  *            "height": null,
  *            "id": 1295040689,
  *            "md5_checksum": null,
  *            "privacy": false,
  *            "rfc_6381_audio_codec": null,
  *            "rfc_6381_video_codec": null,
  *            "state": "waiting",
  *            "test": false,
  *            "updated_at": "2017-04-20T18:12:49Z",
  *            "video_bitrate_in_kbps": null,
  *            "video_codec": null,
  *            "width": null,
  *            "label": "hls_300",
  *            "total_bitrate_in_kbps": null,
  *            "url": "http://learning-services-media.brightcove.com.s3.amazonaws.com/awesomeness_300.m3u8"
  *          }
  *        ],
  *        "thumbnails": [],
  *        "stream": {
  *          "created_at": "2017-04-20T18:12:49Z",
  *          "finished_at": null,
  *          "height": 0,
  *          "id": 811966,
  *          "name": "aa56369464a55ff7cd6236070e49e0f4",
  *          "protocol": "rtmp",
  *          "state": "waiting",
  *          "test": false,
  *          "updated_at": "2017-04-20T18:12:49Z",
  *          "width": 0,
  *          "total_bitrate_in_kbps": 1024,
  *          "duration": null,
  *          "region": 1,
  *          "url": "rtmp://live36.us-va.zencoder.io:1935/live",
  *          "location": {
  *            "source": {
  *              "latitude": null,
  *              "longitude": null,
  *              "location": null
  *            },
  *            "destination": {
  *              "latitude": "39.043701",
  *              "longitude": "-77.487503",
  *              "location": "Ashburn, VA, US"
  *            },
  *            "distance": null
  *          }
  *        }
  *      }
  *    }
  *
  */

  // Cancel a Job

  /**
   * @api {put} /v1/jobs/:jobId/cancel Cancel a Job
   * @apiName Cancel a Job
   * @apiGroup Jobs
   * @apiVersion 2.0.0
   *
   * @apiDescription If you wish to cancel a job that has not yet finished processing you may send a request (using any HTTP method) to https://app.zencoder.com/api/v2/jobs/1234/cancel. If cancellation succeeds you will receive a 204 No Content response. Only jobs that are in the “waiting” or “processing” state may be cancelled. If you attempt to cancel a job in any other state you will receive a 409 Conflict response.
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
   *
   * @apiParam (URL Parameters) {String} jobId The job id for the job you want to cancel.
   *
   * @apiParamExample {String} Live Stream Custom Origin Example:
   *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/cancel
   *
   *
   * @apiSuccessExample {json} Success Response Cancel a Job:
   *    HTTP/1.1 204
   *    Content-Type:
   *    X-Zencoder-Rate-Remaining: 59
   *
   */

  // Finish a Live Job

  /**
   * @api {put} /v1/jobs/:jobId/finish Finish a Live Job
   * @apiName Finish a Live Job
   * @apiGroup Jobs
   * @apiVersion 2.0.0
   *
   * @apiDescription Finishes the input on a Live streaming job. Has no effect on non-Live jobs. A Live job can also finish by stopping the source stream in the broadcast software. Calling finish will disregard the reconnect_time and event_length options and finish the stream immediately, while stopping the stream in the broadcast software will respect them. **Note** that jobs cannot be finished when archive output is transcoding.
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
   *
   * @apiParam (URL Parameters) {String} jobId The job id for the job you want to cancel.
   *
   * @apiParamExample {String} Live Stream Custom Origin Example:
   *     https://api.bcovlive.io/v1/jobs/3158f1c9bc5c462182079f434ba4ae0a/cancel
   *
   * @apiSuccess (200) {String} id The job id for the stream that was stopped
   *
   * @apiSuccessExample {json} Success Response Finish a Live Job:
   *    HTTP/1.1 204
   *    Content-Type:
   *    X-Zencoder-Rate-Remaining: 59
   *
   */


  // Job Progress

  /**
   * @api {put} /v1/jobs/:jobId/progress Job Progress
   * @apiName Job Progress
   * @apiGroup Jobs
   * @apiVersion 2.0.0
   *
   * @apiDescription Get the progress of a job. The return will contain one or more of the following keys: state, input, outputs, and progress.
   *
   * @apiHeader {String} Content-Type Content-Type: application/json
   * @apiHeader {String} Zencoder-Api-Key Zencoder-Api-Key: {Your_API_Key}
   *
   * @apiParam (URL Parameters) {String} jobId The job id for the job you want to cancel.
   *
   * @apiSuccess (200) {String} state The overall progress state: pending, waiting, processing, finished, failed, or cancelled
   * @apiSuccess (200) {Number} progress The percentage complete
   * @apiSuccess (200) {Object[]} input Progress for getting and processing the input
   * @apiSuccess (200) {String} input.id Id for the input
   * @apiSuccess (200) {String} input.state State for the input: pending, waiting, processing, finished, failed, or cancelled
   * @apiSuccess (200) {Number} input.progress The overall percentage complete
   * @apiSuccess (200) {String} input.current_event The current activity
   * @apiSuccess (200) {Number} input.current_event_progress The current activity percentage complete
   * @apiSuccess (200) {Object[]} outputs Progress for processing the outputs
   * @apiSuccess (200) {String} outputs.id Id for the output
   * @apiSuccess (200) {String} outputs.state State for an output: pending, waiting, processing, finished, failed, or cancelled
   * @apiSuccess (200) {Number} outputs.progress The overall percentage complete for processing an output
   * @apiSuccess (200) {String} outputs.current_event The current activity on an output
   * @apiSuccess (200) {Number} outputs.current_event_progress The current activity percentage complete
   *
   * @apiSuccessExample {json} Success Response Job Progress:
   *    HTTP/1.1 200
   *    Content-Type
   *    {
   *      "state": "processing",
   *      "progress": 32.34567345,
   *      "input": {
   *        "id": 1234,
   *        "state": "finished"
   *      },
   *      "outputs": [
   *        {
   *          "id": 4567,
   *          "state": "processing",
   *          "current_event": "Transcoding",
   *          "current_event_progress": 25.0323,
   *          "progress": 35.23532
   *        },
   *        {
   *          "id": 4568,
   *          "state": "processing",
   *          "current_event": "Uploading",
   *          "current_event_progress": 82.32,
   *          "progress": 95.3223
   *        }
   *      ]
   *    }
   *
   */
