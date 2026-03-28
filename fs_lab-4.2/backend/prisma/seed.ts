import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();

  const advisorRole = await prisma.role.create({
    data: { name: "Financial Advisor" },
  });

  const managerRole = await prisma.role.create({
    data: { name: "Branch Manager" },
  });

  const analystRole = await prisma.role.create({
    data: { name: "Data Analyst" },
  });

  await prisma.employee.createMany({
    data: [
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@pixellriver.com",
        roleId: advisorRole.id,
      },
      {
        firstName: "Brian",
        lastName: "Smith",
        email: "brian.smith@pixellriver.com",
        roleId: managerRole.id,
      },
      {
        firstName: "Cathy",
        lastName: "Lee",
        email: "cathy.lee@pixellriver.com",
        roleId: analystRole.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });