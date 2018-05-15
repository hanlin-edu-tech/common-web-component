(() => {
  let pathname = window.location.pathname
  let search = decodeURIComponent(window.location.search)
  let link = decodeURIComponent(window.location.pathname)

  let targetAnchor = document.querySelector(
    `.menu ul li > a[href*='${link}${search}']`
  )

  if (targetAnchor) {
    targetAnchor.classList.add('select')
  }

  if (pathname.match('106fblive') || pathname.match('105jrhighexam.html') ||
    pathname.match('12y_edu.html') || pathname.match('hsapp.html')) {
    $('.senior').hide()
    $('.university').hide()
  } else if (pathname.match('my_test_edu.html')) {
    $('.junior').hide()
    $('.university').hide()
  } else if (pathname.match('specify_exam_edu.html')) {
    $('.junior').hide()
    $('.senior').hide()
  }
})()
