(function() {
  var fetchUtils = {
    retrieveHtml: function(componentPath, httpMethod, id) {
      var url =
        "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/" +
        componentPath;

      fetch(url, { method: httpMethod, mode: "cors" })
        .then(function(response) {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          response.text().then(function(text) {
            var banner = document.createRange().createContextualFragment(text);
            var parent = document.getElementById(id);
            parent.insertBefore(banner, parent.firstChild);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

  var ehanlinComponents = {
    "ehanlin-menu": fetchUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/menu/ehanlin_menu.html",
      "get",
      "ehanlin-menu"
    ),
    "ehanlin-header": fetchUtils.retrieveHtml.bind(
      this,
      "current.SNAPSHOT/header/ehanlin_header.html",
      "get",
      "ehanlin-header"
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
