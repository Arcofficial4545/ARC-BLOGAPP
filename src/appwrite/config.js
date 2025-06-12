import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  Client = new Client();
  databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(conf.APPWRITE_URL).setProject(
      conf.APPWRITE_PROJECT_ID
    );
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      console.log("Creating post with data:", {
        title,
        content,
        featuredImage,
        status,
        userID,
      });

      return await this.databases.createDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featured_image: featuredImage,
          status,
          useraid: userID, // Changed from userID to useraid
        }
      );
    } catch (error) {
      console.error("Appwrite error in createPost - Full error:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error type:", error.type);
      console.error("Error response:", error.response);
      throw new Error("Error in creating post");
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featured_image: featuredImage, // Changed from featuredImage to featured_image
          status,
        }
      );
    } catch (error) {
      throw new Error("Error in updating post");
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
      console.log("Fetched post data:", post);
      console.log("Featured image ID:", post.featured_image);
      return post;
    } catch (error) {
      console.log("Appwrite error in getPost:", error);
      return false;
    }
  }

  // to get sara documet but i !want sara documents a jain gy jo ka staus off ho
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("Appwrite error in getPosts:", error);
      return false;
    }
  }

  // Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite error in deletePost:", error);
      return false;
    }
  }

  // Upload a file to bucket
  async uploadFile(file) {
    try {
      console.log("Starting file upload to bucket:", conf.APPWRITE_BUCKET);
      console.log("File details:", file.name, file.type, file.size);

      return await this.bucket.createFile(
        conf.APPWRITE_BUCKET,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite error in uploadFile - Full error:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error type:", error.type);
      return false;
    }
  }

  // Delete a file from bucket
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.APPWRITE_BUCKET, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite error in deleteFile:", error);
      return false;
    }
  }

  // Get preview URL for a file
  // Replace the getFilePreview function
  getFilePreview(fileId) {
      try {
          console.log('getFilePreview called with fileId:', fileId);
          console.log('Bucket ID:', conf.APPWRITE_BUCKET);
          
          // getFileView returns a URL string directly, no need for async/await
          const fileViewUrl = this.bucket.getFileView(conf.APPWRITE_BUCKET, fileId);
          console.log('Generated file view URL:', fileViewUrl);
          
          return fileViewUrl;
      } catch (error) {
          console.error('Error in getFilePreview:', error);
          throw error;
      }
  }
}

const appwriteService = new Services();
export default appwriteService;
