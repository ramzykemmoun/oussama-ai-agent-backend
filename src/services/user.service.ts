import z from "zod";
import { userSchema, UserFieldValues } from "../libs/schemas/user.schemas";
import User from "../models/user.model";


export class UserService {

    static register = async (data: UserFieldValues) => {

        try {
            const validated = userSchema.parse(data);

            const existingUser = await User.findOne({ email: validated.email });
            if (existingUser) {
                return {
                    success: false,
                    error: "User with this email already exists"
                }
            }

            const user = new User(validated);
            await user.save();

            return {
                success: true,
                message: "User registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email
                }
            };
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return {
                    success: false,
                    error: err.message
                };
            }
            return {
                success: false,
                error: "Registration failed"
            };
        }

    }
}