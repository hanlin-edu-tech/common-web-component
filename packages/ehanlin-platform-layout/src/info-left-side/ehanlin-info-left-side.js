(() => {
  const search = decodeURIComponent(window.location.search)
  const hash = decodeURIComponent(window.location.hash)
  const pathname = decodeURIComponent(window.location.pathname)

  const targetAnchor =
    document.querySelector(`.menu ul li > a[href*='${pathname}${hash}']`)
    || document.querySelector(`.menu ul li > a[href*='${pathname}${hash}${search}']`)

  if (targetAnchor) {
    targetAnchor.classList.add('select')
  }

  // if (pathname.match('108cap') || pathname.match('105jrhighexam.html') ||
  //   pathname.match('12y_edu.html') || pathname.match('hsapp.html')) {
  //   document.querySelector('.senior').style.display = 'none'
  //   document.querySelector('.university').style.display = 'none'
  // } else if (pathname.match('my_test_edu.html') || pathname.match('gsatanalysis')) {
  //   document.querySelector('.junior').style.display = 'none'
  //   document.querySelector('.university').style.display = 'none'
  // } else if (pathname.match('specify_exam_edu.html')) {
  //   document.querySelector('.junior').style.display = 'none'
  //   document.querySelector('.senior').style.display = 'none'
  // }
})()
