(function() {
  var link = decodeURIComponent(location.pathname);
  alert(link);
  var targetAnchor = document.querySelector(
    ".menu li > a[href*='" + link + "']"
  );
  targetAnchor.classList.add("select");
})();
