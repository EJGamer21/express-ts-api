// config file
import config from './../config/db.config';

import mysql from 'mysql';

export const pool = mysql.createPool(config);
export const connection = mysql.createConnection(config);