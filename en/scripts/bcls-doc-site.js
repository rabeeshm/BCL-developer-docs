var BCLSmain = (function ($, window, console, document, Handlebars, bclsNavData, hljs) {
    "use strict";
    var $precode = $("pre code"),
        // for handlebars
        template,
        result,
        // navigation vars
        linkPath,
        product,
        productName,
        sectionName,
        productColors = {
            "index": "#333333",
            "video-cloud": "#dd712e",
            "once": "#85a93e",
            "player": "#35498D"
        },
        highlightBackgroundColor = "#000000",
        $this,
        $pageTitle = $("h1:first"),
        $currentPage,
        $currentItem,
        $navWrapper = $("#navWrapper"),
        $breadCrumbWrapper = $("#breadCrumbWrapper"),
        $navMenuLeft,
        $navMenuRight,
        $titleArea, // the header
        $siteTitle,
        $searchModal = $("#searchModal"),
        $divsection = $("div.section"), // all the content sections
        $sidenav = $("#sidenav"), // the in-page nav
        path = window.location.pathname,
        section,
        subsection,
        subsectionName,
        subsubsection,
        subsubsectionName,
        topObj = {
            "text": "Top",
            "link": "top"
        },
        navLabel = [topObj],
        menuRightBase = "<li class=\"search\"><a href=\"#\" data-reveal-id=\"searchModal\"><img src=\"//docs.brightcove.com/en/images/search-white.png\" alt=\"search_icon_small_white\" width=\"18\" height=\"18\"></a></li><li class=\"show-for-xlarge-up\"><a href=\"http://docs.brightcove.com/en/DeveloperDocumentationUpdates.xml\"><img src=\"//docs.brightcove.com/en/images/rss-feed-sm.png\" alt=\"rss-feed-sm\" width=\"14\" height=\"14\"></a></li>",
        vcSupportNav = "<li class=\"smaller show-for-xlarge-up\"><a href=\"//support.brightcove.com\">Support</a></li>",
        onceSupportNav = "<li class=\"smaller show-for-xlarge-up\"><a href=\"mailto:oncesupport@brightcove.com\">Support</a></li>",
        playerSupportNav = "vcSupportNav",
        navItemTemplate = "<li><a href=\"{{url}}\" title=\"{{name}}\">{{name}}</a></li>",
        navDropdownStartTemplate = "<li class=\"has-dropdown\"><a href=\"#\">{{name}}</a><ul class=\"dropdown\">",
        navDropdownEndTemplate = "</ul></li>",
        titleAreaTemplate = "<nav class=\"top-bar\" data-topbar><ul class=\"title-area\"><li class=\"name\" id=\"siteTitle\"><a href=\"//docs.brightcove.com/en/index.html\"><img class=\"bcls-logo bcls-float-left\" src=\"//docs.brightcove.com/en/images/bc-logo-small.png\" alt=\"Brightcove\">DEVELOPER DOCS</a></li><li class=\"toggle-topbar menu-icon\"><a href=\"#\"><span>Menu</span></a></li></ul><section class=\"top-bar-section\"><ul id=\"navMenuLeft\" class=\"left\"></ul></section><section class=\"top-bar-section\"><ul id=\"navMenuRight\" class=\"right\"></ul></section></nav>",
        videoCloudSearchTemplate = "<div class=\"container\"><div class=\"region region-search\"><section id=\"block-search-api-page-new\" class=\"block block-search-api-page\"><div><a class=\"close-reveal-modal\">&#215;</a></div><div id=\"searchBar\"><script> (function() { var cx = '017969773216783359937:o1ckbxwaxt4'; var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true; gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s); })(); </script> <gcse:search></gcse:search></div></section>",
        playerSearchTemplate = "<div class=\"container\"><div class=\"region region-search\"><section id=\"block-search-api-page-new\" class=\"block block-search-api-page\"><div><a class=\"close-reveal-modal\">&#215;</a></div><div id=\"searchBar\"><script> (function() { var cx = '017969773216783359937:r6x5xhtqr5w'; var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true; gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s); })(); </script> <gcse:search></gcse:search></div></section>",
        onceSearchTemplate = "<div class=\"container\"><div class=\"region region-search\"><section id=\"block-search-api-page-new\" class=\"block block-search-api-page\"><div><a class=\"close-reveal-modal\">&#215;</a></div><div id=\"searchBar\"><script> (function() { var cx = '017969773216783359937:tzowaqv9txq'; var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true; gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s); })(); </script> <gcse:search></gcse:search></div></section>",
        submenuBlockStart = "<div class=\"large-3 small-12 columns\" style=\"overflow-x:hidden\"><h2>{{name}}</h2>",
        submenuBlockMiddle = "<h3 class=\"index-page\">{{name}}</h3><ul>{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}</ul>",
        submenuBlockEnd = "</div>",
        solutionsPageBlockStart = "<div class=\"large-3 small-12 columns\" style=\"overflow-x:hidden\"><h2>{{name}}</h2>",
        solutionsPageItemsTemplate = "<ul>{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}</ul>",
        solutionsPageBlockEnd = "</div>",
        // functions
        bclslog,
        lightenDarkenColor,
        exists,
        findObjectInArray,
        setPageTitle,
        forceSecure,
        createInPageNavMenu,
        createInPageNav,
        highlightCurrentItem,
        buildBreadCrumbs,
        createNavigation,
        createLandingPageSections,
        createSolutionsLandingPageSections,
        createSubsectionLandingPageSections,
        getSection,
        init,
        BCLhighlight;
    // logging utility
    bclslog = function (context, message) {
        if (window.console && console.log) {
            console.log(context, message);
        }
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
     * [exists description]
     * @param  {*} x [description]
     * @return {boolean}   [description]
     */
    exists = function (x) {
        return (x !== undefined && x !== null && x !== "" && x !== NaN);
    };
    /*
    find index of an object in array of objects
    based on some property value
    returns index if found, otherwise returns -1
    */
    findObjectInArray = function (targetArray, objProperty, value) {
        var i, totalItems = targetArray.length,
            objFound = false;
        for (i = 0; i < totalItems; i++) {
            if (targetArray[i][objProperty] === value) {
                objFound = true;
                return i;
            }
        }
        if (objFound === false) {
            return -1;
        }
    };
    // set document title to value of h1 header, if any
    setPageTitle = function () {
        if ($pageTitle.length > 0) {
            document.title = $pageTitle.html();
        }
    };
    // force into https mode if not already there
    forceSecure = function () {
        var pageURL = window.location.href,
            pageProtocol = window.location.protocol;
        if (pageProtocol === "http:") {
            window.location.href = pageURL.replace("http:", "https:");
        }
    };
    // create navigation for page sections
    createInPageNavMenu = function () {
        var str = "<ul class=\"side-nav show-for-large-up\">",
            i,
            max = navLabel.length,
            $navElements;
        for (i = 0; i < max; i++) {
            str += "<li><a href=\"#" + navLabel[i].link + "\">" + navLabel[i].text + " </a></li>";
        }
        str += "</ul>";
        $sidenav.append(str);
        $navElements = $sidenav.find("a");
        $navElements.on("click", function () {
            $navElements.attr("style", "");
            $(this).attr("style", "background-color:" + productColors[product] + ";color:#ffffff");
        });

    };
    createInPageNav = function () {
        var navObj = {};
        // set initial visibilities
        $divsection.each(function (index) {
            if (index > 0) {
                $this = $(this);
                switch (product) {
                case "video-cloud":
                    if (!$this.hasClass("player-only")) {
                        navObj = {};
                        navObj.link = $this.attr("id");
                        navObj.text = $this.find("h2:first").text();
                        navLabel.push(navObj);
                    }
                    break;
                case "player":
                    if (!$this.hasClass("video-cloud-only")) {
                        navObj = {};
                        navObj.link = $this.attr("id");
                        navObj.text = $this.find("h2:first").text();
                        navLabel.push(navObj);
                    }
                    break;
                default:
                    navObj = {};
                    navObj.link = $this.attr("id");
                    navObj.text = $this.find("h2:first").text();
                    navLabel.push(navObj);
                    break;
                }
            }
        });
        // only create the nav widget if there is more than one item
        if (navLabel.length > 1) {
            // create in-page nav menu
            createInPageNavMenu();
        }
    };
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
        if (exists($currentPage)) {
            $currentPage.attr("style", "background-color:" + highlightBackgroundColor + ";");
            $currentItem.attr("style", "background-color:" + highlightBackgroundColor + ";");
            if (exists($currentItem) && $currentItem.parents("li").hasClass("has-dropdown")) {
                $currentItem.parents("li").attr("style", "background-color:" + highlightBackgroundColor + ";");
                $currentItem.parents("li").children("a").attr("style", "background-color:" + highlightBackgroundColor + ";");
            }
        }
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
        bclslog("subsubsection", subsubsection);
        bclslog("subsubsectionName", subsubsectionName);
        if (exists(product)) {
            if (product === "index") {
                str += "<li><a href=\"//docs.brightcove.com/en/index.html\">" + bclsNavData[product].name + "</a></li>";
            } else {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/index.html\">" + bclsNavData[product].name + "</a></li>";
            }
        }
        if (exists(sectionName)) {
            if (section === "video-cloud" || section === "player" || section === "player-management") {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + sectionName.toLowerCase() + "/index.html\"><strong>" + sectionName.replace("-", " ") + "</strong></a></li>";
            } else {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + section + "/index.html\"><strong>" + section.replace("-", " ") + "</strong></a></li>";
            }
        }
        if (exists(subsection)) {
            if (section === "video-cloud") {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + section + "/index.html\">" + subsectionName + "</a></li>";
            } else if (section === "index") {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + subsection.toLowerCase() + "/index.html\">" + subsectionName + "</a></li>";
            } else {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + section.toLowerCase() + "/" + subsection.toLowerCase() + "/index.html\">" + subsectionName + "</a></li>";
            }
        }
        if (exists(subsubsection)) {
            // only in video cloud but allow for other subsections having subsubsections
            if (section === "studio" || section === "mobile-sdks") {
                str += "<li><a href=\"//docs.brightcove.com/en/" + product + "/" + section.toLowerCase() + "/" + subsection.toLowerCase() + "/" + subsubsection.toLowerCase() + "/index.html\">" + subsubsectionName + "</a></li>";
            }
        }
        if (exists(sectionName)) {
            str += "<li class=\"current\">" + document.getElementsByTagName("title")[0].innerHTML + "</li>";
        }
        $breadCrumbWrapper.html(str);
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
            if (exists(item.items)) {
                // start a dropdown
                template = listStartTemplate;
                processTemplate(item);
                processDropdown(item.items);
                navHTML += navDropdownEndTemplate;
            } else if (exists(item.url)) {
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
        if (exists(data)) {
            if (exists(data.items)) {
                // we're on the landing page
                max = data.items.length;
            } else if (exists(data.sections)) {
                // we're in a product that has sections
                data = data.sections[section];
                if (exists(data)) {
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
        $navWrapper.find("nav,ul,section,li,a").attr("style", "background-color:#333333;");
        $titleArea.find("ul,li,a,img").attr("style", "background-color:#333333;");
        if (product !== "index") {
            titleStr += product + "/index.html\"><img src=\"" + bclsNavData[product].image + "\" style=\"height:30px;\"/></a>";
        } else {
            titleStr += "index.html\">" + bclsNavData[product].image + "</a>";
        }
        $siteTitle.html(titleStr);
        // set h2 color to product NewColor
        $("h1,h2").attr("style", "color:" + productColors[product]);
        highlightBackgroundColor = lightenDarkenColor("#333333", 40);
        highlightCurrentItem();
    };
    // create the index of section pages for the landing page
    createLandingPageSections = function (data) {
        bclslog("createLandingPageSectionsData", data);
        var $sections = $("#sections"),
            sections = document.getElementById("sections"),
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

        if (exists(sections)) {
            data = data.items;
            bclslog("section exists Data", data);
            max = data.length;
            for (i = 0; i < max; i++) {
                item = data[i];
                bclslog("landing page item", item);
                if (exists(item.items)) {
                    kMax = item.items.length;
                    if (i === 1) {
                        str += blockTemplateStart(item);
                    } else {
                        str += blockTemplateStart(item);
                    }

                    for (k = 0; k < kMax; k++) {
                        var kItem = item.items[k];
                        // check for submenus
                        if (exists(kItem.items)) {
                            str += subTemplateStart(kItem);
                            jMax = kItem.items.length;
                            for (j = 0; j < jMax; j++) {
                                var jItem = kItem.items[j];
                                // check for subsubmenu
                                if (exists(jItem.items)) {
                                    lMax = jItem.items.length;
                                    for (l = 0; l < lMax; l++) {
                                        var lItem = jItem.items[l];
                                        str += itemTemplate(lItem);
                                    }
                                    str += blockEndTemplate;
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
                    str += blockEndTemplate;
            }
            $sections.html(str);
            $sections.children("div").filter(":last").addClass("end");
        }
    };
    // create the index of pages for subsections on the subsection landing page
    createSubsectionLandingPageSections = function () {
        var dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName),
            data = bclsNavData[product].sections[section].items[dataIndex],
            $top = $("#top"),
            i,
            max,
            item,
            templateStart = "<div class=\"large-6 small-12 columns\" style=\"overflow-x:hidden\"><ul>",
            templateMiddle = Handlebars.compile("{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}"),
            templateEnd = "</ul></div>",
            str = "";
        bclslog("bclsNavData[product].sections[section].items", bclsNavData[product].sections[section].items);
        // data = data.items;
        bclslog("product: ", product);
        bclslog("section: ", section);
        bclslog("sectionName: ", sectionName);
        bclslog("subsection: ", subsection);
        bclslog("subsectionName: ", subsectionName);
        bclslog("dataIndex: ", dataIndex);
        bclslog("subsection data", data);
        // check for submenus
        if (exists(data) && exists(data.items[0].items)) {
            max = data.items.length;
            for (i = 0; i < max; i++) {
                item = data.items[i];
                str += "<div class=\"large-6 small-12 columns\" style=\"overflow-x:hidden\"><h3>" + item.name + "</h3><ul>";
                str += templateMiddle(item);
                str += templateEnd;
            }
        } else {
            str += templateStart;
            str += templateMiddle(data);
            str += templateEnd;
        }
        $top.append(str);
        // $top.children("div").filter(":last").addClass("end");
    };
    // special case - landing page for solutions.brightcove.com -- create index of all solutions
    createSolutionsLandingPageSections = function () {
        var data = bclsNavData["video-cloud"].sections,
            $sections = $("#sections"),
            prod,
            i,
            max,
            item,
            p,
            startTemplate = Handlebars.compile(solutionsPageBlockStart),
            itemTemplate = Handlebars.compile(solutionsPageItemsTemplate),
            str = "";
        if (exists($sections)) {
            for (prod in data) {
                p = data[prod];
                if (exists(p.items && prod !== "video-cloud")) {
                    max = p.items.length;
                    for (i = 0; i < max; i++) {
                        item = p.items[i];
                        if (item.name === "Solutions") {
                            str += startTemplate(p);
                            str += itemTemplate(item);
                            str += solutionsPageBlockEnd;
                        }
                    }
                }
            }
        }
        $sections.html(str);
        $sections.children("div").filter(":last").addClass("end");
    };
    // figure out what section we're in
    getSection = function () {
        var pathArray = path.split("/"),
            server, dataIndex, modulesIndex;
        // remove the 0 element, as it will be empty
        pathArray.splice(0, 1);
        // if path ends in a /, add index.html
        if (pathArray[pathArray.length - 1].indexOf(".html") === -1) {
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
                $navMenuRight.html(menuRightBase + vcSupportNav);
                $searchModal.html(videoCloudSearchTemplate);
                break;
            case "video-cloud": // in video cloud
                product = "video-cloud";
                $searchModal.html(videoCloudSearchTemplate);
                // hide anything player-only
                $(".player-only").hide();
                productName = "Video Cloud";
                if (pathArray[2] === "index.html") {
                    // on video cloud landing page
                    section = "video-cloud";
                    sectionName = null;
                    subsection = null;
                    createLandingPageSections(bclsNavData[product].sections[section]);
                } else {
                    section = pathArray[2];
                    /**
                     * special cases
                     */
                    if (section === "open-source" || section === "concepts" || section === "forums" || section === "utilities") {
                        switch (section) {
                        case "open-source":
                            sectionName = "Open-Source";
                            break;
                        case "concepts":
                            sectionName = "Concepts";
                            break;
                        case "forums":
                            sectionName = "Forums";
                            break;
                        case "utilities":
                            sectionName = "Utilities";
                            break;
                        }
                        subsection = null;
                        section = "video-cloud";
                    } else if (section === "tve") {
                        subsection = null;
                        section = "smart-player-api";
                        sectionName = bclsNavData["video-cloud"].sections[section].name;
                    } else if (section === "player-management") {
                        section = "player-management";
                        sectionName = "player-management";
                    }  else if (section === "studio") {
                        modulesIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", "Modules");
                    } else {
                        sectionName = bclsNavData["video-cloud"].sections[section].name;
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
                    if (exists(subsection)) {
                        switch (subsection) {
                        case "brightcove-player-sdk-for-ios":
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
                                case "getting-started":
                                    subsubsectionName = "Get Started";
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
                                case "getting-started":
                                    subsubsectionName = "Get Started";
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
                        case "general":
                            subsectionName = "General Info";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            bclslog("general data index", dataIndex);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section].items[dataIndex]);
                            }
                            break;
                        case "references":
                            subsectionName = "API References";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section]);
                            }
                            break;
                        case "reference":
                            subsectionName = "API References";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section]);
                            }
                            break;
                        case "getting-started":
                            subsectionName = "Get Started";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section]);
                            }
                            break;
                        case "guides":
                            subsectionName = "Guides";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section]);
                            }
                            break;
                        case "samples":
                            subsectionName = "Code Samples";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section]);
                            }
                            break;
                        case "solutions":
                            subsectionName = "Solutions";
                            dataIndex = findObjectInArray(bclsNavData[product].sections[section].items, "name", subsectionName);
                            if (pathArray[4] === "index.html") {
                                createLandingPageSections(bclsNavData[product].sections[section]);
                            }
                            break;
                        case "creating-players":
                            subsectionName = "Create Players";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "general-info":
                            subsectionName = "General Info";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "getting-started":
                            subsectionName = "Get Started";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "managing-accounts":
                            subsectionName = "Manage Accounts";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        case "publishing-videos":
                            subsectionName = "Publish Videos";
                            if (pathArray[4] === "index.html") {
                                createSubsectionLandingPageSections();
                            }
                            break;
                        default:
                            // trouble
                            bclslog("unknown subsection: ", subsection);
                            subsection = null;
                        }
                    }
                }
                $navMenuRight.html(menuRightBase + vcSupportNav);
                break;
            case "once": // in once
                // there is only one section
                product = "once";
                $searchModal.html(onceSearchTemplate);
                section = "index";
                if (pathArray[2] === "index.html") {
                    // on video cloud landing page
                    section = "index";
                    sectionName = null;
                    subsection = null;
                    createLandingPageSections(bclsNavData[product].sections[section]);
                } else {
                    section = "index";
                    sectionName = null;
                    subsection = "Guides";
                    subsectionName = "Guides";
                    // check to see if we're on the section or subsection landing page
                    if (pathArray[3] === "index.html") {
                        // we're on the subsection landing page
                        subsection = "Guides";
                        // createLandingPageSections(bclsNavData[product].sections[section]);
                    }
                }
                $navMenuRight.html(menuRightBase + onceSupportNav);
                // createNavigation();
                break;
            case "player": // in player
                product = "player";
                $searchModal.html(playerSearchTemplate);
                // hide anything video-cloud-only
                $(".video-cloud-only").hide();
                productName = "Player";
                if (pathArray[2] === "index.html") {
                    // on player landing page
                    section = "player";
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
                        section = "player";
                    } else if (section === "forums") {
                        sectionName = "Forums";
                        subsection = null;
                        section = "player";
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
                    if (exists(subsection)) {
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
                                case "getting-started":
                                    subsubsectionName = "Get Started";
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
                                case "getting-started":
                                    subsubsectionName = "Get Started";
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
            $searchModal.html(videoCloudSearchTemplate);

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
            $searchModal.html(videoCloudSearchTemplate);

            $navMenuRight.html(menuRightBase + vcSupportNav);
            bclslog("unknown server");
        }
        // create the navigationTrtrrpleann
        if (exists(section)) {
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
        $navWrapper.html(titleAreaTemplate);
        //$searchModal.html(searchTemplate);
        // get references to header sections
        $navMenuLeft = $("#navMenuLeft");
        $navMenuRight = $("#navMenuRight");
        $titleArea = $(".title-area");
        $siteTitle = $("#siteTitle");
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
        $precode.each(function (i, e) {
            hljs.highlightBlock(e);
        });
    };
    init();
    return {
        "BCLhighlight": BCLhighlight,
        "createInPageNav": createInPageNav,
        "product": product,
        "$divsection": $divsection
    };
})($, window, console, document, Handlebars, bclsNavData, hljs);
