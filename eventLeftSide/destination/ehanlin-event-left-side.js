(function() {
  var link = decodeURIComponent(location.pathname);
  console.log(location.pathname);
  console.log(link);
  var targetAnchor = document.querySelector(
    ".menu li > a[href*='" + link + "']"
  );
  targetAnchor.classList.add("select");
})();
