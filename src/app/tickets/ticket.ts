export interface Itickets {
    ticket_number_pk?: number,
    description?: string,
    tech_comments?: string,
    tech_assigned_fk?: number,
    status_fk?: number,
    category_fk?: number,
    created_by?: number,
    created_date?: Date,
    modified_by?: number,
    modified_date?: Date,
    active?: boolean
}