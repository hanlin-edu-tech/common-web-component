const GOOGLE_APPLICATION_CREDENTIALS = './service-account-file.json'
const bucketName = 'ehanlin-event-test'
const filename = 'upload-gcp.js'
const Storage = require('@google-cloud/storage')
const projectId = '187045169515'

const storage = new Storage({
  projectId: projectId,
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS
})

var listFiles = bucketName => {
  storage
    .bucket(bucketName)
    .getFiles()
    .then(results => {
      const files = results[0]

      console.log('Files:')
      files.forEach(file => {
        console.log(file.name)
      })
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}

var uploadGCP = (bucketName, filename) =>
  let storage.bucket()

  storage
    .bucket(bucketName)
    .upload(filename, {destination: `/event/${filename}`})
    .then(() => {
      console.log(`Bucket ${filename} created.`)
      //makePublic(bucketName, filename)
      return storage.bucket(bucketName)
    }, err => {
      console.error('ERROR:', err)
    })
    .then((bucket) => {
      console.log(bucket)
    })
}

var makePublic = (bucketName, filename) => {
  storage
    .bucket(bucketName)
    .file(`/event/${filename}`)
    .makePublic()
    .then(() => {
      console.log(`gs://${bucketName}/${filename} is now public.`)
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}
uploadGCP(bucketName, filename)
