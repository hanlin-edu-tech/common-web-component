import { jQueryNoConflict } from './jquery-no-conflict'

let showCart = () => {
  jQueryNoConflict.get('/shop/order/current',
    {
      ts: new Date().getTime()
    },
    response => {
      if (response.success && response.result) {
        jQueryNoConflict('#car_sum').text(response.result.cart.items.length)
      }
    }
  )
}

export { showCart }
