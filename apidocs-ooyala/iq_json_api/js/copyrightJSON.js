function copyJSONFunction()
{
    var copyNotice = document.getElementById("copyrightJSON");
    copyNotice.setAttribute('style','font-size: 16px; text-align:center;');
    var date = new Date();
    var currentYear = date.getFullYear();
    var footerString = "<a href=\"http://ooyala.com\" target=\"_blank\">&copy; ";
    footerString += currentYear;
    footerString += " Ooyala, Inc. &bull;</a>";
    footerString += "<a href=\"http://ooyala.com/websiteprivacy\" target=\"_blank\"> Website Privacy Policy &bull;</a>";
    footerString += "<a href=\"http://ooyala.com/websitetos\" target=\"_blank\"> Terms of Service &bull;</a>";
    footerString += " All Rights Reserved ";
    footerString += "<a href=\"http://support.ooyala.com/developers/documentation/concepts/about.html\" target=\"_blank\">";
    footerString += "&bull; Ooyala Support - Developer Documentation</a>";
    copyNotice.innerHTML=footerString;
}
