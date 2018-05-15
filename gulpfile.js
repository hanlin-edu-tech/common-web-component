const gulp = require('gulp')
const debug = require('gulp-debug')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const templateUtil = require('gulp-template-util')
const del = require('del')
const Q = require('q')
const rollup = require('rollup')
const rollupResolve = require('rollup-plugin-node-resolve')
const rollupCommonjs = require('rollup-plugin-commonjs')
const rollupBabel = require('rollup-plugin-babel')

const basePath = {
  base: 'src'
}
const dist = 'dist'

let clean = sourceDir => {
  return del([sourceDir])
}

let minifyJS = sourceJS => {
  return gulp
    .src(sourceJS, basePath)
    .pipe(debug({title: 'minify ->'}))
    .pipe(
      uglify({}).on('error', function (error) {
        console.log(error)
      })
    )
    .pipe(gulp.dest('minify-temp'))
}

let babelJS = sourceJS => {
  return gulp
    .src(sourceJS, {base: 'minify-temp'})
    .pipe(debug({title: 'babel ->'}))
    .pipe(babel())
    .pipe(gulp.dest(dist))
}

function buildJS () {
  Q.fcall(templateUtil.logStream.bind(null, minifyJS.bind(null, './src/!(js)*/*.js')))
    .then(templateUtil.logStream.bind(null, babelJS.bind(null, './minify-temp/!(header)*/*.js')))
    .then(templateUtil.logPromise.bind(null, rollupBuild))
    .then(templateUtil.logStream.bind(null, function () {
      return gulp.src('./dist/header/ehanlin-header.js', {
        base: './'
      }).pipe(debug({title: 'file ->'}))
        .pipe(replace(/\(jQuery\)/g, function (match) {
          let jQueryNoConflict = `(jQueryNoConflict)`
          console.log(`from ${match} to ${jQueryNoConflict}`)
          return jQueryNoConflict
        }))
        .pipe(gulp.dest(''))
    }))
    .then(templateUtil.logPromise.bind(null, clean.bind(null, 'minify-temp')))
}

let rollupBuild = () => {
  return rollup.rollup({
    input: './minify-temp/header/main.js',
    plugins: [
      rollupResolve({
        jsnext: true,  // Default: false
        main: true,
        browser: true
      }),
      rollupCommonjs({}),
      rollupBabel({
        exclude: 'node_modules/**'
      })
    ]
  }).then(function (bundle) {
    bundle.write({
      file: './dist/header/ehanlin-header.js',
      format: 'iife',
      globals: {
        jquery: 'jQuery3_2_1',
        marquee: 'marquee'
      },
      sourcemap: true
    })
  })
}

let copyStaticTask = () => {
  return gulp
    .src(['src/*/*.html', 'src/*/*.css', 'src/*/*.js'],
      {base: 'src'}
    )
    .pipe(gulp.dest(dist))
}

gulp.task('rollupBuild', rollupBuild)
gulp.task('package', function () {
  Q.fcall(templateUtil.logPromise.bind(null, clean.bind(null, dist)))
    .then(templateUtil.logStream.bind(null, copyStaticTask))
    .then(templateUtil.logPromise.bind(null, buildJS))
})
