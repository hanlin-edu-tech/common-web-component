!function () {
  let e = decodeURIComponent(window.location.pathname),
      n = document.querySelector(`.menu li > a[href*='${e}']`);n && n.classList.add("select");
}();