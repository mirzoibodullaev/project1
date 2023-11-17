import { createReduxStore, AppDispatch } from "./config/store";
import { StoreProvider } from "./ui/StoreProvider";
import type {
    StateSchema,
    ReduxStoreWithManager,
    ThunkExtraArg,
} from "./config/StateSchema";
export {
    StoreProvider,
    createReduxStore,
    AppDispatch,
    StateSchema,
    ReduxStoreWithManager,
    ThunkExtraArg,
};
