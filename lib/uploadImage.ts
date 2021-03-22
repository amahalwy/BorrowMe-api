import { v4 } from "uuid";
import s3 from "./S3";

const uploadImage = (file: { buffer: any; mimetype: any }) => {
  const params = {
    Bucket: process.env.S3Bucket,
    Key: v4(),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  const uploadPhoto = s3.upload(params).promise();
  return uploadPhoto;
};

export default uploadImage;
