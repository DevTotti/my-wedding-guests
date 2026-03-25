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

  async hashPassword(password: string): Promise<string> {
    const salt = Number(this.jwtSaltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}

export default AdminService;
