import { jQueryNoConflict } from './jquery-no-conflict'
import 'jquery.marquee'

let marqueeTarget = jQueryNoConflict('#ehanlin-header div.marquee')
let marqueeCloseTarget = jQueryNoConflict('#ehanlin-header i.marquee-close')
let isShowMarqueeClose = true

let runMarquee = () => {
  jQueryNoConflict.ajax({
    type: 'get',
    url: '/Marquee',
    dataType: 'json'
  }).then(data => {
    if (data && data.length > 0) {
      let liText
      marqueeTarget.removeAttr('style')
      jQueryNoConflict.each(data, (index, singleMarquee) => {
        let marqueeContent = ''
        if (singleMarquee.link) {
          marqueeContent += `<a href="${singleMarquee.link}" style="color: white;">`
          marqueeContent += singleMarquee.text
          marqueeContent += '</a>'
        } else {
          marqueeContent += singleMarquee.text
        }

        liText = jQueryNoConflict('<li style="display: none"></li>')
          .addClass('marquee-content')
          .css({
            'color': 'white',
            'padding-left': '15px',
            'background-color': singleMarquee.backgroundColor
          })
          .html(marqueeContent)

        marqueeTarget.find('ul').css(
          {
            'border-radius': '2px',
            'background-color': singleMarquee.backgroundColor
          }
        ).append(liText)
      })
    }

    return data
  }).then(data => {
    if (data && data.length > 0) {
      jQueryNoConflict('#ehanlin-header li.marquee-content').show()
      marqueeTarget.marquee({
        duration: 12000
      })

      if (isShowMarqueeClose) {
        marqueeCloseTarget.removeAttr('style')
        marqueeCloseTarget.on('click', event => {
          jQueryNoConflict(event.currentTarget).parents('#ehanlin-marquee').remove()
        })
      }
    }
  })
}

export {
  runMarquee
}
