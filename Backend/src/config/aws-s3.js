const { S3Client } = require('@aws-sdk/client-s3')

const {
    BUCKET_REGION: region,
    ACCESS_KEY: accessKeyId,
    SECRET_ACCESS_KEY: secretAccessKey
} = process.env

module.exports.s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    region
})
