import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  res.json({ message: "Funcionando!", timestamp: new Date().toISOString() });
};