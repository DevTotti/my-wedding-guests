import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME ?? "admin";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "password123";
  const pin = process.env.SEED_SECURITY_PIN ?? "1234";

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 12);
    await prisma.admin.create({ data: { username, password: hashed } });
    console.log(`✅ Admin created: ${username}`);
  } else {
    console.log(`ℹ️  Admin '${username}' already exists — skipped.`);
  }

  await prisma.securityPin.updateMany({
    where: { active: true },
    data: { active: false },
  });
  await prisma.securityPin.create({ data: { pin, active: true } });
  console.log(`✅ Security PIN set: ${pin}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
