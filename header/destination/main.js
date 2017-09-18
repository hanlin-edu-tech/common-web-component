require.config({
  shim: {
    marquee: {
      deps: ["jquery"],
      exports: "marquee"
    }
  },

  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min",
    marquee: "https://cdn.jsdelivr.net/jquery.marquee/1.4.0/jquery.marquee.min"
  }
});

require(["jquery", "marquee"], function($, marquee) {
  var $mq = $(".marquee");
  $.get(
    "https://test.ehanlin.com.tw/Marquee",
    function(data) {
      $.each(data, function(index, element) {
        var liText = $("<li></li>")
          .addClass("marquee-content")
          .css({
            "background-color": element.backgroundColor
          })
          .html(element.text);
        $(".marquee ul").append(liText);
      });
    },
    "json"
  ).done(function() {
    $mq.marquee({
      duration: 8000,
      direction: "left",
      duplicated: true
    });
  });
});
