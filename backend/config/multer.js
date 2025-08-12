import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"uploads/")
    },
    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = [".pdf",".docx"]
    const ext = path.extname(file.originalname).toLowerCase()

    if(allowedTypes.includes(ext)){
        cb(null,true)
    }
    else{
        cb(new Error("Only PDF and DOCX files are allowed"))
    }
}

const upload = multer({
    storage,
    limits: {fileSize: 10*1024*1024},
    fileFilter
})

export default upload