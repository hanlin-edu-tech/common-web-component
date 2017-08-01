(function() {
  fetch(
    "https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/current.SNAPSHOT/eventLeftSide/ehanlin_event_left_side.html",
    {
      method: "get",
      mode: "cors"
    }
  )
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      response.text().then(function(text) {
        var banner = document.createRange().createContextualFragment(text);
        var parent = document.getElementById("event-left-side");
        parent.insertBefore(banner, parent.firstChild);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
})();
