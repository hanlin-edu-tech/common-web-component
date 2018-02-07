/**
 * ehanlin 跑馬燈
 */
define(['jQueryNoConflict'], function (jQueryNoConflict) {
  var marqueeTarget = jQueryNoConflict('#ehanlin-header div.marquee')
  var marqueeCloseTarget = jQueryNoConflict('#ehanlin-header i.marquee-close')
  var isShowMarqueeClose = true

  jQueryNoConflict
    .get(
      '/Marquee',
      function (data) {
        if (data && data.length > 0) {
          marqueeTarget.removeAttr('style')

          jQueryNoConflict.each(data, function (index, singleMarquee) {
            if (singleMarquee.type === 'system') {
              isShowMarqueeClose = false
            }

            var liText = jQueryNoConflict('<li></li>')
              .addClass('marquee-content')
              .css({ 'background-color': singleMarquee.backgroundColor })
              .html(singleMarquee.text)

            marqueeTarget.css({
              'background-color': singleMarquee.backgroundColor
            })
            marqueeTarget.find('ul').append(liText)
          })
        }
      },
      'json'
    )
    .done(function () {
      require('marquee')
      marqueeTarget.marquee({ duration: 15000 })
      if (isShowMarqueeClose === true) {
        marqueeCloseTarget.removeAttr('style')
      }
    })

  jQueryNoConflict('#ehanlin-header i.marquee-close').on('click', function () {
    jQueryNoConflict(this)
      .parents('#ehanlin-marquee')
      .remove()
  })
})
