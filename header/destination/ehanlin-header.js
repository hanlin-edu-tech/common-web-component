require.config({
  shim: {
    marquee: {
      deps: ["jQuery3_2_1"],
      exports: "marquee"
    }
  },

  paths: {
    jQuery3_2_1:
      "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min",
    jQuery3_noConflict: "jQuery3_noconfilct",
    marquee: "https://cdn.jsdelivr.net/jquery.marquee/1.4.0/jquery.marquee.min"
  },

  // 讓所有模組引入的 jQuery3_noConflict 都相依於 jQuery3_noConflict
  map: {
    "*": {
      jQuery3_noConflict: "jQuery3_noConflict"
    }
  }
});

/**
 * requireJs 模組化
 */
require(["ehanlin-userstatus", "ehanlin-carts"], function(
  ehanlinUserStatus,
  ehanlinCarts
) {});
