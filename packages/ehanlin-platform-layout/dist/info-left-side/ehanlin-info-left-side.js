(function () {
  var e = decodeURIComponent(window.location.search),
      o = decodeURIComponent(window.location.hash),
      n = decodeURIComponent(window.location.pathname),
      c = document.querySelector(".menu ul li > a[href*='" + n + o + "']") || document.querySelector(".menu ul li > a[href*='" + n + o + e + "']");c && c.classList.add("select");
})();