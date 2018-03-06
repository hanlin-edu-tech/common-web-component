(function () {
  var e = window.location.pathname,
      t = decodeURIComponent(window.location.search),
      i = decodeURIComponent(window.location.pathname),
      h = document.querySelector(".menu ul li > a[href*='" + i + t + "']");console.log(h), h && h.classList.add("select"), e.match("106fblive") || e.match("105jrhighexam.html") || e.match("12y_edu.html") || e.match("hsapp.html") ? ($(".senior").hide(), $(".university").hide()) : e.match("my_test_edu.html") ? ($(".junior").hide(), $(".university").hide()) : e.match("specify_exam_edu.html") && ($(".junior").hide(), $(".senior").hide());
})();