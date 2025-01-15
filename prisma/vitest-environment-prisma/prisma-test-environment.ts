import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest'
import "dotenv/config";
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if(!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const DATABASE_URL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = DATABASE_URL;
    execSync ('npx prisma migrate deploy');
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
        await prisma.$disconnect();
      },
    };
  },
};
