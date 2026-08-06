import { Router } from 'express';

const healthRoutes = Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     tags:
 *       - Health
 *     summary: Verifica o status da API.
 *     description: Retorna uma mensagem indicando que a API está em execução.
 *     responses:
 *       200:
 *         description: API está em execução com sucesso.
 */
healthRoutes.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'API is running successfully' });
});

export { healthRoutes };