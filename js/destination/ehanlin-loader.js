(function() {
  var ajaxUtils = {
    retrieveHtml: function(componentPath, httpMethod, id) {
      var url =
        "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/" +
        componentPath;

      var request = new XMLHttpRequest();
      if (!id) return;
      request.open(httpMethod, url, true);
      request.send();
      request.onload = function() {
        var parent, scripts, script, newScript;
        if (request.status >= 200 && request.status < 400) {
          parent = document.getElementById(id);
          parent.insertAdjacentHTML("beforeend", request.responseText);
          scripts = parent.querySelectorAll("script");
          if (scripts) {
            for (var i = 0; i < scripts.length; i++) {
              script = scripts[i];
              newScript = document.createElement("script");
              newScript.src = script.src;
              //newScript.defer = true;
              if (script.getAttribute("data-main")) {
                newScript.setAttribute(
                  "data-main",
                  script.getAttribute("data-main")
                );
              }
              script.remove();
              document
                .getElementById(id)
                .insertAdjacentElement("afterend", newScript);
            }
          }
        } else {
          console.log("error status = " + request.status);
        }
      };

      request.onerror = function() {
        console.log(
          "Response error, readyState = " +
            this.req.readyState +
            ", status = " +
            this.req.status
        );
      };
    }
  };

  var ehanlinComponents = {
    "ehanlin-menu": ajaxUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/menu/ehanlin_menu.html",
      "get",
      "ehanlin-menu"
    ),
    "ehanlin-header": ajaxUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/header/ehanlin_header.html",
      "get",
      "ehanlin-header"
    ),
    "ehanlin-footer": ajaxUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/footer/ehanlin_footer.html",
      "get",
      "ehanlin-footer"
    ),
    "ehanlin-event-left-side": ajaxUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/eventLeftSide/ehanlin_event_left_side.html",
      "get",
      "event-left-side"
    ),
    "ehanlin-left-side": ajaxUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/eventLeftSide/ehanlin_event_left_side.html",
      "get",
      "event-left-side"
    ),
    "info-left-side": ajaxUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/infoLeftSide/ehanlin_info_left_side.html",
      "get",
      "info-left-side"
    )
  };

  var script = document.querySelector("script[data-module]");
  var dataModules = script.getAttribute("data-module");

  if (dataModules) {
    dataModules = dataModules.split(",");
    for (var dataModule of dataModules) {
      ehanlinComponents[dataModule.trim()]();
    }
  }
})();
