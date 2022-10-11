const { BUCKET_NAME } = process.env

export default async (fileKey) => {
    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey
    })
    const imgDeleted = await awsS3.send(command)
    if (imgDeleted.$metadata.httpStatusCode !== 204) throw new Error(imgDeleted)
}

