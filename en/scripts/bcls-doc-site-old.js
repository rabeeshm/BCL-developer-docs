var BCLSmain = (function ($, window, console, document, Handlebars, bclsNavData, hljs) {
    "use strict";
    var $precode = $("pre code"),
        template,
        result,
        linkPath,
        product,
        productColors = {"index": "#515151", "videoCloud": "#dd712e", "once": "#85a93e"},
        highlightBackgroundColor = "#000000",
        $this,
        $pageTitle = $("h1:first"),
        $currentPage,
        $currentItem,
        $navWrapper = $("#navWrapper"),
        $productArea,
        $navMenuLeft,
        $navMenuRight,
        $titleArea, // the header
        $searchModal = $("#searchModal"),
        $divsection = $("div.section"), // all the content sections
        $sidenav = $("#sidenav"), // the in-page nav
        path = window.location.pathname,
        section,
        topObj = { "text": "Top", "link": "top" },
        navLabel = [topObj],
        menuRightBase = "<li class=\"search\"><a href=\"#\" data-reveal-id=\"searchModal\"><img src=\"//docs.brightcove.com/en/images/search-white.png\" alt=\"search_icon_small_white\" width=\"18\" height=\"18\"></a></li><li><a href=\"http://docs.brightcove.com/en/DeveloperDocumentationUpdates.xml\"><img src=\"//docs.brightcove.com/en/images/rss-feed-sm.png\" alt=\"rss-feed-sm\" width=\"14\" height=\"14\"></a></li>",
        vcSupportNav = "<li class=\"smaller\"><a href=\"//support.brightcove.com\">Support</a></li>",
        onceSupportNav = "<li class=\"smaller\"><a href=\"mailto:oncesupport@brightcove.com\">Support</a></li>",
        performSupportNav = "vcSupportNav",
        navItemTemplate = "<li><a href=\"{{url}}\" title=\"{{name}}\">{{name}}</a></li>",
        navDropdownStartTemplate = "<li class=\"has-dropdown\"><a href=\"#\">{{name}}</a><ul class=\"dropdown\">",
        navDropdownEndTemplate = "</ul></li>",
        titleAreaTemplate = "<nav class=\"top-bar\" data-topbar><ul class=\"title-area\"><li class=\"name\"></li><li class=\"toggle-topbar menu-icon\"><a href=\"#\"><span>Menu</span></a></li></ul><section class=\"top-bar-section\"><ul id=\"product-area\"><li class=\"has-dropdown\"><a href=\"//docs.brightcove.com/en/index.html\"><img class=\"bcls-logo bcls-float-left\" src=\"//docs.brightcove.com/en/images/bc-logo-small.png\" alt=\"Brightcove\" style=\"padding-right:10px;\"><span style=\"font-size:1rem;\">DEVELOPER DOCS</span></a><ul class=\"dropdown\"><li><a href=\"//docs.brightcove.com/en/video-cloud/index.html\"><img src=\"//docs.brightcove.com/en/images/vc-bolt-logo-ondark.png\" /></a></li><li><a href=\"//docs.brightcove.com/en/once/index.html\"><img src=\"//docs.brightcove.com/en/images/once-logo-ondark-menu.png\" /></a></li></ul></li></ul></section><section class=\"top-bar-section\"><ul id=\"navMenuLeft\" class=\"left\"></ul></section><section class=\"top-bar-section\"><ul id=\"navMenuRight\" class=\"right\"></ul></section></nav>",
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
        landingPageBlockTemplate = "<div class=\"large-3 small-12 columns\" style=\"overflow-x:hidden\"><h2>{{name}}</h2><ul>{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}</ul></div>",
        submenuBlockStart = "<div class=\"large-3 small-12 columns\" style=\"overflow-x:hidden\"><h2>{{name}}</h2>",
        submenuBlockMiddle = "<h3>{{name}}</h3><ul>{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}</ul>",
        submenuBlockEnd = "</div>",
        solutionsPageBlockStart = "<div class=\"large-3 small-12 columns\" style=\"overflow-x:hidden\"><h2>{{name}}</h2>",
        solutionsPageItemsTemplate = "<ul>{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}</ul>",
        solutionsPageBlockEnd = "</div>",
        // functions
        bclslog,
        lightenDarkenColor,
        exists,
        setPageTitle,
        forceSecure,
        createInPageNavMenu,
        createInPageNav,
        highlightCurrentItem,
        createNavigation,
        createLandingPageSections,
        createSolutionsLandingPageSections,
        getSection,
        init,
        BCLhighlight;
    // logging utility
    bclslog = function (message) {
        if (window.console && console.log) {
            var d = new Date();
            console.log(d + ": ");
            console.log(message);
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
    // test for existence
    exists = function (x) {
        return (x !== undefined && x !== null && x !== "");
    };
    // set document title to value of h1 header, if any
    setPageTitle = function () {
        if (exists($pageTitle)) {
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
        var str = "<ul class=\"side-nav\">",
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
                navObj = {};
                navObj.link = $this.attr("id");
                navObj.text = $this.find("h2:first").text();
                navLabel.push(navObj);
            }
        });
        // only create the nav widget if there is more than one item
        if (navLabel.length > 1) {
            // create in-page nav menu
            createInPageNavMenu();
        }
    };
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
        // next create the in-page navigation
        createInPageNav();
    };
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
            processDropdown;
        // helper functions
        processTemplate =  function (item) {
            result = template(item);
            navHTML += result;
        };
        processItem = function (item) {
            if (exists(item.url)) {
                template = itemTemplate;
                processTemplate(item);
            } else if (exists(item.items)) {
                // start a dropdown
                template = listStartTemplate;
                processTemplate(item);
                processDropdown(item.items);
                navHTML += navDropdownEndTemplate;
            }
        };
        processDropdown = function (items) {
            var j = 0,
                jMax = items.length, subItem;
            for (j = 0; j < jMax; j++) {
                subItem = items[j];
                processItem(subItem);
            }
        }
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
                    bclslog("something wrong in nav data");
                    bclslog(data);
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
            $productArea = $("#product-area");
            $navWrapper.find("nav,ul,section,li,a").attr("style", "background-color:" + productColors[product] + ";");
            $productArea.find("ul,section,li,a,img").attr("style", "background-color:" + productColors.index + ";");
            highlightBackgroundColor = lightenDarkenColor(productColors[product], -40);
            highlightCurrentItem();
        };
        createLandingPageSections = function () {
            var data = bclsNavData[product].sections[section],
                $sections = $("#sections"),
                i,
                j,
                max,
                jMax,
                item,
                template = Handlebars.compile(landingPageBlockTemplate),
                subStartTemplate = Handlebars.compile(submenuBlockStart),
                subMiddleTemplate = Handlebars.compile(submenuBlockMiddle),
                str = "";
            if (exists($sections)) {
                data = data.items;
                max = data.length;
                for (i = 0; i < max; i++) {
                    item = data[i];
                    if (exists(item.items)) {
                        // check for submenus
                        if (exists(item.items[0].items)) {
                            str += subStartTemplate(item);
                            jMax = item.items.length;
                            for (j = 0; j < jMax; j++) {
                                str += subMiddleTemplate(item.items[j]);
                            }
                            str += submenuBlockEnd;
                        } else {
                            str += template(item);
                        }
                    }
                }
                $sections.html(str);
                $sections.children("div").filter(":last").addClass("end");
            }
        };
        createSolutionsLandingPageSections = function () {
            var data = bclsNavData.videoCloud.sections,
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
        getSection = function () {
            var pathArray = path.split("/"),
                server;
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
                bclslog(pathArray[0]);
                return;
            }
            // docs actions - multiple products
            if (server === "docs") {
                // act according to the product (or landing page)
                switch (pathArray[1]) {
                case "index.html": // on the docs landing page
                    section = "null";
                    product = "index";
                    $navMenuRight.html(menuRightBase + vcSupportNav);
                    break;
                case "video-cloud": // in video cloud
                    product = "videoCloud";
                    if (pathArray[2] === "index.html") {
                        // on video cloud landing page
                        section = "video-cloud";
                        createLandingPageSections();
                    } else {
                        section = pathArray[2];
                        /**
                         * special cases
                         */
                        if (section === "" || section === "open-source" || section === "concepts") {
                            section = "video-cloud";
                        } else if (section === "player-management-api" || section === "delivery-system-api") {
                            section = "players";
                        } else if (section === "tve") {
                            section = "smart-player-api";
                            product = "videoCloud";
                        }
                        // check to see if we're on the section landing page
                        if (pathArray[3] === "index.html") {
                            // we're on the landing page
                            createLandingPageSections();
                        }
                    }
                    $navMenuRight.html(menuRightBase + vcSupportNav);
                    break;
                case "once": // in once
                    // there is only one section
                    product = "once";
                    section = "index";
                    $navMenuRight.html(menuRightBase + onceSupportNav);
                    break;
                case "perform": // in perform
                    section = "perform";
                    product = "perform";
                    $navMenuRight.html(menuRightBase + performSupportNav);
                    break;
                default:
                    section = "index";
                    product = "all";
                    $navMenuRight.html(menuRightBase + vcSupportNav);
                }
            } else if (server === "solutions") {
                product = "videoCloud";
                if (pathArray[1] === "index.html") {
                    section = "video-cloud";
                    createSolutionsLandingPageSections();
                } else {
                    section = pathArray[1];
                }
                $navMenuRight.html(menuRightBase + vcSupportNav);
            } else {
                // don't know where we are
                product = null;
                section = null;
                $navMenuRight.html(menuRightBase + vcSupportNav);
                bclslog("unknown server");
            }
            // create the navigationTrtrrpleann
            if (exists(section)) {
                createNavigation();
            }
        };
        init = function () {
            // set the page title in case wrong
            setPageTitle();
            // set up the header
            $navWrapper.html(titleAreaTemplate);
            $searchModal.html(searchTemplate);
            // get references to header sections
            $navMenuLeft = $("#navMenuLeft");
            $navMenuRight = $("#navMenuRight");
            $titleArea = $(".title-area");
            // get the section name
            getSection();
            /***************************************************
            syntax highlighting - dependent on highlight.pack.js
            ***************************************************/
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
            "bclslog": bclslog
        };
})($, window, console, document, Handlebars, bclsNavData, hljs);
