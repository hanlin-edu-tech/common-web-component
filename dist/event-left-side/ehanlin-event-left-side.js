!function () {
  var e = decodeURIComponent(window.location.pathname),
      o = document.querySelector(".menu li > a[href*='" + e + "']");o && o.classList.add("select"), $(".irt-btn").on("click", function () {
    window.localStorage.clear();
  });
}();