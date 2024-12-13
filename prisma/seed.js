import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Started seed.....');
  await prisma.payment.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.module.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();

  const pwd = await bcrypt.hash('securePwd_123', 10);

  const user = await prisma.user.create({
    data: {
      full_name: 'Aichetou Gaye',
      email: 'admin@example.com',
      password: pwd,
      role: 'ADMIN',
    },
  });

  const student = await prisma.student.create({
    data: {
      last_name: 'Sow',
      first_name: 'Marieme',
      phone_number: '+22244567890',
      email: 'marieme.sow@example.com',
      address: 'Nouakchott, Tevragh-Zeina',
      status: 'Active',
      userId: user.id,
    },
  });

  const module = await prisma.module.create({
    data: {
      name: 'Initiation à la Programmation',
      duration: new Date('2024-01-01T00:00:00.000Z'),
      price: 15000.0,
      userId: user.id,
    },
  });

  const registration = await prisma.registration.create({
    data: {
      registration_date: new Date('2024-01-10T00:00:00.000Z'),
      start_date: new Date('2024-01-15T00:00:00.000Z'),
      end_date: new Date('2024-03-15T00:00:00.000Z'),
      amount: 15000.0,
      studentId: student.id,
      moduleId: module.id,
      userId: user.id,
    },
  });

  await prisma.payment.create({
    data: {
      payment_date: new Date('2024-01-12T00:00:00.000Z'),
      amount: 15000.0,
      payer: 'Marieme Sow',
      payer_number: '+22244567890',
      registrationId: registration.id,
      userId: user.id,
    },
  });

  console.log('Seed data has been inserted successfully!');
}

main()
  .catch(async (e) => {
    console.error(e.message);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
