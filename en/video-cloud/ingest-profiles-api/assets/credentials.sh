curl \
  --include \
  --header 'Authorization: BC_TOKEN AEnTxTj-D8PCP8nzEBuD-XyD99DLOrS50aU935-xmJ4eFDQwSP-1RrkeBFwZpzZiabduBqqIcJ4RwIsz3gvIbPZB79zbifZ7FYgdfKh-2p_KWRo8Ng0A56w' \
  --data 'name=DRMall&maximum_scope=[
    {"identity": {
        "type": "video-cloud-account", "account-id": 2728142649001
      },
      "operations": [
        "video-cloud/ingest-profiles/profile/read",
        "video-cloud/ingest-profiles/profile/write",
        "video-cloud/ingest-profiles/account/read",
        "video-cloud/ingest-profiles/account/write"
      ]
    }
  ]' \
  https://oauth.brightcove.com/v4/client_credentials
