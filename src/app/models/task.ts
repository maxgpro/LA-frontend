import { Source } from "./source";
import { Status } from "./status";
import { Unit } from "./unit";

export class Task {
    id: number;
    link: string;
    phone: string;
    source_id: number;
    unit_id: number;
    user_id: number;
    status_id: number;
    created_at: string;
    lastComment: string;
    source: Source;
    unit: Unit;
    status: Status;
    author: string;
    responsible_id: number;
    responsible : string;
}