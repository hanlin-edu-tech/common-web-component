(function () {
  var ajaxUtils = {
    retrieveHtml: function (componentPath, httpMethod, id) {
      var url = 'https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/common_webcomponent/' +
        componentPath
      var request = new XMLHttpRequest()

      if (!id) return

      request.open(httpMethod, url, true)
      request.send()
      request.onload = function () {
        var parent, scripts, script, newScript
        var timestamp = new Date().getTime()

        if (request.status >= 200 && request.status < 400) {
          parent = document.getElementById(id)
          if (!parent) return

          parent.insertAdjacentHTML('beforeend', request.responseText)

          // 重新加載 component 頁的 js
          scripts = parent.querySelectorAll('script')
          if (scripts) {
            for (var i = 0; i < scripts.length; i++) {
              script = scripts[i]
              newScript = document.createElement('script')
              newScript.src = script.src + '?v=' + timestamp
              if (script.getAttribute('data-main')) {
                newScript.setAttribute(
                  'data-main',
                  script.getAttribute('data-main')
                )
              }
              parent.removeChild(script)
              parent.insertAdjacentElement('afterend', newScript)
            }
          }
        } else {
          console.log('error status = ' + request.status)
        }
      }

      request.onerror = function () {
        console.log(
          'Response error, readyState = ' +
            this.req.readyState +
            ', status = ' +
            this.req.status
        )
      }
    }
  }

  var componentDir = 'current',
    ehanlinComponents

  if (window.location.href.indexOf('test.ehanlin.com.tw') >= 0) {
    console.log('!!! 目前在測試環境 !!!')
    componentDir = 'current.SNAPSHOT'
  }

  ehanlinComponents = {
    'ehanlin-menu': ajaxUtils.retrieveHtml.bind(
      this,
      componentDir + '/menu/ehanlin-menu.html',
      'get',
      'ehanlin-menu'
    ),
    'ehanlin-header': ajaxUtils.retrieveHtml.bind(
      this,
      componentDir + '/header/ehanlin-header.html',
      'get',
      'ehanlin-header'
    ),
    'ehanlin-footer': ajaxUtils.retrieveHtml.bind(
      this,
      componentDir + '/footer/ehanlin-footer.html',
      'get',
      'ehanlin-footer'
    ),
    'ehanlin-event-left-side': ajaxUtils.retrieveHtml.bind(
      this,
      componentDir + '/event-left-side/ehanlin-event-left-side.html',
      'get',
      'event-left-side'
    ),
    'ehanlin-left-side': ajaxUtils.retrieveHtml.bind(
      this,
      componentDir + '/event-left-side/ehanlin-event-left-side.html',
      'get',
      'event-left-side'
    ),
    'info-left-side': ajaxUtils.retrieveHtml.bind(
      this,
      componentDir + '/info-left-side/ehanlin-info-left-side.html',
      'get',
      'info-left-side'
    )
  }

  var script = document.querySelector('script[data-module]')
  var dataModules = script.getAttribute('data-module')
  var execFunction

  if (dataModules) {
    dataModules = dataModules.split(',')
    for (var i = 0; i < dataModules.length; i++) {
      var dataModule = dataModules[i]
      execFunction = ehanlinComponents[dataModule.trim()]
      if (typeof execFunction === 'function') execFunction()
    }
  }
})()
