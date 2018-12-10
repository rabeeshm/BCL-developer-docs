curl --request POST \
  --url https://ssai.api.brightcove.com/v1/accounts/1752604059001/ssai_configs \
  --header 'authorization: Bearer AN7j_bjy5jHHT13MUWVRH0Vn5pLGSeAEXYHLLNhozKqUBSp77Fu-c9jL9jutdIkBkSg0NVI8Q8EYY5a2gzboDTdEG0vogXPK_OxaqPsBMIDz8H9NReW43Ju-Mrly05_0__u0U-5D9ejXWhIwe_pRftbGTTQVpMiludiPFqMSfC0nnsyXGSyVY1ZFWHzQvo17BBWpO2iZHmTyjQPD2OzTV3ZsN2HDMTw9w6NkewpZwmZV9lekU3rrWrHX343Y83km-gob2WD1Zi7mZ1USmMKmSZ8-xm6n7EUIPdvJ_fpR4KzQUSJCBePMIphEf62NtZIs8zvvhr9AkAyKifdTo6pXXDOmTQ4iDKPDcH6DT-PJ5lfXXrSdHSPNajuK7vdp7KuDX4p0bs5G1ptlWGPt4s6MoUUlZ5QiTJQzYP6ODF1wn-A0avsjS06ESU6z6UFQtf47GGZxiWbX2EsF6-fI1e9l1R7-30YYOm3fszIyDkwykkGi90z_tz04JI_8RTOLyFgDbCelQRJg4SHF-8uJJLJwLckqe8SAo6KdSXe4juTpgm9LFQN8I5vT0IxnsXp4P1N1UmQD8hjXIWsc0H2r_1ULAk9mu0aOosVymdzxSEoVJn3Cfh09mnR0lgQKKotWWfqMhgxitpMXrTR2ZoiwWe2s-yREbUkRYzzsqBlxD7iBeJYmiaPbSrG8eNSzqwZwnYqojKmxqLGqMgagtK0tlLQUV_QHGaahOn4HTa9wxPl6NlbR2480pYjikuVrh6IYfP2bi1dOWswSNgBw-jMXAU4QVofAvyc7NH-kwIaH379AJyA3zWnOrEvyuLJJaHy6RxnoOtaapQgnay4xgoGeedCrXBudiNuWkqsKEmjmN-unIcSIxOnKipUtQmY6cRRCIc7AZ1QD2IWb_Oit6HNf0ieMu118rXC9OPqK5MXDA8caqapxrTaoOkdS74fOxXX1Cg1rrPjEeGnX6XfrcizylEesj86FgRA2cLZqQtqiVqyBMfH4HGNaj9YVEEK2A-k3VSWCb2kUVkyTi6A5WBo5nLBTBvX1ZwNTb2L3N600-5l09cHgAsW_rXGkt5NvDWlyCqw0SMO56n9CTlpware0RULdrlfR8H3NSWACsbjz7pPzCWnBbcQWucHwElVITMm9mj_qSsIDpigm4sPdgXAiMdhW9_07wZhLgOsogZtkwUJiOz3aPf0Ogu0pD2q4PPruQWGs4vhvUJkDODuyP-RHpM1vqlifpyYwtZtfBg' \
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
