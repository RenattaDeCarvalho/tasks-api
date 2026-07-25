import { Router} from 'express';

const healthRoutes = Router();

healthRoutes.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'API is running successfully' });
});

export { healthRoutes };