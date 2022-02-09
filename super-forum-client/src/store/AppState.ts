import { combineReducers } from "redux";
import { UserProfileReducer } from "./user/UserReducer";
import {UsersDataReducer} from "./usersData/UsersDataReducer";

export const rootReducer = combineReducers({
  user: UserProfileReducer,
  users:UsersDataReducer
});

export type AppState = ReturnType<typeof rootReducer>;
