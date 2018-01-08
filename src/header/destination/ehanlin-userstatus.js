/**
 * user 微服務
 */
define(["jQueryNoConflict"], function(jQueryNoConflict) {
  var onclickLogout = function() {
    jQueryNoConflict("#logoutButton").on("click", function() {
      logoutPut("/Users/521d946be4b0d765448570bd/!logout", null, function(
        data
      ) {
        location = "https://" + location.hostname;
      });
      return false;
    });
  };

  // 登出
  var logoutPut = function(url, body, success) {
    return jQueryNoConflict.ajax({
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: success,
      url: url,
      data: bodyVal(body),
      xhrFields: {
        withCredentials: true
      }
    });
  };

  var bodyVal = function(body) {
    var bodyVal = "";
    if (body != null) {
      bodyVal = JSON.stringify({
        value: body
      });
    }
    return bodyVal;
  };

  // 判斷使用者是否登入
  var determineLogin = jQueryNoConflict.ajax({
    url: "/ms-user-status/userStatus",
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    cache: false,
    crossDomain: true,
    success: function(data) {
      var userId = data.id;
      var studentCard = data.studentCard;
      var name = data.name;
      var userHref = "<a href='/Users/" + userId + ".html'>";
      var separateLine = "<span style='color:#9B9B9B'> | </span>";
      var userInfoHtml =
        userHref +
        studentCard +
        name +
        "</a>" +
        separateLine +
        "<li><a id='logoutButton'>登出</a></li>" +
        separateLine;

      jQueryNoConflict("#loginSuccess").append(userInfoHtml);
      jQueryNoConflict("#loginBotton").remove();
      jQueryNoConflict("#register").remove();
      onclickLogout();
    },
    error: function() {
      jQueryNoConflict("ul.header-menu").removeAttr("style");
    },
    xhrFields: {
      withCredentials: true
    }
  });

  jQueryNoConflict.when(determineLogin).then(function() {
    jQueryNoConflict("ul.header-menu").removeAttr("style");
  });
});
