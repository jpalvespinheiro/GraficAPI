import { Router } from 'express';
import { getChartData } from '../controllers/chartController';

const router = Router();

/**
 * @openapi
 * /api/charts:
 *   get:
 *     tags:
 *       - Charts
 *     summary: Retorna os dados dos gráficos
 *     description: Endpoint para buscar dados para os gráficos
 *     responses:
 *       200:
 *         description: Dados dos gráficos obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: pie
 *                   value:
 *                     type: integer
 *                     example: 100
 *                   label:
 *                     type: string
 *                     example: "Categoria A"
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/charts', getChartData);

export default router;
