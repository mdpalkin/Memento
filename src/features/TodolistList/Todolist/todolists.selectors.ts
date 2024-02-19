import {AppRootState} from "../../../app";
import {TodolistDomainType} from "./todolists.reducer.ts";

export const selectTodolists = (state: AppRootState): TodolistDomainType[] => state.todolists