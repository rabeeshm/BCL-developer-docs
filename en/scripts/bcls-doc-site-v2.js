var BCLSmain = (function (window, document, bclsNavData) {
    "use strict";
    var precode = document.querySelectorAll("pre>code"),
        // navigation vars
        product,
        productName,
        sectionName,
        isLandingPage = false,
        landingPagePath,
        indexTypeSelectorGroup,
        indexTypeSelectorAlpha,
        productColors = {
            "index": "#333333",
            "video-cloud": "#dd712e",
            "once": "#85a93e",
            "perform": "#35498D"
        },
        gettingStartedBlock = document.getElementById("getting-started"),
        pageIndexBlock = document.getElementById("page-index"),
        groupIndexBlock,
        alphaIndexBlock,
        navWrapper = document.getElementById("navWrapper"),
        breadCrumbWrapper = document.getElementById("breadCrumbWrapper"),
        navMenuLeft,
        navMenuRight,
        titleArea, // the header
        siteTitle,
        searchModal = document.getElementById("searchModal"),
        // all the content sections
        sectionElements = document.querySelectorAll(".bcls-section"),
        // the in-page nav
        sidenav = document.getElementById("sidenav"),
        sideNavElements,
        path = window.location.pathname,
        section,
        subsection,
        performOnly = document.getElementsByClassName("perform-only"),
        videoCloudOnly = document.getElementsByClassName("video-cloud-only"),
        groupObj = {},
        alphaArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        alphaObj = {},
        topObj = {"text": "Top", "link": "bcls_header"},
        navLabel = [topObj],
        menuRightBase = "<li class=\"search\"><a href=\"#\" data-reveal-id=\"searchModal\"><img src=\"//docs.brightcove.com/en/images/search-white.png\" alt=\"search_icon_small_white\" width=\"18\" height=\"18\"></a></li><li class=\"show-for-xlarge-up\"><a href=\"http://docs.brightcove.com/en/DeveloperDocumentationUpdates.xml\"><img src=\"//docs.brightcove.com/en/images/rss-feed-sm.png\" alt=\"rss-feed-sm\" width=\"14\" height=\"14\"></a></li>",
        vcSupportNav = "<li class=\"smaller show-for-large-up\"><a href=\"//support.brightcove.com\">Support</a></li>",
        onceSupportNav = "<li class=\"smaller show-for-large-up\"><a href=\"mailto:oncesupport@brightcove.com\">Support</a></li>",
        titleAreaTemplate = "<nav class=\"top-bar\" data-topbar><ul class=\"title-area\"><li class=\"name\" id=\"siteTitle\"><a href=\"//docs.brightcove.com/en/index.html\"><img class=\"bcls-logo bcls-float-left\" src=\"//docs.brightcove.com/en/images/bc-logo-small.png\" alt=\"Brightcove\">DEVELOPER DOCS</a></li><li class=\"toggle-topbar menu-icon\"><a href=\"#\"><span>Menu</span></a></li></ul><section class=\"top-bar-section\"><ul id=\"navMenuLeft\" class=\"left\"></ul></section><section class=\"top-bar-section\"><ul id=\"navMenuRight\" class=\"right\"></ul></section></nav>",
        searchTemplate = "<div class=\"container\"><div class=\"region region-search\"><section id=\"block-search-api-page-new\" class=\"block block-search-api-page\"><div><a class=\"close-reveal-modal\">&#215;</a></div><div id=\"searchBar\"><gcse:search></gcse:search></div></section>";

    /**
     * Logging function - safe for IE
     * @param  {string} context - description of the data
     * @param  {*} message - the data to be logged by the console
     * @return {}
     */
    function bclslog(context, message) {
        if (window["console"] && console["log"]) {
          console.log(context, message);
        }
        return;
    }


    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {*} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    function isDefined(x) {
        if ( x === '' || x === null || x === undefined || x === NaN) {
            return false;
        }
        return true;
    }

    /**
     * determines whether specified item is in an array
     * @param {array} array to check
     * @param {string} item to check for
     * @return {boolean} true if item is in the array, else false
     */
    function isItemInArray(arr, item) {
        var i,
            iMax = arr.length;
        for (i = 0; i < iMax; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    /**
     * determines whether element has a class
     * @param {HTML element} elem the element
     * @param {string} cls the name of the class you’re looking for
     * @return {boolean} true if the element has that class, false if not
     */
    function hasClass(elem, cls) {
        return (" " + elem.className + " ").indexOf(" " + cls + " ") > -1;
    }

    /**
     * get value of a URL param if exists
     * @param {string} name name of the param you want the value fo
     * @return {string} result value of param if exists or “"
     */
    function getURLparam(name) {
        var regex,
            results;
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        results = regex.exec(window.location.search);
        return (results === null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /**
     * sets document title to contents of first h1 tag
     */
    function setPageTitle() {
        var h1 = document.getElementsByTagName("h1");
        if (isDefined(h1[0])) {
            document.title = h1[0].innerHTML;
        }
    }

    /**
     * sets visibility of the group/alpha indexes for landing page
     * @param {string} indexType index to show "group" | "alpha"
     */
    function setPageIndexType(indexType) {
        if (indexType === "alpha") {
            groupIndexBlock.className = "display-none";
            alphaIndexBlock.className = "display-block";
        } else {
            alphaIndexBlock.className = "display-none";
            groupIndexBlock.className = "display-block";
        }
    }

    /**
     * sets an attribute for each item in a node list
     * @param {nodeList} list  the node list
     * @param {string} attr  the attribute to set
     * @param {string} value the value for the attribute
     */
    function setAttributeOnNodeList(list, attr, value) {
        var i,
            iMax = list.length;
        if (isDefined(list)) {
            for (i = 0; i < iMax; i++) {
                if (isDefined(list[i])) {
                    list[i].setAttribute(attr, value);
                }
            }
        }
    }

    /**
     * highlights the selected item in the in-page navigation
     */
    function highlightCurrentInPageNav() {
        var sideNavListItems = document.querySelectorAll("#sidenav li");
        setAttributeOnNodeList(sideNavListItems, "style", "padding:.2em;");
        setAttributeOnNodeList(sideNavElements, "style", "");
        this.setAttribute("style", "color:#ffffff");
        this.parentElement.setAttribute("style", "background-color:" + productColors[product] + ";padding:.2em;");
    }

    /**
     * buildPageArrays build arrays of pages from the nav data
     * works off the section determined in getSection()
     */
    function buildPageArrays() {
        var navData = bclsNavData[product].sections[section],
            i,
            iMax,
            j,
            jMax,
            item,
            letter,
            firstLetter,
            group;
        // create arrays for section groups
        if (isDefined(navData.groups)) {
            iMax = navData.groups.length;
            for (i = 0; i < iMax; i++) {
                group = navData.groups[i].name;
                groupObj[group] = {};
                groupObj[group].items = [];
                groupObj[group].name = group;
                groupObj[group].header = navData.groups[i].header;
            }
        } else {
            bclslog("no groups", navData);
        }
        // create item arrays and headers for alpha object
        iMax = alphaArr.length;
        for (i = 0; i < iMax; i++) {
            letter = alphaArr[i];
            alphaObj[letter] = {};
            alphaObj[letter].items = [];
            alphaObj[letter].header = letter.toUpperCase();
        }
        // assign items to functional and alpha groups
        if (isDefined(navData.items)) {
            bclslog('navData', navData);
            iMax = navData.items.length;
            for (i = 0; i < iMax; i++) {
                item = navData.items[i];
                // assign to alpha group
                firstLetter = item.name.charAt(0).toLowerCase();
                alphaObj[firstLetter].items.push(item);
                // assign to functional groups
                if (isDefined(item.groups)) {
                    jMax = item.groups.length;
                    for (j = 0; j < jMax; j++) {
                        group = item.groups[j];
                        bclslog('group', group);
                        groupObj[group].items.push(item);
                    }
                } else {
                    bclslog("no groups for item: ", item);
                }
            }
        }
        createNavigation();

    }
    /**
     * create navigation for page sections
     */
    function createInPageNavMenu() {
        var str = "<ul class=\"side-nav show-for-large-up\">",
            i,
            max = navLabel.length,
            j,
            jMax;
        bclslog('navLabel', navLabel);
        if (isDefined(sidenav)) {
            for (i = 0; i < max; i++) {
                str += "<li style=\"padding:.2em\"><a href=\"#" + navLabel[i].link + "\">" + navLabel[i].text + " </a></li>";
            }
            str += "</ul>";
            sidenav.innerHTML += str;
            sideNavElements = document.querySelectorAll("#sidenav li>a");
            // navLinks = document.querySelectorAll("#sidenav a");
            jMax = sideNavElements.length;
            for (j = 0; j < jMax; j++) {
                sideNavElements[j].addEventListener("click", highlightCurrentInPageNav);
            }
        }
    }

    /**
     * creates the in-page navigation on the side
     */
    function createInPageNav() {
        var navObj = {},
            numSections = sectionElements.length,
            i,
            sectionEl;
        // set initial visibilities
        bclslog('creating inpage nav', sectionElements);
        for (i = 0; i < numSections; i++) {
            sectionEl = sectionElements[i];
            switch (product) {
            case "video-cloud":
                if (!hasClass(sectionEl, "perform-only")) {
                    navObj = {};
                    navObj.link = sectionEl.getAttribute("id");
                    navObj.text = sectionEl.children[0].innerHTML;
                    navLabel.push(navObj);
                }
                break;
            case "perform":
                if (!hasClass(sectionEl, "video-cloud-only")) {
                    navObj = {};
                    navObj.link = sectionEl.getAttribute("id");
                    navObj.text = sectionEl.children[0].innerHTML;
                    navLabel.push(navObj);
                }
                break;
            default:
                navObj = {};
                navObj.link = sectionEl.getAttribute("id");
                navObj.text = sectionEl.children[0].innerHTML;
                navLabel.push(navObj);
                break;
            }
        }
        // only create the nav widget if there is more than one item
        if (navLabel.length > 1) {
            // create in-page nav menu
            createInPageNavMenu();
        }
    }

    /**
     * builds the breadcrumbs
     */
    function buildBreadCrumbs() {
        var str = "<li><a href=\"//docs.brightcove.com/en/index.html\">Developer Docs</li>";
        bclslog("product: ", product);
        bclslog("section: ", section);
        bclslog("sectionName: ", sectionName);
        // currently don't need subsection, but might for sections like SDKs
        bclslog("subsection: ", subsection);
        if (isDefined(product)) {
            if (product === "index") {
                str += "<li><a href=\"//docs.brightcove.com/en/index.html\">" + bclsNavData[product].name + "</a></li>";
            } else {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/index.html\">" + bclsNavData[product].name + "</a></li>";
            }
        }
        if (isDefined(sectionName)) {
            if (section === "video-cloud" || section === "perform" || section === "player-management") {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + sectionName.toLowerCase() + "/index.html\"><strong>" + sectionName.replace("-", " ") + "</strong></a></li>";
            } else {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + section + "/index.html\"><strong>" + section.replace("-", " ") + "</strong></a></li>";
            }
        }
        str += "<li class=\"current\">" + document.getElementsByTagName("title")[0].innerHTML + "</li>";
        breadCrumbWrapper.innerHTML = str;
    }

    /**
     * create the global navigation
     */
    function createNavigation() {
        var data = groupObj,
            item,
            i,
            j,
            iMax,
            jMax,
            navHTML = "",
            titleStr = "<a href=\"//docs.brightcove.com/en/",
            navGroups = ["getting-started", "references", "learning-guides"],
            // helper function
            buildNavItem;
        buildNavItem = function (itemGroup) {
            navHTML += "<li class=\"has-dropdown\"><a href=\"#\">" + data[itemGroup].header + "</a><ul class=\"dropdown\">";
            jMax = data[itemGroup].items.length;
            for (j = 0; j < jMax; j++) {
                item = data[itemGroup].items[j];
                navHTML += "<li><a href=\"" + item.url + "\">" + item.name + "</a></li>";
            }
            navHTML += "</ul>";
            return;
        };

        if (isDefined(data)) {
            navHTML += "<li class=\"has-dropdown\"><a href=\"#\">Page Index</a><ul class=\"dropdown\">";
            navHTML += "<li><a href=\"" + landingPagePath + "?show=groups\">By Group</a></li>";
            navHTML += "<li><a href=\"" + landingPagePath + "?show=alpha\">Alphabetical</a></li>";
            navHTML += "</ul>";
            // add other items
            iMax = navGroups.length;
            for (i = 0; i < iMax; i++) {
                if (isDefined(data[navGroups[i]]) && data[navGroups[i]].items.length > 0) {
                    buildNavItem(navGroups[i]);
                }
            }
        }
        navMenuLeft.innerHTML = navHTML;
        // get reference to nav sections
        navWrapper = document.querySelectorAll("nav.top-bar");
        // set the product background color on nav bar
        setAttributeOnNodeList(navWrapper, "style", "background-color:" + productColors.index + ";");
        // get reference to the title area elements
        titleArea = document.getElementById("siteTitle");
        // set background color for title area elements
        setAttributeOnNodeList(titleArea, "style", "background-color:" + productColors.index + ";");
        if (product !== "index") {
            titleStr += product + "/index.html\"><img src=\"" + bclsNavData[product].image + "\"/></a>";
        } else {
            titleStr += "index.html\">" + bclsNavData[product].image + "</a>";
        }
        siteTitle.innerHTML = titleStr;
        buildBreadCrumbs();
        if (isLandingPage) {
            createLandingPageSections();
        } else {
            createInPageNav();
        }
    }

    /**
     * create the index of section pages for the landing page
     */
    function createLandingPageSections() {
        var i, j,
            iMax, jMax,
            item,
            functionalGroup,
            alphaGroup,
            str = "",
            gettingStartedGroups = ["getting-started", "references", "learning-guides"],
            // helper functions
            buildGetStartedGroup,
            buildPageIndexGroup,
            buildPageIndexAlpha;
        bclslog('groupObj', groupObj);
        buildGetStartedGroup = function (itemGroup) {
            str += "<li><fieldset id=\"gettingStartedBlock\" style=\"border: 1px solid " + productColors[product] + ";border-radius:1em;\"><legend>" + groupObj[itemGroup].header + "</legend><ul style=\"list-style:none;\">";
            jMax = groupObj[itemGroup].items.length;
            for (j = 0; j < jMax; j++) {
                item = groupObj[itemGroup].items[j];
                str += "<li style=\"font-size:.9rem\"><a href=\"" + item.url + "\">" + item.name + "</a></li>";
            }
            str += "</ul></fieldset></li>";
            return;
        };

        buildPageIndexGroup = function (itemGroup) {
            str += "<li><h4 class=\"index-page\">" + groupObj[itemGroup].header + "</h4><ul style=\"list-style:none;overflow:hidden;\">";
            jMax = groupObj[itemGroup].items.length;
            for (j = 0; j < jMax; j++) {
                item = groupObj[itemGroup].items[j];
                str += "<li style=\"font-size:.9rem\"><a href=\"" + item.url + "\">" + item.name + "</a></li>";
            }
            str += "</ul></li>";
            return;
        };

        buildPageIndexAlpha = function (itemGroup) {
            str += "<li style=\"font-size:.9rem\"><h4 class=\"index-page\">" + alphaObj[itemGroup].header + "</h4><ul style=\"list-style:none;overflow:hidden;\">";
            jMax = alphaObj[itemGroup].items.length;
            for (j = 0; j < jMax; j++) {
                item = alphaObj[itemGroup].items[j];
                str += "<li style=\"font-size:.9rem\"><a href=\"" + item.url + "\">" + item.name + "</a></li>";
            }
            str += "</ul></li>";
            return;
        };

        // build the getting started block
        iMax = gettingStartedGroups.length;
        str += "<ul class=\"small-block-grid-1 medium-block-grid-3\">";
        for (i = 0; i < iMax; i++) {
            if (groupObj[gettingStartedGroups[i]].items.length > 0) {
                buildGetStartedGroup(gettingStartedGroups[i]);
            }
        }
        str += "</ul>";
        gettingStartedBlock.innerHTML += str;
        // reset string and build index by groups
        str = "";
        str += "<fieldset id=\"groupIndex\" style=\"border: 1px solid " + productColors[product] + ";border-radius:1em\"><legend>Page Index by Group</legend><ul class=\"small-block-grid-1 medium-block-grid-4\">";
        str += "<p style=\"margin-top:1.5em\"><select id=\"indexTypeSelectorGroup\" style=\"width:240px;font-size:.8rem;margin-left:1rem;margin-top:0;margin-bottom:0;\"><option value=\"groups\">Show Pages by Group</option><option value=\"alpha\">Show Pages Alphabetically</option></select></p>";
        for (functionalGroup in groupObj) {
            if (groupObj[functionalGroup].items.length > 0) {
                buildPageIndexGroup(functionalGroup);
            }
        }
        str += "</ul></fieldset>";
        pageIndexBlock.innerHTML += str;
        // reset string and build index alphabetically
        str = "";
        str += "<fieldset id=\"alphaIndex\" class=\"display-none\" style=\"border: 1px solid " + productColors[product] + ";border-radius:1em\"><legend>Alphabetical Page Index</legend><ul class=\"small-block-grid-1 medium-block-grid-4\">";
        str += "<p style=\"margin-top:1.5em\"><select id=\"indexTypeSelectorAlpha\" style=\"width:240px;font-size:.8rem;margin-left:1rem;margin-top:0;margin-bottom:0;\"><option value=\"groups\">Show Pages by Group</option><option value=\"alpha\">Show Pages Alphabetically</option></select></p>";
        for (alphaGroup in alphaObj) {
            if (alphaObj[alphaGroup].items.length > 0) {
                buildPageIndexAlpha(alphaGroup);
            }
        }
        pageIndexBlock.innerHTML += str;
        // get references to new elements
        groupIndexBlock = document.getElementById("groupIndex");
        alphaIndexBlock = document.getElementById("alphaIndex");
        indexTypeSelectorGroup = document.getElementById("indexTypeSelectorGroup");
        indexTypeSelectorAlpha = document.getElementById("indexTypeSelectorAlpha");

        //add event listeners for index type selector
        indexTypeSelectorGroup.addEventListener("change", function () {
            setPageIndexType(indexTypeSelectorGroup.options[indexTypeSelectorGroup.selectedIndex].value);
            bclslog("g selected index", indexTypeSelectorGroup.selectedIndex);
                indexTypeSelectorAlpha.selectedIndex = 1;

        });
        indexTypeSelectorAlpha.addEventListener("change", function () {
            setPageIndexType(indexTypeSelectorAlpha.options[indexTypeSelectorAlpha.selectedIndex].value);
            bclslog("a selected index", indexTypeSelectorGroup.selectedIndex);
                indexTypeSelectorGroup.selectedIndex = 0;

        });
        // if on landing page see what version of page index to show value
        if (getURLparam("show") === "alpha") {
            setPageIndexType("alpha");
        }

    }
    // figure out what section we're in
    function getSection() {
        var pathArray = path.split("/"),
            server,
            searchScript = document.createElement("script"),
            redirectArray,
            searchBar,
            headers = document.querySelectorAll("h1, h2"),
            i,
            iMax,
            j,
            item;
        // remove the 0 element, as it will be empty
        pathArray.splice(0, 1);
        // if path ends in a /, add index.html
        if (pathArray[pathArray.length - 1] === "") {
            pathArray[pathArray.length - 1] = "index.html";
        }
        // figure out which server we're on
        if (pathArray[0] === "en") {
            // we're on docs
            server = "docs";
        } else if (pathArray[0] === "bcls") {
            // we're on solutions
            server = "solutions";
        } else {
            // no idea where we are - no point going on
            bclslog("don't know where we are: ", pathArray[0]);
            return;
        }
        bclslog("pathArray: ", pathArray);
        // docs actions - multiple products
        if (server === "docs") {
            // act according to the product (or landing page)
            switch (pathArray[1]) {
            case "index.html": // on the docs landing page
                section = "null";
                product = "index";
                productName = null;
                navMenuRight.innerHTML = menuRightBase + vcSupportNav;
                break;
            case "video-cloud": // in video cloud
                product = "video-cloud";
                // get a reference to search block
                searchBar = document.getElementById("searchBar");
                // set the source for the script that generates the search field
                searchScript.setAttribute("src", "//docs.brightcove.com/en/scripts/search-script-video-cloud.js");
                // append the search script to the appropriate div in the nav bar
                searchBar.appendChild(searchScript);
                // hide anything perform-only
                setAttributeOnNodeList(performOnly, "style", "display:none");
                productName = "Video Cloud";
                if (pathArray[2] === "index.html") {
                    // on video cloud landing page
                    section = "video-cloud";
                    sectionName = "Video Cloud";
                    subsection = null;
                    // at least for now, manually maintaining Video Cloud landing page
                    // createLandingPageSections(bclsNavData[product].sections[section]);
                } else {
                    section = pathArray[2];
                    // special cases
                    if (section === "concepts" || section === "open-source") {
                        section = "video-cloud";
                    } else if (section === "tve") {
                        section = "smart-player-api";
                    } else if (section === "player-management") {
                        sectionName = "player-management";
                    } else if (section === "ingest-profiles-api") {
                        section = "ingest-profiles-api";
                        sectionName = "Ingest Profiles API";
                    } else if (section === "di-api") {
                        section = "di-api";
                        sectionName = "Dynamic Ingest API";
                    } else if (section === "cms-api") {
                        section = "cms-api";
                        sectionName = "CMS API";
                    } else if (section === "media-management" ) {
                        section = "media-management";
                        sectionName = "Media Management";
                    } else if (section === "policy-api") {
                        section = "playback-api";
                        sectionName = "Playback API";
                    } else if (section === "analytics-api") {
                        section = "analytics-api";
                        sectionName = "Analytics API";
                    } else {
                        sectionName = bclsNavData["video-cloud"].sections[section].name;
                    }
                    // if section is brightcove-player, remove 'no-perform' items from groups
                    if (section === 'brightcove-player') {
                        iMax = bclsNavData[product].sections[section].items.length;
                        for (i = 0; i < iMax; i++) {
                            item = bclsNavData[product].sections[section].items[i];
                            j = item.groups.length;
                            while (j > 0) {
                                j--;
                                if (item.groups[j] === "no-perform") {
                                    item.groups.splice(j, 1);
                                }
                            }
                        }
                    }

                    // // if section is ingest profiles api, di api or cms api, set section to media management
                    // if (section === "ingest-profiles-api" || section === "di-api" || section === "cms-api") {
                    //     section = "media-management";
                    // }
                    // check to see if we're on the section landing page
                    if (pathArray[3] === "index.html") {
                        // we're on the section landing page
                        isLandingPage = true;
                        subsection = null;
                    } else {
                        subsection = pathArray[3];
                    }
                    redirectArray = pathArray.slice(0, 3);
                    bclslog("redirectArray", redirectArray);
                    landingPagePath = "//docs.brightcove.com/en/" + product + "/" + section + "/index.html";
                    // check to see if we're on a subsection landing page
                    if (isDefined(subsection)) {
                        // all we care about is whether we accidentally got onto a
                        // subsection index page, in which case, we redirect
                        // to section landing page, unless this is an api reference
                        if (isItemInArray(pathArray, "index.html") && !isItemInArray(pathArray, "reference") && !isItemInArray(pathArray, "references")) {

                            window.location.href = landingPagePath;
                        }
                    }
                }
                navMenuRight.innerHTML = menuRightBase + vcSupportNav;
                break;
            case "once": // in once
                redirectArray = pathArray.slice(0, 3);
                landingPagePath = "//docs.brightcove.com/" + redirectArray.join("/") + "/index.html";

                // there is only one section
                product = "once";
                // get a reference to search block
                searchBar = document.getElementById("searchBar");
                // set the source for the script that generates the search field
                searchScript.setAttribute("src", "//docs.brightcove.com/en/scripts/search-script-once.js");
                // append the search script to the appropriate div in the nav bar
                searchBar.appendChild(searchScript);
                section = "index";
                if (pathArray[2] === "index.html") {
                    // on once landing page
                    isLandingPage = true;
                    section = "index";
                    sectionName = "Home";
                    subsection = null;
                    isLandingPage = true;
                } else {
                    section = "index";
                    sectionName = null;
                    subsection = pathArray[2];
                    // check to see if we're on the section or subsection landing page
                    // and redirect to product landing page if so
                    if (pathArray[3] === "index.html" && !isItemInArray(pathArray, "versions")) {
                        window.location.href = landingPagePath;
                    }
                }
                navMenuRight.innerHTML = menuRightBase + onceSupportNav;
                // createNavigation();
                break;
            case "perform": // in perform
                product = "perform";
                // get a reference to search block
                searchBar = document.getElementById("searchBar");
                // set the source for the script that generates the search field
                searchScript.setAttribute("src", "//docs.brightcove.com/en/scripts/search-script-perform.js");
                // append the search script to the appropriate div in the nav bar
                searchBar.appendChild(searchScript);
                redirectArray = pathArray.slice(0, 3);
                landingPagePath = "//docs.brightcove.com/" + redirectArray.join("/") + "/index.html";
                // hide anything video-cloud-only
                setAttributeOnNodeList(videoCloudOnly, "style", "display:none");
                productName = "Perform";
                if (pathArray[2] === "index.html") {
                    // on perform landing page
                    section = "perform";
                    sectionName = null;
                    subsection = null;
                    createLandingPageSections(bclsNavData[product].sections[section]);
                } else {
                    section = pathArray[2];
                    /**
                     * special cases
                     */
                    if (section === "concepts") {
                        sectionName = "Concepts";
                        subsection = null;
                        section = "perform";
                    } else {
                        sectionName = bclsNavData[product].sections[section].name;
                    }
                    // if section is brightcove-player check for Video Cloud only items to remove from nav
                    if (section === 'brightcove-player') {
                        i = bclsNavData[product].sections[section].items.length;
                        while (i > 0) {
                            i--;
                            if (isItemInArray(bclsNavData[product].sections[section].items[i].groups, 'no-perform')) {
                                bclsNavData[product].sections[section].items.splice(i, 1);
                            }
                        }
                        bclslog('bclsNavData[product].sections[section]', bclsNavData[product].sections[section]);
                    }
                    // check to see if we're on the section landing page
                    if (pathArray[3] === "index.html") {
                        // we're on the section landing page
                        isLandingPage = true;
                    } else {
                        subsection = pathArray[3];
                    }
                    // check to see if we're on a subsection landing page
                    if (isDefined(subsection)) {
                        // check to see if we're on the section or subsection landing page
                        // and redirect to product landing page if so
                        if (pathArray[3] === "index.html" && !isItemInArray(pathArray, "versions")) {
                            window.location.href = landingPagePath;
                        }
                    }
                }
                navMenuRight.innerHTML = menuRightBase + vcSupportNav;
                break;
            default:
                section = "index";
                sectionName = null;
                product = "index";
                productName = "";
                navMenuRight.innerHTML = menuRightBase + vcSupportNav;
            }
        } else if (server === "solutions") {
            product = "video-cloud";
            // get a reference to search block
            searchBar = document.getElementById("searchBar");
            // set the source for the script that generates the search field
            searchScript.setAttribute("src", "//docs.brightcove.com/en/scripts/search-script-video-cloud.js");
            // append the search script to the appropriate div in the nav bar
            searchBar.appendChild(searchScript);

            subsection = "solutions";
            section = pathArray[1];
            sectionName = section;
            navMenuRight.innerHTML = menuRightBase + vcSupportNav;
        } else {
            // don't know where we are
            product = null;
            section = null;
            // get a reference to search block
            searchBar = document.getElementById("searchBar");
            // set the source for the script that generates the search field
            searchScript.setAttribute("src", "//docs.brightcove.com/en/scripts/search-script-video-cloud.js");
            // append the search script to the appropriate div in the nav bar
            searchBar.appendChild(searchScript);

            navMenuRight.innerHTML = menuRightBase + vcSupportNav;
            bclslog("unknown server");
        }

        // set header colors to product color
        setAttributeOnNodeList(headers, "style", "color:" + productColors[product]);
        // create the data structurs for navigation and landing page content
        if (isDefined(section)) {
            buildPageArrays();
        }
    }
    // initialization: set the page title, set up the header shell, get references to the parts
    function init() {
        var headers = document.querySelectorAll("h1, h2"),
            searchBar;

        // set the page title in case wrong
        setPageTitle();
        // set up the header
        navWrapper.innerHTML = titleAreaTemplate;
        searchModal.innerHTML += searchTemplate;
        // searchBar.appendChild(searchScript);// get a reference to search block
        // searchBar = document.getElementById("searchBar");
        // set the source for the script that generates the search field
        // searchScript.setAttribute("src", "//docs.brightcove.com/en/scripts/search-script.js");
        // append the searc
        // get references to header sections
        navMenuLeft = document.getElementById("navMenuLeft");
        navMenuRight = document.getElementById("navMenuRight");
        titleArea = document.getElementsByClassName("title-area")[0];
        siteTitle = document.getElementById("siteTitle");
        // get the section name
        getSection();
    }

    init();
    // making these public in case you're generating page
    // content dynamically and need to run things after
    // or want to use the product var for some purpose
    return {
        "createInPageNav": createInPageNav,
        "product": product
    };
})(window, document, bclsNavData);
