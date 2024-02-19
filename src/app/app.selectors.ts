import {AppRootState} from "./store.ts";
import {RequestStatusType} from "./app.reducer.ts";

export const selectStatus = (state: AppRootState): RequestStatusType => state.app.status
export const selectIsInitialized = (state: AppRootState): boolean => state.app.isInitialized

export const selectAppError = (state: AppRootState): string | null => state.app.error