let gulp = require('gulp');
let ts = require('gulp-typescript');
let path = require('path');
let sourcemaps = require('gulp-sourcemaps');
let nodemon = require('gulp-nodemon');
var notifier = require('node-notifier');

gulp.task('build', () => {
  let tsProject = ts.createProject(path.resolve('./tsconfig.json'));
  let tsResult = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.resolve('./src')));
});

gulp.task('watch', () => {
  nodemon({
    script: './src/index.js',
    tasks: ['build'],
    watch: 'src',
    ext: 'ts'
  }).on('restart', () => {
    notifier.notify('Application restarted...');
    console.log(111)
  }).on('crash', () => {
    notifier.notify('Application has crashed!');
    //console.error('Application has crashed!\n')
    //stream.emit('restart', 10)  // restart the server in 10 seconds
  });
});

gulp.task('default', ['build']);
