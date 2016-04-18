// TODO: Gracefully close down mongod and node child processes when user ctrl-c's.

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;
var mongod;
var eslint = require('gulp-eslint');

gulp.task('default', ['start-mongod', 'start-node']);

gulp.task('start-mongod', ['lint'], function () {
    mongod = spawn('mongod', ['--config', '/usr/local/etc/mongod.conf']);
    mongod.stdout.on('data', function (data) {
        console.log('mongod.stdout: ' + data);
    });
    mongod.stderr.on('data', function (data) {
        console.log('mongod.stderr: ' + data);
    });
})

gulp.task('start-node', ['lint'], function () {
    if (node) node.kill();
    node = spawn('node', ['server.js']);
    node.stdout.on('data', function (data) {
        console.log('node.stdout: ' + data);
    });
    node.stderr.on('data', function (data) {
        console.log('node.stderr: ' + data);
    });
});

gulp.task('lint', function () {
    return gulp.src(['app/*.jsx', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

var watcher = gulp.watch(['server.js', 'app/*.jsx', 'data/*.js', 'controllers/*.js'], ['start-node']);
