/**
 * ehanlin 跑馬燈
 */
require(["jquery", "marquee"], function($, marquee) {
  var $mq = $(".marquee");
  $.get(
    "https://test.ehanlin.com.tw/Marquee",
    function(data) {
      $.each(data, function(index, element) {
        var liText = $("<li></li>")
          .addClass("marquee-content")
          .css({ "background-color": element.backgroundColor })
          .html(element.text);
        $(".marquee ul").append(liText);
      });
    },
    "json"
  ).done(function() {
    $mq.marquee({ duration: 15000, direction: "left", duplicated: true });
  });
});
