(function () {
  var e = window.location.pathname,
      t = decodeURIComponent(window.location.search),
      o = decodeURIComponent(window.location.pathname),
      n = document.querySelector(".menu ul li > a[href*='" + o + t + "']");n && n.classList.add("select"), e.match("106fblive") || e.match("105jrhighexam.html") || e.match("12y_edu.html") || e.match("hsapp.html") ? (document.querySelector(".senior").style.display = "none", document.querySelector(".university").style.display = "none") : e.match("my_test_edu.html") ? (document.querySelector(".junior").style.display = "none", document.querySelector(".university").style.display = "none") : e.match("specify_exam_edu.html") && (document.querySelector(".junior").style.display = "none", document.querySelector(".senior").style.display = "none");
})();