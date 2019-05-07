const Q = require('q')
const del = require('del')
const gulp = require('gulp')
const rollup = require('rollup')
const debug = require('gulp-debug')
const babel = require('gulp-babel')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify-es').default
const templateUtil = require('gulp-template-util')
const rollupBabel = require('rollup-plugin-babel')
const rollupCommonjs = require('rollup-plugin-commonjs')
const rollupResolve = require('rollup-plugin-node-resolve')

const basePath = {
  base: 'src'
}
const dist = 'dist'

const clean = sourceDir => {
  return del([sourceDir])
}

const minifyJS = sourceJS => {
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

const babelJS = sourceJS => {
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

const replaceEnvVersion = buildEnv => {
  return gulp
    .src(['./dist/*/*.html'], {
      base: './'
    })
    .pipe(
      replace(/ts=[\d]+/g, () => {
        const now = Date.now()
        return `ts=${now}`
      })
    )
    .pipe(
      replace(/common_webcomponent\/(current.SNAPSHOT|current)/g, (match) => {
        if (buildEnv === 'production') {
          return 'common_webcomponent/current'
        } else {
          return 'common_webcomponent/current.SNAPSHOT'
        }

      })
    )
    .pipe(gulp.dest('./'))
}

const buildJS = gulpDone => {
  Q.fcall(templateUtil.logStream.bind(templateUtil.logStream, minifyJS.bind(minifyJS, './src/!(js)*/*.js')))
    .then(templateUtil.logStream.bind(templateUtil.logStream, babelJS.bind(babelJS, './minify-temp/!(header)*/*.js')))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise, rollupBuild))
    .then(templateUtil.logStream.bind(templateUtil.logStream, () => {
      return gulp.src('./dist/header/ehanlin-header.js', {
        base: './'
      })
        .pipe(debug({ title: 'file ->' }))
        .pipe(
          replace(/\(jQuery\)/g,
            match => {
              let jQueryNoConflict = `(jQueryNoConflict)`
              console.log(`from ${match} to ${jQueryNoConflict}`)
              return jQueryNoConflict
            }))
        .pipe(gulp.dest('./'))
    }))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise, clean.bind(clean, './minify-temp')))
    .then(gulpDone)
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
  }).then(
    bundle => {
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
    .src(['./src/*/*.html', './src/*/*.css', './src/*/*.js'], {
      base: './src'
    })
    .pipe(gulp.dest(dist))
}

gulp.task('rollupBuild', rollupBuild)

gulp.task('replaceEnvProduction', replaceEnvVersion.bind(replaceEnvVersion, 'Production'))
gulp.task('replaceEnvTest', replaceEnvVersion.bind(replaceEnvVersion, 'test'))

gulp.task('packageToTest', gulpDone => {
  Q.fcall(templateUtil.logPromise.bind(templateUtil.logPromise, clean.bind(clean, dist)))
    .then(templateUtil.logStream.bind(templateUtil.logStream, copyStaticTask))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise, buildJS.bind(buildJS, gulpDone)))
})

gulp.task('packageToProduction', gulpDone => {
  Q.fcall(templateUtil.logPromise.bind(templateUtil.logPromise, clean.bind(clean, dist)))
    .then(templateUtil.logStream.bind(templateUtil.logStream, copyStaticTask))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise, buildJS.bind(buildJS, gulpDone)))
})

gulp.task('deployToProduction', gulp.series('packageToProduction', 'replaceEnvProduction'))
gulp.task('deployToTest', gulp.series('packageToTest', 'replaceEnvTest'))