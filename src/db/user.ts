import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateUserInput = {
  email: string;
  password: string;
  name: string;
};

export async function createUser({ email, password, name }: CreateUserInput) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function addContact(email: string, contactEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { contacts: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const contact = await prisma.user.findUnique({
    where: { email: contactEmail },
  });

  if (!contact) {
    throw new Error("Contact not found");
  }

  await prisma.user.update({
    where: { email },
    data: {
      contacts: {
        connect: {
          email: contactEmail,
        },
      },
    },
  });
}

export async function getUserContacts(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { contacts: true },
  });

  return user?.contacts;
}
