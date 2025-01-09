import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMessage(
  sender: string,
  receiver: string,
  content: string
) {
  const message = await prisma.message.create({
    data: {
      sender,
      receiver,
      message: content,
    },
  });

  return message;
}
