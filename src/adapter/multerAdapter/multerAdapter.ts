import multer from 'multer';

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        cb(null, file.originalname); 
    },
});

const upload = multer({ storage });

export const uploadMiddleware = (request: any, response: any, next: any) => {
    upload.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'coverPicture', maxCount: 1 }
    ])(request, response, next);
};
