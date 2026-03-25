import prisma from "../../lib/prisma.client";
import { Config } from "../../config";
import paginate from "../../lib/pagination";
import helper from "../../lib/helper";

class GuestService {
  async getGuests(query: any) {
    const { page, size, attended } = query;
    const conditions: any = {
      where: {},
    };
    if (attended) {
      conditions.where.attended = attended === "true" ? true : false;
    }
    return await paginate(prisma.guest, page, size, conditions);
  }

  async getGuestById(id: number) {
    return await prisma.guest.findUnique({ where: { id } });
  }

  async createGuest(data: any) {
    const reference = await this.findUniqueReference();
    data.reference = reference;
    await prisma.guest.create({ data });
    const pageUrl = `${Config.CLIENT_URL}/checkin/${reference}`;
    return await helper.generateQrCode(pageUrl);
  }

  async updateGuest(id: number, data: any) {
    return await prisma.guest.update({ where: { id }, data });
  }

  async deleteGuest(id: number) {
    return await prisma.guest.delete({ where: { id } });
  }

  async findUniqueReference() {
    let found = false;
    let reference = "";
    while (!found) {
      reference = helper.generateCustomId(null, 6);
      const existing = await prisma.guest.findUnique({
        where: { reference },
      });
      if (!existing) {
        found = true;
      }
    }
    return reference;
  }
}

export default GuestService;
