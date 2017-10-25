/**
 * user 微服務
 */
define(["jQuery3_noConflict"], function(jQuery3_noConflict) {
  var get = function(url, success, error) {
    return jQuery3_noConflict.ajax({
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: success,
      error: error,
      url: url,
      xhrFields: {
        withCredentials: true
      }
    });
  };

  var html = function() {
    jQuery3_noConflict("#logoutButton").on("click", function() {
      logoutPut(
        "https://www.ehanlin.com.tw",
        null,
        "Users",
        "521d946be4b0d765448570bd/!logout",
        null,
        null,
        function(data) {
          window.location = "https://www.ehanlin.com.tw";
        }
      );
      return false;
    });
  };

  var logoutPut = function(
    host,
    filter,
    resource,
    attribute,
    option,
    body,
    success,
    error
  ) {
    return jQuery3_noConflict.ajax({
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: success,
      error: error,
      url: "https://www.ehanlin.com.tw/Users/521d946be4b0d765448570bd/!logout",
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

  get("https://www.ehanlin.com.tw/ms-user-status/userStatus", function(data) {
    jQuery3_noConflict(".userName").append(
      `<a href="/Users/${data.user}.html">${data.studentCard}  ${data.name}</a><span style="color:#9B9B9B"> | </span><li><a id="logoutButton">登出</a></li> <span style="color:#9B9B9B"> | </span>`
    );
    jQuery3_noConflict("#loginBotton").remove();
    jQuery3_noConflict("#register").remove();
    html();
  });
});
