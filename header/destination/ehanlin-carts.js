require(["jQuery3_noConflict"], function(jQuery3_noConflict) {
  jQuery3_noConflict.get(
    "/my/owned/Carts.json",
    {
      ts: new Date().getTime()
    },
    function(resp) {
      if (resp.success && resp.result) {
        jQuery3_noConflict("#car_sum").text(resp.result.items.length);
      }
    }
  );
});
