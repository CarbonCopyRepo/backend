import { HTTPBody } from "./storage.types";
import { Storage, type UploadResponse } from "@google-cloud/storage";
import fs from "fs";

export const uploadHTTPBodyToStorage = async (HTTPBody: HTTPBody) => {
  try {
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: "googleAuthKey.json",
    });
    const bucketName = process.env.BUCKET_NAME;
    // Create 9-digit randpom number to avoid conflicts
    const fileName = `./${Math.random().toString().slice(2, 11)}_requestBody.txt`;

    if (HTTPBody) {
      fs.writeFileSync(fileName, JSON.stringify(HTTPBody));
    } else {
      throw new Error("UploadHTTPResponseToStorage: No HTTPBody received");
    }

    let googleBucketResponse: UploadResponse;
    if (bucketName) {
      googleBucketResponse = await storage.bucket(bucketName).upload(fileName);
    } else {
      fs.unlinkSync(fileName);
      throw new Error(
        "UploadHTTPResponseToStorage: No bucket name in environment variable",
      );
    }
    // Delete state file after upload
    fs.unlinkSync(fileName);

    return googleBucketResponse;
  } catch (error) {
    console.log(error);
  }
};
