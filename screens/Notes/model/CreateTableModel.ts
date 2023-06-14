export interface CreateTableModel{
    tableName:string,
    item:Data
}
export interface Data{
    title:string,
    notes:string,
    user_id:number
}