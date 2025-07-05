import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yugam.com' },
    update: {},
    create: {
      email: 'admin@yugam.com',
      name: 'System Administrator',
      password: adminPassword,
      role: UserRole.ADMIN,
      isActive: true
    }
  });

  console.log('Admin user created:', admin.email);

  // Create default budget categories
  const categories = [
    { name: 'Prize Money', description: 'Prizes for winners', order: 1 },
    { name: 'Facilities', description: 'Venue and equipment costs', order: 2 },
    { name: 'Equipment', description: 'Technical equipment and rentals', order: 3 },
    { name: 'Refreshments', description: 'Food and beverages', order: 4 },
    { name: 'Marketing', description: 'Promotional materials and advertising', order: 5 },
    { name: 'Miscellaneous', description: 'Other expenses', order: 6 }
  ];

  for (const category of categories) {
    await prisma.budgetCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  console.log('Default categories created');

  // Create some sample products
  const products = [
    { name: 'Microphone', description: 'Wireless microphone', unitPrice: 500, unit: 'piece' },
    { name: 'Projector', description: 'HD projector rental', unitPrice: 1500, unit: 'day' },
    { name: 'Sound System', description: 'PA system rental', unitPrice: 2000, unit: 'day' },
    { name: 'Certificate', description: 'Participation certificate', unitPrice: 50, unit: 'piece' },
    { name: 'Trophy', description: 'Winner trophy', unitPrice: 800, unit: 'piece' },
    { name: 'Banner', description: 'Event banner', unitPrice: 300, unit: 'piece' }
  ];

  for (const product of products) {
    await prisma.productCatalog.upsert({
      where: { name: product.name },
      update: {},
      create: product
    });
  }

  console.log('Sample products created');
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });