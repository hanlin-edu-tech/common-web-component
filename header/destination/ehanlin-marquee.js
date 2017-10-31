/**
 * ehanlin 跑馬燈
 */
define(["jQuery3_noConflict", "marquee"], function(
  jQuery3_noConflict,
  marquee
) {
  var $mq = jQuery(".marquee");
  console.log(jQuery3_noConflict);
  jQuery3_noConflict
    .get(
      "https://test.ehanlin.com.tw/Marquee",
      function(data) {
        jQuery3_noConflict("#ehanlin-header div.marquee").removeAttr("style");
        console.log(data);
        jQuery3_noConflict.each(data, function(index, element) {
          var liText = jQuery3_noConflict("<li></li>")
            .addClass("marquee-content")
            .css({ "background-color": element.backgroundColor })
            .html(element.text);
          jQuery3_noConflict(".marquee ul").append(liText);
        });
      },
      "json"
    )
    .done(function() {
      $mq.marquee({ duration: 15000, direction: "left", duplicated: true });
    });
});
