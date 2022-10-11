import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import awsS3 from "../../config/aws-s3.js"

const { BUCKET_NAME } = process.env

export default async (fileKey) => {
    const commandImg = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey
    })
    return await getSignedUrl(awsS3, commandImg, { expiresIn: 3600 })
}

