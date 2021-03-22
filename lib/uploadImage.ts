import { uuidv4, v4 } from "uuid";
import s3 from "./S3";

const uploadImage = (file) => {
  const params = {
    Bucket: process.env.S3Bucket,
    Key: uuidv4(),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  const uploadPhoto = s3.upload(params).promise();
  return uploadPhoto;
};

export default uploadImage;
