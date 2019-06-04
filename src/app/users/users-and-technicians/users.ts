export interface Iusers {
    user_id_pk?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    created_by?: number,
    created_date?: Date,
    modified_by?: number,
    modified_date?: Date,
    role_type_fk?: number
}