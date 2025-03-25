import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Configuración CORS mejorada
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Manejo de preflight para CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Respuesta de prueba
  try {
    const responseData = {
      status: 'success',
      message: 'Data from db.ts',
      timestamp: new Date().toISOString(),
      method: req.method,
      query: req.query,
      body: req.body
    };

    return res.status(200).json(responseData);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}