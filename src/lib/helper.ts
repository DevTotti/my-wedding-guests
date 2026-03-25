import { Config } from "../config";
import prisma from "./prisma.client";
import logger from "./logger";
import * as QRCode from "qrcode";
import sharp from "sharp";

export default {
  generateCustomId: function getId(
    prefix: string = null,
    maxLength: number = 10,
  ) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < maxLength; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return prefix ? `${prefix}-${text}` : text;
  },

  generateTempPassword(length: number = 8) {
    let password = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return password;
  },

  createOtp: function getOtp() {
    let otp = "";
    const possible = "0123456789";
    for (let i = 0; i < 6; i++) {
      otp += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return otp;
  },

  generateQrCode: async function generateQrCode(link_url: string) {
    try {
      return await QRCode.toDataURL(link_url);
    } catch (error) {
      logger.debug(error);
      throw error;
    }
  },
};
