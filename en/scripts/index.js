var BCLS = ( function () {
    var $samplesList = $("#samplesList"),
        $solutionsList = $("#solutionsList"),
        listTemplate = "{{#items}}<li><a href=\"{{url}}\">{{name}}</a></li>{{/items}}",
        // functions
        getSection,
        bclslog,
        exists,
        creatLists;
    // logging utility
    bclslog = function (message) {
        if (window["console"] && console["log"]) {
            var d = new Date();
            console.log(d + ": ");
            console.log(message);
        }
    };
    // test for existence
    exists = function (x) {
        return (x !== undefined && x !== null && x !== "");
    };
    createLists = function () {

    };
    getSection = function () {
        var path = document.location.pathname;
        // if path ends in a /, add index.html
        if (path[path.length - 1] === "/") {
            path += "index.html";
        }
        // see if we're on the home page
        if (path.indexOf("/en/index.html") > -1) {
            section = "index";
        } else {
            // remove the /en/video-cloud/ prefix
            section = path.slice(16);
            // see if we're on the Video Cloud index page
            if (section === "index.html") {
                section = "index";
            } else {
                // must be in a section; remove everything from the first / onward
                section = path.substring(0. path.indexOf(/));
            }
        bclslog(section);
        // create the navigation
        if (exists(section)) {
            createNavigation();
        }
    }
    return {

    }
})();