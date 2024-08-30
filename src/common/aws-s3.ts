import * as AWS from 'aws-sdk';

export class AWSS3Service {
  region;
  accesskey;
  secretkey;
  constructor(region, accesskey, secretkey) {
    this.region = region;
    this.accesskey = accesskey;
    this.secretkey = secretkey;
  }

  getS3Client() {
    return new AWS.S3({
      region: this.region,
      apiVersion: 'latest',
      credentials: {
        accessKeyId: this.accesskey,
        secretAccessKey: this.secretkey,
      },
    });
  }

  createS3Bucket() {
    let s3Client = this.getS3Client();

    s3Client.createBucket(
      {
        Bucket: 'chakrulos',
      },
      (error, success) => {
        if (error) {
          console.log(error);
        }
        console.log(success);
      },
    );
  }

  uploadObject(file, key) {
    let s3Client = this.getS3Client();

    s3Client.putObject(
      {
        Bucket: 'chakrulos',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
      (error, success) => {
        if (error) {
          console.log(error);
        }
        console.log(success);
      },
    );
  }

  deleteObject(name) {
    let s3Client = this.getS3Client();

    s3Client.deleteObject(
      {
        Bucket: 'chakrulos',
        Key: name,
      },
      (error, success) => {
        if (error) {
          console.log(error);
        }
        console.log(success);
      },
    );
  }
}
