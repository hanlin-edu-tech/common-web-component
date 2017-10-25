require.config({
  shim: {
    marquee: {
      deps: ["jquery3_2_1"],
      exports: "marquee"
    }
  },

  paths: {
    jquery3_2_1:
      "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min",
    "ehanlin-jquery3_2_1": "ehanlin-jquery3_2_1",
    marquee: "https://cdn.jsdelivr.net/jquery.marquee/1.4.0/jquery.marquee.min"
  },

  map: {
    "*": { jquery3_2_1: "ehanlin-jquery3_2_1" }
  }
});

/**
 * requireJs 模組化
 */
require(["ehanlin-userstatus", "ehanlin-carts"], function(
  ehanlinUserStatus,
  ehanlinCarts
) {});
