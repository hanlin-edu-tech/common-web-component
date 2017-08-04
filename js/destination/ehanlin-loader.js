(function() {
  var ajaxUtils = {
    retrieveHtml: function(componentPath, httpMethod, id) {
      var url =
        "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/" +
        componentPath;

      var request = new XMLHttpRequest();
      request.open(httpMethod, url, true);
      request.send();
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var el = document
            .createRange()
            .createContextualFragment(request.responseText);
          var parent = document.getElementById(id);
          parent.insertBefore(el, parent.firstChild);
        } else {
          // We reached our target server, but it returned an error
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
