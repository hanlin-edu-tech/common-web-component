/**
 * ehanlin 跑馬燈
 */
require(["jquery3_2_1", "marquee"], function(jquery3_2_1, marquee) {
  var $mq = jquery3_2_1(".marquee");
  jquery3_2_1
    .get(
      "https://test.ehanlin.com.tw/Marquee",
      function(data) {
        jquery3_2_1.each(data, function(index, element) {
          var liText = jquery3_2_1("<li></li>")
            .addClass("marquee-content")
            .css({ "background-color": element.backgroundColor })
            .html(element.text);
          jquery3_2_1(".marquee ul").append(liText);
        });
      },
      "json"
    )
    .done(function() {
      $mq.marquee({ duration: 15000, direction: "left", duplicated: true });
    });
});
