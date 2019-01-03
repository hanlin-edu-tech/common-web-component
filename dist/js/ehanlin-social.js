(function () {
  var script = document.querySelector('script[data-social-tool]#ehalin-social')
  var dataSocialTools = script.getAttribute('data-social-tool')
  var execFunction

  if (dataSocialTools) {
    dataSocialTools = dataSocialTools.split(',')
    for (let i = 0; i < dataSocialTools.length; i++) {
      let dataSocialTool = dataSocialTools[i]
      switch (dataSocialTool) {
        case 'google-analytics' : {
          (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            (i[r] =
              i[r] ||
              function () {
                (i[r].q = i[r].q || []).push(arguments)
              }),
              (i[r].l = 1 * new Date());
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
            a.async = 1
            a.src = g
            m.parentNode.insertBefore(a, m)
          })(
            window,
            document,
            'script',
            'https://www.google-analytics.com/analytics.js',
            'ga'
          )

          ga('create', 'UA-31662275-1', 'auto')
          ga('send', 'pageview')

          break
        }
        case 'fb-pixel': {
          !(function (f, b, e, v, n, t, s) {
            if (f.fbq) return
            n = f.fbq = function () {
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            }
            if (!f._fbq) f._fbq = n
            n.push = n
            n.loaded = !0
            n.version = '2.0'
            n.queue = []
            t = b.createElement(e)
            t.async = !0
            t.src = v
            s = b.getElementsByTagName(e)[0]
            s.parentNode.insertBefore(t, s)
          })(window, document, 'script', '//connect.facebook.net/en_US/fbevents.js')

          // 210352019155685
          fbq('init', '1640262175986847')
          fbq('track', 'PageView')
        }
      }
    }
  }
})()
