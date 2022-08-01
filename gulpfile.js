var gulp = require('gulp');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream')
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

var babelify = require('babelify');

// Read package info
var pkg = require('./package.json');

var files = {
    js: './resources/js/app.js',
    js2: './resources/js/filepicker.js',
    less: './resources/less/app.less',
    lesss: './resources/less/**/*.less',
    dest: './storage/app/public/dist'
}

/**
 * Configure browserify
 */
function getBrowserify(entry, standalone) {
    console.log('Browserify entry', entry);

    var p = {
        entries: [entry],
        // These params are for watchify
        cache: {},
        packageCache: {}
    };
    if (typeof standalone != 'undefined') {
        p.standalone = standalone;
    }

    return browserify(p)
}

/**
 * Bundel js from browserify
 * If compress is true, then uglify js
 */
function bundleJs(browserify, compress, firstRun, filename) {
    if (typeof compress == 'undefined') {
        compress = true;
    }

    if (typeof firstRun == 'undefined') {
        firstRun = true;
    }

    var handleError = function(er){
        console.log(er.message+' on line '+er.line+':'+er.column);
        console.log(er.annotated);
    }

    var destFileName = filename+'.min-'+pkg.version+'.js';

    var s = browserify;

    /**
     * Watchify un Babel gadījumā vajag tikai vienreiz uzstādīt transfor
     * pretējā gadījumā ar katru watchify update eventu transform paliek lēnāks
     */
    if (firstRun) {
        s = s.transform(
            'babelify', {
                presets: [
                    '@babel/env'
                    ,[
                        '@babel/react',
                        {
                            "pragma": "jsx.h",
                            "pragmaFrag": "jsx.Fragment",
                            "throwIfNamespace": false
                        }
                    ]
                ],
                global: true,
                only: [
                    function(path) {
                        // Enter npm packages which should be compilded by babel
                        if (path.indexOf('/node_modules/dom-helpers/') >= 0) {
                            return true;
                        }

                        // By default compile everything except node_modules
                        if (path.indexOf('/node_modules/') >= 0) {
                            return false;
                        }
                        return true;
                    }
                ]
            }
        )
    }

    s = s
        .bundle()
        .on('error', handleError)
        .pipe(source(destFileName));

    if (compress) {
        console.log('Uglify js');
        s = s.pipe(buffer()).pipe(uglify())
    }

    s.pipe(gulp.dest(files.dest));
}

function bundleLess(compress) {
    if (typeof compress == 'undefined') {
        compress = true;
    }

    if (compress) {
        console.log('Minify css');
    }

    gulp.src(files.less)
        .pipe(
            less({
                compress: compress
            })
                .on('error', function(er){
                    console.log(er.type+': '+er.message);
                    console.log(er.filename+':'+er.line);
                })
        )
        .pipe(rename('app.min-'+pkg.version+'.css'))
        .pipe(gulp.dest(files.dest));
}

function js(cb){
    bundleJs(getBrowserify(files.js), true, true, 'app');

    cb();
};

function watchjs(cb){

    var w = watchify(
        getBrowserify(files.js)
    );

    var first = true;
    w.on('update', function(){
        // bundle without compression for faster response
        bundleJs(w, false, first, 'app');

        first = false;

        console.log('js files updated');
    });

    w.bundle().on('data', function() {});

    cb();
};

function watchjs2(cb){

    var w = watchify(
        getBrowserify(files.js2, 'webit')
    );

    var first = true;
    w.on('update', function(){
        // bundle without compression for faster response
        bundleJs(w, false, first, 'filepicker');

        first = false;

        console.log('js2 files updated');
    });

    w.bundle().on('data', function() {});

    cb();
};

function less2(cb){
    bundleLess();

    cb();
}

function watchless(cb){
    watch([files.lesss], function(){
        console.log('less files updated');
        bundleLess(false);
    });

    cb();
};

exports.default = gulp.series(watchjs, watchjs2, watchless);
exports.dist = gulp.series(js, less2);