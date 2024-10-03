import { Request, Response } from 'express';
import { 
  getChartDataService, 
  getTotalReceitasService, 
  getTotalDespesasService,
  getContasVencidasService,
  getContasAVencerService 
} from '../services/chartService';
import { sendEmail } from '../services/emailService';
import { formatCurrency } from '../utils/formatCurrency';

export const getChartData = async (req: Request, res: Response) => {
  try {
    const { tipo, dataInicio, dataFim } = req.query;

    if (!tipo || !dataInicio || !dataFim) {
      return res.status(400).json({
        error: 'Parâmetros "tipo", "dataInicio" e "dataFim" são obrigatórios.',
      });
    }

    if (!['PIE', 'LINE', 'BAR'].includes(tipo as string)) {
      return res.status(400).json({ error: 'Tipo de gráfico inválido. Permitidos: "PIE", "LINE", "BAR".' });
    }

    const chartData = await getChartDataService(tipo as string, dataInicio as string, dataFim as string);
    
    const destinatario = req.query.email || 'default@example.com';

    await sendEmail(
      destinatario as string,
      'Dados do Gráfico',
      JSON.stringify(chartData)
    );

    return res.json(chartData);
  } catch (error) {
    console.error('Erro ao buscar dados do gráfico:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados do gráfico.' });
  }
};

export const getTotalReceitas = async (req: Request, res: Response) => {
  try {
    const totalReceitas = await getTotalReceitasService(req.query.dataInicio as string, req.query.dataFim as string);
    return res.json({ total: formatCurrency(totalReceitas) });
  } catch (error) {
    console.error('Erro ao buscar total de receitas:', error);
    return res.status(500).json({ error: 'Erro ao buscar total de receitas.' });
  }
};


export const getTotalDespesas = async (req: Request, res: Response) => {
  try {
    const totalDespesas = await getTotalDespesasService(req.query.dataInicio as string, req.query.dataFim as string);
    return res.json({ total: formatCurrency(totalDespesas) });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar total de despesas.' });
  }
};

export const getLucroLiquido = async (req: Request, res: Response) => {
  try {
    const totalReceitas = await getTotalReceitasService(req.query.dataInicio as string, req.query.dataFim as string);
    const totalDespesas = await getTotalDespesasService(req.query.dataInicio as string, req.query.dataFim as string);
    const lucroLiquido = totalReceitas - totalDespesas;
    
    return res.json({ lucroLiquido: formatCurrency(lucroLiquido) });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao calcular lucro líquido.' });
  }
};

export const getContasVencidas = async (req: Request, res: Response) => {
  try {
    const contasVencidas = await getContasVencidasService();
    return res.json(contasVencidas);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar contas vencidas.' });
  }
};

export const getContasAVencer = async (req: Request, res: Response) => {
  try {
    const contasAVencer = await getContasAVencerService();
    return res.json(contasAVencer);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar contas a vencer.' });
  }
};
