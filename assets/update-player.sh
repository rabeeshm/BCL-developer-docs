bold=`tput bold`
normal=`tput sgr0`
echo 'Enter your Video Cloud username'
read USERNAME
echo Your username: $USERNAME
echo --------------------------
echo 'Enter your Video Cloud password'
read PASSWORD
echo Your password: $PASSWORD
echo --------------------------
echo 'Enter the account id:'
read ACCOUNT_ID
echo Your account id: $ACCOUNT_ID
echo --------------------------
echo 'Enter the ID for the player to update:'
read PLAYER_ID
echo Your player id: $PLAYER_ID
echo --------------------------
echo 'Enter the version to update to (x.x.x):'
read VERSION
echo Version to update to: $PLAYER_ID
echo --------------------------

DATASTART='{ "player": { "template": { "version": "'
DATAEND='" } }, "skin": "graphite", "compatibility": true }'
DATA= '"$DATASTART""$VERSION""$DATAEND"'

RESPONSE=$(curl --header "Content-Type: application/json" --user "$USERNAME":"$PASSWORD" --request PATCH --data "$DATA" https://players.api.brightcove.com/v1/accounts/"$ACCOUNT_ID"/players/"$PLAYER_ID"/configuration)
echo 'Response:'
echo $RESPONSE
echo --------------------------

echo 'Will now publish the player'
RESPONSE=$(curl --header "Content-Type: application/json" --user "$USERNAME":"$PASSWORD" --request POST https://players.api.brightcove.com/v1/accounts/"$ACCOUNT_ID"/players/"$PLAYER_ID"/publish)
echo 'Response:'
echo $RESPONSE
echo The player has been updated
