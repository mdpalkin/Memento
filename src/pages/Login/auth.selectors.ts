import {AppRootState} from "../../app/store.ts";

export const selectIsLoggedIn = (state: AppRootState): boolean => state.auth.isLoggedIn
