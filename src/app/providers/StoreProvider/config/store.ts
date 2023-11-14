import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { StateSchema } from "./StateSchema";
import { loginReducer } from "app/features/AuthByUsername";

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
