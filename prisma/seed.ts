// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // Dados de exemplo para gráficos de pizza
  const chartData = [
    { type: 'pie', value: 30, label: 'Categoria A', createdAt: new Date('2024-09-01') },
    { type: 'pie', value: 70, label: 'Categoria B', createdAt: new Date('2024-09-01') },
  ];

  // Dados fictícios para o mês de setembro
  const septemberDataPie = [
    { type: 'pie', value: 100, label: 'Receitas - Setembro', createdAt: new Date('2024-09-01') },
    { type: 'pie', value: 50, label: 'Despesas - Setembro', createdAt: new Date('2024-09-01') },
    { type: 'pie', value: 25, label: 'Investimentos - Setembro', createdAt: new Date('2024-09-01') },
    { type: 'pie', value: 15, label: 'Outras - Setembro', createdAt: new Date('2024-09-01') },
  ];

  const septemberDataLine = [
    { type: 'line', value: 100, label: '01/09', createdAt: new Date('2024-09-01') },
    { type: 'line', value: 120, label: '02/09', createdAt: new Date('2024-09-02') },
    { type: 'line', value: 90, label: '03/09', createdAt: new Date('2024-09-03') },
    { type: 'line', value: 150, label: '04/09', createdAt: new Date('2024-09-04') },
    { type: 'line', value: 200, label: '05/09', createdAt: new Date('2024-09-05') },
    { type: 'line', value: 180, label: '06/09', createdAt: new Date('2024-09-06') },
    { type: 'line', value: 220, label: '07/09', createdAt: new Date('2024-09-07') },
    { type: 'line', value: 170, label: '08/09', createdAt: new Date('2024-09-08') },
    { type: 'line', value: 250, label: '09/09', createdAt: new Date('2024-09-09') },
    { type: 'line', value: 230, label: '10/09', createdAt: new Date('2024-09-10') },
    { type: 'line', value: 190, label: '11/09', createdAt: new Date('2024-09-11') },
    { type: 'line', value: 300, label: '12/09', createdAt: new Date('2024-09-12') },
    { type: 'line', value: 220, label: '13/09', createdAt: new Date('2024-09-13') },
    { type: 'line', value: 270, label: '14/09', createdAt: new Date('2024-09-14') },
    { type: 'line', value: 320, label: '15/09', createdAt: new Date('2024-09-15') },
    { type: 'line', value: 210, label: '16/09', createdAt: new Date('2024-09-16') },
    { type: 'line', value: 250, label: '17/09', createdAt: new Date('2024-09-17') },
    { type: 'line', value: 290, label: '18/09', createdAt: new Date('2024-09-18') },
    { type: 'line', value: 300, label: '19/09', createdAt: new Date('2024-09-19') },
    { type: 'line', value: 310, label: '20/09', createdAt: new Date('2024-09-20') },
    { type: 'line', value: 330, label: '21/09', createdAt: new Date('2024-09-21') },
    { type: 'line', value: 340, label: '22/09', createdAt: new Date('2024-09-22') },
    { type: 'line', value: 350, label: '23/09', createdAt: new Date('2024-09-23') },
    { type: 'line', value: 370, label: '24/09', createdAt: new Date('2024-09-24') },
    { type: 'line', value: 390, label: '25/09', createdAt: new Date('2024-09-25') },
    { type: 'line', value: 400, label: '26/09', createdAt: new Date('2024-09-26') },
    { type: 'line', value: 420, label: '27/09', createdAt: new Date('2024-09-27') },
    { type: 'line', value: 430, label: '28/09', createdAt: new Date('2024-09-28') },
    { type: 'line', value: 440, label: '29/09', createdAt: new Date('2024-09-29') },
    { type: 'line', value: 450, label: '30/09', createdAt: new Date('2024-09-30') },
  ];

  const septemberDataBar = [
    { type: 'bar', value: 50, label: 'Produto X - 01/09', createdAt: new Date('2024-09-01') },
    { type: 'bar', value: 80, label: 'Produto Y - 02/09', createdAt: new Date('2024-09-02') },
    { type: 'bar', value: 60, label: 'Produto Z - 03/09', createdAt: new Date('2024-09-03') },
    { type: 'bar', value: 100, label: 'Produto X - 04/09', createdAt: new Date('2024-09-04') },
    { type: 'bar', value: 120, label: 'Produto Y - 05/09', createdAt: new Date('2024-09-05') },
    { type: 'bar', value: 90, label: 'Produto Z - 06/09', createdAt: new Date('2024-09-06') },
    { type: 'bar', value: 110, label: 'Produto X - 07/09', createdAt: new Date('2024-09-07') },
    { type: 'bar', value: 130, label: 'Produto Y - 08/09', createdAt: new Date('2024-09-08') },
    { type: 'bar', value: 95, label: 'Produto Z - 09/09', createdAt: new Date('2024-09-09') },
    { type: 'bar', value: 150, label: 'Produto X - 10/09', createdAt: new Date('2024-09-10') },
    { type: 'bar', value: 170, label: 'Produto Y - 11/09', createdAt: new Date('2024-09-11') },
    { type: 'bar', value: 140, label: 'Produto Z - 12/09', createdAt: new Date('2024-09-12') },
    { type: 'bar', value: 200, label: 'Produto X - 13/09', createdAt: new Date('2024-09-13') },
    { type: 'bar', value: 180, label: 'Produto Y - 14/09', createdAt: new Date('2024-09-14') },
    { type: 'bar', value: 220, label: 'Produto Z - 15/09', createdAt: new Date('2024-09-15') },
    { type: 'bar', value: 160, label: 'Produto X - 16/09', createdAt: new Date('2024-09-16') },
    { type: 'bar', value: 190, label: 'Produto Y - 17/09', createdAt: new Date('2024-09-17') },
    { type: 'bar', value: 210, label: 'Produto Z - 18/09', createdAt: new Date('2024-09-18') },
    { type: 'bar', value: 230, label: 'Produto X - 19/09', createdAt: new Date('2024-09-19') },
    { type: 'bar', value: 240, label: 'Produto Y - 20/09', createdAt: new Date('2024-09-20') },
    { type: 'bar', value: 220, label: 'Produto Z - 21/09', createdAt: new Date('2024-09-21') },
    { type: 'bar', value: 250, label: 'Produto X - 22/09', createdAt: new Date('2024-09-22') },
    { type: 'bar', value: 260, label: 'Produto Y - 23/09', createdAt: new Date('2024-09-23') },
    { type: 'bar', value: 270, label: 'Produto Z - 24/09', createdAt: new Date('2024-09-24') },
    { type: 'bar', value: 280, label: 'Produto X - 25/09', createdAt: new Date('2024-09-25') },
    { type: 'bar', value: 290, label: 'Produto Y - 26/09', createdAt: new Date('2024-09-26') },
    { type: 'bar', value: 300, label: 'Produto Z - 27/09', createdAt: new Date('2024-09-27') },
    { type: 'bar', value: 310, label: 'Produto X - 28/09', createdAt: new Date('2024-09-28') },
    { type: 'bar', value: 320, label: 'Produto Y - 29/09', createdAt: new Date('2024-09-29') },
    { type: 'bar', value: 330, label: 'Produto Z - 30/09', createdAt: new Date('2024-09-30') },
  ];

  // Criação dos dados no banco de dados
  await Promise.all([
    ...septemberDataPie.map(data =>
      prisma.chartData.create({ data })
    ),
    ...septemberDataLine.map(data =>
      prisma.chartData.create({ data })
    ),
    ...septemberDataBar.map(data =>
      prisma.chartData.create({ data })
    ),
  ]);
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
