import { Router } from 'express';
import { getTotalReceitas, 
        getTotalDespesas, 
        getLucroLiquido,
        getContasVencidas,
        getContasAVencer,
        getChartData } from '../controllers/chartController';

const router = Router();

/**
 * @openapi
 * /charts:
 *   get:
 *     tags:
 *       - Charts
 *     summary: Retorna os dados dos gráficos
 *     description: Endpoint para buscar dados para os gráficos
 *     parameters:
 *       - in: query
 *         name: tipo
 *         required: true
 *         description: Tipo de gráfico (PIE, LINE, BAR)
 *         schema:
 *           type: string
 *       - in: query
 *         name: dataInicio
 *         required: true
 *         description: Data de início no formato YYYY-MM-DD
 *         schema:
 *           type: string
 *       - in: query
 *         name: dataFim
 *         required: true
 *         description: Data de fim no formato YYYY-MM-DD
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: Destinatário para envio de e-mail
 *         schema:
 *           type: string
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
 *                     example: PIE
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
router.get('/total-receitas', getTotalReceitas);
router.get('/total-despesas', getTotalDespesas);
router.get('/lucro-liquido', getLucroLiquido);
router.get('/contas-vencidas', getContasVencidas);
router.get('/contas-a-vencer', getContasAVencer);

export default router;
