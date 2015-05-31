bold=`tput bold`
normal=`tput sgr0`
echo 'Enter your BC_TOKEN:'
read BC_TOKEN
echo Your BC_TOKEN id: $BC_TOKEN
echo --------------------------
echo 'Enter your Video Cloud account id:'
read ACCOUNT_ID
echo Your account id: $ACCOUNT_ID
echo --------------------------
echo 'Enter the full API call:'
read API_CALL
echo Your API call: $API_CALL
echo --------------------------
echo "Enter the HTTP method: [ ${bold}g${normal} (GET - default) | ${bold}po${normal} (POST) | ${bold}pa${normal} (PATCH) | ${bold}pu${normal} (PUT) | ${bold}d${normal} (DELETE) ]:"
read VERB
if [ "$VERB" = "" ]
	then
	export VERB="GET"
elif [ "$VERB" = "g" ] || [ "$VERB" = "GET" ]
	then
	export VERB="GET"
elif [ "$VERB" = "po" ] || [ "$VERB" = "p" ] || [ "$VERB" = "POST" ]
	then
	export VERB="POST"
elif [ "$VERB" = "pa" ] || [ "$VERB" = "PATCH" ]
	then
	export VERB="PATCH"
elif [ "$VERB" = "pu" ] || [ "$VERB" = "PUT" ]
	then
	export VERB="PUT"
elif [ "$VERB" = "d" ] || [ "$VERB" = "DELETE" ]
	then
	export VERB="DELETE"
fi
echo "Your request type: $VERB"
echo --------------------------
echo 'Enter data to be submitted in the request body:'
read DATA
echo Your call verb: $DATA
echo --------------------------
TOKEN=$(curl -s --data "grant_type=client_credentials" https://oauth.brightcove.com/v3/access_token --header "Content-Type: application/x-www-form-urlencoded" --user "$CLIENT_ID:$CLIENT_SECRET" | sed -E 's/.*access_token\"\:\"([^\"]+)\".*/\1/');
echo Your token: $TOKEN
echo --------------------------
RESPONSE=$(curl -s -v -X $VERB "$API_CALL" -d "$DATA" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json")
echo Raw response:
echo $RESPONSE
echo --------------------------
echo Pretty-printed response:
echo $RESPONSE | python -m json.tool
echo
