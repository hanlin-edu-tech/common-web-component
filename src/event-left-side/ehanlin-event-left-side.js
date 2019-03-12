(function () {
  let link = decodeURIComponent(window.location.pathname)
  let targetAnchor = document.querySelector(
    `.menu li > a[href*='${link}']`
  )

  if (targetAnchor) {
    targetAnchor.classList.add('select')
  }

  $('.irt-btn').on('click', () => {
    window.localStorage.clear()
  })

})()