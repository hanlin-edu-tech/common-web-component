/**
 * ehanlin 跑馬燈
 */
define(["jQuery3_noConflict", "marquee"], function(
  jQuery3_noConflict,
  marquee
) {
  var $mq = jQuery3_noConflict(".marquee");
  jQuery3_noConflict
    .get(
      "/Marquee",
      function(data) {
        if (data && data.length > 0) {
          jQuery3_noConflict("#ehanlin-header div.marquee").removeAttr("style");
          jQuery3_noConflict.each(data, function(index, element) {
            var liText = jQuery3_noConflict("<li></li>")
              .addClass("marquee-content")
              .css({ "background-color": element.backgroundColor })
              .html(element.text);
            jQuery3_noConflict(".marquee ul").append(liText);
          });
        }
      },
      "json"
    )
    .done(function() {
      $mq.marquee({ duration: 10000, direction: "left", duplicated: true });
    });
});
