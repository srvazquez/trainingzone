import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejo de preflight para CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Conexión a la base de datos
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.MYSQL_PORT || 3306)
  });

  try {
    // Consulta para obtener todos los posts
    const [rows] = await connection.execute(
      `SELECT * FROM tnt_posts ORDER BY post_date DESC`
    );

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error('Error al obtener posts:', error);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener posts'
    });

  } finally {
    // Cierra la conexión
    await connection.end();
  }
}