import * as AWS from 'aws-sdk';

const {AWS_S3_UPLOAD_BUCKET} = process.env;

const s3 = new AWS.S3();

export const putS3Object = async (id: string, body, format) => {
  try {
    const filePath = `${id}.${format.toLowerCase()}`;
    const s3Params: any = {
      Bucket: `${AWS_S3_UPLOAD_BUCKET}`,
      Key: filePath,
      Body: body,
      ACL: 'public-read',
    };

    if (format === 'CSV') {
      s3Params.ContentType = 'text/csv';
      s3Params.ContentDisposition = `attachment; filename=${filePath}`;
    }

    return s3.putObject(s3Params).promise();
  } catch (error) {
    throw new Error(error);
  }
};
