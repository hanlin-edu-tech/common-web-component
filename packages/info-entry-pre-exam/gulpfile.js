const gulp = require('gulp')
const gcPub = require('gulp-gcloud-publish')
const cache = require('gulp-cache')
const imageMin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const sleep = require('system-sleep')

const minifyImage = sourceImage => {
  return gulp
    .src(sourceImage, {base: './src'})
    .pipe(cache(imageMin({
      use: [pngquant({
        speed: 7
      })]
    })))
    .pipe(gulp.dest('./dist'))
}

const uploadGCS = bucket => {
  sleep(1200)
  return gulp
    .src([
      './dist/index.html',
      './dist/static/css/**/*.css',
      './dist/static/js/**/*.js',
      './dist/static/img/**/*.@(jpg|png|gif|svg)'
    ], {base: `${__dirname}/dist/`})
    .pipe(gcPub({
      bucket: bucket,
      keyFilename: 'tutor.json',
      base: 'app/line@chat/',
      projectId: 'tutor-204108',
      public: true,
      metadata: {
        cacheControl: 'private, no-transform',
      }
    }))
}

gulp.task('minifyImage', minifyImage.bind(minifyImage, './src/static/img/**/*.@(jpg|png)'))

/* 上傳 GCS */
gulp.task('uploadGcsTest', uploadGCS.bind(uploadGCS, 'tutor-apps-test'))
gulp.task('uploadGcsProduction', uploadGCS.bind(uploadGCS, 'tutor-apps'))

/* 部署 */
gulp.task('deployToTest', ['minifyImage', 'uploadGcsTest'], () => {
  console.log('Package and upload files to test GCS')
})

gulp.task('deployToProduction', ['minifyImage', 'uploadGcsProduction'], () => {
  console.log('Package and upload files to production GCS')
})
