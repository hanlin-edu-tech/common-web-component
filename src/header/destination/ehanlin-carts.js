require(['jQueryNoConflict'], function (jQueryNoConflict) {
  jQueryNoConflict.get(
    '/my/owned/Carts.json',
    {
      ts: new Date().getTime()
    },
    function (response) {
      if (response.success && response.result) {
        jQueryNoConflict('#car_sum').text(response.result.items.length)
      }
    }
  )
})
