echo Enter your client id:
read CLIENT_ID
echo Your client id: $CLIENT_ID
echo --------------------------
echo Enter your client secret:
read CLIENT_SECRET
echo Your client secret: $CLIENT_SECRET
echo --------------------------
echo Enter the full API call:
read API_CALL
echo Your API call: $API_CALL
echo --------------------------
TOKEN=$(curl -s --data "grant_type=client_credentials" https://oauth.brightcove.com/v3/access_token --header "Content-Type: application/x-www-form-urlencoded" --user "$CLIENT_ID:$CLIENT_SECRET" | jq .access_token | sed 's/\"//g');
echo Your token: $TOKEN
echo --------------------------
RESPONSE=$(curl -s "$API_CALL" -H "Authorization: Bearer $TOKEN")
echo $RESPONSE | python -m json.tool
echo
