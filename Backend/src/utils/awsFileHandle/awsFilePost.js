//const sharp = require('sharp')
import { PutObjectCommand } from "@aws-sdk/client-s3"
import awsS3 from "../../config/aws-s3.js"

const { BUCKET_NAME } = process.env

export default async (file) => {

  const { buffer, originalname, mimetype } = file
  // const resizedBuffer = await sharp(buffer).resize({
  //   width: 1920,
  //   height: 1080
  // }).toBuffer()

  const fileName = `${Date.now()}-${originalname}`

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: buffer, //resizedBuffer,
    ContentType: mimetype
  })

  const fileUpload = await awsS3.send(command)
  if (fileUpload.$metadata.httpStatusCode !== 200) throw new Error(fileUpload)

  return fileName
}