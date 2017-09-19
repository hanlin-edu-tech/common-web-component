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
          .css("margin-top", "10px")
          .html(element.text);
        $(".marquee ul").append(liText);
      });
    },
    "json"
  ).done(function() {
    $mq.marquee({
      duration: 15000,
      direction: "left",
      duplicated: true
    });
  });

  //   var colors = new Array(
  //     [62, 35, 255],
  //     [60, 255, 60],
  //     [255, 35, 98],
  //     [45, 175, 230],
  //     [255, 0, 255],
  //     [255, 128, 0]
  //   );

  //   var step = 0;
  //   var colorIndices = [0, 1, 2, 3];
  //   var gradientSpeed = 0.002;

  //   function updateGradient() {
  //     if ($ === undefined) return;

  //     var c0_0 = colors[colorIndices[0]];
  //     var c0_1 = colors[colorIndices[1]];
  //     var c1_0 = colors[colorIndices[2]];
  //     var c1_1 = colors[colorIndices[3]];

  //     var istep = 1 - step;
  //     var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  //     var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  //     var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  //     var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  //     var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  //     var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  //     var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  //     var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  //     $(".marquee")
  //       .css({
  //         background:
  //           "-webkit-gradient(linear, left top, right top, from(" +
  //           color1 +
  //           "), to(" +
  //           color2 +
  //           "))"
  //       })
  //       .css({
  //         background:
  //           "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
  //       })
  //       .css("margin-bottom", "10px");

  //     step += gradientSpeed;
  //     if (step >= 1) {
  //       step %= 1;
  //       colorIndices[0] = colorIndices[1];
  //       colorIndices[2] = colorIndices[3];
  //       colorIndices[1] =
  //         (colorIndices[1] +
  //           Math.floor(1 + Math.random() * (colors.length - 1))) %
  //         colors.length;
  //       colorIndices[3] =
  //         (colorIndices[3] +
  //           Math.floor(1 + Math.random() * (colors.length - 1))) %
  //         colors.length;
  //     }
  //   }

  //   setInterval(updateGradient, 10);
});
