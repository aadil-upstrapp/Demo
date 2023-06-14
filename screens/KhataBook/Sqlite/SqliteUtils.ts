import { enablePromise, openDatabase, ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLUMN_AMOUNT, COLUMN_CALCULATOR_ID, COLUMN_CURRENT_BALANCE, COLUMN_CUSTOMER_ID, COLUMN_EMAIL, COLUMN_FIRST_NUMBER, COLUMN_OPERATION, COLUMN_PASSWORD, COLUMN_PHONE_NUMBER, COLUMN_RECEIVE_ID, COLUMN_RECEIVE_PHONE_NUMBER, COLUMN_RESULT, COLUMN_SECOUND_NUMBER, COLUMN_SENDER_ID, COLUMN_TRANSACTION_ID, COLUMN_USER_ID, COLUMN_USER_NAME, DB_NAME, DB_VERSION, TABLE_CALCULATOR_HISTORY, TABLE_CUSTOMER, TABLE_KHATABOOK, TABLE_TRANSACTION } from './SqliteConstants'

let db: SQLiteDatabase;
let dbVersion: string | null;

export const SqliteUtils = {
    async openDB(): Promise<SQLiteDatabase> {
        if (!db) {
            enablePromise(true);
            db = await openDatabase({ name: DB_NAME });
            dbVersion = await AsyncStorage.getItem('dbVersion');
        }
        if (dbVersion == null) {
            if (await this.onCreate(db)) {
                dbVersion = DB_VERSION.toString();
                await AsyncStorage.setItem('dbVersion', dbVersion);
            }
        } else if (DB_VERSION > parseInt(dbVersion)) {
            if (await this.onUpgrade(db, parseInt(dbVersion), DB_VERSION)) {
                dbVersion = DB_VERSION.toString();
                await AsyncStorage.setItem('dbVersion', dbVersion);
            }
        }
        return db;
    },
    async onCreate(db: SQLiteDatabase): Promise<boolean> {
        try {
            //Create Tables here;
            console.log('create log');
            
            await db.executeSql(`CREATE TABLE ${TABLE_KHATABOOK} (${COLUMN_USER_ID} INTEGER PRIMARY KEY AUTOINCREMENT, ${COLUMN_USER_NAME} VARCHAR(30) ,${COLUMN_EMAIL} VARCHAR(30) NOT NULL UNIQUE,${COLUMN_PASSWORD} VARCHAR(10),${COLUMN_PHONE_NUMBER} INTEGER(10) NOT NULL UNIQUE)`);
            await db.executeSql(`CREATE TABLE ${TABLE_CUSTOMER} (${COLUMN_CUSTOMER_ID} INTEGER PRIMARY KEY AUTOINCREMENT,${COLUMN_USER_NAME} VARCHAR(30) ,${COLUMN_PHONE_NUMBER} INTEGER(15),${COLUMN_CURRENT_BALANCE} INTEGER(30),${COLUMN_SENDER_ID}  INTEGER REFERENCES ${TABLE_KHATABOOK}(${COLUMN_USER_ID}))`)
            await db.executeSql(`CREATE TABLE ${TABLE_TRANSACTION} (${COLUMN_TRANSACTION_ID} INTEGER PRIMARY KEY AUTOINCREMENT,${COLUMN_RECEIVE_ID} INTEGER NOT NULL,${COLUMN_AMOUNT} INTEGER,${COLUMN_USER_NAME} VARCHAR(30) ,${COLUMN_RECEIVE_PHONE_NUMBER} INTEGER(15) NOT NULL, ${COLUMN_CURRENT_BALANCE} INTEGER ,${COLUMN_SENDER_ID} INTEGER REFERENCES ${TABLE_KHATABOOK}(${COLUMN_USER_ID}))`);
            await db.executeSql(`CREATE TABLE ${TABLE_CALCULATOR_HISTORY} (${COLUMN_CALCULATOR_ID} INTEGER PRIMARY KEY AUTOINCREMENT,${COLUMN_FIRST_NUMBER} INTEGER NOT NULL, ${COLUMN_RESULT} INTEGER NOT NULL)`);
            return true;
        } catch (_) {
            return false;
        }
    },
    async onUpgrade(db: SQLiteDatabase, oldVersion: number, newVersion: number): Promise<boolean> {
        try {
            //Update Tables here;
            console.log('update table');
            await db.executeSql(`CREATE TABLE ${TABLE_CALCULATOR_HISTORY} (${COLUMN_CALCULATOR_ID} INTEGER PRIMARY KEY AUTOINCREMENT,${COLUMN_FIRST_NUMBER} INTEGER NOT NULL, ${COLUMN_RESULT} INTEGER NOT NULL)`);
           //    await db.executeSql(`ALTER TABLE ${TABLE_TRANSACTION} ADD ${COLUMN_CURRENT_BALANCE} INTEGER`)
            return true;
        } catch (_) {
            return false;
        }
    },
    async insert(object: { tableName: String, columnNames?: String[]; values: any[] }): Promise<[ResultSet]> {
        const db = await this.openDB();
        let query = `INSERT INTO ${object.tableName}`;
        if (object.columnNames?.length) {
            query += `(${object.columnNames.join(',')})`
        }
        query += ` VALUES (${object.values.map(_ => '?').join(',')})`;
        const resultSet = await db.executeSql(query, object.values);
        return resultSet;
    },
    async update(object: {
        tableName: String, columnNames: string[]; values: string[];
        where?: string; whereArgs?: string[]
    }): Promise<[ResultSet]> {
        const db = await this.openDB();
        let query = `UPDATE ${object.tableName} SET `;
        query += object.columnNames.map((column) => `${column}=?`).join(',');
        if (object.where) query += ` WHERE ${object.where}`
        const params: any[] = [...object.values, ...object.whereArgs || []];
        const resultSet = await db.executeSql(query, params);
        return resultSet;
    },
    async delete(object: {
        tableName: String, where?: string; whereArgs?: string[],
    }): Promise<[ResultSet]> {
        const db = await this.openDB();
        let query = `DELETE FROM ${object.tableName}`;
        if (object.where) query += ` WHERE ${object.where}`
        const resultSet = await db.executeSql(query, object.whereArgs);
        return resultSet;
    },
    async select(object: {
        tableName: String, columnNames?: string[]; where?: string;
        whereArgs?: string[]; orderBy?: string[]; orderByDesc?: boolean;
        groupBy?: string[]
    }): Promise<[ResultSet]> {
        const db = await this.openDB();
        let query = `SELECT ${object.columnNames?.length ? object.columnNames?.join(',') : '*'} FROM ${object.tableName}`;
        if (object.where) query += ` WHERE ${object.where}`
        if (object.orderBy?.length) {
            query += ` ORDER BY ${object.orderBy.join(',')}`
            if (object.orderByDesc) query += ' DESC'
        }
        if (object.groupBy?.length) query += ` GROUP BY ${object.groupBy.join(',')}`
        const resultSet = await db.executeSql(query, object.whereArgs)
        return resultSet;
    },
    async selectQuery(query: string, args?: string[]): Promise<[ResultSet]> {
        const db = await this.openDB();
        const resultSet = await db.executeSql(query, args);
        return resultSet;
    }
}