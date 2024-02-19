import {AppRootState} from "../../../../app";
import {TaskDomainType} from "../../../../shared/api";

export const selectTasksById = (todolistId: string) => (state: AppRootState): TaskDomainType[] => state.tasks[todolistId]