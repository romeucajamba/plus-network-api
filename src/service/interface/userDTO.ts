import { Gender, User } from "@prisma/client"
export interface UserRequest {
    userPicture: string
    fullName: string
    email: string
    gender: Gender
    age: number
    phone: string
    country: string,
    password: string
}

export interface ChangeUserPassowordRequest {
    id: string,
    password: string
}
export interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}
export interface UserResponse {
    user:User
}