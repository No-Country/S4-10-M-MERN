import awsS3 from '../config/aws-s3.js'
import movieClass from '../utils/movieClass.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

export const createmovie = async (req, res) => {
    try {
        const { command, img } = await imgUploadConfig(req.file)
        const movie = await movieClass.createNewmovie({ ...req.body, img })
        if (!movie) return res.status(400).send('Mail de usuario ya existente')
        return res.status(200).send(movie)
    } catch (err) {
        res.status(500).send(err.message)
    }
}