<table>
	<thead>
		<th>Field</th>
		<th>Type</th>
		<th>Description</th>
	</thead>
	<tr>
		<td>name optional</td>
		<td>String</td>
		<td>video title        Size range: 1..255</td>
	</tr>
	<tr>
		<td>description optional</td>
		<td>String</td>
		<td>video short description        Size range: ..250</td>
	</tr>
	<tr>
		<td>economics optional</td>
		<td>String</td>
		<td>video short description        Default value: AD_SUPPORTED        Allowed values:          "AD_supported",          "FREE"</td>
	</tr>
	<tr>
		<td>ad_keys optional</td>
		<td>String</td>
		<td>string representing the ad key/value pairs assigned to the video. Key/value pairs are formatted as key=value and are separated by ampersands.        Default value: null        Size range: ..1800</td>
	</tr>
	<tr>
		<td>drm_disabled optional</td>
		<td>Boolean</td>
		<td>if>true will prevent this video from being DRM-protected (this field is only available for accounts enabled for Dynamic Delivery          and DRM)</td>
	</tr>
	<tr>
		<td>long_description optional</td>
		<td>String</td>
		<td>video long description        Size range: ..5000</td>
	</tr>
	<tr>
		<td>offline_enabled optional</td>
		<td>Boolean</td>
		<td>whether video is enabled for offline viewing (DRM-packaged videos only)        Default value: false</td>
	</tr>
	<tr>
		<td>projection optional</td>
		<td>String</td>
		<td>Used for 360 video        Default value: null        Allowed values:          "equirectangular"</td>
	</tr>
	<tr>
		<td>reference_id optional</td>
		<td>String</td>
		<td>video reference-id (must be unique within the account)        Size range: ..150</td>
	</tr>
	<tr>
		<td>state optional</td>
		<td>String</td>
		<td>state determines whether the video is playable or not        Default value: ACTIVE        Allowed values:          "ACTIVE",          "INACTIVE"</td>
	</tr>
	<tr>
		<td>tags optional</td>
		<td>String[]</td>
		<td>array>not contain commas        Default value: []</td>
	</tr>
	<tr>
		<td>custom_fields optional</td>
		<td>Object</td>
		<td>map>Note: be sure to use the internal name for the field, not the display name        Default value: {}</td>
	</tr>
	<tr>
		<td>cue_points optional</td>
		<td>Object[]</td>
		<td>array of cue point maps        Default value: []</td>
	</tr>
	<tr>
		<td>name optional</td>
		<td>String</td>
		<td>cue point name</td>
	</tr>
	<tr>
		<td>type</td>
		<td>String</td>
		<td>cue point type        Allowed values:          "AD",          "CODE"</td>
	</tr>
	<tr>
		<td>time</td>
		<td>Number</td>
		<td>time of the cue point in seconds; example: 10.527</td>
	</tr>
	<tr>
		<td>metadata optional</td>
		<td>String</td>
		<td>optional metadata string (512 single-byte characters maximum)        Default value: null        Size range: ..512</td>
	</tr>
	<tr>
		<td>force_stop optional</td>
		<td>Boolean</td>
		<td>whether video is force_stopped at the cue point        Default value: false</td>
	</tr>
	<tr>
		<td>geo optional</td>
		<td>Object</td>
		<td>map of geo-filtering properties        Default value: {}</td>
	</tr>
	<tr>
		<td>countries optional</td>
		<td>String[]</td>
		<td>array>ISO 3166 list of 2- or 4-letter codes in lower-case (search for "country codes")        Default value: null</td>
	</tr>
	<tr>
		<td>exclude_countries optional</td>
		<td>Boolean</td>
		<td>if true, country array is treated as a list of countries excluded from viewing        Default value: false</td>
	</tr>
	<tr>
		<td>restricted optional</td>
		<td>Boolean</td>
		<td>whether geo-restriction is enabled for this video        Default value: false</td>
	</tr>
	<tr>
		<td>link optional</td>
		<td>Object</td>
		<td>map of scheduling properties        Default value: {}</td>
	</tr>
	<tr>
		<td>text optional</td>
		<td>String</td>
		<td>text for the link        Size range: ..255</td>
	</tr>
	<tr>
		<td>url optional</td>
		<td>Url</td>
		<td>URL for the link        Size range: ..250</td>
	</tr>
	<tr>
		<td>published_at</td>
		<td>String</td>
		<td>ISO-8601 date-time string indicating when the video was published</td>
	</tr>
	<tr>
		<td>schedule optional</td>
		<td>Object</td>
		<td>map of scheduling properties        Default value: {}</td>
	</tr>
	<tr>
		<td>starts_at optional</td>
		<td>String</td>
		<td>start>ISO-8601 format        Default value: null</td>
	</tr>
	<tr>
		<td>ends_at optional</td>
		<td>String</td>
		<td>end>ISO-8601 format        Default value: null</td>
	</tr>
	<tr>
		<td>text_tracks optional</td>
		<td>Object[]</td>
		<td>array>NOTE text_tracks are not>are settable otherwise, and can be used to add text tracks to ingested or remote asset videos        Default value: []</td>
	</tr>
	<tr>
		<td>src</td>
		<td>String</td>
		<td>URL for the .vtt file</td>
	</tr>
	<tr>
		<td>kind optional</td>
		<td>String</td>
		<td>kind of text track        Allowed values:          "captions",          "chapters",          "subtitles",          "metadata"</td>
	</tr>
	<tr>
		<td>srclang</td>
		<td>String</td>
		<td>2-letter language code, such as "en" or "ko"</td>
	</tr>
	<tr>
		<td>mime_type optional</td>
		<td>String</td>
		<td>mime-type for the track</td>
	</tr>
	<tr>
		<td>label optional</td>
		<td>String</td>
		<td>label for the track</td>
	</tr>
	<tr>
		<td>default optional</td>
		<td>Boolean</td>
		<td>whether this is the default track        Default value: false</td>
	</tr>
</table>