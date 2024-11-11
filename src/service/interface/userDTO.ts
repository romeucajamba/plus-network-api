import { User } from "@prisma/client"
export interface UserRequest {
    userPicture: string
    fullName: string
    email: string
    gender: string
    age: string
    phone: string
    country: string
}

export interface UserResponse {
    user:User
}