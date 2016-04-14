// TODO: Gracefully close down mongod and node child processes when user ctrl-c's.

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var node;
var mongod;

gulp.task('default', ['startDatabaseServer', 'startNodeServer']);

gulp.task('startDatabaseServer', function() {
    mongod = spawn('mongod', ['--config', '/usr/local/etc/mongod.conf']);
    mongod.stdout.on('data', function(data) {
        console.log('mongod.stdout: ' + data);
    });
    mongod.stderr.on('data', function(data) {
        console.log('mongod.stderr: ' + data);
    });
})

gulp.task('startNodeServer', function() {
    if (node) node.kill();
    node = spawn('node', ['server.js']);
    node.stdout.on('data', function(data) {
        console.log('node.stdout: ' + data);
    });
    node.stderr.on('data', function(data) {
        console.log('node.stderr: ' + data);
    });
});

var watcher = gulp.watch(['server.js', 'app/*.jsx', 'data/*.js', 'controllers/*.js'], ['startNodeServer']);