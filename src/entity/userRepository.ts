import { User } from "@prisma/client"

export type UserRepository = {
    insert(
        userPicture: string,
        fullName: string,
        email: string,
        gender: string,
        age: string,
        phone: string,
        country: string
    ): Promise <User>

    get(id: number): Promise <User>
}