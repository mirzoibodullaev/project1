import { LoginSchema } from "app/features/AuthByUsername";
import { UserSchema } from "entities/User";

export interface StateSchema {
    user: UserSchema;
    loginForm: LoginSchema;
}
