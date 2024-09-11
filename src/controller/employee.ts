import db from "../database/db";
import { emptyOrRows } from "../helper/helper";
import { IEmployee } from "../models/IEmployee";
import config from '../database/config'
const table = config.tables.employee
async function getAllEmployees(req: any): Promise<IEmployee[]> {
    const rows = await db.query(`SELECT * FROM employee`);
    const data: IEmployee[] = emptyOrRows(rows);
    return data;
}
async function getEmployeeByID(req: any): Promise<IEmployee[]> {
    const rows = await db.query(
        `SELECT * FROM ${table} WHERE id=${req.params.id}`
    );
    const data: IEmployee[] = emptyOrRows(rows);
    return data;
}
async function create(payload: any): Promise<Object> {
    const data = {
        name: payload.name,
        email: payload.email,
    };
    const result: any = await db.query(`INSERT INTO employee SET ?`, data);
    let message = "Error in creating Record";
    if (result.affectedRows) {
        message = "Record created successfully";
    }
    return { message };
}
async function update(id: string, payload: any): Promise<Object> {
    const data = {
        name: payload.name,
        email: payload.email,
    };
    const result: any = await db.query(`UPDATE employee SET? WHERE id = ?`, [
        data,
        id,
    ]);
    let message = "Error in updating Record";
    if (result.affectedRows) {
        message = "Record updated successfully";
    }
    return { message };
}
async function remove(id: string): Promise<Object> {
    const result: any = await db.query(`DELETE FROM employee WHERE id=?`, [id]);
    let message = "Error in deleting Record";
    if (result.affectedRows) {
        message = "Record deleted successfully";
    }
    return { message };
}
export default {
    getAllEmployees,
    create,
    update,
    remove,
    getEmployeeByID,
};