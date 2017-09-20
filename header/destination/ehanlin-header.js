require.config({
  shim: {
    marquee: {
      deps: ["jquery"],
      exports: "marquee"
    }
  },

  paths: {
    jquery: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min",
    marquee: "https://cdn.jsdelivr.net/jquery.marquee/1.4.0/jquery.marquee.min"
  }
});

require(["jquery", "marquee"], function($, marquee) {
  var $mq = $(".marquee");
  var get = function(url, success, error) {
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

  var html = function() {
    $("#logoutButton").on("click", function() {
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
    return $.ajax({
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: success,
      error: error,
      url: "https://www.ehanlin.com.tw/Users/521d946be4b0d765448570bd/!logout",
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

  get("https://www.ehanlin.com.tw/ms-user-status/userStatus", function(data) {
    $(".userName").append(
      `<a href="/Users/${data.user}.html">${data.studentCard}  ${data.name}</a><span style="color:#9B9B9B"> | </span><li><a id="logoutButton">登出</a></li> <span style="color:#9B9B9B"> | </span>`
    );
    $("#loginBotton").remove();
    $("#register").remove();
    html();
  });

  /**
   * marquee 跑馬燈
   */
  $.get(
    "https://test.ehanlin.com.tw/Marquee",
    function(data) {
      console.log("測試1");
      $.each(data, function(index, element) {
        console.log("測試2");
        var liText = $("<li></li>")
          .addClass("marquee-content")
          .css("margin-top", "10px")
          .html(element.text);
        $(".marquee ul").append(liText);
      });
    },
    "json"
  ).done(function() {
    console.log("測試3");
    $mq.marquee({ duration: 15000, direction: "left", duplicated: true });
  });
});
