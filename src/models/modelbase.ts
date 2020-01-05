import { pool, connection } from '../utils/connection';
import IModelBase from './../interfaces/IModelBase.interface';

export default class ModelBase implements IModelBase{
    private tablename: string;
    private fields: string;
    private joins: string;
    private conditions: string | undefined;
    private idToDelete: number | string = -1;

    constructor(tablename: string, fields: Array<string>, joins: Array<object>) {
        this.tablename = tablename;
        this.fields = fields.join(', ');
        this.joins = joins.reduce((accumulator: string, value: any) => {
            accumulator += `${ value.type } JOIN ${ value.table } ON ${ value.condition } `;
            return accumulator;
        }, '');
    }

    public get(id?: number | string, conditions?: Array<string>): Promise<any> | boolean {
        if (conditions) {
            this.conditions = conditions.join(' AND ');
        }
        if (this.conditions === '') {
            return this._getWhere();
        } else {
            if (id) {
                return this._getById(id);
            } else if (!id) {
                return this._getAll();
            } else {
                return false;
            }
        }
    }

    public create(data: any): Promise<any> | boolean {
        if (!data) {
            return false;
        }
        
        let sql = `INSERT INTO ${ this.tablename } SET ?`;

        return new Promise((resolve, reject) => {
            connection.beginTransaction((error) => {
                if (error) {
                    return reject(new Error(error.sqlMessage));
                }

                connection.query(sql, [data], (error, result) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(new Error(error.stack));
                        });
                    }
                    
                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(new Error(error.sqlMessage));
                            });
                        }
    
                        if (result.affectedRows > 0) {
                            return resolve(result.insertId);
                        }
                    });
                });
            });
        });
    }

    public update(id: number | string, data?: object): Promise<any> | boolean {
        if (!data) {
            return false;
        }

        const values = Object.values(data);
        const fields = Object.keys(data).reduce((accumulator, value, index) => {
            if (index !== 0) {
                accumulator = `${ accumulator }, `;
            }
            accumulator = `${ accumulator }` + `${ value } = ?`;
            return accumulator;
        }, '');
        
        const sql = `UPDATE ${ this.tablename } SET ${ fields } WHERE ${ this.tablename }.id = ${ id };`;

        return new Promise((resolve, reject) => {
            connection.beginTransaction((error) => {
                if (error) {
                    return reject(new Error(error.sqlMessage));
                }

                connection.query(sql, values, (error, result) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(new Error(error.sqlMessage));
                        });
                    }

                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(new Error(error.sqlMessage));
                            });
                        }
                        if (result.affectedRows > 0) {
                            return resolve(id);
                        }
                    });
                });
            });
        });
    }

    public delete(id: number | string): Promise<any> | boolean {
        if (id && id > 0) {
            this.idToDelete = id
            return this._delete(id);
        } else {
            return false;
        }
    }

    private _getAll(): Promise<any> {
        let sql = '';
        
        if (this.joins === '') {
            if (this.fields === '') {
                sql = `SELECT * FROM ${ this.tablename };`;
            } else {
                sql = `SELECT ${ this.tablename }.id, ${ this.fields }`
                + ` FROM ${ this.tablename }`;
            }
        } else {
            if (this.fields === '') {
                sql = `SELECT * FROM ${ this.tablename } ${ this.joins }`;
            } else {
                sql = `SELECT ${ this.tablename }.id, ${ this.fields }`
                + ` FROM ${ this.tablename }`
                + ` ${ this.joins }`;
            }
        }

        return new Promise((resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) {
                    return reject(new Error(error.sqlMessage));
                }

                return resolve(result);
            });
        });
    }

    private _getById(id: string | number): Promise<any> | boolean {
        if (!id) {
            return false;
        }

        let sql = '';
        
        if (this.joins === '') {
            if (this.fields === '') {
                sql = `SELECT * FROM ${ this.tablename }` 
                + ` WHERE ${ this.tablename }.id = ${ id };`;
            } 
            
            else {
                sql = `SELECT ${ this.tablename }.id, ${ this.fields }`
                + ` FROM ${ this.tablename }`
                + ` WHERE ${ this.tablename }.id = ${ id };`;
            }
        } 
        
        else {
            if (this.fields === '') {
                sql = `SELECT * FROM ${ this.tablename }`
                    + ` ${ this.joins }`
                    + ` WHERE ${ this.tablename }.id = ${ id };`;
            } 
            
            else {
                sql = `SELECT ${ this.tablename }.id, ${ this.fields }`
                    + ` FROM ${ this.tablename }`
                    + ` ${ this.joins }`
                    + ` WHERE ${ this.tablename }.id = ${ id };`;
            }
        }

        return new Promise((resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) {
                    return reject(new Error(error.sqlMessage));
                }

                return resolve(result);
            });
        })
    }

    private _getWhere(): Promise<any> | boolean {
        if (this.conditions === '') {
            return false;
        }
        
        let sql = '';
        
        if (this.joins === '') {
            if (this.fields === '') {
                sql = `SELECT * FROM ${ this.tablename } WHERE ${ this.conditions };`;
            } 
            
            else {
                sql = `SELECT ${ this.tablename }.id, ${ this.fields }`
                    + ` FROM ${ this.tablename }`
                    + ` WHERE ${ this.conditions };`;
            }
        }

        else {
            if (this.fields === '') {
                sql = `SELECT * FROM ${ this.tablename }` 
                    + ` ${ this.joins }`
                    + ` WHERE ${ this.conditions };`;
            } 
            
            else {
                sql = `SELECT ${ this.tablename }.id, ${ this.fields }`
                    + ` FROM ${ this.tablename }`
                    + ` ${ this.joins }`
                    + ` WHERE ${ this.conditions };`;
            }
        }

        return new Promise((resolve, reject) => {
            pool.query(sql, (error, result) => {
                if (error) {
                    return reject(new Error(error.sqlMessage));
                }

                return resolve(result);
            });
        });
    }

    private _delete(id: number | string): Promise<any> | boolean {
        if (this.idToDelete !== id) {
            return false;
        }

        let sql = `DELETE FROM ${this.tablename} WHERE id = ? LIMIT 1;`;
        
        return new Promise((resolve, reject) => {
            connection.beginTransaction((error) => {
                if (error) {
                    return reject(new Error(error.sqlMessage));
                }

                connection.query(sql, [id], (error, result) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(new Error(error.sqlMessage));
                        });
                    }

                    connection.commit((error) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(new Error(error.sqlMessage));
                            });
                        }
                        if (result.affectedRows === 1) {
                            return resolve(true);
                        } else {
                            return reject(false);
                        }
                    });
                });
            });
        });
    }
}