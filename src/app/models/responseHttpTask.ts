import { Task } from "./task";

export interface ResponseHttpTask {
    status: boolean,
    errors: {
        message? : string
    },
    data: {
        items: {
            new    : Task[],
            process: Task[],
            done   : Task[]
        }
    }
}