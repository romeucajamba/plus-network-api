import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { UserRepository } from "../userRepository";

export class InMemoryUserRepository implements UserRepository {
    public users: User[] = [];

    async insert(data: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: randomUUID(),
            userPicture: data.userPicture,
            fullName: data.fullName,
            email: data.email,
            gender: data.gender,
            age: data.age,
            phone: data.phone,
            country: data.country,
            password_hash: data.password_hash,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.users.push(user);
        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = this.users.find((user) => user.id === id);
        return user || null;
    }

    async findEmail(email: string): Promise<User | null> {
        const user = this.users.find((user) => user.email === email);
        return user || null;
    }

    async updatePassword(id: string, password_hash: string): Promise<User | null> {
        const user = this.users.find((user) => user.id === id);
        
        if (!user) {
            throw new Error(`User with id ${id} not found`); 
        }
    
        user.password_hash = password_hash;
    
        return {
            id: user.id,
            userPicture: user.userPicture,
            fullName: user.fullName,
            email: user.email,
            gender: user.gender,
            age: user.age,
            phone: user.phone,
            country: user.country,
            password_hash: user.password_hash,
            createdAt: new Date(),
            updatedAt: new Date()

        };
    }
}