var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;

// Launches the server and restarts the server when particular
// source files are changed.
gulp.task('default', function() {
        // TODO: gulp.run() has been deprecated. Use task dependencies or gulp.watch task triggering instead.
        gulp.run('server');

        gulp.watch(['./server.js', './app/*.jsx', './data/*.js', './controllers/*.js'], function() {
        // TODO: As above.
        gulp.run('server');
    });
});

// Launches the server.
// If a server is already running it is killed.
gulp.task('server', function() {
        if (node) node.kill();
        node = spawn('node', ['server.js'], {stdio: 'inherit'});
        node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

// Clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill();
});