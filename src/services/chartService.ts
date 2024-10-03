import { ChartType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ChartData {
  label: string;
  value: number;
}

export const getChartDataService = async (tipo: string, dataInicio: string, dataFim: string) => {
  if (!isValidDate(dataInicio) || !isValidDate(dataFim)) {
    throw new Error('Datas de início e fim inválidas');
  }

  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);

  if (inicio > fim) {
    throw new Error('A data de início deve ser anterior à data de fim');
  }

  const chartData = await prisma.chartData.findMany({
    where: {
      type: tipo as ChartType,
      createdAt: {
        gte: inicio,
        lte: fim,
      },
    },
    select: {
      label: true,
      value: true,
    },
  });

  switch (tipo) {
    case 'PIE':
      return chartData;

    case 'LINE':
      return formatLineChartData(chartData);

    case 'BAR':
      return formatBarChartData(chartData);

    default:
      throw new Error('Tipo de gráfico não suportado');
  }
};


const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};


const formatLineChartData = (data: ChartData[]) => {
  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: 'Dados do Gráfico de Linhas',
        data: data.map((item) => item.value),
      },
    ],
  };
};

const formatBarChartData = (data: ChartData[]) => {
  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: 'Dados do Gráfico de Barras',
        data: data.map((item) => item.value),
      },
    ],
  };
};



const getTotalService = async (tipo: string, dataInicio: string, dataFim: string) => {
  return await prisma.chartData.aggregate({
    _sum: {
      value: true,
    },
    where: {
      type: tipo as ChartType,
      createdAt: {
        gte: new Date(dataInicio),
        lte: new Date(dataFim),
      },
    },
  });
};

export const getTotalReceitasService = async (dataInicio: string, dataFim: string) => {
  const totalReceitas = await getTotalService('RECEITA', dataInicio, dataFim);
  return totalReceitas._sum?.value || 0;
};

export const getTotalDespesasService = async (dataInicio: string, dataFim: string) => {
  const totalDespesas = await getTotalService('DESPESA', dataInicio, dataFim);
  return totalDespesas._sum?.value || 0; 
};

export const getLucroLiquidoService = async (dataInicio: string, dataFim: string) => {
  const totalReceitas = await getTotalReceitasService(dataInicio, dataFim);
  const totalDespesas = await getTotalDespesasService(dataInicio, dataFim);
  return totalReceitas - totalDespesas;
};

export const getContasVencidasService = async () => {
  const today = new Date();
  const contasVencidas = await prisma.conta.findMany({
    where: {
      vencimento: {
        lt: today,
      },
    },
  });
  return contasVencidas;
};

export const getContasAVencerService = async () => {
  const today = new Date();
  const contasAVencer = await prisma.conta.findMany({
    where: {
      vencimento: {
        gte: today,
      },
    },
  });
  return contasAVencer;
};
