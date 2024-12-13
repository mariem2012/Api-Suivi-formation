import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Started seed.....');
  await prisma.payment.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.module.deleteMany();
  await prisma.student.deleteMany();

  const student = await prisma.student.create({
    data: {
      full_name: 'Marieme Fall',
      phone_number: '+22244567890',
      email: 'marieme.sow@example.com',
      address: 'Nouakchott, Tevragh-Zeina',
      status: true,
    },
  });

  const module = await prisma.module.create({
    data: {
      name: 'Initiation à la Programmation',
      duration: 72,
      price: 15000.0,
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
    },
  });

  await prisma.payment.create({
    data: {
      payment_date: new Date('2024-01-12T00:00:00.000Z'),
      amount: 15000.0,
      payer: 'Marieme Sow',
      payer_number: '+22244567890',
      registrationId: registration.id,
      payment_mode: 'Bankily',
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
