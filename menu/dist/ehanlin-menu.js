(function () {
  fetch('http://52.68.131.82/ehanlin_menu.html',
  {
    mode: 'cors',
    method: 'get',
  }).then(
  function (response) {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    response.text().then(function (text) {

      //var banner = parser.parseFromString(text, "text/xml");
      var banner = document.createRange().createContextualFragment(text);
      var parent = document.getElementById('eh-menu');
      parent.insertBefore(banner, parent.firstChild);
    });
    //return response.blob();
  }).catch(function (err) {
    console.log(err);
  });
})();