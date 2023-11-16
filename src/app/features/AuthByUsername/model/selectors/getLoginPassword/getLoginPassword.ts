import { StateSchema } from "app/providers/StoreProvider";

export const getLoginPassowrd = (state: StateSchema) =>
    state?.loginForm?.password || "";
