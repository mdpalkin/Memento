import {AppRootState} from "../app";

export const findTwoTasks = (state: AppRootState, todolistId: string, taskOneId: string, taskTwoId: string) => {

    const tasks = state.tasks[todolistId]

    const indexOne = tasks.findIndex(task => task.id === taskOneId)
    const indexTwo = tasks.findIndex(task => task.id === taskTwoId)

    return [tasks[indexOne], tasks[indexTwo]]
}