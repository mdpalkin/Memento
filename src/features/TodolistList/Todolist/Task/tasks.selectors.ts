import {AppRootState} from "../../../../app/store.ts";
import {TaskDomainType} from "../../../../shared/api/tasks-api.ts";

export const selectTasksById = (todolistId: string) => (state: AppRootState): TaskDomainType[] => state.tasks[todolistId]