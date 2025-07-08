import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user with the specified email
  const adminPassword = await bcrypt.hash('IamAdmin123!@#', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yugam.in' },
    update: {},
    create: {
      email: 'admin@yugam.in',
      name: 'Admin',
      password: adminPassword,
      role: UserRole.ADMIN,
      isActive: true
    }
  });

  // Create default budget categories
  const categories = [
    { name: 'Prize Money', description: 'Awards and prizes for winners', order: 1 },
    { name: 'Facilities', description: 'Venue and infrastructure costs', order: 2 },
    { name: 'Equipment', description: 'Technical equipment and setup', order: 3 },
    { name: 'Marketing', description: 'Promotional and marketing expenses', order: 4 },
    { name: 'Food & Beverages', description: 'Catering and refreshments', order: 5 },
    { name: 'Transportation', description: 'Travel and logistics', order: 6 },
    { name: 'Miscellaneous', description: 'Other expenses', order: 7 }
  ];

  for (const category of categories) {
    await prisma.budgetCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  // Create default venues
  const venues = [
    {
      name: 'Main Auditorium',
      description: 'Large auditorium for major events',
      capacity: 500,
      location: 'Main Block',
      facilities: 'AC, Projector, Sound System, Stage'
    },
    {
      name: 'Conference Hall A',
      description: 'Medium-sized conference hall',
      capacity: 100,
      location: 'Admin Block',
      facilities: 'AC, Projector, WiFi'
    },
    {
      name: 'Workshop Lab 1',
      description: 'Technical workshop laboratory',
      capacity: 50,
      location: 'Engineering Block',
      facilities: 'Computers, Projector, Whiteboard'
    }
  ];

  for (const venue of venues) {
    await prisma.venue.upsert({
      where: { name: venue.name },
      update: {},
      create: venue
    });
  }

  console.log('Admin user created:', admin.email);
  console.log('Default budget categories created');
  console.log('Default venues created');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });