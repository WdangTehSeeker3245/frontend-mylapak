var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');

gulp.task('minify-css', async function () {
    gulp.src('./src/css/**/*.css')
        .pipe(gulpMinifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-js', async function () {
    gulp
        .src([
            './src/js/*.js'
        ])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-html', async function () {
    gulp.src('dist/*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('move-html', async function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('move-image', async function () {
    gulp.src('src/image/*')
        .pipe(gulp.dest('dist/image'))
});

gulp.task('move-fa-sprites', async function () {
    gulp.src('src/css/fontawesome-free-6.1.2/sprites/*')
        .pipe(gulp.dest('dist/css/fontawesome-free-6.1.2/sprites/'))
});

gulp.task('move-fa-webfonts', async function () {
    gulp.src('src/css/fontawesome-free-6.1.2/webfonts/*')
        .pipe(gulp.dest('dist/css/fontawesome-free-6.1.2/webfonts/'))
});

gulp.task('build', gulp.series('minify-css', 'minify-js' , 'move-html', 'move-image' , 'move-fa-sprites' ,'move-fa-webfonts'));

gulp.task('server',async function () {
    gulpConnect.server({
      name: 'Dist App',
      root: 'src',
      port: 5173,
      livereload: true
    });
});

gulp.task('clean',async function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});