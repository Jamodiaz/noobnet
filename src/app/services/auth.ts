export interface Iauth {
    User_id_pk?: number,
    Firstname?: string,
    Lastname?: string,
    Email?: string,
    Phone?: string,
    Created_by?: number,
    Created_date?: Date,
    Modified_by?: number,
    Modified_date?: Date,
    Role_type_fk?: number,
    Password?: string
}