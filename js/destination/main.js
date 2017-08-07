require.config({
  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min"
  }
});

require(["jquery"], function($) {
  get = function(url, success, error) {
    return $.ajax({
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: success,
      error: error,
      url: url,
      xhrFields: { withCredentials: true }
    });
  };

  $("#loginBotton").click(function() {
    get(
      "http://test.ehanlin.com.tw/ms-user-status/login?user=" +
        "521d946be4b0d765448570bd"
    );
    get("http://test.ehanlin.com.tw/ms-user-status/userStatus", function(data) {
      if ($("#userStatus").length) {
        $(".userName")
          .text(`${data.studentCard}  ${data.name}`)
          .append(`    |    <li><a id="logoutButton">登出</a></li>`);
        $("#loginBotton").remove();
        $("#register").remove();
        alert("successful");
        html();
      } else {
        alert("empty data");
      }
    });
  });

  var html = function() {
    $("#logoutButton").on("click", function() {
      logoutPut(
        "http://test.ehanlin.com.tw",
        null,
        "Users",
        "521d946be4b0d765448570bd/!logout",
        null,
        null,
        function(data) {
          window.location = "./ehanlin_header.html";
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
    return $.ajax({
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: success,
      error: error,
      url: "http://test.ehanlin.com.tw/Users/521d946be4b0d765448570bd/!logout",
      data: bodyVal(body),
      xhrFields: { withCredentials: true }
    });
  };

  var bodyVal = function(body) {
    var bodyVal = "";
    if (body != null) {
      bodyVal = JSON.stringify({ value: body });
    }
    return bodyVal;
  };
});
