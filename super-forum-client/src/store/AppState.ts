import { combineReducers } from "redux";
import { UserProfileReducer } from "./user/UserReducer";

export const rootReducer = combineReducers({
  user: UserProfileReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
