require(["jquery3_2_1"], function(jquery3_2_1) {
  jquery3_2_1.get(
    "/my/owned/Carts.json",
    {
      ts: new Date().getTime()
    },
    function(resp) {
      if (resp.success && resp.result) {
        jquery3_2_1("#car_sum").text(resp.result.items.length);
      }
    }
  );
});
