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

/**
 * requireJs 模組化
 */
require(["ehanlin-userstatus"], function(eUserStatus) {});
