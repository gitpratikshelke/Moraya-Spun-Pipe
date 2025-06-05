require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1" // or your region
});




const { S3Client, PutObjectCommand,DeleteObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const fs = require("fs");
const path = require("path");
const multer=require('multer');


// Configure AWS
const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIAYS2NRQG5MQAMWJVX",
      secretAccessKey: "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",
    },
  });




  
const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: 'pipeimage1',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const uploadPath = "assests";
        const fileName = `${uploadPath}/${file.originalname}`;
        cb(null, fileName);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set content type
    }),
  });
  
  function multerUpload(req, res) {
    return new Promise((resolve, reject) => {
      // Use upload.single('file') for a single file upload
      upload.single('image')(req, res, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(req.file);
      });
    });
  }


  async function deleteImageFromS3(key) {
  const params = {
    Bucket: "pipeimage1",
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    console.log(`File ${key} deleted successfully`);
  } catch (err) {
    console.error("Error deleting file from S3:", err);
    throw err;
  }
}

module.exports = { multerUpload,deleteImageFromS3 };