var gulp = require("gulp");
var plugin = require("gulp-load-plugins")();
var http = require("http");
var st = require("st");

var pluginName = 'clickout';

gulp.task("js", function() {
	return (
    gulp
      .src( ["src/*.js"] )
      .pipe(plugin.sourcemaps.init())
      .pipe(
        plugin.babel(
          {
            presets: [
              ['@babel/env', { "modules": "umd"} ]
            ],
            plugins: [
              "@babel/plugin-transform-modules-umd"
            ],
          },
        )
      )
      .pipe( plugin.rename({basename: pluginName}) )
      .pipe(plugin.sourcemaps.write("../dest"))
      .pipe( gulp.dest("dest/") )
      .pipe( plugin.livereload() )
  );
});

gulp.task("js-minify", function() {
	return (
    gulp
      .src( ["dest/" + pluginName + ".js"] )
      .pipe( plugin.jsmin() )
      .pipe( plugin.rename({suffix: '.min'}) )
      .pipe( gulp.dest("dest/") )
  );
});

// Watch
gulp.task("watch", function() {

  http.createServer( st({ path: __dirname, index: "index.html", cache: false }) ).listen(3000);

  plugin.livereload.listen( { basePath: "dest", start: true } );

  gulp.watch("src/*.js", gulp.series("js", "js-minify"));

  gulp.watch("*.html", function(done) {
  	plugin.livereload.reload();
    done();
  });

  console.log("Watch on http://localhost:3000");
});

gulp.task("build", gulp.series("js", "js-minify"), function(done) { done(); });

gulp.task("default", gulp.series("js", "js-minify", "watch"), function(done) { done(); })
