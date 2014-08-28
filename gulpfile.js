// gulp stuff
var gulp        = require("gulp");
var plugins     = require("gulp-load-plugins")();
var browserSync = require("browser-sync");

// input
var input = {};
input.html = "client/html/**/*";
input.js = [
	"bower_components/angular/angular.js",
	"bower_components/angular-animate/angular-animate.js",
	"client/js/**/*.js"
];
input.css = [
	"bower_components/normalize.css/normalize.css",
	"client/css/**/*.css"
];

// output
var output = {};
output.base = "client/build";
output.js = output.base + "/js";
output.css = output.base + "/css";

// default task
gulp.task("default", ["watch", "server", "browser"]);

// builds all the stuff
gulp.task("build", ["js", "css"]);

// watches files for changes
gulp.task("watch", function() {
	gulp.watch(input.js, ["js"]);
	gulp.watch(input.css, ["css"]);
	gulp.watch(input.html, ["html"]);
});

// script concatenation and minification
gulp.task("js", function() {
	return gulp.src(input.js)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat("script.min.js"))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify().on("error", function(e) {
			console.log("\x07", e.message);
			return this.end();
		}))
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest(output.js))
		.pipe(browserSync.reload({ stream: true, once: true }));
});

// css concatenation and prefixing
gulp.task("css", function() {
	return gulp.src(input.css)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat("style.min.css"))
		.pipe(plugins.autoprefixer())
		.pipe(plugins.minifyCss())
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest(output.css))
		.pipe(browserSync.reload({ stream: true }));
});

// html browser reloading
gulp.task("html", function() {
	browserSync.reload({ once: true });
});

// browser syncing
gulp.task("browser", function() {
	browserSync.init(null, {
		proxy: "localhost:2500",
		port: 2505,
		open: false,
		notify: false
	});
});

// node server
gulp.task("server", function() {
	plugins.nodemon({
		script: "server/index.js",
		watch: [
			"server/**/*.js"
		],
		env: {
			"NODE_ENV": "development"
		}
	});
});