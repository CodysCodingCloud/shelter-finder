import multer from 'multer';
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, Date.now() + '-' + file.fieldname + '.' + ext);
  },
});
const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Not an image type!!'), false);
  }
};
export const upload = multer({ storage: storage, fileFilter: multerFilter });
