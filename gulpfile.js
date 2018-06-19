const Q = require('q')
const del = require('del')
const gulp = require('gulp')
const rollup = require('rollup')
const debug = require('gulp-debug')
const babel = require('gulp-babel')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify-es').default
const gcPub = require('gulp-gcloud-publish')
const Storage = require('@google-cloud/storage')
const templateUtil = require('gulp-template-util')
const rollupBabel = require('rollup-plugin-babel')
const rollupCommonjs = require('rollup-plugin-commonjs')
const rollupResolve = require('rollup-plugin-node-resolve')

const basePath = {
  base: 'src'
}
const dist = 'dist'

let bucketName = 'tutor-events'
let projectId = 'tutor-204108'
let keyFilename = './tutor.json'
let projectName = 'web-component'

const storage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
})

let clean = sourceDir => {
  return del([sourceDir])
}

let minifyJS = sourceJS => {
  return gulp
    .src(sourceJS, basePath)
    .pipe(debug({
      title: 'minify ->'
    }))
    .pipe(
      uglify({}).on('error', function (error) {
        console.log(error)
      })
    )
    .pipe(gulp.dest('minify-temp'))
}

let babelJS = sourceJS => {
  return gulp
    .src(sourceJS, {
      base: 'minify-temp'
    })
    .pipe(debug({
      title: 'babel ->'
    }))
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
      }).pipe(debug({
        title: 'file ->'
      }))
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
        jsnext: true, // Default: false
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
    .src(['src/*/*.html', 'src/*/*.css', 'src/*/*.js'], {
      base: 'src'
    })
    .pipe(gulp.dest(dist))
}

let removeEmptyFiles = () => {
  let array = [
    'common-css',
    'event-left-side',
    'footer',
    'header',
    'info-left-side',
    'js',
    'menu'
  ]
  array.forEach(emptyFiles => {
    storage
      .bucket(bucketName)
      .file(`/event/${projectName}/${emptyFiles}`)
      .delete()
      .then(() => {
        console.log(`gs://${bucketName}/${emptyFiles} deleted.`)
      })
      .catch(err => {
        console.error('ERROR:', err)
      })
  })
}

gulp.task('uploadGcp', () => {
  return gulp.src(['dist/**/*'])
    .pipe(gcPub({
      bucket: bucketName,
      keyFilename: keyFilename,
      projectId: projectId,
      base: `/event/${projectName}`,
      public: true,
      transformDestination: path => {
        return path
      },
      metadata: {
        cacheControl: 'max-age=315360000, no-transform, public'
      }
    }))
})

gulp.task('removeEmptyFiles', () => {
  removeEmptyFiles()
})

gulp.task('rollupBuild', rollupBuild)
gulp.task('package', function () {
  Q.fcall(templateUtil.logPromise.bind(null, clean.bind(null, dist)))
    .then(templateUtil.logStream.bind(null, copyStaticTask))
    .then(templateUtil.logPromise.bind(null, buildJS))
})
