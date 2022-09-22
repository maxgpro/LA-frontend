import { Source } from "./source";
import { Status } from "./status";
import { Unit } from "./unit";

export class Lead {
    id: number;
    link: string;
    phone: string;
    source_id: number;
    unit_id: number;
    user_id: number;
    is_processed: boolean;
    is_express_delivery: boolean;
    is_add_sale: boolean;
    count_create : number;
    status_id: number;
    created_at: Date;
    source: Source;
    unit: Unit;
    status: Status;
    lastComment: string;
    isQualityLead: boolean;
    author: string;
}