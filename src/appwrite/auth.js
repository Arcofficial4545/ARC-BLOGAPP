import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  Client = new Client();
  account;

  constructor() {
    this.Client.setEndpoint(conf.APPWRITE_URL).setProject(
      conf.APPWRITE_PROJECT_ID
    );

    this.account = new Account(this.Client);
  }

  async createAccount({ email, password, name }) {
    try {
      const useracoount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (useracoount) {
        return this.login({ email, password });
      } else {
        return useracoount;
      }
    } catch (error) {
      throw new Error("this ERROR IN CREATEaCCOUNT");
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error("enter vlaid email adress");
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new Authservice();

export default authService;
