(() => {
  const search = decodeURIComponent(window.location.search)
  const hash = decodeURIComponent(window.location.hash)
  const pathname = decodeURIComponent(window.location.pathname)

  const currentAnchor =
    document.querySelector(`.menu ul li > a[href*='${pathname}${hash}']`)
    || document.querySelector(`.menu ul li > a[href*='${pathname}${hash}${search}']`)

  if (currentAnchor) {
    const selectedAnchor = document.querySelector('.menu ul li > a.select')
    if (selectedAnchor) {
      selectedAnchor.classList.remove('select')
    }

    if (!currentAnchor.classList.contains('select')) {
      currentAnchor.classList.add('select')
    }
  }
})()
