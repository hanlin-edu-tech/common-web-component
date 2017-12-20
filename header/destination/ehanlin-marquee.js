/**
 * ehanlin 跑馬燈
 */
define(["jQueryNoConflict"], function(
  jQueryNoConflict
) {
  let marqueeTarget = jQueryNoConflict("#ehanlin-header div.marquee");
  jQueryNoConflict.get("/Marquee", function(data) {
        if (data && data.length > 0) {
          marqueeTarget.removeAttr("style");
          jQueryNoConflict.each(data, function(index, element) {
            let liText = jQueryNoConflict("<li></li>")
              .addClass("marquee-content")
              .css({ "background-color": element.backgroundColor })
              .html(element.text);

            marqueeTarget.css({ "background-color": element.backgroundColor });
            marqueeTarget.find("ul").append(liText);
          });
        }
      },
      "json"
    )
    .done(function() {
      require("marquee");
      marqueeTarget.marquee();
    });
});
