//const READ = require("node-read");
const FS = require("fs");
const PATH = require("path");
const FILEPATH = PATH.join(
  __dirname,
  "./header/destination/ehanlin_header.html"
);
var $ = require("jQuery");
console.log($);

// fs.readFile(FILEPATH, { encoding: "utf-8" }, function(err, data) {
//   if (!err) {
//     console.log("received data: " + data);
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write(data);
//     response.end();
//   } else {
//     console.log(err);
//   }
// });

// $.read(
//   "/Users/hl/Downloads/common-web-component/header/destination/ehanlin_header.html",
//   "/Users/hl/Downloads/common-web-component/menu/destination/ehanlin_menu.html",
//   "/Users/hl/Downloads/common-web-component/footer/destination/ehanlin_footer.html",
//   "/Users/hl/Downloads/common-web-component/infoLeftSide/destination/ehanlin_info_left_side.html",
//   "/Users/hl/Downloads/common-web-component/eventLeftSide/destination/ehanlin_event_left_side.html",
//   function(err, data) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(data);
//   }
// );

// $("link").each(function() {
//   console.log(jQuery(this).attr("href"));
// });

// $.getJSON("package.json", function(data) {
//   console.log(data);
// });
