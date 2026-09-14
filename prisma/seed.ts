import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial system data...');

  const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'HotelAdmin2026!';
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@luxuryhotel.demo';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {
      passwordHash,
      role: 'admin',
    },
    create: {
      username: adminUsername,
      email: adminEmail,
      name: 'Executive Admin',
      passwordHash,
      role: 'admin',
    },
  });

  console.log(`✅ Administrator ready: ${adminUser.username} (${adminUser.role})`);

  // Seed sample hotel system configuration
  await prisma.systemConfig.upsert({
    where: { key: 'hotel_name' },
    update: {},
    create: {
      key: 'hotel_name',
      value: 'The Grand Azure Resort & Spa',
    },
  });

  await prisma.systemConfig.upsert({
    where: { key: 'concierge_greeting' },
    update: {},
    create: {
      key: 'concierge_greeting',
      value: 'Welcome to The Grand Azure Resort & Spa. I am your 24/7 AI Concierge. How may I elevate your stay today?',
    },
  });

  console.log('✅ System configuration initialized.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
