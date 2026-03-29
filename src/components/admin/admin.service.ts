import { Config } from "../../config";
import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.client";

class AdminService {
  private readonly jwtSaltRounds: string = Config.SALT_ROUND;

  async changeBouncerPin(pin: string) {
    await prisma.securityPin.update({
      where: { id: 1 },
      data: { pin: await this.hashPassword(pin) },
    });
  }

  async getActiveAdmin() {
    return await prisma.admin.findFirst({});
  }

  async dashboardStats() {
    const [total, attended, notAttended, gender, salutations] =
      await Promise.all([
        prisma.guest.count(),
        prisma.guest.count({ where: { attended: true } }),
        prisma.guest.count({ where: { attended: false } }),
        prisma.guest.groupBy({ by: ["gender"], _count: true }),
        prisma.guest.groupBy({ by: ["salutation"], _count: true }),
      ]);
    const attendanceRate = (attended / total) * 100;
    const attendanceByDate = await prisma.$queryRaw`
      SELECT DATE("attendedAt") as date, COUNT(*)::int as count
      FROM guests
      WHERE attended = true
      GROUP BY DATE("attendedAt")
      ORDER BY date
    `;
    const peakHours = await prisma.$queryRaw`
      SELECT EXTRACT(HOUR FROM "attendedAt") as hour, COUNT(*)::int as count
      FROM guests
      WHERE attended = true
      GROUP BY hour
      ORDER BY count DESC
    `;
    const firstCheckIn = await prisma.guest.findFirst({
      where: { attended: true },
      orderBy: { attendedAt: "asc" },
    });

    const lastCheckIn = await prisma.guest.findFirst({
      where: { attended: true },
      orderBy: { attendedAt: "desc" },
    });
    return {
      total,
      attended,
      notAttended,
      attendanceRate,
      attendanceByDate,
      gender,
      salutations,
      peakHours,
      firstCheckIn: firstCheckIn ? firstCheckIn.attendedAt : null,
      lastCheckIn: lastCheckIn ? lastCheckIn.attendedAt : null,
    };
  }

  async changeAdminPassword(id: number, pin: string) {
    await prisma.admin.update({
      where: { id },
      data: { password: await this.hashPassword(pin) },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = Number(this.jwtSaltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async authenticateBouncerPin(pin: string): Promise<boolean> {
    const record = await prisma.securityPin.findFirst({
      where: { active: true },
    });
    if (!record) {
      return false;
    }
    return await bcrypt.compare(pin, record.pin);
  }

  async authenticateAdminPassword(password: string): Promise<boolean> {
    const admin = await prisma.admin.findFirst({
      where: { username: Config.adminUserName },
    });
    if (!admin) {
      return false;
    }
    return await bcrypt.compare(password, admin.password);
  }
}

export default AdminService;
