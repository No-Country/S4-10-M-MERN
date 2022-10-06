import multer, { memoryStorage } from 'multer'
const storage = memoryStorage()
const upload = multer({
    storage,
    limits: { headerPairs: 15, files: 3 }
})

export default upload.fields([
    {
        name: 'img',
        maxCount: 1
    },
    {
        name: 'audio',
        maxCount: 1
    }
])
