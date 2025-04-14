import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const {
    query: { id },
  } = req;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ success: false, error: 'ID inválido' });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.MYSQL_PORT || 3306),
  });

  try {
    const [rows] = await connection.execute(
      `SELECT * 
       FROM tnt_posts 
       WHERE ID = ? AND post_status = 'publish' 
       LIMIT 1;`,
      [id]
    );

    if (!rows || (rows as any[]).length === 0) {
      return res.status(404).json({ success: false, error: 'Post no encontrado' });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });

  } catch (error) {
    console.error('Error al obtener post:', error);
    return res.status(500).json({ success: false, error: 'Error interno del servidor' });
  } finally {
    await connection.end();
  }
}