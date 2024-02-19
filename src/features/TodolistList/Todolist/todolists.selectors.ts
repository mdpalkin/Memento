import {AppRootState} from "../../../app/store.ts";
import {TodolistDomainType} from "./todolists.reducer.ts";

export const selectTodolists = (state: AppRootState): TodolistDomainType[] => state.todolists