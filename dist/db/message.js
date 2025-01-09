import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function createMessage(sender, receiver, content) {
    const message = await prisma.message.create({
        data: {
            sender,
            receiver,
            message: content,
        },
    });
    return message;
}
//# sourceMappingURL=message.js.map