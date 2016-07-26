txtrst=$(tput sgr0) # Text reset
txtyel=$(tput setaf 7) # Yellow
txtgrn=$(tput setaf 6) # Green
txtred=$(tput setaf 9) # red
bold=`tput bold`
normal=`tput sgr0`
echo 'Enter your client id:'
read CLIENT_ID
echo Your client id: $CLIENT_ID
echo --------------------------
echo 'Enter your client secret:'
read CLIENT_SECRET
echo Your client secret: $CLIENT_SECRET
echo --------------------------
TOKEN=$(curl -s --data "grant_type=client_credentials" https://oauth.brightcove.com/v3/access_token --header "Content-Type: application/x-www-form-urlencoded" --user "$CLIENT_ID:$CLIENT_SECRET" | sed -E 's/.*access_token\"\:\"([^\"]+)\".*/\1/');
echo Your token: $TOKEN
echo
