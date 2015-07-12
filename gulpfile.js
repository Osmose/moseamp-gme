var argv = require('yargs').argv;
var glob = require('glob');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var spawn = require('child_process').spawn;


/**
 * Compile the C libraries with emscripten.
 */
gulp.task('build', function(done) {
    var empp = process.env.EMPP_BIN || argv.empp || 'em++';

    var gme_dir = path.join('emscripten', 'game_music_emu', 'gme');
    var gme_files = glob.sync(gme_dir + '/*.cpp');
    var json_dir = path.join('emscripten', 'json', 'ccan', 'json');
    var json_files = glob.sync(json_dir + '/*.c');
    var source_files = ['emscripten/gme_wrapper.cpp'].concat(gme_files, json_files);
    var outfile = 'gme_emscripten.js';
    var postJS = path.resolve(__dirname, 'src', 'post_emscripten.js');

    var flags = [
        '-s', 'ASM_JS=1',
        '-s', 'EXPORTED_FUNCTIONS=@emscripten/exported_functions.json',
        '-O1',
        '-I' + gme_dir,
        '-I' + json_dir,
        '-o', outfile,
        '-s', 'ASSERTIONS=1',
        '--post-js', postJS,

        // GCC/Clang arguments to shut up about warnings in code I didn't
        // write. :D
        '-Wno-deprecated',
        '-Qunused-arguments',
        '-Wno-logical-op-parentheses'
    ];
    var args = [].concat(flags, source_files);

    gutil.log('Compiling via emscripten to ' + outfile);
    var build_proc = spawn(empp, args, {stdio: 'inherit'});
    build_proc.on('exit', function() {
        done();
    });
});
