//function to upload file into s3 bucket
const UploadFile = async (file, user, response) => {
  /////////////Uploading file to S3 Bucket/////////
  /////////////////////////////////////////////////////////////////////////
  var params = {
    Bucket: process.env.BUCKET_NAME,
    Key:
      new Date().toISOString().replace(/:/g, "-") +
      "-" +
      file[0].originalname.replace(/ /g, "_"),
    Body: file[0].buffer,
    ContentType: "image/jpeg",
    ACL: "public-read", //permission
  };
  const stored = await s3bucket.upload(params).promise();
  return stored;
};

module.exports = {
  UploadFile,
};
