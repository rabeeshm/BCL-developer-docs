var BCLSmain = (function ($, window, console, document, Handlebars, bclsNavData, hljs) {
    "use strict";
    var precode = document.querySelectorAll("pre>code"),
        // for handlebars
        template,
        result,
        // navigation vars
        linkPath,
        product,
        productName,
        sectionName,
        isLandingPage = false,
        isSubSectionIndex = false,
        landingPagePath,
        productColors = {
            "index": "#333333",
            "video-cloud": "#dd712e",
            "once": "#85a93e",
            "perform": "#35498D"
        },
        highlightBackgroundColor = "#000000",
        $this,
        $currentPage,
        $currentItem,
        navWrapper = document.getElementById("navWrapper"),
        breadCrumbWrapper = document.getElementById("breadCrumbWrapper"),
        navMenuLeft,
        navMenuRight,
        titleArea, // the header
        siteTitle,
        searchModal = document.getElementById("searchModal"),
        // all the content sections
        divsections = document.querySelectorAll("div.section"),
        // the in-page nav
        sidenav = document.getElementById("sidenav"),
        path = window.location.pathname,
        section,
        subsection,
        performOnly = document.getElementsByClassName("perform-only"),
        videoCloudOnly = document.getElementsByClassName("video-cloud-only"),
        navArr = [],
        groupObj = {},
        alphaArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        alphaObj = {"a":[], "b":[], "c":[], "d":[], "e":[], "f":[], "g":[], "h":[], "i":[], "j":[], "k":[], "l":[], "m":[], "n":[], "o":[], "p":[], "q":[], "r":[], "s":[], "t":[], "u":[], "v":[], "w":[], "x":[], "y":[], "z":[]},
        topObj = {"text": "Top", "link": "top"},
        navLabel = [topObj],
        menuRightBase = "<li class=\"search\"><a href=\"#\" data-reveal-id=\"searchModal\"><img src=\"//docs.brightcove.com/en/images/search-white.png\" alt=\"search_icon_small_white\" width=\"18\" height=\"18\"></a></li><li class=\"show-for-xlarge-up\"><a href=\"http://docs.brightcove.com/en/DeveloperDocumentationUpdates.xml\"><img src=\"//docs.brightcove.com/en/images/rss-feed-sm.png\" alt=\"rss-feed-sm\" width=\"14\" height=\"14\"></a></li>",
        vcSupportNav = "<li class=\"smaller show-for-xlarge-up\"><a href=\"//support.brightcove.com\">Support</a></li>",
        onceSupportNav = "<li class=\"smaller show-for-xlarge-up\"><a href=\"mailto:oncesupport@brightcove.com\">Support</a></li>",
        performSupportNav = "vcSupportNav",
        navItemTemplate = "<li><a href=\"{{url}}\" title=\"{{name}}\">{{name}}</a></li>",
        navDropdownStartTemplate = "<li class=\"has-dropdown\"><a href=\"#\">{{name}}</a><ul class=\"dropdown\">",
        navDropdownEndTemplate = "</ul></li>",
        titleAreaTemplate = "<nav class=\"top-bar\" data-topbar><ul class=\"title-area\"><li class=\"name\" id=\"siteTitle\"><a href=\"//docs.brightcove.com/en/index.html\"><img class=\"bcls-logo bcls-float-left\" src=\"//docs.brightcove.com/en/images/bc-logo-small.png\" alt=\"Brightcove\">DEVELOPER DOCS</a></li><li class=\"toggle-topbar menu-icon\"><a href=\"#\"><span>Menu</span></a></li></ul><section class=\"top-bar-section\"><ul id=\"navMenuLeft\" class=\"left\"></ul></section><section class=\"top-bar-section\"><ul id=\"navMenuRight\" class=\"right\"></ul></section></nav>",
        searchTemplate = "<div class=\"container\"><div class=\"region region-search\"><section id=\"block-search-api-page-new\" class=\"block block-search-api-page\"><div><a class=\"close-reveal-modal\">&#215;</a></div><div id=\"searchBar\"><script>\
          (function() {\
            var cx = '007321107584305483635:pnl5oukzxbq';\
            var gcse = document.createElement('script');\
            gcse.type = 'text/javascript';\
            gcse.async = true;\
            gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;\
            var s = document.getElementsByTagName('script')[0];\
            s.parentNode.insertBefore(gcse, s);\
          })();\
        </script>\
        <gcse:search></gcse:search></div></section>",
        solutionsPageBlockStart = "<div class=\"large-3 small-12 columns\" style=\"overflow-x:hidden\"><h2>{{name}}</h2>",
        solutionsPageItemsTemplate = "<ul>{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}</ul>",
        solutionsPageBlockEnd = "</div>",
        // functions
        bclslog,
        lightenDarkenColor,
        isDefined,
        hasClass,
        findObjectInArray,
        isItemInArray,
        setPageTitle,
        setAttributeOnNodeList,
        forceSecure,
        createInPageNavMenu,
        createInPageNav,
        highlightCurrentItem,
        buildBreadCrumbs,
        createNavigation,
        buildPageArrays,
        createLandingPageSections,
        getSection,
        init,
        BCLhighlight;
    /**
     * Logging function - safe for IE
     * @param  {string} context description of the data
     * @param  {*} message the data to be logged by the console
     * @return {}
     */
    bclslog = function (context, message) {
        if (window["console"] && console["log"]) {
          console.log(context, message);
        }
        return;
    };

    /*
     * Usage
     * Lighten
     * var NewColor = LightenDarkenColor("#F06D06", 20);
     * Darken
     * var NewColor = LightenDarkenColor("#F06D06", -20);
     */
    lightenDarkenColor = function (col, amt) {
        var usePound = false,
            num,
            r,
            b,
            g;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
        num = parseInt(col, 16);
        r = (num >> 16) + amt;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        g = (num & 0x0000FF) + amt;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    };
    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {*} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    isDefined = function (x) {
        if ( x !== "" && x !== null && x !== undefined && !x.isNaN() && x !== {} && x !== []){
            return true;
        } else {
            return false;
        }
    };
    /**
     * find index of an object in array of objects based on some property value
     * @param {array} targetArray
     * @param {string} objProp property to evaluate
     * @param {string} value property value to look for
     * @return {integer} first index if found, otherwise returns -1
     */
    findObjectInArray = function (targetArray, objProp, value) {
        var i, totalItems = targetArray.length,
            objFound = false;
        for (i = 0; i < totalItems; i++) {
            if (targetArray[i][objProp] === value) {
                objFound = true;
                return i;
            }
        }
        if (objFound === false) {
            return -1;
        }
    };

    /**
     * determines whether specified item is in an array
     * @param {array} array to check
     * @param {string} item to check for
     * @return {boolean} true if item is in the array, else false
     */
    isItemInArray = function (arr, item) {
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
    hasClass = function (elem, cls) {
        return (" " + elem.className + " " ).indexOf( " " + cls + " " ) > -1;
    };

    /**
     * sets document title to contents of first h1 tag
     */
    setPageTitle = function () {
        document.title = document.getElementsByTagName("h1")[0].innerHTML;
    };

    /**
     * sets an attribute for each item in a node list
     * @param {nodeList} list  the node list
     * @param {[type]} attr  the attribute to set
     * @param {[type]} value the value for the attribute
     */
    setAttributeOnNodeList = function (list, attr, value) {
        var i,
            iMax = list.length;
        for (i = 0; i < iMax; i++) {
            list[i].setAttribute(attr, value);
        }
    };

    /**
     * force into https mode if not already there - currently unused
     * @return {}
     */
    forceSecure = function () {
        var pageURL = window.location.href,
            pageProtocol = window.location.protocol;
        if (pageProtocol === "http:") {
            window.location.href = pageURL.replace("http:", "https:");
        }
    };

    /**
     * buildPageArrays build arrays of pages from the nav data
     * works off the section determined in getSection()
     */
    buildPageArrays = function () {
        var navData = bclsNavData[section],
            i,
            iMax,
            j,
            jMax,
            item,
            firstLetter;
        // create arrays for section groups
        if (isDefined(navData.groups)) {
            iMax = navData.groups.length;
            for (i = 0; i < iMax; i++) {
                group = navData.groups[i].name;
                groupObj[group].items = [];
                groupObj[group].name = group.name;
                groupObj[group].header = group.header;
            }
        } else {
            bclslog("no groups", navdata);
        }
        // assign items to functional and alpha groups
        if (isDefined(navData.items)) {
            iMax = navData.items.length;
            for (i = 0; i < iMax; i++) {
                item = navData.items[i];
                // assign to alpha group
                firstLetter = item.name.charAt(0);
                alphaObj[firstLetter].push(item);
                // assign to functional groups
                if (isDefined(item.groups)) {
                    jMax = item.groups.length;
                    for (j = 0; j < jMax; j++) {
                        group = item.groups[i].name;
                        groupObj[group].items.push(item);
                    }
                } else {
                    bclslog("no groups for item: ", item);
                }
            }
        }



    };
    // create navigation for page sections
    createInPageNavMenu = function () {
        var str = "<ul class=\"side-nav show-for-large-up\">",
            i,
            max = navLabel.length,
            navElements,
            j,
            jMax,
            k;
        for (i = 0; i < max; i++) {
            str += "<li><a href=\"#" + navLabel[i].link + "\">" + navLabel[i].text + " </a></li>";
        }
        str += "</ul>";
        sidenav.innerHTML += str;
        navElements = document.querySelectorAll("ul.side-nav a");
        jMax = navElements.length;
        for (j = 0; j < jMax; j++) {
            navElements[j].addEventListener("click", function () {
                setAttributeOnNodeList(navElements, "style", "");
                navElements[j].setAttribute("style", "background-color:" + productColors[product] + ";color:#ffffff");
            });
        }
        // TODO move this to the right place
        // set h2 color to product NewColor
        $("h1,h2").attr("style", "color:" + productColors[product]);
    };
    createInPageNav = function () {
        var navObj = {},
            numSections = divsections.length,
            i;
        // set initial visibilities
        bclslog("divsections", divsections);
        for (i = 0; i < numSections; i++) {
            if (i > 0) {
                var sectionEl = divsections.item(i);
                bclslog("sectionEl", sectionEL);
                switch (product) {
                case "video-cloud":
                    if (!hasClass(sectionEL), "perform-only") {
                        navObj = {};
                        navObj.link = sectionEl.getAttribute("id");
                        navObj.text = sectionEl.firstChild.innerHTML;
                        navLabel.push(navObj);
                    }
                    break;
                case "perform":
                    if (!hasClass(sectionEl, "video-cloud-only")) {
                        navObj = {};
                        navObj.link = sectionEl.getAttribute("id");
                        navObj.text = sectionEl.firstChild.innerHTML;
                        navLabel.push(navObj);
                    }
                    break;
                default:
                    navObj = {};
                    navObj.link = sectionEl.getAttribute("id");
                    navObj.text = sectionEl.firstChild.innerHTML;
                    navLabel.push(navObj);
                    break;
                }
            }
        }
        // only create the nav widget if there is more than one item
        if (navLabel.length > 1) {
            // create in-page nav menu
            createInPageNavMenu();
        }
    };
    // TODO eliminate this but move the calls to build breadcrumbs and inpage nav
    // highlight the current page in the global navigation
    highlightCurrentItem = function () {
        // find current page in navigation menu
        $navMenuLeft.find("a").each(function () {
            $this = $(this);
            linkPath = $this.attr("href");
            // extract path
            linkPath = linkPath.slice(2); // remove "//"
            linkPath = linkPath.slice(linkPath.indexOf("/"));
            if (linkPath === path) {
                $currentPage = $this;
                $currentItem = $this.parent("li");
                return false;
            }
            return true;
        });
        // current page may be undefined if the site index
        if (isDefined($currentPage)) {
            $currentPage.attr("style", "background-color:" + highlightBackgroundColor + ";");
            $currentItem.attr("style", "background-color:" + highlightBackgroundColor + ";");
            if (isDefined($currentItem) && $currentItem.parents("li").hasClass("has-dropdown")) {
                $currentItem.parents("li").attr("style", "background-color:" + highlightBackgroundColor + ";");
                $currentItem.parents("li").children("a").attr("style", "background-color:" + highlightBackgroundColor + ";");
            }
        }
        // TODO - move to another location
        // build breadcrumbs
        buildBreadCrumbs();
        // next create the in-page navigation
        createInPageNav();
    };
    buildBreadCrumbs = function () {
        var str = "<li><a href=\"//docs.brightcove.com/en/index.html\">Developer Docs</li>";
        bclslog("product: ", product);
        bclslog("section: ", section);
        bclslog("sectionName: ", sectionName);
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
        if (isDefined(sectionName)) {
            str += "<li class=\"current\">" + document.getElementsByTagName("title")[0].innerHTML + "</li>";
        }
        breadCrumbWrapper.innerHTML = str;
    };
    // create the global navigation
    createNavigation = function () {
        var data = bclsNavData[product],
            item,
            i,
            max,
            navHTML = "",
            itemTemplate = Handlebars.compile(navItemTemplate),
            listStartTemplate = Handlebars.compile(navDropdownStartTemplate),
            // helper functions
            processTemplate,
            processItem,
            processDropdown,
            titleStr = "<a href=\"//docs.brightcove.com/en/";
        // helper functions
        processTemplate = function (item) {
            result = template(item);
            navHTML += result;
        };
        bclslog("navdata", data);
        processItem = function (item) {
            if (isDefined(item.items)) {
                // start a dropdown
                template = listStartTemplate;
                processTemplate(item);
                processDropdown(item.items);
                navHTML += navDropdownEndTemplate;
            } else if (isDefined(item.url)) {
                template = itemTemplate;
                processTemplate(item);
            }
        };
        processDropdown = function (items) {
            var j = 0,
                jMax = items.length,
                subItem;
            for (j = 0; j < jMax; j++) {
                subItem = items[j];
                processItem(subItem);
            }
        };
        // see if there are sections and calculate the number of items to process
        if (isDefined(data)) {
            if (isDefined(data.items)) {
                // we're on the landing page
                max = data.items.length;
            } else if (isDefined(data.sections)) {
                // we're in a product that has sections
                data = data.sections[section];
                if (isDefined(data)) {
                    max = data.items.length;
                }

            } else {
                // something's wrong
                bclslog("something wrong in nav data", data);
                return;
            }
            // process the nav items
            for (i = 0; i < max; i++) {
                item = data.items[i];
                // check for simple item or dropdown
                processItem(item);
                // end dropdown
                navHTML += navDropdownEndTemplate;
            }
        }
        $navMenuLeft.html(navHTML);
        $navWrapper.find("nav,ul,section,li,a").attr("style", "background-color:" + productColors[product] + ";");
        $titleArea.find("ul,li,a,img").attr("style", "background-color:" + productColors.index + ";");
        if (product !== "index") {
            titleStr += product + "/index.html\"><img src=\"" + bclsNavData[product].image + "\"/></a>";
        } else {
            titleStr += "index.html\">" + bclsNavData[product].image + "</a>";
        }
        siteTitle.innerHTML = titleStr;
        highlightBackgroundColor = lightenDarkenColor(productColors[product], -40);
        highlightCurrentItem();
    };
    // create the index of section pages for the landing page
    createLandingPageSections = function (data) {
        bclslog("createLandingPageSectionsData", data);
        var sections = document.getElementById("sections"),
            i,
            j,
            k,
            l,
            max,
            jMax,
            kMax,
            lMax,
            item,
            landingPageBlockTemplateStart = "<div class=\"large-3 small-12 columns\" style=\"overflow-x:hidden\"><h2 class=\"index-page\">{{name}}</h2>",
            landingPageBlock2TemplateStart = "<h2 class=\"index-page\">{{name}}</h2>",
            landingPageSubMenuTemplateStart = "<div><h4 class=\"index-page\">{{name}}</h4>",
            landingPageSubSubMenuTemplateStart = "<div><h5 class=\"index-page\">{{name}}</h5>",
            landingPageBlockTemplateEnd = "</div>",
            landingPageBlockTemplate = "<p style=\"font-size:.9rem;line-height:.9rem;margin-bottom:.5rem;\"><a href=\"{{url}}\">{{name}}</a></p>",
            landingItemTemplate = "<p style=\"font-size:.9rem;line-height:.9rem;margin-bottom:.5rem;margin-left:1rem;\"><a href=\"{{url}}\">{{name}}</a></p>",
            blockTemplateStart = Handlebars.compile(landingPageBlockTemplateStart),
            blockTemplate2Start = Handlebars.compile(landingPageBlock2TemplateStart),
            subTemplateStart = Handlebars.compile(landingPageSubMenuTemplateStart),
            subsubTemplateStart = Handlebars.compile(landingPageSubSubMenuTemplateStart),
            itemTemplate = Handlebars.compile(landingPageBlockTemplate),
            SingleItemTemplate = Handlebars.compile(landingItemTemplate),
            blockEndTemplate = landingPageBlockTemplateEnd,
            str = "";

        if (isDefined(sections)) {
            data = data.items;
            bclslog("section exists Data", data);
            max = data.length;
            for (i = 0; i < max; i++) {
                item = data[i];
                bclslog("landing page item", item);
                if (isDefined(item.items)) {
                    kMax = item.items.length;
                    if (i === 1) {
                        str += blockTemplate2Start(item);
                    } else {
                        str += blockTemplateStart(item);
                    }

                    for (k = 0; k < kMax; k++) {
                        var kItem = item.items[k];
                        // check for submenus
                        if (isDefined(kItem.items)) {
                            str += subTemplateStart(kItem);
                            jMax = kItem.items.length;
                            for (j = 0; j < jMax; j++) {
                                var jItem = kItem.items[j];
                                // check for subsubmenu
                                if (isDefined(jItem.items)) {
                                    lMax = jItem.items.length;
                                    for (l = 0; l < lMax; l++) {
                                        var mItem = jItem.items[l];
                                        str += itemTemplate(mItem);
                                    }
                                } else {
                                    str += itemTemplate(jItem);
                                }
                            }
                            str += blockEndTemplate;
                        } else {
                            str += itemTemplate(kItem);
                        }
                    }
                } else {
                    bclslog("item", item);
                    str += SingleItemTemplate(item);
                }
                if (i > 0) {
                    str += blockEndTemplate;
                }
            }
            sections.innerHTML = str;
        }
    };
    // figure out what section we're in
    getSection = function () {
        var pathArray = path.split("/"),
            server, dataIndex, modulesIndex;
        // remove the 0 element, as it will be empty
        pathArray.splice(0, 1);
        // if path ends in a /, add index.html
        if (pathArray[pathArray.length - 1] === "/" {
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
                var redirectArray = pathArray.slice(0, 2),
                landingPagePath = redirectArray.join("/") + "/index.html";
                product = "video-cloud";
                // hide anything perform-only
                setAttributeOnNodeList(performOnly, "class", "display-none");
                productName = "Video Cloud";
                if (pathArray[2] === "index.html") {
                    // on video cloud landing page
                    section = "video-cloud";
                    sectionName = null;
                    subsection = null;
                    // at least for now, manually maintaining Video Cloud landing page
                    // createLandingPageSections(bclsNavData[product].sections[section]);
                } else {
                    section = pathArray[2];
                    // special cases
                    if (section === "player-management") {
                        sectionName = "player-management";
                    }  else if (section === "studio") {
                        modulesIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", "Modules")
                    } else {
                        sectionName = bclsNavData["video-cloud"].sections[section].name;
                    }
                    // check to see if we're on the section landing page
                    if (pathArray[3] === "index.html") {
                        // we're on the section landing page
                        isLandingPage = true;
                        subsection = null;
                        buildPageArrays();
                    } else {
                        subsection = pathArray[3];
                    }
                    // check to see if we're on a subsection landing page
                    if (isDefined(subsection)) {
                        // all we care about is whether we accidentally got onto a
                        // subsection index page, in which case, we redirect
                        // to section landing page, unless this is an api reference
                        if (isItemInArray(pathArray, "index.html") && !isItemInArray(pathArray, "versions")) {

                            window.location.href = landingPagePath;
                        }
                    }
                $navMenuRight.html(menuRightBase + vcSupportNav);
                break;
            case "once": // in once
                var redirectArray = pathArray.slice(0, 2),
                landingPagePath = redirectArray.join("/") + "/index.html";

                // there is only one section
                product = "once";
                section = "index";
                if (pathArray[2] === "index.html") {
                    // on video cloud landing page
                    isLandingPage = true;
                    section = "index";
                    sectionName = null;
                    subsection = null;
                    createLandingPageSections(bclsNavData[product].sections[section]);
                } else {
                    section = "index";
                    sectionName = null;
                    subsection = "pathArray[2]";
                    subsectionName = bclsNavData.once[subsection].name;
                    // check to see if we're on the section or subsection landing page
                    // and redirect to product landing page if so
                    if (pathArray[3] === "index.html" && !isItemInArray(pathArray, "versions")) {
                        window.location.href = landingPagePath;
                    }
                }
                $navMenuRight.html(menuRightBase + onceSupportNav);
                // createNavigation();
                break;
            case "perform": // in perform
                product = "perform";
                // hide anything video-cloud-only
                setAttributeOnNodeList(videoCloudOnly, "class", "display-none");
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
                    } else if (section === "forums") {
                        sectionName = "Forums";
                        subsection = null;
                        section = "perform";
                    } else {
                        sectionName = bclsNavData[product].sections[section].name;
                    }
                    // check to see if we're on the section landing page
                    if (pathArray[3] === "index.html") {
                        // we're on the section landing page
                        subsection = null;
                        createLandingPageSections(bclsNavData[product].sections[section]);
                    } else {
                        subsection = pathArray[3];
                    }
                    // check to see if we're on a subsection landing page
                    if (isDefined(subsection)) {
                        switch (subsection) {
                        case "brightcove-player-sdk-for-ios":
                            var dataIndex;
                            subsectionName = "Brightcove Player SDK for iOS";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section].items[dataIndex]);
                            } else {
                                // we're in a subsubsection
                                subsubsection = pathArray[4];
                                // set subsubsection name
                                switch (subsubsection) {
                                case "guides":
                                    subsubsectionName = "Guides";
                                    if (pathArray[5] === "index.html") {
                                        createLandingPageSections(bclsNavData[product].sections[section].items[dataIndex]);
                                    }
                                    break;
                                case "samples":
                                    subsubsectionName = "Code Samples";
                                    if (pathArray[5] === "index.html") {
                                        createLandingPageSections(bclsNavData[product].sections[section].items[dataIndex]);
                                    }
                                    break;
                                }
                            }
                            break;
                        case "brightcove-player-sdk-for-android":
                            var dataIndex;
                            subsectionName = "Brightcove Player SDK for Android";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section].items[dataIndex]);
                            } else {
                                // we're in a subsubsection
                                subsubsection = pathArray[4];
                                // set subsubsection name
                                switch (subsubsection) {
                                case "guides":
                                    subsubsectionName = "Guides";
                                    if (pathArray[5] === "index.html") {
                                        createLandingPageSections(bclsNavData[product].sections[section].items[dataIndex]);
                                    }
                                    break;
                                case "samples":
                                    subsubsectionName = "Code Samples";
                                    if (pathArray[5] === "index.html") {
                                        createLandingPageSections(bclsNavData[product].sections[section].items[dataIndex]);
                                    }
                                    break;
                                }
                            }
                            break;
                        case "references":
                            subsectionName = "API References";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "reference":
                            subsectionName = "API Reference";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "guides":
                            subsectionName = "Guides";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "samples":
                            subsectionName = "Code Samples";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "solutions":
                            subsectionName = "Solutions";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        default:
                            // trouble
                            bclslog("subsection: ", subsection);
                            subsection = null;
                        }
                    }
                }
                $navMenuRight.html(menuRightBase + vcSupportNav);
                break;
            default:
                section = "index";
                sectionName = null;
                product = "index";
                productName = "";
                $navMenuRight.html(menuRightBase + vcSupportNav);
            }
        } else if (server === "solutions") {
            product = "video-cloud";
            subsection = "solutions";
            subsectionName = "Solutions";
            if (pathArray[1] === "index.html") {
                section = "video-cloud";
                createSolutionsLandingPageSections();
            } else {
                section = pathArray[1];
                sectionName = section;
            }
            $navMenuRight.html(menuRightBase + vcSupportNav);
        } else {
            // don't know where we are
            product = null;
            section = null;
            navMenuRight.innerHTML = menuRightBase + vcSupportNav;
            bclslog("unknown server");
        }
        // create the navigationTrtrrpleann
        if (isDefined(section)) {
            createNavigation();
        }
    };
    // initialization: set the page title, set up the header shell, get references to the parts
    init = function () {
        // force secure page load
        // forceSecure();
        // set the page title in case wrong
        setPageTitle();
        // set up the header
        navWrapper.innerHTML = titleAreaTemplate;
        searchModal.innerHTML = searchTemplate;
        // get references to header sections
        navMenuLeft = document.getElementById("navMenuLeft");
        navMenuRight = document.getElementById("navMenuRight");
        titleArea = document.getElementsByClassName("title-area")[0];
        siteTitle = document.getElementById("siteTitle");
        // get the section name
        getSection();
        /*
         * syntax highlighting - dependent on highlight.pack.js
         */
        hljs.tabReplace = "  ";
        hljs.initHighlightingOnLoad();
    };
    /***************************************************
        syntax highlighting - dependent on highlight.pack.js
        ***************************************************/
    BCLhighlight = function () {
        var i,
            iMax = precode.length;
        for (i = 0; i < iMax; i++) {
            hljs.highlightBlock(precode[i]);
        }
    };
    init();
    return {
        "BCLhighlight": BCLhighlight,
        "createInPageNav": createInPageNav,
        "product": product,
        "$divsection": $divsection
    };
})($, window, console, document, Handlebars, bclsNavData, hljs);