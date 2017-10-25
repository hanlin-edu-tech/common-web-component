require(["jquery"], function($) {
  $.get(
    "/my/owned/Carts.json",
    {
      ts: new Date().getTime()
    },
    function(resp) {
      if (resp.success && resp.result) {
        $("#car_sum").text(resp.result.items.length);
      }
    }
  );
});
