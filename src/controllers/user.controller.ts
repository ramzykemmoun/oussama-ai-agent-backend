import { Request, Response } from "express";
import { userSchema } from "../libs/schemas/user.schemas";
import { UserService } from "../services/user.service";


export class UserController {


    static register = async (req: Request, res: Response) => {


        const validated = userSchema.parse(req.body);
        const user = await UserService.register(validated);

        res.json(user);

    }


}