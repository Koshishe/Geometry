const gulp         = require('gulp');
const rename       = require('gulp-rename');
const plumber      = require('gulp-plumber');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
const fileInclude  = require('gulp-file-include');
const babel        = require("gulp-babel");
const config       = require('../config');




// Пользовательские скрипты проекта
gulp.task('common-js', () => {
    return gulp.src([
        config.src.js + '/common.js',
    ])
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(concat('common.min.js'))
    .pipe(babel())
    .pipe(gulp.dest(config.src.jsTemp));        // кидаем файл во временную папку
});



// Скрипты библиотек
gulp.task('libs-js', () => {
    return gulp.src(config.src.js + '/libs.js')
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(config.src.jsTemp))         // кидаем файл во временную папку
});



// Конкатенация польз. скр. и библиотек в 1 файл
gulp.task('scripts', ['common-js', 'libs-js'], () => {
    return gulp.src([
        config.src.jsTemp + '/libs.min.js',     // берем файлы из временной папки
        config.src.jsTemp + '/common.min.js',
    ])
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(concat('bundle.min.js'))
    //.pipe(uglify())                           // Минимизировать весь js (на выбор)
    .pipe(gulp.dest(config.src.js))
});


// Минимизация всего js при сборке проекта
gulp.task('scripts-min', ['scripts'], () => {
    return gulp.src([
        config.src.js + '/bundle.min.js'
    ])
    .pipe(uglify()) // Минимизировать весь js (обязательно, в этом смысл этого таска)
    .pipe(gulp.dest(config.src.js))
});



gulp.task('scripts:watch', () => {
    gulp.watch([
        config.src.libs + '/**/*.js',
        config.src.js + '/common.js',
        config.src.js + '/libs.js'], ['scripts']
    );
});
