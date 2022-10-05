import { s3 } from '../config/aws-s3'
import movieClass from '../utils/movieClass'
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')

export const createmovie = async (req, res) => {
    try {

        const movie = await movieClass.createNewmovie(req.body)
        if (!movie) return res.status(400).send('Mail de usuario ya existente')
        return res.status(200).send(movie)
    } catch (err) {
        res.status(500).send(err.message)
    }
}