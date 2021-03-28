export const convertURl = (url: string) => {
  const slug = url.split("aws.com/")[1];
  return `https://borrowme-pro.s3.us-east-2.amazonaws.com/${slug}`;
};
