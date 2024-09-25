import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      type: tipo,
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

  // Organizando a resposta com base em qual gráfico escolher
  switch (tipo) {
    case 'pie':
      return chartData;

    case 'line':
      return formatLineChartData(chartData);

    case 'bar':
      return formatBarChartData(chartData);

    default:
      throw new Error('Tipo de gráfico não suportado');
  }
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Formatação dos dados para gráfico de linhas
const formatLineChartData = (data: any[]) => {
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

// Formatação dos dados para gráfico de barras
const formatBarChartData = (data: any[]) => {
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
