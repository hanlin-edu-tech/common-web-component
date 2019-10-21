(function() {
    var ajaxUtils = {
        retrieveHtml: function(componentPath, httpMethod, id, envComponentDir) {
            var url = "https://storage.cloud.google.com/" + envComponentDir + "/app/web-component" + componentPath + "?authuser=1&folder=true&organizationId=true";
            var request = new XMLHttpRequest();

            console.log(url);

            if (!id) return;

            request.open(httpMethod, url, true);
            request.send();
            request.onload = function() {
                var parent, scripts, script, newScript;
                var timestamp = new Date().getTime();

                if (request.status >= 200 && request.status < 400) {
                    parent = document.getElementById(id);
                    if (!parent) return;

                    parent.insertAdjacentHTML("beforeend", request.responseText);

                    // 重新加載 component 頁的 js
                    scripts = parent.querySelectorAll("script");
                    if (scripts) {
                        for (var i = 0; i < scripts.length; i++) {
                            script = scripts[i];
                            newScript = document.createElement("script");
                            newScript.src = script.src + "?v=" + timestamp;
                            if (script.getAttribute("data-main")) {
                                newScript.setAttribute("data-main", script.getAttribute("data-main"));
                            }
                            parent.removeChild(script);
                            parent.insertAdjacentElement("afterend", newScript);
                        }
                    }
                } else {
                    console.log("error status = " + request.status);
                }
            };

            if (request.readyState === request.DONE) {
                console.log("一切 ok, 繼續解析");
            } else {
                console.log(request.status);
                console.log("還沒完成");
            }

            request.onerror = function() {
                console.error("Response error, readyState = " + this.req.readyState + ", status = " + this.req.status);
            };
        }
    };

    var envComponentDir = "tutor-apps",
        ehanlinComponents;

    if (window.location.href.indexOf("www.tbbt.com.tw") >= 0) {
        console.log("!!! 目前在測試環境 !!!");
        envComponentDir = "tutor-test-apps";
    }

    if (window.location.href.indexOf("labs.ehanlin.com.tw") >= 0) {
        console.log("!!! 目前在重構環境 !!!");
        envComponentDir = "tutor-test-apps";
    }

    ehanlinComponents = {
        "ehanlin-menu": ajaxUtils.retrieveHtml.bind(this, "/menu/ehanlin-menu.html", "GET", "ehanlin-menu", envComponentDir),
        "ehanlin-header": ajaxUtils.retrieveHtml.bind(this, "/header/ehanlin-header.html", "GET", "ehanlin-header", envComponentDir),
        "ehanlin-footer": ajaxUtils.retrieveHtml.bind(this, "/footer/ehanlin-footer.html", "GET", "ehanlin-footer", envComponentDir),
        "ehanlin-event-left-side": ajaxUtils.retrieveHtml.bind(this, "/event-left-side/ehanlin-event-left-side.html", "GET", "event-left-side", envComponentDir),
        "ehanlin-left-side": ajaxUtils.retrieveHtml.bind(this, "/event-left-side/ehanlin-event-left-side.html", "GET", "event-left-side", envComponentDir),
        "ehanlin-info-left-side": ajaxUtils.retrieveHtml.bind(this, "/info-left-side/ehanlin-info-left-side.html", "GET", "info-left-side", envComponentDir)
    };

    var script = document.querySelector("script[data-module]");
    var dataModules = script.getAttribute("data-module");
    var execFunction;

    if (dataModules) {
        dataModules = dataModules.split(",");
        for (var i = 0; i < dataModules.length; i++) {
            var dataModule = dataModules[i];
            execFunction = ehanlinComponents[dataModule.trim()];
            if (typeof execFunction === "function") execFunction();
        }
    }
})();
