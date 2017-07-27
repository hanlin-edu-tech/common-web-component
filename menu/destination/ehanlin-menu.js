(function() {
  fetch(
    "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/v0.0.4/menu/ehanlin_menu.html",
    {
      mode: "cors",
      method: "get"
    }
  )
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      response.text().then(function(text) {
        //var banner = parser.parseFromString(text, "text/xml");
        var banner = document.createRange().createContextualFragment(text);
        var parent = document.getElementById("ehanlin-menu");
        parent.insertBefore(banner, parent.firstChild);
      });
      //return response.blob();
    })
    .catch(function(err) {
      console.log(err);
    });
})();
