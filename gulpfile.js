const gulp =  require('gulp');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');

gulp.task('css', async function(done){
    console.log('minifying css...');

    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))
    .on('end',function(){

       gulp.src('./assets/css/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(rev.manifest({
            cwd:'public',
            merge:true
        }))
        .pipe(gulp.dest('./public/assets/css'))
        .on('end',done);

    });

});