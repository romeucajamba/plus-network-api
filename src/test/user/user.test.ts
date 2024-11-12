import { compare } from "bcryptjs";
import { describe, expect, test } from "vitest";
import { InMemoryUserRepository } from "../../entity/user/implementations/user-inMemmoryDataBase";
import { InsertUserUseCase } from "../../service/useCase/user/insertUserUseCase";
import { EmailExists } from "../../shared/error/error";

describe("Insert user use case", async () => {

    test("It should be able to register user", async () => {

       const  userRepository = new InMemoryUserRepository();
        const sut = new InsertUserUseCase(userRepository);

        const { user } = await sut.execute({
            userPicture: "romeu-photo",
            fullName: "Romeu Cajamba",
            email: "romeucajamba@gmail.com",
            gender:"MALE", 
            age: 25,
            phone: "943558106",
            password: "Imaculada",
            country: "ANGOLA",
        });

        expect(user.id).toEqual(expect.any(String))
    })

    test("It should hash user password upon registration", async () => {

        const  userRepository = new InMemoryUserRepository();
         const sut = new InsertUserUseCase(userRepository);
 
         const { user } = await sut.execute({
            userPicture: "romeu-photo",
            fullName: "Romeu Cajamba",
            email: "romeucajamba@gmail.com",
            gender:"MALE", 
            age: 25,
            phone: "943558106",
            password: "Imaculada",
            country: "ANGOLA",
         });
 
         const isPasswordHashed = await compare(
             "Imaculada",
             user.password_hash
         )
 
         expect(isPasswordHashed).toBe(true);
     });
     test("It should not be able to register user with same email twince", async () => {

        const  userRepository = new InMemoryUserRepository();
         const sut = new InsertUserUseCase(userRepository);

         const email = "romeucajamba@gmail.com"
 
          await sut.execute({
            userPicture: "romeu-photo",
            fullName: "Romeu Cajamba",
            email,
            gender:"MALE", 
            age: 25,
            phone: "943558106",
            password: "Imaculada",
            country: "ANGOLA",
         });
 
        expect(() =>
            sut.execute({
                userPicture: "romeu-photo",
                fullName: "Romeu Cajamba",
                email: "romeucajamba@gmail.com",
                gender:"MALE", 
                age: 25,
                phone: "943558106",
                password: "Imaculada",
                country: "ANGOLA",
        })).rejects.toBeInstanceOf(EmailExists)
     })
})