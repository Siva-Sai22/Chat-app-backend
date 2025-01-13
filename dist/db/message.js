import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function createMessage(sender, receiver, content, timestamp) {
    const message = await prisma.message.create({
        data: {
            sender,
            receiver,
            message: content,
            timestamp,
        },
    });
    return message;
}
export async function getMessages(sender, receiver, page) {
    const limit = 20;
    const skip = page * limit;
    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender },
            ],
        },
        orderBy: {
            timestamp: "desc",
        },
        take: limit,
        skip: skip,
        select: {
            message: true,
            sender: true,
            timestamp: true
        }
    });
    return messages;
}
//# sourceMappingURL=message.js.map