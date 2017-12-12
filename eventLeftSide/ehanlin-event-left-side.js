(function () {
  let link = decodeURIComponent(location.pathname);
  let targetAnchor = document.querySelector(
    ".menu li > a[href*='" + link + "']"
  );

  if ( targetAnchor ) {
    targetAnchor.classList.add("select");
  }
})();
