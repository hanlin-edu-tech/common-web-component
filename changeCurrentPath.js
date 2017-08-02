const READ = require("node-read");
const FS = require("fs");
const PATH = require("path");
var $ = require("jquery");

var m = new Map();
m.set("header", "ehanlin_header.html");
m.set("footer", "ehanlin_footer.html");
m.set("eventLeftSide", "ehanlin_event_left_side.html");
m.set("infoLeftSide", "ehanlin_info_left_side.html");
m.set("menu", "ehanlin_menu.html");

m.forEach(function(item, key, mapObj) {
  var fileName = key.toString();
  var fileHtmlName = item.toString();

  for (var x = 0; x < fileName.length; x++) {
    var changeFilePath = `./${fileName}/destination/${fileHtmlName}`;
    var currentPath = PATH.join(__dirname, `${changeFilePath}`);
    var settingHrefPath = () => {
      FS.readFile(currentPath, { encoding: "utf-8" }, function(err, data) {
        if (!err) {
          var changePath = data.replace(
            /common_webcomponent\/current\.SNAPSHOT/g,
            "common_webcomponent/current"
          );
          console.log(changePath);
        } else {
          console.log(err);
        }
      });
    };
  }
  settingHrefPath();
});
