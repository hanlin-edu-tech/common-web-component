import { jQueryNoConflict } from './jquery-no-conflict'

let showCart = () => {
  jQueryNoConflict.get('/my/owned/Carts.json',
    {
      ts: new Date().getTime()
    },
    response => {
      if (response.success && response.result) {
        jQueryNoConflict('#car_sum').text(response.result.items.length)
      }
    }
  )
}

export { showCart }
