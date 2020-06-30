const gulp =  require('gulp');
const sass = require('gulp-sass');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify  = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function(done){
    console.log('minifying css...');

    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))
    .on('end',function(){

       gulp.src('./assets/**/*.css',{base: 'assets'})
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd:'public',
            merge:true
        }))
        .pipe(gulp.dest('./public/assets'))
        .on('end',done);

    });

});

gulp.task('js',function(done){
    console.log('minifying js...');
    gulp.src('./assets/js/**/*.js',{base: 'assets'})
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});

gulp.task('images',function(done){
    console.log('minifying images...');
    gulp.src('./assets/images/**/*.+(png|jpeg|jpg|gif)',{base: 'assets'})
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});

gulp.task('clean:asset',function(done){
    del.sync('./public');
    done();
});

gulp.task('build',gulp.series('clean:asset','css','js','images'),function(done){
    console.log('Building project...');
    done();
});