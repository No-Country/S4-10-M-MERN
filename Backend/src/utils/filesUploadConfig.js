//const sharp = require('sharp')
import { PutObjectCommand } from "@aws-sdk/client-s3"

const { BUCKET_NAME } = process.env

export default (reqFiles) => {

  const processedFiles = {}

  for (const fileProp in reqFiles) {
    const { buffer, originalname, mimetype } = reqFiles[fileProp][0]
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

    processedFiles[fileProp] = {
      command,
      fileName
    }
  }
  return processedFiles
}

