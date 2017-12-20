require.config({
  shim: {
    marquee: {
      deps: ["jquery"],
      exports: "marquee"
    }
  },

  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min",
    jQueryNoConflict: "jQueryNoConfilct",
    marquee: "https://cdn.jsdelivr.net/jquery.marquee/1.4.0/jquery.marquee.min"
  },

  // 讓所有模組引入的 jQueryNoConflict 都相依於 jQueryNoConflict
  map: {
    "*": {
      jQueryNoConflict: "jQueryNoConflict"
    }
  }
});

/**
 * requireJs 模組化
 */
require(["ehanlin-userstatus", "ehanlin-carts", "ehanlin-marquee"],
  function (ehanlinUserStatus,
            ehanlinCarts,
            ehanlinMarquee) {
  });
