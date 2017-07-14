(function() {
  fetch('https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/v0.0.1/menu/ehanlin_menu.html', {
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