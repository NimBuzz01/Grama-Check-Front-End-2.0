// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// The ID of your GCS bucket
const bucket_name = 'choreo-asgardeo-project-dev.appspot.com';

// The path to your file to upload
const image_path = 'pic.jpg';

// Creates a client
const storage = new Storage({keyFilename: 'key.json'});

// The new ID for the image
const file_name = 'logo1' + '.png';

async function uploadFile() {
  const options = {
    destination: file_name,
  };

  await storage.bucket(bucket_name).upload(image_path, options);
  console.log(`https://storage.cloud.google.com/choreo-asgardeo-project-dev.appspot.com/` + file_name);
  
}

uploadFile().catch(console.error);

