import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configura la conexión a la base de datos usando variables de entorno
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // Realiza una consulta a la base de datos
    const [rows] = await connection.execute('SELECT * FROM your_table LIMIT 10'); // Cambia 'your_table' por el nombre de tu tabla
    res.status(200).json(rows); // Devuelve los resultados en formato JSON
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' }); // Manejo de errores
  } finally {
    // Cierra la conexión a la base de datos
    await connection.end();
  }
}