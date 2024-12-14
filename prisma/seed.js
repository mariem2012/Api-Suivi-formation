import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Started seed.....');
  await prisma.payment.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.module.deleteMany();
  await prisma.student.deleteMany();

  const student1 = await prisma.student.create({
    data: {
      full_name: "Ahmed Ould Mohamed",
      phone_number: "22244000123",
      email: "ahmed.mohamed@example.com",
      address: "Tevragh Zeina, Nouakchott",
      tutor: "Mohamed Ould Saleh",
      status: true,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      full_name: "Aicha Mint El Houssein",
      phone_number: "22244000456",
      email: "aicha.elhoussein@example.com",
      address: "Sebkha, Nouakchott",
      tutor: "El Houssein Ould Ahmed",
      status: true,
    },
  });

  const student3 = await prisma.student.create({
    data: {
      full_name: "Moustapha Ould Abdallah",
      phone_number: "22244000789",
      email: "moustapha.abdallah@example.com",
      address: "Ksar, Nouakchott",
      tutor: "Abdallah Ould Brahim",
      status: true,
    },
  });

  // Create modules
  const module1 = await prisma.module.create({
    data: {
      name: "Mathématiques",
      duration: 30,
      price: 20000.00,
    },
  });

  const module2 = await prisma.module.create({
    data: {
      name: "Physique",
      duration: 25,
      price: 15000.00,
    },
  });

  const module3 = await prisma.module.create({
    data: {
      name: "Informatique",
      duration: 40,
      price: 25000.00,
    },
  });

  // Create registrations
  const registration1 = await prisma.registration.create({
    data: {
      registration_date: new Date('2024-01-01'),
      start_date: new Date('2024-01-05'),
      end_date: new Date('2024-02-04'),
      amount: 20000.00,
      paid: 20000.00,
      studentId: student1.id,
      moduleId: module1.id,
    },
  });

  const registration2 = await prisma.registration.create({
    data: {
      registration_date: new Date('2024-01-10'),
      start_date: new Date('2024-01-15'),
      end_date: new Date('2024-02-14'),
      amount: 15000.00,
      paid: 15000.00,
      studentId: student2.id,
      moduleId: module2.id,
    },
  });

  const registration3 = await prisma.registration.create({
    data: {
      registration_date: new Date('2024-02-01'),
      start_date: new Date('2024-02-05'),
      end_date: new Date('2024-03-06'),
      amount: 25000.00,
      paid: 25000.00,
      studentId: student3.id,
      moduleId: module3.id,
    },
  });

  // Create payments
  await prisma.payment.create({
    data: {
      payment_date: new Date('2024-01-01'),
      amount: 20000.00,
      payer: "Ahmed Ould Mohamed",
      payer_number: "22244000123",
      payment_mode: "Espèces",
      registrationId: registration1.id,
    },
  });

  await prisma.payment.create({
    data: {
      payment_date: new Date('2024-01-11'),
      amount: 10000.00,
      payer: "Aicha Mint El Houssein",
      payer_number: "22244000456",
      payment_mode: "Chèque",
      registrationId: registration2.id,
    },
  });

  await prisma.payment.create({
    data: {
      payment_date: new Date('2024-02-01'),
      amount: 25000.00,
      payer: "Moustapha Ould Abdallah",
      payer_number: "22244000789",
      payment_mode: "Virement bancaire",
      registrationId: registration3.id,
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
