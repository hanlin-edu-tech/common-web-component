(function() {
  fetch('http://52.68.131.82/ehanlin_header.html', {
      method: 'get',
      mode: 'cors'
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }
      response.text().then(function(text) {
        var banner = document.createRange().createContextualFragment(text);
        var parent = document.body;
        parent.insertBefore(banner, parent.firstChild);
      })
    }).catch(function(err) {
      console.log(err)
    });
})();