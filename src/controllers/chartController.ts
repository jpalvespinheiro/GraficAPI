import { Request, Response } from 'express';
import { getChartDataService } from '../services/chartService';
import { sendEmail } from '../services/emailService';

export const getChartData = async (req: Request, res: Response) => {
  try {
    const { tipo, dataInicio, dataFim } = req.query;

    if (!tipo || !dataInicio || !dataFim) {
      return res.status(400).json({
        error: 'Parâmetros "tipo", "dataInicio" e "dataFim" são obrigatórios.',
      });
    }

    const chartData = await getChartDataService(tipo as string, dataInicio as string, dataFim as string);
    
    await sendEmail(
      'jpalvespinheiro@gmail.com',
      'Dados do Gráfico',
      JSON.stringify(chartData)
    );

    return res.json(chartData);
  } catch (error) {
    console.error('Erro ao buscar dados do gráfico:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados do gráfico.' });
  }
};
