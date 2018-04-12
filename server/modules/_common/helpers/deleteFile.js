const AWS = require('aws-sdk')

const config = require('../../../config/config')

async function deleteFile (fileBucket, fileUrl) {
  AWS.config.update(config.aws)
  const s3 = new AWS.S3({
    params: {
      Bucket: 'hrln.life',
    },
  })

  return new Promise((resolve, reject) => {
    s3.deleteObjects({
      Bucket: 'hrln.life',
      Delete: {
        Objects: [
          { Key: `${fileBucket}/${fileUrl}` },
        ],
      },
    }, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  deleteFile,
}
