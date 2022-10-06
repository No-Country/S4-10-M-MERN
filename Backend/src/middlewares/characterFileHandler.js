import multer, { memoryStorage } from 'multer'
const storage = memoryStorage()
const upload = multer({
    storage,
    limits: { headerPairs: 15, files: 3 }
})

export default upload.single('img')
