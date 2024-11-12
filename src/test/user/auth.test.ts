import { hash } from "bcryptjs";
import { describe, expect, test } from "vitest";
import { InMemoryUserRepository } from "../../entity/user/implementations/user-inMemmoryDataBase";
import { AuthenticateUserUseCase } from "../../service/useCase/user/authUseCase";
import { InvalidCredentials } from "../../shared/error/error";


describe("Authenticase use case", () => {
    test("It should be able to authenticate", async () => {

        const repsoitory = new InMemoryUserRepository();
        const sut = new AuthenticateUserUseCase(repsoitory);

        await repsoitory.insert({
            userPicture: "romeu-photo",
            fullName: "Romeu Cajamba",
            email: "romeucajamba@gmail.com",
            gender:"MALE", 
            age: 25,
            phone: "943558106",
            password_hash:  await hash("Imaculada", 6),
            country: "ANGOLA",
        })

        const { user } = await sut.execute({
            email: "romeucajamba@gmail.com",
            password: "Imaculada"
        });

        expect(user.id).toEqual(expect.any(String));
    });   

    test("It should not be able to authenticate whit wrong password", async () => {

        const repsoitory = new InMemoryUserRepository();
        const sut = new AuthenticateUserUseCase(repsoitory);

        await repsoitory.insert({
            userPicture: "romeu-photo",
            fullName: "Romeu Cajamba",
            email: "romeucajamba@gmail.com",
            gender:"MALE", 
            age: 25,
            phone: "943558106",
            password_hash: "Imaculada",
            country: "ANGOLA",
        })

        expect(() => 
            sut.execute({
                email: "romeucajamba@gmail.com",
                password: "Imaculada"
            })
        ).rejects.toBeInstanceOf(InvalidCredentials)
    });

    test("It should not be able to authenticate whit wrong email", async () => {

        const repsoitory = new InMemoryUserRepository();
        const sut = new AuthenticateUserUseCase(repsoitory);

        await repsoitory.insert({
            userPicture: "romeu-photo",
            fullName: "Romeu Cajamba",
            email: "romeucajamba123@gmail.com",
            gender:"MALE", 
            age: 25,
            phone: "943558106",
            password_hash: "Imaculada12",
            country: "ANGOLA",
        })

        expect(() => 
            sut.execute({
                email: "romeucajamba@gmail.com",
                password: "Imaculada12"
            })
        ).rejects.toBeInstanceOf(InvalidCredentials)
    });
})