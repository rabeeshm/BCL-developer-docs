txtrst=$(tput sgr0) # Text reset
txtyel=$(tput setaf 7) # Yellow
txtgrn=$(tput setaf 6) # Green
txtred=$(tput setaf 9) # red
cd player-management-api
echo ${txtyel}generating docs for player-management-api
apidoc -i v2/src/  -f .js -o v2/doc/ -t ../template-v3
echo ${txtgrn}Finished!
echo ${txtrst}
