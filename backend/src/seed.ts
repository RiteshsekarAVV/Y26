import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user with the specified password format
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

  console.log('Admin user created:', admin.email);

  // Create default budget categories as per requirements
  const categories = [
    { name: 'Prize Money', description: 'Prizes for winners and participants', order: 1 },
    { name: 'Facilities', description: 'Venue, equipment, and infrastructure costs', order: 2 },
    { name: 'Equipment', description: 'Technical equipment and rentals', order: 3 },
    { name: 'Refreshments', description: 'Food and beverages for participants', order: 4 },
    { name: 'Marketing', description: 'Promotional materials and advertising', order: 5 },
    { name: 'Miscellaneous', description: 'Other expenses not covered above', order: 6 }
  ];

  for (const category of categories) {
    await prisma.budgetCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  console.log('Default budget categories created');

  // Create sample venues
  const venues = [
    { name: 'Main Auditorium', description: 'Large auditorium for major events', capacity: 500, location: 'Main Block', facilities: 'AC, Projector, Sound System, Stage' },
    { name: 'Conference Hall A', description: 'Medium sized conference hall', capacity: 100, location: 'Admin Block', facilities: 'AC, Projector, WiFi' },
    { name: 'Conference Hall B', description: 'Small conference room', capacity: 50, location: 'Admin Block', facilities: 'AC, Projector, WiFi' },
    { name: 'Open Ground', description: 'Outdoor venue for large gatherings', capacity: 1000, location: 'Campus Ground', facilities: 'Stage Setup Available' },
    { name: 'Computer Lab 1', description: 'Technical workshop venue', capacity: 60, location: 'IT Block', facilities: 'Computers, AC, Projector' },
    { name: 'Seminar Hall', description: 'Academic presentations and seminars', capacity: 150, location: 'Academic Block', facilities: 'AC, Audio System, Projector' }
  ];

  for (const venue of venues) {
    await prisma.venue.upsert({
      where: { name: venue.name },
      update: {},
      create: venue
    });
  }

  console.log('Sample venues created');

  // Create sample products for the catalog
  const products = [
    { name: 'Microphone', description: 'Wireless microphone for events', unitPrice: 500, unit: 'piece' },
    { name: 'Projector', description: 'HD projector rental per day', unitPrice: 1500, unit: 'day' },
    { name: 'Sound System', description: 'PA system rental per day', unitPrice: 2000, unit: 'day' },
    { name: 'Certificate', description: 'Participation/Winner certificate', unitPrice: 50, unit: 'piece' },
    { name: 'Trophy', description: 'Winner trophy (various sizes)', unitPrice: 800, unit: 'piece' },
    { name: 'Banner', description: 'Event promotional banner', unitPrice: 300, unit: 'piece' },
    { name: 'Stage Setup', description: 'Stage setup and decoration', unitPrice: 5000, unit: 'event' },
    { name: 'Photography', description: 'Event photography services', unitPrice: 3000, unit: 'day' },
    { name: 'Videography', description: 'Event videography services', unitPrice: 5000, unit: 'day' },
    { name: 'Catering', description: 'Food and refreshments per person', unitPrice: 150, unit: 'person' }
  ];

  for (const product of products) {
    await prisma.productCatalog.upsert({
      where: { name: product.name },
      update: {},
      create: product
    });
  }

  console.log('Sample products created in catalog');
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