import {AppRootState} from "../../app";

export const selectIsLoggedIn = (state: AppRootState): boolean => state.auth.isLoggedIn
