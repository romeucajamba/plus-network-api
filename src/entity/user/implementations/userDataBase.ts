import { Prisma, User } from "@prisma/client";
import { prisma } from "../../../infra/orm/prisma";
import { UserRepository } from "../userRepository";

export class UserDataBase implements UserRepository {

    async insert(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        });

        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        return user;
    }

    async findEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    }

    async updatePassword(id: string, password_hash: string): Promise<User | null> {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { password_hash, updatedAt: new Date() }
        });
        return updatedUser;
    }
}