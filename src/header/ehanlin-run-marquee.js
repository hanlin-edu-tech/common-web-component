import { jQueryNoConflict } from './jquery-no-conflict'
import 'jquery.marquee'

let marqueeTarget = jQueryNoConflict('#ehanlin-header div.marquee')
let marqueeCloseTarget = jQueryNoConflict('#ehanlin-header i.marquee-close')
let isShowMarqueeClose

let runMarquee = () => {
  jQueryNoConflict
    .ajax({
      type: 'get',
      url: '/Marquee',
      dataType: 'json'
    })
    .then(data => {
      if (data && data.length > 0) {
        let liText
        isShowMarqueeClose = true
        jQueryNoConflict.each(data, (index, singleMarquee) => {
          if (singleMarquee.type === 'system') {
            isShowMarqueeClose = false
          }

          liText = jQueryNoConflict('<li style="display: none"></li>')
            .addClass('marquee-content')
            .css({ 'background-color': singleMarquee.backgroundColor })
            .html(singleMarquee.text)

          marqueeTarget.css({
            'background-color': singleMarquee.backgroundColor
          })
          marqueeTarget.find('ul').append(liText)
        })
      }
    })
    .then(() => {
      jQueryNoConflict('#ehanlin-header li.marquee-content').show()

      marqueeTarget.marquee({ duration: 15000 })
      isShowMarqueeClose = false
      if (isShowMarqueeClose === true) {
        marqueeCloseTarget.removeAttr('style')
      }
    })
    .then(() => {
      jQueryNoConflict('#ehanlin-header i.marquee-close').on('click', event => {
        jQueryNoConflict(event.currentTarget)
          .parents('#ehanlin-marquee')
          .remove()
      })
    })
}

export { runMarquee }
