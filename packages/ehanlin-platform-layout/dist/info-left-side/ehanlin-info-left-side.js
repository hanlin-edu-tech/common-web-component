(function () {
  var e = window.location.pathname,
      o = decodeURIComponent(window.location.search),
      n = decodeURIComponent(e),
      t = document.querySelector(".menu ul li > a[href*='" + n + o + "']");t && t.classList.add("select");
})();