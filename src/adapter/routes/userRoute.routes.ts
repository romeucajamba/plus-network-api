import { autheticateUserController } from '../controllers/user/autheticateUserControler';
import { FastifyInstance } from "fastify";
import { insertUserController } from '../controllers/user/insertUserController';
import { userProfileController } from "../controllers/user/profileController";
import { updatePasswordController } from "../controllers/user/updatePasswordUseCase";
import { refreshTokenController } from "../controllers/user/refreshTokent"
import { verifyJWT } from "../../shared/middlewares/verify-jwt";


export async function UserRouter(app:FastifyInstance){
    app.post('/user', insertUserController);
    app.post('/session', autheticateUserController);
    app.patch('/token/refresh', refreshTokenController)
    /**Authenticated */
    app.get('/me', {onRequest: [verifyJWT]}, userProfileController);
    app.put('/user/:id/password', updatePasswordController)
}