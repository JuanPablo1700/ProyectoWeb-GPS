import mysql, { PoolConnection } from 'mysql2/promise';

import keys from './keys'

const pool = mysql.createPool(keys.database);

pool.getConnection().then((connection: PoolConnection) => {
  // Liberar la conexión cuando ya no sea necesaria
  connection.release();
  console.log('DB is connected');
});

export default pool;