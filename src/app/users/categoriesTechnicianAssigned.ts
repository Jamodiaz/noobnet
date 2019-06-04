export interface ITechniciansAssigned {
    id_technician_category?: number,
    id_user_pk_fk?: number,
    id_category_pk_fk?: number,
    created_by?: number,
    created_date?: Date,
    modified_by?: number,
    modified_date?: Date,
    active?: boolean,
    category_id_pk?: number,
    category_type?: string,
    category_description?: string
}