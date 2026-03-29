import prisma from "../../lib/prisma.client";

class MiscService {
  async createOrGetHealthCheck() {
    return await prisma.healthCheck.upsert({
      where: { id: 1 },
      update: {},
      create: {
        status: "healthy",
        details: "Initial check",
      },
    });
  }
}

export default MiscService;
