// 載入 gulp
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var react = require("gulp-react");
// 載入 gulp sass

// 創建gulp任務 js
gulp.task("concat", function () {
  return gulp
    .src("./source/js/**/*.js")
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./public/javascripts"));
});
gulp.task("dist:css", function () {
  return gulp
    .src("_sass/hamburgers/hamburgers.scss")
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest("dist"))
    .pipe(csscomb(".csscomb.dist.json"))
    .pipe(cssnano())
    .pipe(rename("hamburgers.min.css"))
    .pipe(gulp.dest("dist"));
});
// 創建gulp任務 scss
gulp.task("sass", function () {
  return gulp
    .src("./source/scss/**/*.scss")
    .pipe(
      sass({
        // 編譯 Scss
        outputStyle: "compressed",
      })
    )
    .pipe(gulp.dest("./public/stylesheets"));
});
// 創建gulp任務 js 套件
var vendorjs = [
  "bower_components/jquery/dist/jquery.min.js",
  "bower_components/jquery-ui/jquery-ui.min.js",
  //'bower_components/pixi/pixi.min.js',
  "node_modules/locomotive-scroll/dist/locomotive-scroll.min.js",
  "node_modules/node-waves/dist/waves.min.js",
];
// 創建gulp任務 react
// gulp.task("jsx", function () {
//   return gulp
//     .src("./source/App.js")
//     .pipe(react())
//     .pipe(gulp.dest("./public/javascripts"));
// });
gulp.task("vendor", function () {
  return gulp
    .src(vendorjs)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./public/javascripts"));
});

// 監聽任務
gulp.task("watch", function () {
  gulp.watch("./source/js/**/*.js", gulp.series("concat"));
  gulp.watch("./source/scss/**/*.scss", gulp.series("sass"));
});

// 創建gulp全部任務
gulp.task("default", gulp.series("concat", "sass", "vendor", "watch"));

var browserSync = require("browser-sync").create();

// 新增 serve 任務
gulp.task("serve", function () {
  // 初始化本地伺服器，root 指向 public（原始打錯應是 public）
  browserSync.init({
    server: {
      baseDir: "./public", // ← 確認你的 HTML 是否在這裡
    },
    port: 3000,
    open: true, // 啟動時自動開瀏覽器
  });

  // 檔案變更時 reload（可依需求添加更多）
  gulp
    .watch("./source/js/**/*.js", gulp.series("concat"))
    .on("change", browserSync.reload);
  gulp
    .watch("./source/scss/**/*.scss", gulp.series("sass"))
    .on("change", browserSync.reload);
  gulp.watch("./public/**/*.html").on("change", browserSync.reload);
});

// 新增 build 任務，匯出靜態檔案
gulp.task(
  "build",
  gulp.series("concat", "sass", "vendor", function copyHtml() {
    return gulp
      .src("./source/**/*.html") // 假設你 html 寫在 source 裡
      .pipe(gulp.dest("./public"));
  })
);
