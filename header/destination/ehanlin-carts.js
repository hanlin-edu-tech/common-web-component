var retrieveCarts = function() {
  $.get("/my/owned/Carts.json", { ts: new Date().getTime() }, function(resp) {
    if (resp.success && resp.result) {
      console.log(resp.result.items.length);
    }
  });
  return retrieveCarts;
};
