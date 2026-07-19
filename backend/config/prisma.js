import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // يطبع الاستعلامات والأخطاء في الـ Terminal للمساعدة في التطوير
});

export default prisma;


