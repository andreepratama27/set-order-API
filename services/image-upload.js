const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/keys.js');

aws.config.update({
  secretAccessKey: config.AWSSecretKey,
  accessKeyId: config.AWSAccessKeyId,
  region: 'ap-southeast-1',
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Please provide a png / jpeg file'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'img-upload-test27',
    metadata: function(req, file, cb) {
      cb(null, {fileName: 'TESTING_METADATA'});
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.export = {
  uploadImage: upload.single('image'),
};
