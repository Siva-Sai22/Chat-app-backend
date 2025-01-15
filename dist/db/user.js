import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function createUser({ email, password, name }) {
    const user = await prisma.user.create({
        data: {
            email,
            password,
            name,
        },
    });
    return user;
}
export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
}
export async function addContact(email, contactEmail) {
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
    // Remove after adding accept request
    await prisma.user.update({
        where: { email: contactEmail },
        data: {
            contacts: {
                connect: {
                    email,
                },
            },
        },
    });
}
export async function getUserContacts(email) {
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            contacts: {
                select: {
                    email: true,
                    name: true,
                },
            },
        },
    });
    return user?.contacts;
}
//# sourceMappingURL=user.js.map