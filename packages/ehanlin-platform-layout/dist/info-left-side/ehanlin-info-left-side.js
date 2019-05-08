(function () {
  var e = decodeURIComponent(window.location.search),
      o = decodeURIComponent(window.location.hash),
      c = decodeURIComponent(window.location.pathname),
      n = document.querySelector(".menu ul li > a[href*='" + c + o + "']") || document.querySelector(".menu ul li > a[href*='" + c + o + e + "']");if (n) {
    var _e = document.querySelector(".menu ul li > a.select");_e && _e.classList.remove("select"), n.classList.contains("select") || n.classList.add("select");
  }
})();