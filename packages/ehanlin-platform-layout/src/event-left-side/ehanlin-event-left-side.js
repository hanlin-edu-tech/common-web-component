(function () {
  let link = decodeURIComponent(window.location.pathname)
  let targetAnchor = document.querySelector(
    `.menu li > a[href*='${link}']`
  )

  if (targetAnchor) {
    targetAnchor.classList.add('select')
  }

  // document.querySelector('.irt-btn').addEventListener('click', () => {
  //   window.localStorage.clear()
  // })
})()
