import { Prisma, User } from "@prisma/client"

export type UserRepository = {
    insert(data: Prisma.UserCreateInput): Promise <User>;
    getUserById(id: string): Promise <User | null>;
    findEmail(email: string): Promise <User | null>;
    updatePassword(id: string, password_hash: string): Promise<User | null> 

}