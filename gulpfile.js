'use strict';
/* Plugins
********************
gulp-sass
gulp-autoprefixer

gulp-sourcemaps
gulp-browserSync

gulp-concat
gulp-rename
gulp-uglify
gulp-babel

gulp-imagemin
imagemin-pngquant
gulp-newer
*/

//Variables
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    prefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    babel = require('gulp-babel'),
    newer = require('gulp-newer');

    sass.compiler = require('node-sass');

//Path
 let path = {
    dist: { 
        html: 'dist/',
        js: 'dist/js/',
        style: 'dist/css/',
        image: 'dist/image/',
        fonts: 'dist/fonts/'
    },
    src: { 
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/scss/style.scss',
        image: 'src/image/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        image: 'src/image/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

// Server
let config = {
    server: {
        baseDir: "./dist"
    },
    host: 'localhost',
    port: 3000,
    logPrefix: "src",
};

// Html handling
function html() {
    return gulp.src(path.src.html)
          .pipe(gulp.dest(path.dist.html)) 
          .pipe(reload({stream : true}))
}
// Style handling, compression, add prefixs
function style() {
    return gulp.src(path.src.style)
		.pipe(sourcemaps.init())
         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
         .pipe(rename({suffix: ".min" }))
         .pipe(prefixer(['last 2 versions'], { cascade: true }))
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(path.dist.style))
         .pipe(reload({stream : true}))
} 
// Js handling and compression
function js() {
    return gulp.src(path.src.js)  
		.pipe(sourcemaps.init())
        .pipe(babel())
		.pipe(uglify())
        .pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dist.js))
		.pipe(reload({stream: true}));
}
// Images handling and compression
function image() {
    return gulp.src(path.src.image)
           .pipe(newer(path.dist.image))
           .pipe(imagemin([
                 imagemin.gifsicle({interlaced: true}),
                 imageminJpegRecompress({
                    progressive: true,
                    max: 80,
                    min: 70
                }),
                pngquant({
                    quality: [0.65, 0.7],
                    speed: 5}),
                imagemin.svgo({plugins: [{removeViewBox: true}]})
                  ]))
			.pipe(gulp.dest(path.dist.image))
			.pipe(reload({stream: true}));
}


function clean() {
    return del(['dist/*'])
}
// Js library handling and concat in one js file

// function jsLibs() {
//     return gulp.src([src',
//     'src'])
//        .pipe(concat('libs.min.js'))
// 		 .pipe(uglify())
//          .pipe(gulp.dest(path.dist.js))
//          .pipe(reload({
//              stream: true
//     }));
// }


// Library handling and concat in one js file
/*
function fonts() {
    return gulp.src(path.src.fonts)
           .pipe(gulp.dest(path.dist.fonts))
    });
}
*/

//Tasks
gulp.task('html:build', html);
gulp.task('style:build',style);
gulp.task('js:build', js);
gulp.task('image:build', image);
gulp.task('clean-dist', clean);

// gulp.task('js:libs', jsLibs);
// gulp.task('fonts:libs', fonts);
            


//Watchers
gulp.task('watch', function(){
    gulp.watch(path.watch.html, 
        gulp.series('html:build')
    );
    gulp.watch(path.watch.style,
        gulp.series('style:build')
    );
    gulp.watch(path.watch.js, 
        gulp.series('js:build')
    );
    gulp.watch(path.watch.image,
        gulp.series('image:build')
    );
});
// Webserver
gulp.task('webserver', function () {
    browserSync.init(config);
});

// Gukp default
gulp.task('default',gulp.series(
    gulp.parallel('html:build','style:build','js:build','image:build'),
    gulp.parallel('watch','webserver')
    ));

gulp.task('build',gulp.series(
    'clean-dist',
    gulp.parallel('html:build','style:build','js:build','image:build')
));