curl --request POST \
  --url https://ssai.api.brightcove.com/v1/accounts/1752604059001/ssai_configs \
  --header 'authorization: Bearer AKAJTguRmyfBetQI692PeQHSmC-3ZRLyACYyJUDy8M9z9_8HiPJ9vdgfhVvb93VWXw_cOtuCo2ZHEDVnxlBGvZF96HU3corZvQ9Enggn7ayb4aVJpf_CZq3kUQgCnZiyrUDytuVKXMQ68-YCxQ2VFfTT8bWt_SEM1IPg40Kwkdl3Mn9aAWBETyrXQNxXOFFFxQPXhk1dOFDv9_y6pRLEAG-D-J2b7_GLaQJ29o61C8n_Q_uzmjgHUkyNrXgdVhiQQeTKXG5n4KQBT6bdgnQlvyB2-gP8lAeWtOpKWbXnrDb_0yUE3d2QSYZkih91k_p-Kg_1bEZE3gyZxMKYA2-lcINCuIdg2P7yx5q8pHGYrOt7kwNH9tO7CanDUydHTL3LAH_BbI9_6dfLNKBMrXbwYTGyNo9pJWItckwMJ8cMBLgGId3Lti6YkMRM6N2w3-TLmu-6K6sKAxf8vJYrPs22Sif79yGkeNafz0s2HbLOiiFhtudIuludlVq17hxTIG__EMp8n7VfjdNTC0bZ9-taCHit-M7s7sZgwPRiv6fIDbnclZlP44UmkFGj6FhuYCLIrH37gFmOOazwqpBgB2vpP1sZNtpez-CRjy7OpyxpeaoB213EFIvLfhEuifSukC9CLjCUJlcQ5vZV4eLcjBXg0a-3VqbaQ9MIf3FIXwl2VSG6gt4vk8h8Va6xlvDYqvkeVvp3uF7tHYXOWZJncpoyoWnw4H0PBsBPm6LSJROuCvhl053D7iToo6gF3v4BxPbOZAfudZCbmHpn4lWxMWplLECvP_O60UPx6QS55lpEEWHri5vH6KC-iNRwrwJjcPMbXgp9J2AY_ipMYTXIWUE8377M_va5wuO7Lm5HhYDaL-jybjKilGFLoFctT3-T7-vVayldW3RMpovnG8jjAc9EHHQAaXk3ZBD8RPFVE8nI_fwwxYZJcj9-9Ws5mpEYKLS8tuvqFMh7JU83gPxEHY28XiO_vaEEG-pflySiLajf1Rp2B4HYqa-AH1VIXzUBO8vbNDueJu7-9KkWEgCiwBMtiriymQntUBjyF2WpUIi3doTkz038n7D8PVZianxF5nKcv0q3sGOllZaOsPKCpvz4rjbINSMjPqBH216IaIyRoWiTevaqMbfJxQUxVaBFPeIYIQLOwROadyzMPndsm8uO5dgsVRk8ChBLS3_mww_SM-0VJ6Smgy2RtPvBnPeuuuyDHSzzaUFZ1VB7RZOZ_Y5sw6zIvRq1cnaiXQ' \
  --data '{
  "name": "SSAI VMAP 2",
  "vmap_response_namespace": "bc",
  "ad_config": {
    "expected_ad_response": "dfp_vmap",
    "disable_server_beacons": false,
		"round_up_cue_points": false,
    "template_url": {
			"template": "http://solutions.brightcove.com/bcls/brightcove-player/vmap/simple-vmap.xml"
		},
		"defaults": {
			"session_id": "{{system.uuid}}"
		}
  },
	"beacon_templates": [
		{"type": "content_start"},
		{"type": "content_midpoint"},
		{"type": "ad_start"},
		{"type": "content_complete"}
	],
	"extend_beacon_guard_ttl": true,
	"discontinuities": {
		"dash": ["*"],
		"hls": ["*"]
	}
}
'
