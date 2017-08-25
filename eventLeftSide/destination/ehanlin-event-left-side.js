(function() {
  var link = decodeURIComponent(location.pathname);
  var targetAnchor = document.querySelector(
    ".menu li > a[href*='" + link + "']"
  );
  targetAnchor.classList.add("select");
})();
