var fs = require("fs"),
    path = require("path"),
    Canvas = require("canvas"),
    getRenderer = require("../renderer/");

function initializeCanvas(theme, cb) {

  // Fonts pre-registered in bin/worker
  var renderer = getRenderer(theme);

  if (!theme.backgroundImage) {
    return cb(null, renderer);
  }

  // Load background image from file (done separately so renderer code can work in browser too)
  fs.readFile(path.join(__dirname, "..", "settings", "backgrounds", theme.backgroundImage), function(err, raw){

    if (err) {
      return cb(err);
    }

    var bg = new Canvas.Image;
    bg.src = raw;
    renderer.backgroundImage(bg);
    
    if (options.backgroundImageTopper) {
      fs.readFile(path.join(__dirname, "..", "settings", "backgrounds", options.backgroundImageTopper), function(err, raw){

          if (err) {
            return cb(err);
          }

          var bgTopper = new Canvas.Image;
          bgTopper.src = raw;
          renderer.backgroundImageTopper = bgTopper;

          return cb(null, renderer);
        });
    } else {
      return cb(null, renderer);
    }

  });

}

module.exports = initializeCanvas;
