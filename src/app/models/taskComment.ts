export interface TaskComment {
    id: number;
    text: string;
    user_id: number;
    task_id: number;
    status_id: number;
    comment_value: string;
    created_at_r: string;
    is_event: number;
}
