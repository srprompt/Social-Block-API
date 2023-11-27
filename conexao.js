import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'db-social-block-do-user-15255845-0.c.db.ondigitalocean.com',
    port: 25060,
    user: 'localhost',
    password: 'AVNS_iwwH4hiFMRNKPO7jOIg',
    database: 'socialblock'
});