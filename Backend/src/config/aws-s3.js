import { S3Client } from '@aws-sdk/client-s3'

const {
    BUCKET_REGION: region,
    ACCESS_KEY: accessKeyId,
    SECRET_ACCESS_KEY: secretAccessKey
} = process.env

export default new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    region
})
